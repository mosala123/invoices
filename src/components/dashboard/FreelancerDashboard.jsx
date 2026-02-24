// src/components/dashboard/FreelancerDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaFileInvoice, FaCheckCircle, FaTimesCircle, FaClock,
  FaMoneyBillWave, FaBell, FaChartLine, FaRocket,
  FaRegBell, FaUser, FaArrowUp, FaArrowRight,
  FaRegFileAlt, FaFire, FaStar
} from "react-icons/fa";
import { MdOutlineReceipt, MdNotificationsActive } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

/* ══ Theme ══ */
const T = {
  primary:   "#4f46e5",
  purple:    "#7c3aed",
  secondary: "#10b981",
  accent:    "#f59e0b",
  danger:    "#ef4444",
  bg:        "#f1f5f9",
  surface:   "#ffffff",
  border:    "#e2e8f0",
  text:      "#0f172a",
  textLight: "#64748b",
  textMuted: "#94a3b8",
};

/* ══ Animated Counter ══ */
const Counter = ({ target, duration = 1200, prefix = "", suffix = "" }) => {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!target) return;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
};

/* ══ Stat Card ══ */
const StatCard = ({ icon, label, value, sub, color, delay = 0, prefix = "", suffix = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
    className="col-6 col-lg-3"
  >
    <div style={{
      background: T.surface,
      borderRadius: 20,
      padding: "22px 20px",
      border: `1px solid ${T.border}`,
      boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
      position: "relative",
      overflow: "hidden",
      height: "100%",
      transition: "transform .2s, box-shadow .2s",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px ${color}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(15,23,42,0.06)";
      }}
    >
      {/* Glow blob */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: 100, height: 100, borderRadius: "50%",
        background: `${color}18`, filter: "blur(20px)",
        pointerEvents: "none",
      }} />

      <div style={{
        width: 46, height: 46, borderRadius: 14,
        background: `${color}15`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color, fontSize: "1.2rem", marginBottom: 14,
      }}>
        {icon}
      </div>

      <p style={{ fontSize: "0.72rem", color: T.textMuted, textTransform: "uppercase",
        letterSpacing: "0.8px", margin: "0 0 4px", fontWeight: 600 }}>
        {label}
      </p>
      <p style={{ fontSize: "1.8rem", fontWeight: 800, color: T.text, margin: "0 0 4px",
        lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>
        <Counter target={value} prefix={prefix} suffix={suffix} />
      </p>
      {sub && (
        <p style={{ fontSize: "0.75rem", color, margin: 0, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 4 }}>
          <FaArrowUp size={9} /> {sub}
        </p>
      )}
    </div>
  </motion.div>
);

/* ══ Notification Bell Component ══ */
export const NotificationBell = () => {
  const [open,    setOpen]    = useState(false);
  const [notifs,  setNotifs]  = useState([]);
  const [unread,  setUnread]  = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const loadNotifs = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        if (!auth?.user) return;

        // جيب آخر 20 فاتورة اتحدث status بتاعتها
        const { data } = await supabase
          .from("invoices")
          .select("invoice_id, service_title, status, customer_name, created_at")
          .eq("user_id", auth.user.id)
          .in("status", ["approved", "rejected"])
          .order("created_at", { ascending: false })
          .limit(20);

        if (data) {
          setNotifs(data);
          // عدّ الغير مقروءة (آخر 24 ساعة)
          const yesterday = new Date(Date.now() - 86400000).toISOString();
          setUnread(data.filter(n => n.created_at > yesterday).length);
        }
      } catch {}
    };

    loadNotifs();

    // Real-time: لما الـ client يعمل approve أو reject
    const channel = supabase
      .channel("notif_bell")
      .on("postgres_changes", {
        event: "UPDATE", schema: "public", table: "invoices",
      }, (payload) => {
        if (payload.new.status === "approved" || payload.new.status === "rejected") {
          const msg = payload.new.status === "approved"
            ? `✅ "${payload.new.service_title}" was Approved!`
            : `❌ "${payload.new.service_title}" was Rejected`;
          toast.info(msg);

          setNotifs(prev => {
            const filtered = prev.filter(n => n.invoice_id !== payload.new.invoice_id);
            return [payload.new, ...filtered].slice(0, 20);
          });
          setUnread(prev => prev + 1);
        }
      })
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fmtTime = (ts) => {
    if (!ts) return "";
    const diff = Date.now() - new Date(ts);
    if (diff < 3600000)  return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
        onClick={() => { setOpen(o => !o); setUnread(0); }}
        style={{
          width: 44, height: 44, borderRadius: 13,
          background: open ? `linear-gradient(135deg,${T.primary},${T.purple})` : T.surface,
          border: `1.5px solid ${open ? "transparent" : T.border}`,
          color: open ? "#fff" : T.textLight,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "1.1rem", position: "relative",
          boxShadow: open ? `0 6px 20px ${T.primary}40` : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all .2s",
        }}
      >
        {open ? <MdNotificationsActive /> : <FaRegBell />}
        <AnimatePresence>
          {unread > 0 && !open && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              style={{
                position: "absolute", top: -5, right: -5,
                width: 20, height: 20, borderRadius: "50%",
                background: T.danger, border: "2.5px solid #fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.6rem", fontWeight: 800, color: "#fff",
              }}>
              {unread > 9 ? "9+" : unread}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "absolute", top: 52, right: 0,
              width: 320, background: T.surface,
              borderRadius: 18, boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              border: `1px solid ${T.border}`, zIndex: 9999,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "14px 18px",
              background: `linear-gradient(135deg,${T.primary},${T.purple})`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MdNotificationsActive style={{ color: "#fff", fontSize: "1.1rem" }} />
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
                  Notifications
                </span>
              </div>
              {notifs.length > 0 && (
                <span style={{
                  background: "rgba(255,255,255,0.2)", color: "#fff",
                  borderRadius: 50, padding: "2px 10px", fontSize: "0.72rem", fontWeight: 700,
                }}>
                  {notifs.length}
                </span>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight: 340, overflowY: "auto" }}>
              {notifs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🔔</div>
                  <p style={{ color: T.textMuted, fontSize: "0.85rem", margin: 0 }}>
                    No notifications yet
                  </p>
                </div>
              ) : (
                notifs.map((n, i) => (
                  <motion.div key={n.invoice_id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      padding: "12px 18px",
                      borderBottom: i < notifs.length - 1 ? `1px solid ${T.border}` : "none",
                      display: "flex", alignItems: "flex-start", gap: 12,
                      background: i === 0 ? `${T.primary}06` : "transparent",
                      transition: "background .15s",
                      cursor: "default",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.bg}
                    onMouseLeave={e => e.currentTarget.style.background = i === 0 ? `${T.primary}06` : "transparent"}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: n.status === "approved"
                        ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem",
                    }}>
                      {n.status === "approved" ? "✅" : "❌"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: T.text, margin: "0 0 2px",
                        fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis",
                        whiteSpace: "nowrap" }}>
                        {n.service_title || "Invoice"}
                      </p>
                      <p style={{ margin: "0 0 3px", fontSize: "0.78rem",
                        color: n.status === "approved" ? T.secondary : T.danger, fontWeight: 600 }}>
                        {n.status === "approved" ? "Client Approved" : "Client Rejected"}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.7rem", color: T.textMuted }}>
                        {n.customer_name} · {fmtTime(n.created_at)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════════════
   FreelancerDashboard
══════════════════════════════════════════════ */
const FreelancerDashboard = () => {
  const [freelancer,     setFreelancer]     = useState(null);
  const [invoices,       setInvoices]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [greeting,       setGreeting]       = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 17) setGreeting("Good afternoon");
    else if (h >= 17)      setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        if (!auth?.user) return;

        // بيانات الفريلانسر
        const { data: fl } = await supabase
          .from("freelancers").select("name,email,phone")
          .eq("id", auth.user.id).maybeSingle();
        setFreelancer(fl);

        // الفواتير
        const { data: inv } = await supabase
          .from("invoices").select("*")
          .eq("user_id", auth.user.id)
          .order("created_at", { ascending: false });
        setInvoices(inv || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();

    // Real-time للفواتير
    const channel = supabase
      .channel("dashboard_invoices")
      .on("postgres_changes", { event: "*", schema: "public", table: "invoices" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setInvoices(prev => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setInvoices(prev =>
              prev.map(inv => inv.invoice_id === payload.new.invoice_id ? payload.new : inv)
            );
            if (payload.new.status === "approved") {
              toast.success(`✅ "${payload.new.service_title}" was Approved!`);
            } else if (payload.new.status === "rejected") {
              toast.error(`❌ "${payload.new.service_title}" was Rejected`);
            }
          }
        })
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  /* ── Stats ── */
  const total    = invoices.length;
  const approved = invoices.filter(i => i.status === "approved").length;
  const pending  = invoices.filter(i => i.status === "pending").length;
  const rejected = invoices.filter(i => i.status === "rejected").length;
  const revenue  = invoices
    .filter(i => i.status === "approved")
    .reduce((s, i) => s + (Number(i.total) || 0), 0);

  const recentInvoices = invoices.slice(0, 6);

  const statusCfg = {
    approved: { color: T.secondary, bg: "rgba(16,185,129,0.1)",  icon: "✅", label: "Approved" },
    pending:  { color: T.accent,    bg: "rgba(245,158,11,0.1)",  icon: "🕐", label: "Pending"  },
    rejected: { color: T.danger,    bg: "rgba(239,68,68,0.1)",   icon: "❌", label: "Rejected" },
  };

  const fmtDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div className="spinner-border" style={{ color: T.primary, width: 44, height: 44 }} />
        <p style={{ color: T.textLight, marginTop: 16, fontWeight: 600 }}>Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", paddingBottom: 80 }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .dash-table tr:hover td { background: ${T.bg} !important; }
      `}</style>

      {/* ══ Top Bar ══ */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: T.surface, borderBottom: `1px solid ${T.border}`,
          padding: "16px 32px", position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
        {/* Greeting */}
        <div>
          <p style={{ fontSize: "0.75rem", color: T.textMuted, margin: "0 0 2px",
            textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>
            {greeting} 👋
          </p>
          <h5 style={{ fontWeight: 800, color: T.text, margin: 0, fontSize: "1.15rem" }}>
            {freelancer?.name || "Freelancer"}
          </h5>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <NotificationBell />
          <Link to="/create-invoice">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: `linear-gradient(135deg,${T.primary},${T.purple})`,
                border: "none", color: "#fff", borderRadius: 12,
                padding: "10px 20px", cursor: "pointer",
                fontWeight: 700, fontSize: "0.88rem",
                boxShadow: `0 6px 20px ${T.primary}40`,
              }}>
              <FaRocket size={13} /> New Invoice
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="container-fluid px-4 pt-4">

        {/* ══ Hero Banner ══ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            background: `linear-gradient(135deg, ${T.primary} 0%, ${T.purple} 60%, #a855f7 100%)`,
            borderRadius: 24, padding: "32px 36px", marginBottom: 28,
            position: "relative", overflow: "hidden",
            boxShadow: `0 16px 48px ${T.primary}40`,
          }}>
          {/* Decorative circles */}
          {[
            { w: 200, h: 200, top: -60, right: 80,  op: 0.08 },
            { w: 120, h: 120, top: 20,  right: 20,  op: 0.06 },
            { w: 80,  h: 80,  top: -20, right: 180, op: 0.1  },
          ].map((c, i) => (
            <div key={i} style={{
              position: "absolute", top: c.top, right: c.right,
              width: c.w, height: c.h, borderRadius: "50%",
              background: `rgba(255,255,255,${c.op})`,
              pointerEvents: "none",
            }} />
          ))}

          <div className="row align-items-center">
            <div className="col-lg-7">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <FaStar style={{ color: "#fbbf24", fontSize: "0.9rem" }} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem",
                    fontWeight: 600, letterSpacing: "0.5px" }}>
                    FREELANCER DASHBOARD
                  </span>
                </div>
                <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.9rem",
                  margin: "0 0 8px", lineHeight: 1.2 }}>
                  Welcome back,<br />{freelancer?.name?.split(" ")[0] || "there"}! 🚀
                </h2>
                <p style={{ color: "rgba(255,255,255,0.75)", margin: "0 0 20px",
                  fontSize: "0.95rem" }}>
                  You have <strong style={{ color: "#fff" }}>{pending} pending</strong> invoice{pending !== 1 ? "s" : ""} waiting for client approval.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link to="/create-invoice" style={{ textDecoration: "none" }}>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      style={{
                        background: "#fff", color: T.primary,
                        border: "none", borderRadius: 12, padding: "11px 24px",
                        fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 8,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      }}>
                      <MdOutlineReceipt size={16} /> Create Invoice
                    </motion.button>
                  </Link>
                  <Link to="/report" style={{ textDecoration: "none" }}>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      style={{
                        background: "rgba(255,255,255,0.15)", color: "#fff",
                        border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 12,
                        padding: "11px 24px", fontWeight: 700, fontSize: "0.9rem",
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                      }}>
                      <FaChartLine size={14} /> View Reports
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Mini stats in banner */}
            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="row g-2">
                {[
                  { label: "Total Revenue", val: revenue, prefix: "", suffix: " EGP", color: "#4ade80" },
                  { label: "Total Invoices", val: total,   prefix: "",  suffix: "",      color: "#a78bfa" },
                ].map((s, i) => (
                  <div key={i} className="col-6">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }}
                      style={{
                        background: "rgba(255,255,255,0.12)", borderRadius: 16,
                        padding: "16px", border: "1px solid rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                      }}>
                      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem",
                        margin: "0 0 4px", textTransform: "uppercase",
                        letterSpacing: "0.6px", fontWeight: 600 }}>{s.label}</p>
                      <p style={{ color: s.color, fontSize: "1.4rem", fontWeight: 800, margin: 0 }}>
                        <Counter target={s.val} prefix={s.prefix} suffix={s.suffix} />
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══ Stat Cards ══ */}
        <div className="row g-3 mb-4">
          <StatCard icon={<FaFileInvoice />}   label="Total Invoices" value={total}    color={T.primary}   delay={0.1} />
          <StatCard icon={<FaCheckCircle />}   label="Approved"       value={approved} color={T.secondary} delay={0.15} sub={approved > 0 ? `${Math.round(approved/total*100)||0}% approval rate` : null} />
          <StatCard icon={<FaClock />}         label="Pending"        value={pending}  color={T.accent}    delay={0.2} />
          <StatCard icon={<FaMoneyBillWave />} label="Total Revenue"  value={revenue}  color={T.primary}   delay={0.25} suffix=" EGP" />
        </div>

        {/* ══ Status Bar ══ */}
        {total > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: T.surface, borderRadius: 18, padding: "20px 24px",
              border: `1px solid ${T.border}`, marginBottom: 24,
              boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontWeight: 700, color: T.text, margin: 0, fontSize: "0.9rem" }}>
                Invoice Status Overview
              </p>
              <p style={{ color: T.textMuted, margin: 0, fontSize: "0.78rem" }}>
                {total} total
              </p>
            </div>
            {/* Progress bar */}
            <div style={{ height: 10, borderRadius: 50, background: T.bg,
              overflow: "hidden", display: "flex" }}>
              {[
                { val: approved, color: T.secondary },
                { val: pending,  color: T.accent    },
                { val: rejected, color: T.danger    },
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.val / total) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  style={{ background: s.color, height: "100%" }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
              {[
                { label: "Approved", val: approved, color: T.secondary },
                { label: "Pending",  val: pending,  color: T.accent    },
                { label: "Rejected", val: rejected, color: T.danger    },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color }} />
                  <span style={{ fontSize: "0.78rem", color: T.textLight, fontWeight: 600 }}>
                    {s.label} ({s.val})
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ Recent Invoices Table ══ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            background: T.surface, borderRadius: 20,
            border: `1px solid ${T.border}`,
            boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
            overflow: "hidden",
          }}>
          {/* Table Header */}
          <div style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10,
                background: `${T.primary}12`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.primary }}>
                <FaFire />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: T.text, margin: 0, fontSize: "0.95rem" }}>
                  Recent Invoices
                </p>
                <p style={{ color: T.textMuted, margin: 0, fontSize: "0.72rem" }}>
                  Latest {recentInvoices.length} invoices
                </p>
              </div>
            </div>
            <Link to="/cartinvoices" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  background: `${T.primary}10`, border: `1px solid ${T.primary}30`,
                  color: T.primary, borderRadius: 10, padding: "8px 16px",
                  fontWeight: 600, fontSize: "0.82rem", cursor: "pointer",
                }}>
                View All <FaArrowRight size={11} />
              </motion.button>
            </Link>
          </div>

          {recentInvoices.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>📄</div>
              <p style={{ color: T.text, fontWeight: 600, marginBottom: 6 }}>No invoices yet</p>
              <p style={{ color: T.textMuted, fontSize: "0.85rem", marginBottom: 20 }}>
                Create your first invoice to get started
              </p>
              <Link to="/create-invoice" style={{ textDecoration: "none" }}>
                <button style={{
                  background: `linear-gradient(135deg,${T.primary},${T.purple})`,
                  color: "#fff", border: "none", borderRadius: 12,
                  padding: "10px 24px", fontWeight: 700, cursor: "pointer",
                }}>
                  Create Invoice
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="dash-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: T.bg }}>
                    {["Service", "Client", "Amount", "Due Date", "Status"].map(h => (
                      <th key={h} style={{
                        padding: "12px 20px", textAlign: "left",
                        fontSize: "0.72rem", color: T.textMuted,
                        textTransform: "uppercase", letterSpacing: "0.8px",
                        fontWeight: 700, border: "none",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {recentInvoices.map((inv, i) => {
                      const st = statusCfg[inv.status] || statusCfg.pending;
                      return (
                        <motion.tr key={inv.invoice_id || i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          style={{ borderBottom: `1px solid ${T.border}`, cursor: "default" }}
                        >
                          <td style={{ padding: "14px 20px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                background: `${T.primary}10`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: T.primary, fontSize: "0.9rem",
                              }}>
                                <FaRegFileAlt />
                              </div>
                              <div>
                                <p style={{ fontWeight: 600, color: T.text, margin: 0,
                                  fontSize: "0.88rem", maxWidth: 160,
                                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {inv.service_title || "Untitled"}
                                </p>
                                <p style={{ color: T.textMuted, margin: 0, fontSize: "0.7rem" }}>
                                  #{inv.invoice_id?.slice(0, 8)}…
                                </p>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{
                                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                                background: `${T.purple}15`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: T.purple, fontSize: "0.75rem", fontWeight: 700,
                              }}>
                                {inv.customer_name?.charAt(0).toUpperCase() || "C"}
                              </div>
                              <div>
                                <p style={{ fontWeight: 600, color: T.text, margin: 0, fontSize: "0.85rem" }}>
                                  {inv.customer_name || "—"}
                                </p>
                                <p style={{ color: T.textMuted, margin: 0, fontSize: "0.7rem" }}>
                                  {inv.customer_email || ""}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <p style={{ fontWeight: 700, color: T.secondary, margin: 0, fontSize: "0.9rem" }}>
                              {Number(inv.total || 0).toLocaleString()} EGP
                            </p>
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <p style={{ color: T.textLight, margin: 0, fontSize: "0.83rem" }}>
                              {fmtDate(inv.due_date)}
                            </p>
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <span style={{
                              padding: "5px 13px", borderRadius: 50,
                              fontSize: "0.78rem", fontWeight: 700,
                              background: st.bg, color: st.color,
                            }}>
                              {st.icon} {st.label}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default FreelancerDashboard;