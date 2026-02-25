// src/components/dashboardClient/ClientInvoices.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import { toast } from "react-toastify";
import { sendEmailNotification } from "../services/emailService";
import {
  FaFileInvoice, FaCheckCircle, FaTimesCircle,
  FaClock, FaEye, FaUser, FaEnvelope,
  FaMoneyBillWave, FaCalendarAlt, FaSearch
} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = {
  primary:      "#4f46e5",
  purple:       "#7c3aed",
  secondary:    "#10b981",
  accent:       "#f59e0b",
  danger:       "#ef4444",
  bg:           "#f9fafb",
  border:       "#e5e7eb",
  text:         "#111827",
  textLight:    "#6b7280",
  textMuted:    "#9ca3af",
};

const statusConfig = {
  pending:  { label: "Pending",  color: theme.accent,    bg: "rgba(245,158,11,0.1)",   icon: "🕐" },
  approved: { label: "Approved", color: theme.secondary, bg: "rgba(16,185,129,0.1)",   icon: "✅" },
  rejected: { label: "Rejected", color: theme.danger,    bg: "rgba(239,68,68,0.1)",    icon: "❌" },
};

const ClientInvoices = () => {
  const [invoices,     setInvoices]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updating,     setUpdating]     = useState(null); // invoice_id اللي بيتحدث

  /* ── جيب الفواتير بتاعة الـ client ── */
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const { data: auth } = await supabase.auth.getUser();
        if (!auth?.user) return;

        const { data, error } = await supabase
          .from("invoices")
          .select("*")
          .eq("client_id", auth.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setInvoices(data || []);
      } catch (err) {
        toast.error("Failed to load invoices");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();

    // Real-time — لو الـ freelancer عدّل الفاتورة تتحدث تلقائي
    const channel = supabase
      .channel("client_invoices_rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "invoices" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setInvoices(prev => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setInvoices(prev => prev.map(inv =>
              inv.invoice_id === payload.new.invoice_id ? payload.new : inv
            ));
          }
        })
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  /* ── Approve / Reject ── */
  const handleApproval = async (invoiceId, newStatus) => {
    setUpdating(invoiceId);
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ status: newStatus })
        .eq("invoice_id", invoiceId);

      if (error) throw error;

      setInvoices(prev => prev.map(inv =>
        inv.invoice_id === invoiceId ? { ...inv, status: newStatus } : inv
      ));

      // ── إرسال إيميل للـ Freelancer ──
      const inv = invoices.find(i => i.invoice_id === invoiceId);
      if (inv?.freelancer_email) {
        try {
          const clientName = localStorage.getItem("client_name") || "Client";
          await sendEmailNotification(
            inv.freelancer_email,
            inv.freelancer_name || "Freelancer",
            clientName,
            newStatus === "approved"
              ? `Great news! "${inv.service_title}" invoice has been approved by ${clientName}. Total: ${Number(inv.total).toLocaleString()} EGP`
              : `"${inv.service_title}" invoice has been rejected by ${clientName}. Please follow up with the client.`,
            inv.service_title,
            `${window.location.origin}/dashboard`,
            localStorage.getItem("client_email") || ""  // ← from_email عشان الـ Reply يروح للـ client
          );
          toast.info(newStatus === "approved" ? "📧 Freelancer notified!" : "📧 Freelancer notified");
        } catch {}
      }

      toast.success(newStatus === "approved" ? "✅ Invoice Approved!" : "❌ Invoice Rejected");
    } catch (err) {
      toast.error("Failed to update: " + err.message);
    } finally {
      setUpdating(null);
    }
  };

  /* ── Filter ── */
  const filtered = invoices.filter(inv => {
    const matchSearch =
      inv.service_title?.toLowerCase().includes(search.toLowerCase()) ||
      inv.freelancer_name?.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoice_id?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || inv.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPending  = invoices.filter(i => i.status === "pending").length;
  const totalApproved = invoices.filter(i => i.status === "approved").length;
  const totalAmount   = invoices
    .filter(i => i.status === "approved")
    .reduce((s, i) => s + (Number(i.total) || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg,
      fontFamily: "'Segoe UI', sans-serif", padding: "32px 0 80px" }}>
      <div className="container-fluid px-4">

        {/* ══ Header ══ */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
          className="row align-items-center g-3 mb-4"
          style={{ background:"#fff", borderRadius:20, padding:"22px 24px",
            boxShadow:"0 4px 20px rgba(79,70,229,0.08)",
            border:`1px solid rgba(79,70,229,0.1)` }}>
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-3">
              <div style={{ width:56, height:56, borderRadius:16, flexShrink:0,
                background:`linear-gradient(135deg,${theme.primary},${theme.purple})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", boxShadow:"0 8px 20px rgba(79,70,229,0.3)" }}>
                <FaFileInvoice size={24}/>
              </div>
              <div>
                <h4 style={{ fontWeight:800, color:theme.text, margin:0 }}>My Invoices</h4>
                <p style={{ color:theme.textLight, margin:0, fontSize:"0.88rem" }}>
                  Review and approve invoices from freelancers
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-lg-6">
            <div className="row g-2">
              {[
                { label:"Pending",  val:totalPending,                    color:theme.accent    },
                { label:"Approved", val:totalApproved,                   color:theme.secondary },
                { label:"Total Paid", val:`${totalAmount.toLocaleString()} EGP`, color:theme.primary },
              ].map(s => (
                <div key={s.label} className="col-4">
                  <div style={{ background:theme.bg, borderRadius:12, padding:"12px",
                    border:`1px solid ${theme.border}`, textAlign:"center" }}>
                    <p style={{ fontSize:"0.7rem", color:theme.textLight, margin:"0 0 3px",
                      textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.label}</p>
                    <p style={{ fontSize:"1.1rem", fontWeight:700, color:s.color, margin:0 }}>{s.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══ Search & Filter ══ */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.1 }}
          className="d-flex align-items-center gap-3 flex-wrap mb-4"
          style={{ background:"#fff", borderRadius:14, padding:"14px 18px",
            border:`1px solid ${theme.border}` }}>
          <div style={{ flex:1, minWidth:200, position:"relative" }}>
            <FaSearch style={{ position:"absolute", left:12, top:"50%",
              transform:"translateY(-50%)", color:theme.textMuted, fontSize:"0.85rem" }}/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by service, freelancer, invoice ID…"
              style={{ width:"100%", border:`1.5px solid ${theme.border}`, borderRadius:10,
                padding:"9px 12px 9px 34px", fontSize:"0.88rem", outline:"none",
                background:theme.bg, color:theme.text }}/>
          </div>
          <div className="d-flex gap-2">
            {["all","pending","approved","rejected"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                style={{
                  padding:"8px 16px", borderRadius:50, border:"none", cursor:"pointer",
                  fontSize:"0.82rem", fontWeight:600, transition:"all .2s",
                  background: filterStatus === s
                    ? `linear-gradient(135deg,${theme.primary},${theme.purple})`
                    : theme.bg,
                  color: filterStatus === s ? "#fff" : theme.textLight,
                  boxShadow: filterStatus === s ? "0 3px 10px rgba(79,70,229,0.25)" : "none",
                }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ══ Invoices List ══ */}
        {loading ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div className="spinner-border" style={{ color:theme.primary, width:40, height:40 }}/>
            <p style={{ color:theme.textLight, marginTop:16 }}>Loading invoices…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 20px",
            background:"#fff", borderRadius:20, border:`1px solid ${theme.border}` }}>
            <div style={{ fontSize:"3.5rem", marginBottom:16 }}>📭</div>
            <h5 style={{ color:theme.text, marginBottom:8 }}>No invoices found</h5>
            <p style={{ color:theme.textLight }}>
              {invoices.length === 0
                ? "No invoices have been sent to you yet."
                : "No invoices match your search."}
            </p>
          </div>
        ) : (
          <div className="row g-3">
            <AnimatePresence>
              {filtered.map((inv, i) => {
                const st = statusConfig[inv.status] || statusConfig.pending;
                const isUpdating = updating === inv.invoice_id;

                return (
                  <motion.div key={inv.invoice_id || i} className="col-12"
                    initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0, y:-10 }} transition={{ delay: i * 0.04 }}>
                    <div style={{
                      background:"#fff", borderRadius:18, padding:"20px 24px",
                      border:`1px solid ${theme.border}`,
                      boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                      transition:"box-shadow .2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(79,70,229,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"}
                    >
                      <div className="row align-items-center g-3">

                        {/* Service Info */}
                        <div className="col-lg-4">
                          <div className="d-flex align-items-center gap-3">
                            <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                              background:`linear-gradient(135deg,${theme.primary},${theme.purple})`,
                              display:"flex", alignItems:"center", justifyContent:"center",
                              color:"#fff", fontSize:"1.1rem" }}>
                              <FaFileInvoice/>
                            </div>
                            <div>
                              <p style={{ fontWeight:700, color:theme.text, margin:"0 0 3px",
                                fontSize:"0.95rem" }}>
                                {inv.service_title || "Untitled"}
                              </p>
                              <p style={{ fontSize:"0.72rem", color:theme.textMuted, margin:0 }}>
                                #{inv.invoice_id?.slice(0,8)}…
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Freelancer + Amount */}
                        <div className="col-lg-4">
                          <div className="d-flex gap-4">
                            <div>
                              <p style={{ fontSize:"0.68rem", color:theme.textMuted,
                                textTransform:"uppercase", margin:"0 0 2px" }}>Freelancer</p>
                              <p style={{ fontWeight:600, color:theme.text, margin:0,
                                fontSize:"0.88rem", display:"flex", alignItems:"center", gap:5 }}>
                                <FaUser size={10} style={{ color:theme.primary }}/> {inv.freelancer_name || "—"}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize:"0.68rem", color:theme.textMuted,
                                textTransform:"uppercase", margin:"0 0 2px" }}>Amount</p>
                              <p style={{ fontWeight:700, color:theme.secondary, margin:0, fontSize:"0.95rem" }}>
                                {Number(inv.total || 0).toLocaleString()} EGP
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize:"0.68rem", color:theme.textMuted,
                                textTransform:"uppercase", margin:"0 0 2px" }}>Due</p>
                              <p style={{ fontWeight:600, color:theme.text, margin:0,
                                fontSize:"0.85rem", display:"flex", alignItems:"center", gap:5 }}>
                                <FaCalendarAlt size={10} style={{ color:theme.accent }}/> {inv.due_date || "—"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status + Actions */}
                        <div className="col-lg-4">
                          <div className="d-flex align-items-center justify-content-end gap-2 flex-wrap">
                            {/* Status badge */}
                            <span style={{ padding:"5px 14px", borderRadius:50,
                              fontSize:"0.8rem", fontWeight:700,
                              background:st.bg, color:st.color }}>
                              {st.icon} {st.label}
                            </span>

                            {/* Approve / Reject — بس لو pending */}
                            {inv.status === "pending" && (
                              <>
                                <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                                  onClick={() => handleApproval(inv.invoice_id, "approved")}
                                  disabled={isUpdating}
                                  style={{ padding:"8px 18px", border:"none", borderRadius:10,
                                    background:`linear-gradient(135deg,${theme.secondary},#059669)`,
                                    color:"#fff", fontWeight:700, fontSize:"0.85rem",
                                    cursor:"pointer", display:"flex", alignItems:"center", gap:6,
                                    boxShadow:"0 4px 12px rgba(16,185,129,0.3)" }}>
                                  {isUpdating
                                    ? <span className="spinner-border spinner-border-sm" style={{ width:14, height:14 }}/>
                                    : <FaCheckCircle size={13}/>} Approve
                                </motion.button>

                                <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                                  onClick={() => handleApproval(inv.invoice_id, "rejected")}
                                  disabled={isUpdating}
                                  style={{ padding:"8px 18px", border:"none", borderRadius:10,
                                    background:`linear-gradient(135deg,${theme.danger},#dc2626)`,
                                    color:"#fff", fontWeight:700, fontSize:"0.85rem",
                                    cursor:"pointer", display:"flex", alignItems:"center", gap:6,
                                    boxShadow:"0 4px 12px rgba(239,68,68,0.3)" }}>
                                  {isUpdating
                                    ? <span className="spinner-border spinner-border-sm" style={{ width:14, height:14 }}/>
                                    : <FaTimesCircle size={13}/>} Reject
                                </motion.button>
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientInvoices;