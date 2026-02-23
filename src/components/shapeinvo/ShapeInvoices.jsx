import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRegFileAlt, FaTasks, FaUser, FaEnvelope, FaPhone,
  FaCalendarAlt, FaMoneyBillWave, FaArrowLeft, FaDownload,
  FaHashtag, FaCreditCard, FaCheckCircle, FaShieldAlt,
  FaStar, FaGlobe, FaLock, FaFilePdf, FaSave,
  FaClock, FaInfoCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';
import { supabase } from '../../supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css';

// نظام الألوان الفاتح والمتناسق
const theme = {
  primary: "#4f46e5",      // بنفسجي أزرق
  primaryLight: "#818cf8",
  primaryDim: "rgba(79, 70, 229, 0.1)",
  secondary: "#10b981",     // أخضر
  secondaryDim: "rgba(16, 185, 129, 0.1)",
  accent: "#f59e0b",        // برتقالي ذهبي
  accentDim: "rgba(245, 158, 11, 0.1)",
  danger: "#ef4444",
  dangerDim: "rgba(239, 68, 68, 0.1)",
  bg: "#f9fafb",            // خلفية فاتحة
  surface: "#ffffff",       // سطح أبيض
  card: "#ffffff",          // بطاقات بيضاء
  border: "#e5e7eb",        // حدود رمادية فاتحة
  text: "#111827",          // نص داكن
  textLight: "#6b7280",     // نص رمادي
  textMuted: "#9ca3af",     // نص باهت
  gold: "#fbbf24",          // ذهبي فاتح
  goldLight: "#fcd34d",
  goldDim: "rgba(251, 191, 36, 0.1)",
  purple: "#8b5cf6",
  purpleDim: "rgba(139, 92, 246, 0.1)"
};

/* ── countdown box ── */
const TimeBox = ({ value, label }) => (
  <div style={{
    textAlign: "center",
    minWidth: "80px",
    background: "white",
    border: `1px solid ${theme.border}`,
    borderRadius: "16px",
    padding: "15px 10px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${theme.primary}, ${theme.purple})`
    }} />
    <div style={{
      fontSize: "2rem",
      fontWeight: 800,
      color: theme.primary,
      lineHeight: 1,
      marginBottom: "5px"
    }}>
      {String(value).padStart(2, "0")}
    </div>
    <div style={{
      fontSize: "0.7rem",
      color: theme.textLight,
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontWeight: 600
    }}>
      {label}
    </div>
  </div>
);

/* ── info row ── */
const InfoRow = ({ icon, label, value }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 0",
    borderBottom: `1px solid ${theme.border}`
  }}>
    <div style={{
      width: "36px",
      height: "36px",
      borderRadius: "10px",
      background: theme.primaryDim,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.primary,
      fontSize: "1rem",
      flexShrink: 0
    }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <p style={{
        fontSize: "0.7rem",
        color: theme.textLight,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        margin: 0,
        marginBottom: "2px"
      }}>
        {label}
      </p>
      <p style={{
        fontSize: "0.95rem",
        color: theme.text,
        fontWeight: 600,
        margin: 0
      }}>
        {value || <span style={{ color: theme.textMuted }}>—</span>}
      </p>
    </div>
  </div>
);

/* ── section heading ── */
const SectionHead = ({ icon, title, accent = theme.primary }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  }}>
    <div style={{
      width: "40px",
      height: "40px",
      borderRadius: "12px",
      background: `${accent}15`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: accent,
      fontSize: "1rem"
    }}>
      {icon}
    </div>
    <h6 style={{
      fontSize: "1rem",
      fontWeight: 700,
      color: accent,
      margin: 0,
      letterSpacing: "0.5px",
      textTransform: "uppercase"
    }}>
      {title}
    </h6>
    <div style={{
      flex: 1,
      height: "2px",
      background: `linear-gradient(90deg, ${accent}40, transparent)`
    }} />
  </div>
);

