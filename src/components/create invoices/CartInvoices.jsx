// src/components/create invoices/CartInvoices.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash, FaFileInvoice, FaArrowRight, FaFilter,
  FaShoppingCart, FaUser, FaEnvelope, FaClock,
  FaMoneyBillWave, FaTag, FaCheckCircle, FaExclamationCircle,
  FaPlusCircle, FaEye, FaCalendarAlt, FaCreditCard, FaComments
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Deletcart } from "../rtk/slices/cartslise";
import { Link, useNavigate } from "react-router-dom";
import ChatWidget from "../chat/ChatWidget";
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = {
  primary: "#4f46e5",
  primaryLight: "#818cf8",
  primaryDim: "rgba(79, 70, 229, 0.1)",
  secondary: "#10b981",
  secondaryDim: "rgba(16, 185, 129, 0.1)",
  accent: "#f59e0b",
  accentDim: "rgba(245, 158, 11, 0.1)",
  danger: "#ef4444",
  dangerDim: "rgba(239, 68, 68, 0.1)",
  bg: "#f9fafb",
  surface: "#ffffff",
  border: "#e5e7eb",
  text: "#111827",
  textLight: "#6b7280",
  textMuted: "#9ca3af",
};

const statusConfig = {
  Open: { bg: "#e0f2fe", color: "#0369a1", icon: "🟢", label: "Open" },
  "In Progress": { bg: "#fed7aa", color: "#9a3412", icon: "🟠", label: "In Progress" },
  Completed: { bg: "#dcfce7", color: "#166534", icon: "✅", label: "Completed" },
};

const CartInvoices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeChatItem, setActiveChatItem] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Invoice?", text: "You won't be able to revert this!", icon: "warning",
      showCancelButton: true, confirmButtonColor: theme.danger, cancelButtonColor: theme.textLight,
      confirmButtonText: "Yes, delete it", cancelButtonText: "Cancel",
    }).then((r) => {
      if (r.isConfirmed) {
        dispatch(Deletcart(id));
        Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  const handleDeleteSelected = () => {
    if (!selectedItems.length) return;
    Swal.fire({
      title: `Delete ${selectedItems.length} Items?`, text: "This action cannot be undone!", icon: "warning",
      showCancelButton: true, confirmButtonColor: theme.danger, cancelButtonColor: theme.textLight,
      confirmButtonText: "Yes, delete all",
    }).then((r) => {
      if (r.isConfirmed) {
        selectedItems.forEach(id => dispatch(Deletcart(id)));
        setSelectedItems([]);
        Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  const toggleSelectItem = (id) =>
    setSelectedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filteredCart = filterStatus === "All" ? cart : cart.filter(i => i.status === filterStatus);

  const toggleSelectAll = () =>
    setSelectedItems(selectedItems.length === filteredCart.length ? [] : filteredCart.map(i => i.id));

  const getStatusStyle = (s) => statusConfig[s] || { bg: "#f3f4f6", color: theme.textLight, icon: "⚪", label: s || "Unknown" };

  // تعديل عرض الأرقام بمنزلتين عشريتين
  const totalAmount = filteredCart.reduce((s, i) => s + (Number(i.price) || 0), 0);
  const totalWithTax = totalAmount * 1.14;

  const formatMoney = (value) => {
    return Number(value).toFixed(2) + ' EGP';
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg,#f9fafb 0%,#f3f4f6 100%)",
      fontFamily: "'Segoe UI',sans-serif", padding: "40px 0 100px"
    }}>
      <div className="container-fluid px-4">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
          className="row align-items-center g-4 mb-4"
          style={{
            background: "#fff", borderRadius: 24, padding: "24px 28px",
            boxShadow: "0 8px 30px rgba(79,70,229,0.1)", border: "1px solid rgba(79,70,229,0.08)"
          }}>
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-4">
              <div style={{
                width: 64, height: 64, borderRadius: 18, flexShrink: 0,
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", boxShadow: "0 10px 24px rgba(79,70,229,0.35)"
              }}>
                <FaShoppingCart size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 4, color: theme.text }}>
                  Invoice Cart
                </h2>
                <p style={{ color: theme.textLight, margin: 0 }}>
                  Manage selected projects and generate invoices
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row g-2">
              {[
                { label: "Items", val: filteredCart.length, color: theme.primary },
                { label: "Subtotal", val: formatMoney(totalAmount), color: theme.secondary },
              ].map(s => (
                <div key={s.label} className="col-6">
                  <div style={{ background: "#f9fafb", borderRadius: 14, padding: "14px", border: `1px solid ${theme.border}`, textAlign: "center" }}>
                    <p style={{ fontSize: "0.75rem", color: theme.textLight, margin: "0 0 4px" }}>{s.label}</p>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FILTER BAR */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4"
          style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", border: `1px solid ${theme.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <input type="checkbox"
                checked={selectedItems.length === filteredCart.length && filteredCart.length > 0}
                onChange={toggleSelectAll}
                style={{ width: 18, height: 18, cursor: "pointer", accentColor: theme.primary }} />
              <span style={{ color: theme.textLight, fontSize: "0.9rem" }}>Select All</span>
            </div>
            <AnimatePresence>
              {selectedItems.length > 0 && (
                <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  onClick={handleDeleteSelected}
                  style={{
                    background: theme.dangerDim, border: `1px solid ${theme.danger}`,
                    color: theme.danger, padding: "7px 14px", borderRadius: 50,
                    fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center",
                    gap: 7, cursor: "pointer"
                  }}>
                  <FaTrash /> Delete ({selectedItems.length})
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaFilter style={{ color: theme.textLight }} />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="form-select form-select-sm rounded-pill"
              style={{ width: "auto", minWidth: 140, border: `2px solid ${theme.border}` }}>
              <option value="All">All Status</option>
              <option value="Open">🟢 Open</option>
              <option value="In Progress">🟠 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        </motion.div>

        {/* TABLE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{
            background: "#fff", borderRadius: 24, overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.07)", border: `1px solid ${theme.border}`,
            marginBottom: 24
          }}>

          {filteredCart.length === 0 ? (
            <div style={{ padding: "80px 20px", textAlign: "center" }}>
              <div style={{
                width: 100, height: 100, borderRadius: "50%", background: "#f3f4f6",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px"
              }}>
                <FaShoppingCart size={40} style={{ color: theme.textMuted }} />
              </div>
              <h4 style={{ color: theme.text, marginBottom: 8 }}>Your cart is empty</h4>
              <p style={{ color: theme.textLight, marginBottom: 24 }}>
                Browse projects to add items to your invoice cart.
              </p>
              <Link to="/create-invoice">
                <button style={{
                  background: `linear-gradient(135deg,${theme.primary},#7c3aed)`,
                  border: "none", color: "#fff", padding: "13px 36px", borderRadius: 50,
                  fontSize: "1rem", fontWeight: 600, display: "inline-flex",
                  alignItems: "center", gap: 10, cursor: "pointer"
                }}>
                  <FaPlusCircle /> Browse Projects
                </button>
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ background: "#f9fafb", borderBottom: `2px solid ${theme.border}` }}>
                  <tr>
                    <th style={{ padding: "18px 16px", width: 40 }}>
                      <input type="checkbox"
                        checked={selectedItems.length === filteredCart.length}
                        onChange={toggleSelectAll}
                        style={{ width: 17, height: 17, accentColor: theme.primary }} />
                    </th>
                    {["#", "Client", "Project", "Deadline", "Budget", "Status", "Actions"].map(h => (
                      <th key={h} style={{
                        padding: "18px 16px", color: theme.textLight,
                        fontWeight: 600, fontSize: "0.82rem", textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredCart.map((item, idx) => {
                      const st = getStatusStyle(item.status);
                      const isSel = selectedItems.includes(item.id);
                      return (
                        <motion.tr key={item.id || idx}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }} transition={{ delay: idx * 0.04 }}
                          style={{
                            borderBottom: `1px solid #f9fafb`,
                            background: isSel ? "rgba(79,70,229,0.04)" : "#fff",
                            transition: "background .2s"
                          }}
                          onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = "#f9fafb"; }}
                          onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = "#fff"; }}>

                          <td style={{ padding: "16px" }}>
                            <input type="checkbox" checked={isSel}
                              onChange={() => toggleSelectItem(item.id)}
                              style={{ width: 17, height: 17, accentColor: theme.primary }} />
                          </td>

                          <td style={{ padding: "16px", fontWeight: 600, color: theme.textMuted, fontSize: "0.88rem" }}>{idx + 1}</td>

                          <td style={{ padding: "16px" }}>
                            <div className="d-flex align-items-center gap-3">
                              <div style={{
                                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                background: theme.primaryDim, display: "flex", alignItems: "center",
                                justifyContent: "center", color: theme.primary
                              }}>
                                <FaUser size={15} />
                              </div>
                              <div>
                                <p style={{ fontWeight: 600, color: theme.text, margin: "0 0 2px", fontSize: "0.9rem" }}>
                                  {item.customerName || "—"}
                                </p>
                                <p style={{ fontSize: "0.75rem", color: theme.textLight, margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                                  <FaEnvelope size={9} /> {item.customerEmail || "—"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: "16px" }}>
                            <p style={{ fontWeight: 600, color: theme.text, margin: "0 0 4px", fontSize: "0.9rem" }}>
                              {item.serviceTitle || "Untitled"}
                            </p>
                            {item.category && (
                              <span style={{
                                background: "#f3f4f6", padding: "3px 9px", borderRadius: 50,
                                fontSize: "0.7rem", color: theme.textLight, display: "inline-flex", alignItems: "center", gap: 3
                              }}>
                                <FaTag size={8} /> {item.category}
                              </span>
                            )}
                          </td>

                          <td style={{ padding: "16px" }}>
                            <div className="d-flex align-items-center gap-2">
                              <FaCalendarAlt size={11} style={{ color: theme.textLight }} />
                              <span style={{ color: theme.text, fontSize: "0.88rem" }}>
                                {item.deliveryTime || "Not set"}
                              </span>
                            </div>
                          </td>

                          <td style={{ padding: "16px" }}>
                            <p style={{ fontWeight: 700, color: theme.secondary, margin: "0 0 2px", fontSize: "1rem" }}>
                              {formatMoney(item.price)}
                            </p>
                            {item.paymentMethod && (
                              <p style={{ fontSize: "0.7rem", color: theme.textLight, margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                                <FaCreditCard size={8} /> {item.paymentMethod}
                              </p>
                            )}
                          </td>

                          <td style={{ padding: "16px" }}>
                            <span style={{ background: st.bg, color: st.color, padding: "5px 12px", borderRadius: 50, fontSize: "0.78rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                              {st.icon} {st.label}
                            </span>
                          </td>

                          <td style={{ padding: "16px" }}>
                            <div className="d-flex align-items-center gap-2">
                              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                onClick={() => navigate(`/invoice/${item.invoiceId}`)}
                                style={{
                                  background: theme.primary, border: "none", color: "#fff",
                                  padding: "8px 14px", borderRadius: 10, fontSize: "0.8rem",
                                  fontWeight: 600, display: "flex", alignItems: "center", gap: 5,
                                  cursor: "pointer", boxShadow: "0 3px 8px rgba(79,70,229,0.28)"
                                }}>
                                <FaEye /> View
                              </motion.button>

                              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                onClick={() => setActiveChatItem(
                                  activeChatItem?.id === item.id ? null : item
                                )}
                                style={{
                                  background: activeChatItem?.id === item.id
                                    ? `linear-gradient(135deg,${theme.primary},#7c3aed)`
                                    : "rgba(79,70,229,0.08)",
                                  border: "none",
                                  color: activeChatItem?.id === item.id ? "#fff" : theme.primary,
                                  padding: "8px 14px", borderRadius: 10, fontSize: "0.8rem",
                                  fontWeight: 600, display: "flex", alignItems: "center", gap: 5,
                                  cursor: "pointer", transition: "all .2s",
                                }}>
                                <FaComments /> Chat
                              </motion.button>

                              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                onClick={() => handleDelete(item.id)}
                                style={{
                                  background: theme.dangerDim, border: "none",
                                  color: theme.danger, padding: "8px 10px", borderRadius: 10,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  cursor: "pointer"
                                }}>
                                <FaTrash size={13} />
                              </motion.button>
                            </div>
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

        {/* SUMMARY */}
        {filteredCart.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="row g-3 align-items-center"
            style={{
              background: "#fff", borderRadius: 20, padding: "20px 24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: `1px solid ${theme.border}`
            }}>
            <div className="col-lg-8">
              <div className="row g-3">
                {[
                  { label: "Subtotal", val: formatMoney(totalAmount), color: theme.text },
                  { label: "Tax (14%)", val: formatMoney(totalAmount * 0.14), color: theme.accent },
                  { label: "Total w/ Tax", val: formatMoney(totalWithTax), color: theme.secondary, highlight: true },
                ].map(s => (
                  <div key={s.label} className="col-md-4">
                    <div style={{
                      padding: "14px 16px", borderRadius: 14,
                      background: s.highlight ? "rgba(16,185,129,0.08)" : "#f9fafb",
                      border: `1px solid ${s.highlight ? theme.secondary : theme.border}`
                    }}>
                      <p style={{ fontSize: "0.75rem", color: theme.textLight, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</p>
                      <p style={{ fontSize: "1.1rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex gap-2 justify-content-end">
                <button onClick={() => navigate(-1)}
                  style={{
                    background: "none", border: `2px solid ${theme.border}`, color: theme.textLight,
                    padding: "11px 22px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 7, cursor: "pointer"
                  }}>
                  <FaArrowRight /> Back
                </button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => navigate(`/invoice/${filteredCart[0]?.invoiceId}`)}
                  style={{
                    background: `linear-gradient(135deg,${theme.primary},#7c3aed)`,
                    border: "none", color: "#fff", padding: "11px 24px", borderRadius: 12,
                    fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center",
                    gap: 7, cursor: "pointer", boxShadow: "0 6px 18px rgba(79,70,229,0.35)"
                  }}>
                  <FaFileInvoice /> Generate Invoice
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* CHAT WIDGET */}
      {activeChatItem && (
        <ChatWidget
          projectId={activeChatItem.project_id || activeChatItem.invoiceId}
          projectName={activeChatItem.serviceTitle}
          clientName={activeChatItem.customerName}
          clientId={activeChatItem.client_id}
          freelancerId={activeChatItem.freelancer_id}
          clientEmail={activeChatItem.customerEmail}
          clientPhone={activeChatItem.customerPhone}
          position="bottom-right"
        />
      )}
    </div>
  );
};

export default CartInvoices;