const ShapeInvoices = () => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const cartItems = useSelector(s => s.cart);

  const [freelancer,    setFreelancer]    = useState(null);
  const [saving,        setSaving]        = useState(false);
  const [saved,         setSaved]         = useState(false);
  const [timeLeft,      setTimeLeft]      = useState(0);
  const [activeTab,     setActiveTab]     = useState("details");
  const [invoiceStatus, setInvoiceStatus] = useState("pending");
  const [statusLoading, setStatusLoading] = useState(false);
  const [userRole,      setUserRole]      = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        if (!auth?.user) return;

        const { data } = await supabase
          .from("freelancers").select("name,email,phone")
          .eq("id", auth.user.id).maybeSingle();
        setFreelancer(data || { name: "", email: "", phone: "" });

        // حدد دور المستخدم
        setUserRole(data ? "freelancer" : "client");

        // جيب status الفاتورة لو متحفظة
        const { data: inv } = await supabase
          .from("invoices").select("status")
          .eq("invoice_id", invoiceId).maybeSingle();
        if (inv?.status) setInvoiceStatus(inv.status);

      } catch {
        const raw = localStorage.getItem("user");
        if (raw) setFreelancer(JSON.parse(raw));
        setUserRole(localStorage.getItem("user_role") || "freelancer");
      }
    };
    load();
  }, [invoiceId]);

  if (!Array.isArray(cartItems)) {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.surface} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.text
      }}>
        <div className="text-center">
          <FaExclamationTriangle size={50} style={{ color: theme.danger, marginBottom: "20px" }} />
          <h4>Error loading invoices</h4>
        </div>
      </div>
    );
  }

  const invoice = cartItems.find(item => String(item.invoiceId) === invoiceId);
  if (!invoice) {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.surface} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ fontSize: "4rem" }}>📄</div>
        <h4 style={{ color: theme.text }}>Invoice not found</h4>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`,
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "12px 30px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: `0 10px 20px -5px ${theme.primaryDim}`
          }}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} /> Go Back
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (!invoice.dueDate) return;
    const end = new Date(invoice.dueDate).getTime();
    const tick = setInterval(() => {
      const diff = end - Date.now();
      setTimeLeft(diff <= 0 ? 0 : diff);
      if (diff <= 0) clearInterval(tick);
    }, 1000);
    return () => clearInterval(tick);
  }, [invoice.dueDate]);

  const d = Math.floor(timeLeft / 864e5);
  const h = Math.floor((timeLeft % 864e5) / 36e5);
  const m = Math.floor((timeLeft % 36e5) / 6e4);
  const s = Math.floor((timeLeft % 6e4) / 1000);

  const subtotal = Number(invoice.price) || 0;
  const tax = +(subtotal * 0.14).toFixed(2);
  const total = +(subtotal * 1.14).toFixed(2);

  const handleApproval = async (newStatus) => {
    setStatusLoading(true);
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ status: newStatus })
        .eq("invoice_id", invoiceId);

      if (error) throw error;
      setInvoiceStatus(newStatus);
      toast.success(
        newStatus === "approved"
          ? "✅ Invoice Approved!"
          : "❌ Invoice Rejected"
      );
    } catch (err) {
      toast.error("Failed to update status: " + err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) throw new Error("Not authenticated");

      const { error } = await supabase.from("invoices").insert({
        invoice_id: invoice.invoiceId,
        customer_name: invoice.customerName,
        customer_email: invoice.customerEmail,
        customer_phone: invoice.customerPhone,
        freelancer_name: freelancer?.name,
        freelancer_email: freelancer?.email,
        service_title: invoice.serviceTitle,
        price: subtotal,
        tax,
        total,
        payment_method: invoice.paymentMethod,
        invoice_date: invoice.invoiceDate || new Date().toISOString().split('T')[0],
        due_date: invoice.dueDate,
        tax_number: invoice.taxNumber,
        user_id: auth.user.id,
        client_id: invoice.client_id || null,   // ← ربط الفاتورة بالـ client
        status: "pending",
      });

      if (error) throw error;
      toast.success("Invoice saved successfully! ✅");
      setSaved(true);
    } catch (err) {
      toast.error("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, 210, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", 20, 25);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`#${invoice.invoiceId || "N/A"}`, 180, 25, { align: "right" });
      
      // Invoice details
      doc.setTextColor(79, 70, 229);
      doc.setFontSize(16);
      doc.text(invoice.serviceTitle || "Service", 20, 55);
      
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.5);
      doc.line(20, 60, 190, 60);
      
      // From/To
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(10);
      doc.text("FROM:", 20, 70);
      doc.text("TO:", 20, 85);
      
      doc.setTextColor(17, 24, 39);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(freelancer?.name || "Freelancer", 50, 70);
      doc.text(invoice.customerName || "Client", 50, 85);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      doc.text(freelancer?.email || "", 50, 75);
      doc.text(invoice.customerEmail || "", 50, 90);
      
      // Table
      const startY = 110;
      doc.setFillColor(249, 250, 251);
      doc.rect(20, startY, 170, 10, "F");
      
      doc.setTextColor(79, 70, 229);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Description", 24, startY + 7);
      doc.text("Amount", 186, startY + 7, { align: "right" });
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(17, 24, 39);
      
      const rows = [
        { label: invoice.serviceTitle || "Service", value: `${subtotal} EGP` },
        { label: "Subtotal", value: `${subtotal} EGP` },
        { label: "Tax (14%)", value: `${tax} EGP` }
      ];
      
      rows.forEach((row, i) => {
        const y = startY + 15 + (i * 8);
        doc.setFillColor(i % 2 === 0 ? 255 : 249, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 251);
        doc.rect(20, y - 4, 170, 8, "F");
        
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        doc.text(row.label, 24, y);
        doc.setTextColor(17, 24, 39);
        doc.text(row.value, 186, y, { align: "right" });
      });
      
      // Total
      const totalY = startY + 45;
      doc.setFillColor(79, 70, 229);
      doc.rect(20, totalY - 4, 170, 10, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("TOTAL", 24, totalY);
      doc.text(`${total} EGP`, 186, totalY, { align: "right" });
      
      // Footer
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text("Thank you for your business!", 105, 250, { align: "center" });
      doc.text(`Due: ${invoice.dueDate || "Not set"} · Payment: ${invoice.paymentMethod || "Not specified"}`, 105, 255, { align: "center" });
      
      doc.save(`Invoice_${invoice.invoiceId || "N/A"}.pdf`);
      toast.success("PDF downloaded successfully! 📄");
    } catch (err) {
      toast.error("PDF generation failed: " + err.message);
    }
  };

  const tabs = [
    { id: "details", label: "Details", icon: <FaInfoCircle /> },
    { id: "pricing", label: "Pricing", icon: <FaMoneyBillWave /> },
    { id: "terms", label: "Terms", icon: <FaShieldAlt /> },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.surface} 100%)`,
      fontFamily: "'Inter', sans-serif",
      paddingBottom: "60px"
    }}>
      {/* Top Bar */}
      <div style={{
        background: "white",
        borderBottom: `1px solid ${theme.border}`,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: `1px solid ${theme.border}`,
            color: theme.textLight,
            borderRadius: "12px",
            padding: "8px 18px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: 500,
            transition: "all 0.2s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = theme.primaryDim;
            e.currentTarget.style.borderColor = theme.primary;
            e.currentTarget.style.color = theme.primary;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.borderColor = theme.border;
            e.currentTarget.style.color = theme.textLight;
          }}
        >
          <FaArrowLeft /> Back
        </button>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: theme.primaryDim,
          padding: "6px 16px",
          borderRadius: "30px"
        }}>
          <FaLock style={{ color: theme.primary }} />
          <span style={{ color: theme.primary, fontWeight: 600, fontSize: "0.85rem" }}>
            SECURE INVOICE
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={generatePDF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: `1px solid ${theme.border}`,
              color: theme.textLight,
              borderRadius: "12px",
              padding: "8px 18px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = theme.primaryDim;
              e.currentTarget.style.borderColor = theme.primary;
              e.currentTarget.style.color = theme.primary;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.color = theme.textLight;
            }}
          >
            <FaFilePdf /> PDF
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving || saved}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: saved
                ? theme.secondary
                : `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`,
              border: "none",
              color: "white",
              borderRadius: "12px",
              padding: "8px 22px",
              cursor: saving || saved ? "not-allowed" : "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              opacity: saving || saved ? 0.8 : 1,
              boxShadow: `0 4px 12px ${theme.primaryDim}`,
              transition: "all 0.2s ease"
            }}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm" /> Saving...
              </>
            ) : saved ? (
              <>
                <FaCheckCircle /> Saved!
              </>
            ) : (
              <>
                <FaSave /> Save Invoice
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: "white",
        borderBottom: `1px solid ${theme.border}`,
        padding: "40px 0",
        marginBottom: "30px"
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`,
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  boxShadow: `0 10px 20px -5px ${theme.primaryDim}`
                }}>
                  <FaRegFileAlt size={35} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: theme.text,
                    marginBottom: "5px",
                    letterSpacing: "-0.02em"
                  }}>
                    #{invoice.invoiceId || "N/A"}
                  </h1>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <p style={{ color: theme.textLight, fontSize: "1.1rem", margin: 0 }}>
                      {invoice.serviceTitle}
                    </p>
                    {/* Status Badge */}
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "4px 14px", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 700,
                      background: invoiceStatus === "approved"
                        ? "rgba(16,185,129,0.12)"
                        : invoiceStatus === "rejected"
                        ? "rgba(239,68,68,0.12)"
                        : "rgba(245,158,11,0.12)",
                      color: invoiceStatus === "approved"
                        ? theme.secondary
                        : invoiceStatus === "rejected"
                        ? theme.danger
                        : theme.accent,
                      border: `1px solid ${
                        invoiceStatus === "approved" ? theme.secondary
                        : invoiceStatus === "rejected" ? theme.danger
                        : theme.accent}40`,
                    }}>
                      {invoiceStatus === "approved" ? "✅ Approved"
                        : invoiceStatus === "rejected" ? "❌ Rejected"
                        : "🕐 Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-md-4">
                  <div style={{
                    background: theme.primaryDim,
                    borderRadius: "16px",
                    padding: "15px",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "0.8rem", color: theme.textLight, marginBottom: "5px" }}>
                      Subtotal
                    </div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: theme.primary }}>
                      {subtotal.toLocaleString()} EGP
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div style={{
                    background: theme.accentDim,
                    borderRadius: "16px",
                    padding: "15px",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "0.8rem", color: theme.textLight, marginBottom: "5px" }}>
                      Tax (14%)
                    </div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: theme.accent }}>
                      {tax.toLocaleString()} EGP
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`,
                    borderRadius: "16px",
                    padding: "15px",
                    textAlign: "center",
                    color: "white"
                  }}>
                    <div style={{ fontSize: "0.8rem", opacity: 0.9, marginBottom: "5px" }}>
                      Total
                    </div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                      {total.toLocaleString()} EGP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Countdown Timer */}
        {invoice.dueDate && timeLeft > 0 && (
          <div style={{
            background: "white",
            border: `1px solid ${theme.border}`,
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                <FaClock style={{ color: theme.primary }} />
                <span style={{ color: theme.primary, fontWeight: 600 }}>Time Remaining</span>
              </div>
              <p style={{ color: theme.textLight, margin: 0 }}>
                Until due date · <strong>{invoice.dueDate}</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <TimeBox value={d} label="DAYS" />
              <TimeBox value={h} label="HOURS" />
              <TimeBox value={m} label="MINUTES" />
              <TimeBox value={s} label="SECONDS" />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "30px",
          background: "white",
          padding: "6px",
          borderRadius: "16px",
          border: `1px solid ${theme.border}`,
          width: "fit-content"
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.2s ease",
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`
                  : "transparent",
                color: activeTab === tab.id ? "white" : theme.textLight
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="row g-4">
                {/* Freelancer Card */}
                <div className="col-md-4">
                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    padding: "24px",
                    height: "100%",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}>
                    <SectionHead icon={<FaUser />} title="From" accent={theme.primary} />
                    <InfoRow icon={<FaUser />} label="Name" value={freelancer?.name} />
                    <InfoRow icon={<FaEnvelope />} label="Email" value={freelancer?.email} />
                    {freelancer?.phone && (
                      <InfoRow icon={<FaPhone />} label="Phone" value={freelancer.phone} />
                    )}
                  </div>
                </div>

                {/* Client Card */}
                <div className="col-md-4">
                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    padding: "24px",
                    height: "100%",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}>
                    <SectionHead icon={<FaUser />} title="To" accent={theme.secondary} />
                    <InfoRow icon={<FaUser />} label="Name" value={invoice.customerName} />
                    <InfoRow icon={<FaEnvelope />} label="Email" value={invoice.customerEmail} />
                    <InfoRow icon={<FaPhone />} label="Phone" value={invoice.customerPhone} />
                  </div>
                </div>

                {/* Invoice Info Card */}
                <div className="col-md-4">
                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    padding: "24px",
                    height: "100%",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}>
                    <SectionHead icon={<FaHashtag />} title="Invoice Info" accent={theme.accent} />
                    <InfoRow icon={<FaHashtag />} label="Invoice No." value={invoice.invoiceId} />
                    <InfoRow icon={<FaCalendarAlt />} label="Issue Date" value={invoice.invoiceDate || new Date().toLocaleDateString()} />
                    <InfoRow icon={<FaCalendarAlt />} label="Due Date" value={invoice.dueDate} />
                    <InfoRow icon={<FaCreditCard />} label="Payment" value={invoice.paymentMethod} />
                  </div>
                </div>
              </div>

              {/* Tasks Section */}
              <div style={{
                background: "white",
                border: `1px solid ${theme.border}`,
                borderRadius: "20px",
                padding: "24px",
                marginTop: "24px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <SectionHead icon={<FaTasks />} title="Scope of Work" accent={theme.primary} />
                <div className="row g-3">
                  {[
                    "User Interface Design",
                    "Homepage Development",
                    "Performance Testing",
                    "Responsive Layout Implementation",
                    "Code Review & Documentation",
                    "Final Delivery & Handoff",
                  ].map((task, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 16px",
                        background: theme.bg,
                        borderRadius: "12px",
                        border: `1px solid ${theme.border}`
                      }}>
                        <div style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          background: theme.primaryDim,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme.primary,
                          fontSize: "0.8rem"
                        }}>
                          <FaCheckCircle />
                        </div>
                        <span style={{ color: theme.text }}>{task}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "pricing" && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="row g-4">
                <div className="col-lg-8">
                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}>
                    <div style={{
                      padding: "20px 24px",
                      background: theme.primaryDim,
                      borderBottom: `1px solid ${theme.border}`,
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                      <span style={{ color: theme.primary, fontWeight: 700 }}>Service</span>
                      <span style={{ color: theme.primary, fontWeight: 700 }}>Amount</span>
                    </div>

                    {[
                      { label: invoice.serviceTitle || "Service", value: subtotal },
                      { label: "Subtotal", value: subtotal },
                      { label: "Tax (14%)", value: tax },
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px 24px",
                          borderBottom: i < 2 ? `1px solid ${theme.border}` : "none",
                          background: i % 2 === 0 ? "white" : theme.bg
                        }}
                      >
                        <span style={{ color: theme.textLight }}>{row.label}</span>
                        <span style={{ color: theme.text, fontWeight: 600 }}>
                          {row.value.toLocaleString()} EGP
                        </span>
                      </div>
                    ))}

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 24px",
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`,
                      color: "white"
                    }}>
                      <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Total (incl. Tax)</span>
                      <span style={{ fontWeight: 800, fontSize: "1.5rem" }}>
                        {total.toLocaleString()} EGP
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    padding: "24px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}>
                    <h6 style={{ color: theme.textLight, marginBottom: "20px", fontWeight: 600 }}>
                      Summary
                    </h6>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ color: theme.textLight }}>Subtotal</span>
                        <span style={{ color: theme.text, fontWeight: 600 }}>{subtotal.toLocaleString()} EGP</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ color: theme.textLight }}>Tax (14%)</span>
                        <span style={{ color: theme.text, fontWeight: 600 }}>{tax.toLocaleString()} EGP</span>
                      </div>
                      <div style={{
                        height: "1px",
                        background: theme.border,
                        margin: "15px 0"
                      }} />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: theme.primary, fontWeight: 700 }}>Total</span>
                        <span style={{ color: theme.primary, fontWeight: 800, fontSize: "1.2rem" }}>
                          {total.toLocaleString()} EGP
                        </span>
                      </div>
                    </div>

                    {invoice.paymentMethod && (
                      <div style={{
                        marginTop: "20px",
                        padding: "12px",
                        background: theme.primaryDim,
                        borderRadius: "12px",
                        textAlign: "center"
                      }}>
                        <small style={{ color: theme.textLight }}>Payment Method</small>
                        <div style={{ color: theme.primary, fontWeight: 600 }}>
                          <FaCreditCard style={{ marginRight: "5px" }} />
                          {invoice.paymentMethod}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "terms" && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="row g-4">
                <div className="col-md-6">
                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    padding: "28px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}>
                    <SectionHead icon={<FaMoneyBillWave />} title="Payment Terms" accent={theme.primary} />
                    
                    {[
                      { title: "Upfront Deposit", desc: "50% of total is due upon invoice creation to begin work.", icon: "💳" },
                      { title: "Final Payment", desc: "Remaining 50% due within 7 days from invoice issue date.", icon: "✅" },
                      { title: "Late Fee", desc: "2% per day added after the due date passes.", icon: "⚠️" },
                      { title: "Dispute Window", desc: "Any disputes must be raised within 3 days of delivery.", icon: "📋" },
                    ].map((term, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "15px",
                          marginBottom: i < 3 ? "20px" : 0,
                          padding: "15px",
                          background: theme.bg,
                          borderRadius: "12px",
                          border: `1px solid ${theme.border}`
                        }}
                      >
                        <div style={{ fontSize: "1.5rem" }}>{term.icon}</div>
                        <div>
                          <p style={{ color: theme.primary, fontWeight: 700, fontSize: "0.9rem", marginBottom: "4px" }}>
                            {term.title}
                          </p>
                          <p style={{ color: theme.textLight, fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
                            {term.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    padding: "28px",
                    marginBottom: "20px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}>
                    <SectionHead icon={<FaShieldAlt />} title="Legal Notice" accent={theme.secondary} />
                    <p style={{ color: theme.textLight, fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>
                      This invoice constitutes a legally binding agreement between the freelancer
                      and the client. Work delivery is subject to full payment compliance.
                      Intellectual property transfers only upon receipt of final payment.
                    </p>
                  </div>

                  <div style={{
                    background: `linear-gradient(135deg, ${theme.primaryDim}, white)`,
                    border: `1px solid ${theme.primary}40`,
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "20px"
                  }}>
                    <div style={{ fontSize: "3rem" }}>🏆</div>
                    <div>
                      <h6 style={{ color: theme.primary, fontWeight: 800, marginBottom: "5px" }}>
                        Quality Guaranteed
                      </h6>
                      <p style={{ color: theme.textLight, fontSize: "0.85rem", margin: 0 }}>
                        100% satisfaction or free revision within 14 days
                      </p>
                    </div>
                  </div>

                  <div style={{
                    background: "white",
                    border: `1px solid ${theme.border}`,
                    borderRadius: "20px",
                    padding: "20px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}>
                    {[
                      { icon: <FaShieldAlt />, label: "Secure", color: theme.primary },
                      { icon: <FaStar />, label: "5-Star", color: theme.accent },
                      { icon: <FaGlobe />, label: "Global", color: theme.secondary },
                      { icon: <FaLock />, label: "Encrypted", color: theme.purple },
                    ].map((badge, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 16px",
                          background: `${badge.color}10`,
                          border: `1px solid ${badge.color}30`,
                          borderRadius: "30px",
                          color: badge.color,
                          fontWeight: 600,
                          fontSize: "0.85rem"
                        }}
                      >
                        {badge.icon} {badge.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Action Bar */}
        <div style={{
          marginTop: "40px",
          padding: "24px 28px",
          background: "white",
          border: `1px solid ${theme.border}`,
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}>
          <div>
            <h5 style={{ color: theme.text, fontWeight: 700, marginBottom: "5px" }}>
              Ready to finalize?
            </h5>
            <p style={{ color: theme.textLight, margin: 0 }}>
              Save invoice to database or download as PDF
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>

            {/* Approval Buttons — للـ client بس */}
            {userRole === "client" && saved && invoiceStatus === "pending" && (
              <>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => handleApproval("approved")}
                  disabled={statusLoading}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: `linear-gradient(135deg, ${theme.secondary}, #059669)`,
                    border: "none", color: "white", borderRadius: "12px",
                    padding: "12px 28px", cursor: "pointer", fontWeight: 700,
                    fontSize: "0.95rem", boxShadow: "0 6px 16px rgba(16,185,129,0.3)",
                  }}>
                  {statusLoading ? <span className="spinner-border spinner-border-sm"/> : "✅"} Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => handleApproval("rejected")}
                  disabled={statusLoading}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: `linear-gradient(135deg, ${theme.danger}, #dc2626)`,
                    border: "none", color: "white", borderRadius: "12px",
                    padding: "12px 28px", cursor: "pointer", fontWeight: 700,
                    fontSize: "0.95rem", boxShadow: "0 6px 16px rgba(239,68,68,0.3)",
                  }}>
                  {statusLoading ? <span className="spinner-border spinner-border-sm"/> : "❌"} Reject
                </motion.button>
              </>
            )}

            {/* لو الـ status اتغير */}
            {invoiceStatus !== "pending" && (
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "12px",
                background: invoiceStatus === "approved"
                  ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                border: `1px solid ${invoiceStatus === "approved" ? theme.secondary : theme.danger}40`,
              }}>
                <span style={{
                  color: invoiceStatus === "approved" ? theme.secondary : theme.danger,
                  fontWeight: 700, fontSize: "0.95rem",
                }}>
                  {invoiceStatus === "approved" ? "✅ Client Approved" : "❌ Client Rejected"}
                </span>
              </div>
            )}
            <button
              onClick={generatePDF}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: `2px solid ${theme.primary}`,
                color: theme.primary,
                borderRadius: "12px",
                padding: "12px 28px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = theme.primaryDim;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "none";
              }}
            >
              <FaFilePdf /> Download PDF
            </button>
            
            <button
              onClick={handleSave}
              disabled={saving || saved}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: saved
                  ? theme.secondary
                  : `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`,
                border: "none",
                color: "white",
                borderRadius: "12px",
                padding: "12px 32px",
                cursor: saving || saved ? "not-allowed" : "pointer",
                fontWeight: 700,
                fontSize: "0.95rem",
                opacity: saving || saved ? 0.8 : 1,
                boxShadow: `0 8px 16px -4px ${theme.primaryDim}`,
                transition: "all 0.2s ease"
              }}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm" /> Saving...
                </>
              ) : saved ? (
                <>
                  <FaCheckCircle /> Saved!
                </>
              ) : (
                <>
                  <FaSave /> Save Invoice
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .spinner-border {
          width: 1rem;
          height: 1rem;
          border-width: 0.15em;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ShapeInvoices;