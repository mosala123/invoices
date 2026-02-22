// src/components/create invoices/CreateInvoices.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser, FaEnvelope, FaSearch, FaFilter,
  FaClock, FaCalendarAlt, FaMoneyBillWave, FaTag,
  FaAlignLeft, FaShoppingCart, FaPlusCircle, FaCheckCircle,
  FaExclamationCircle, FaBriefcase, FaStar,
  FaExclamationTriangle, FaCreditCard
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Addtocart } from "../rtk/slices/cartslise";
import { getAuthenticatedUser, supabase } from "../../supabaseClient";
import { toast } from 'react-toastify';
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
  card: "#ffffff",
  border: "#e5e7eb",
  text: "#111827",
  textLight: "#6b7280",
  textMuted: "#9ca3af",
};

const priorityConfig = {
  High: { bg: "#fee2e2", color: "#dc2626", border: "#fecaca", icon: "🔴", label: "High Priority" },
  Medium: { bg: "#fef3c7", color: "#d97706", border: "#fde68a", icon: "🟡", label: "Medium Priority" },
  Low: { bg: "#dcfce7", color: "#16a34a", border: "#bbf7d0", icon: "🟢", label: "Low Priority" },
};

const statusConfig = {
  Open: { bg: "#e0f2fe", color: "#0369a1", icon: "🟢", label: "Open" },
  "In Progress": { bg: "#fed7aa", color: "#9a3412", icon: "🟠", label: "In Progress" },
  Completed: { bg: "#dcfce7", color: "#166534", icon: "✅", label: "Completed" }
};

const CreateInvoices = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [freelancer, setFreelancer] = useState(null);
  const [stats, setStats] = useState({ total: 0, high: 0, medium: 0, low: 0 });

  // جلب بيانات الفريلانسر والمشاريع
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const authUser = await getAuthenticatedUser();
        if (!authUser) {
          toast.error("Please login first");
          return;
        }

        // جلب بيانات الفريلانسر
        const { data: fData } = await supabase
          .from("freelancers")
          .select("*")
          .eq("id", authUser.id)
          .maybeSingle();

        setFreelancer(fData || {
          id: authUser.id,
          email: authUser.email,
          name: authUser.user_metadata?.name || authUser.email
        });

        // جلب المشاريع المتاحة مع تضمين client_id
        const { data: projData } = await supabase
          .from("projects")
          .select("*")   // تأكد أن جدول projects يحتوي على client_id
          .order("created_at", { ascending: false });

        setProjects(projData || []);

        if (projData) {
          setStats({
            total: projData.length,
            high: projData.filter(p => p.priority_level === "High").length,
            medium: projData.filter(p => p.priority_level === "Medium").length,
            low: projData.filter(p => p.priority_level === "Low").length
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    init();

    const sub = supabase
      .channel("projects_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "projects" },
        (payload) => { setProjects(prev => [payload.new, ...prev]); toast.info("New project added!"); })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "projects" },
        (payload) => { setProjects(prev => prev.filter(p => p.id !== payload.old.id)); })
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  // فلترة المشاريع
  const filteredProjects = projects.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      p.project_name?.toLowerCase().includes(searchLower) ||
      p.client_name?.toLowerCase().includes(searchLower) ||
      p.category?.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower);
    const matchesFilter = !filterBy || p.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];

  // دالة إضافة المشروع للسلة (معدلة لضمان client_id و freelancer_id)
  const handleAddToCart = (project) => {
    try {
      console.log("🛒 Adding project to cart:", project);

      const exists = Array.isArray(cart) && cart.some(item =>
        String(item.id) === String(project.id) || String(item.project_id) === String(project.id)
      );

      if (exists) {
        toast.info(`⚠️ "${project.project_name}" is already in your cart!`);
        return;
      }

      // ✅ التأكد من وجود client_id (من المشروع)
      if (!project.client_id) {
        toast.error("Project missing client information");
        return;
      }

      const cartItem = {
        id: project.id,
        invoiceId: project.id,
        customerName: project.client_name || "Client",
        customerEmail: project.client_email || "",
        customerPhone: project.client_phone || "",
        client_id: project.client_id,                    // مهم للمحادثة
        serviceTitle: project.project_name,
        serviceDescription: project.description,
        price: Number(project.budget) || 0,
        deliveryTime: project.deadline,
        status: project.status || "Open",
        paymentMethod: project.payment_method || "",
        category: project.category,
        priority_level: project.priority_level,
        project_id: project.id,
        freelancerName: freelancer?.name || "",
        freelancerEmail: freelancer?.email || "",
        freelancerPhone: freelancer?.phone || "",
        freelancer_id: freelancer?.id,                   // مهم للمحادثة
        dueDate: project.deadline,
        invoiceDate: new Date().toISOString().split('T')[0]
      };

      console.log("📝 Cart item prepared:", cartItem);
      dispatch(Addtocart(cartItem));
      toast.success(`✅ "${project.project_name}" added to cart!`, { autoClose: 2000 });
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center">
          <div className="spinner-grow mb-3" style={{ color: "white", width: '4rem', height: '4rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 style={{ color: "white" }}>Loading Projects...</h5>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>Please wait while we fetch the latest projects</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      paddingBottom: "40px"
    }}>
      {/* زر السلة العائم */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000 }}
      >
        <Link to="/cartinvoices" style={{ textDecoration: "none" }}>
          <div style={{
            width: "65px", height: "65px",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
            position: "relative", transition: "all 0.3s ease"
          }}>
            <FaShoppingCart size={28} />
            {Array.isArray(cart) && cart.length > 0 && (
              <span style={{
                position: "absolute", top: "-5px", right: "-5px",
                background: "#ef4444", color: "white", borderRadius: "50%",
                width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: "bold", border: "2px solid white", boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
              }}>
                {cart.length}
              </span>
            )}
          </div>
        </Link>
      </motion.div>

      <div className="container py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "white", borderRadius: "30px", padding: "35px",
            boxShadow: "0 10px 30px -10px rgba(79, 70, 229, 0.2)",
            border: "1px solid rgba(79, 70, 229, 0.1)", marginBottom: "30px"
          }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
                <div style={{
                  width: "90px", height: "90px",
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", boxShadow: "0 15px 25px -8px rgba(79, 70, 229, 0.4)"
                }}>
                  <FaUser size={35} />
                </div>
                <div>
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{
                      background: "rgba(79, 70, 229, 0.1)", color: "#4f46e5",
                      padding: "8px 18px", borderRadius: "40px", fontSize: "0.9rem", fontWeight: "600"
                    }}>
                      👋 Welcome Back, Freelancer!
                    </span>
                  </div>
                  <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "800", marginBottom: "8px", color: "#111827", letterSpacing: "-0.02em" }}>
                    {freelancer?.name || 'Freelancer'}
                  </h1>
                  <p style={{ color: "#6b7280", fontSize: "1.1rem", marginBottom: "15px" }}>
                    Browse and manage client projects, create professional invoices
                  </p>
                  {freelancer && (
                    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                      <span style={{
                        background: "#f3f4f6", padding: "10px 20px", borderRadius: "40px",
                        fontSize: "0.95rem", color: "#4b5563", display: "inline-flex", alignItems: "center",
                        gap: "10px", border: "1px solid #e5e7eb"
                      }}>
                        <FaEnvelope style={{ color: "#4f46e5" }} /> {freelancer.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* إحصائيات سريعة */}
            <div className="col-lg-4 mt-4">
              <div style={{
                background: "#f9fafb", borderRadius: "20px", padding: "20px",
                display: "flex", gap: "15px", border: "1px solid #e5e7eb"
              }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    width: "50px", height: "50px", background: "rgba(79, 70, 229, 0.1)",
                    borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 10px", color: "#4f46e5", fontSize: "20px"
                  }}>
                    <FaBriefcase />
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>{stats.total}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Total</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    width: "50px", height: "50px", background: "#fee2e2",
                    borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 10px", color: "#dc2626", fontSize: "20px"
                  }}>
                    <FaExclamationTriangle />
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>{stats.high}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>High</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    width: "50px", height: "50px", background: "#fef3c7",
                    borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 10px", color: "#d97706", fontSize: "20px"
                  }}>
                    <FaStar />
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>{stats.medium}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Medium</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* البحث والتصفية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "white", borderRadius: "20px", padding: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb", marginBottom: "25px"
          }}
        >
          <div className="row g-3">
            <div className="col-md-7">
              <div style={{ position: "relative" }}>
                <FaSearch style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "1.1rem", zIndex: 1 }} />
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="🔍 Search by project name, client, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: "48px", borderRadius: "15px", border: "2px solid #e5e7eb", fontSize: "1rem" }}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div style={{ position: "relative" }}>
                <FaFilter style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "1.1rem", zIndex: 1 }} />
                <select
                  className="form-select form-select-lg"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  style={{ paddingLeft: "48px", borderRadius: "15px", border: "2px solid #e5e7eb", fontSize: "1rem", cursor: "pointer" }}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* عدد النتائج */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", padding: "0 5px" }}>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", margin: 0 }}>
            Showing <strong style={{ color: "#4f46e5", fontSize: "1.1rem" }}>{filteredProjects.length}</strong> projects
            {searchTerm && <span> for "<em style={{ background: "#f3f4f6", padding: "2px 8px", borderRadius: "12px", marginLeft: "5px" }}>{searchTerm}</em>"</span>}
          </p>
          {(searchTerm || filterBy) && (
            <button
              onClick={() => { setSearchTerm(""); setFilterBy(""); }}
              style={{
                background: "none", border: "1px solid #e5e7eb", borderRadius: "30px",
                padding: "8px 20px", color: "#6b7280", fontSize: "0.9rem", cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <FaExclamationCircle style={{ marginRight: "5px" }} /> Clear Filters
            </button>
          )}
        </div>

        {/* شبكة المشاريع */}
        <div className="row g-4">
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-12">
                <div style={{ background: "white", borderRadius: "30px", padding: "80px 20px", textAlign: "center", border: "2px dashed #e5e7eb" }}>
                  <div style={{ fontSize: "5rem", marginBottom: "20px", opacity: 0.5 }}>📭</div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 600, color: "#111827", marginBottom: "10px" }}>
                    {projects.length === 0 ? "No Projects Yet" : "No Matching Projects"}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}>
                    {projects.length === 0 ? "Waiting for clients to add projects..." : "Try adjusting your search or filter criteria"}
                  </p>
                </div>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => {
                const priority = priorityConfig[project.priority_level] || priorityConfig.Low;
                const status = statusConfig[project.status] || statusConfig.Open;
                const isInCart = Array.isArray(cart) && cart.some(item =>
                  String(item.id) === String(project.id) || String(item.project_id) === String(project.id)
                );

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="col-lg-4 col-md-6"
                  >
                    <div style={{
                      background: "white", borderRadius: "24px", overflow: "hidden",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb",
                      transition: "all 0.3s ease", height: "100%", position: "relative"
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 20px 30px -10px rgba(79, 70, 229, 0.3)";
                        e.currentTarget.style.borderColor = "#4f46e5";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
                        e.currentTarget.style.borderColor = "#e5e7eb";
                      }}
                    >
                      {/* رأس البطاقة - الأولوية والحالة */}
                      <div style={{
                        padding: "20px 20px 15px", borderBottom: "1px solid #f3f4f6",
                        display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: priority.color, boxShadow: `0 0 0 2px ${priority.bg}` }}></span>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: priority.color }}>
                            {priority.icon} {project.priority_level || 'Normal'}
                          </span>
                        </div>
                        <div style={{ background: status.bg, color: status.color, padding: "5px 12px", borderRadius: "30px", fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                          <span>{status.icon}</span>
                          <span>{project.status || 'Open'}</span>
                        </div>
                      </div>

                      {/* معلومات العميل */}
                      <div style={{ padding: "20px 20px 15px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "45px", height: "45px",
                            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontSize: "18px", fontWeight: "bold"
                          }}>
                            {project.client_name?.charAt(0).toUpperCase() || 'C'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h6 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>
                              {project.client_name || 'Client Name'}
                            </h6>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#6b7280", fontSize: "0.8rem" }}>
                              <FaEnvelope size={11} />
                              <span>{project.client_email || 'email@example.com'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* تفاصيل المشروع */}
                      <div style={{ padding: "0 20px 15px" }}>
                        <h5 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827", marginBottom: "10px", lineHeight: 1.4 }}>
                          {project.project_name || 'Project Title'}
                        </h5>

                        {project.category && (
                          <div style={{ marginBottom: "12px" }}>
                            <span style={{ background: "#f3f4f6", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", color: "#4b5563", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <FaTag size={10} /> {project.category}
                            </span>
                          </div>
                        )}

                        <p style={{
                          color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "15px",
                          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis"
                        }}>
                          <FaAlignLeft style={{ color: "#4f46e5", marginRight: "6px", display: "inline", verticalAlign: "middle", opacity: 0.7 }} />
                          {project.description || 'No description provided'}
                        </p>

                        {/* معلومات إضافية */}
                        <div style={{ background: "#f9fafb", borderRadius: "16px", padding: "15px", marginBottom: "15px", border: "1px solid #f3f4f6" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", borderBottom: "1px dashed #e5e7eb", marginBottom: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <FaCalendarAlt style={{ color: "#4f46e5", fontSize: "0.9rem" }} />
                              <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>Deadline</span>
                            </div>
                            <strong style={{ color: "#111827", fontSize: "0.9rem" }}>{project.deadline || 'Not set'}</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <FaMoneyBillWave style={{ color: "#10b981", fontSize: "0.9rem" }} />
                              <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>Budget</span>
                            </div>
                            <strong style={{ color: "#10b981", fontSize: "1.1rem" }}>{project.budget ? `${project.budget} EGP` : '—'}</strong>
                          </div>
                        </div>

                        {project.payment_method && (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "#f3f4f6", borderRadius: "10px", marginBottom: "15px" }}>
                            <FaCreditCard style={{ color: "#4f46e5", fontSize: "0.9rem" }} />
                            <span style={{ color: "#4b5563", fontSize: "0.85rem" }}>Payment:</span>
                            <strong style={{ color: "#111827", fontSize: "0.85rem", marginLeft: "auto" }}>{project.payment_method}</strong>
                          </div>
                        )}

                        {/* تذييل البطاقة */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #e5e7eb" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <FaClock style={{ color: "#9ca3af", fontSize: "0.8rem" }} />
                            <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                              {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          <button
                            onClick={() => handleAddToCart(project)}
                            disabled={isInCart}
                            style={{
                              padding: "10px 20px", border: "none", borderRadius: "30px",
                              fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px",
                              cursor: isInCart ? "not-allowed" : "pointer",
                              background: isInCart ? "#10b981" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                              color: "white", transition: "all 0.2s ease", opacity: isInCart ? 0.9 : 1,
                              boxShadow: isInCart ? "none" : "0 4px 10px rgba(79, 70, 229, 0.3)"
                            }}
                          >
                            {isInCart ? <><FaCheckCircle /> Added</> : <><FaPlusCircle /> Add to Cart</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoices;
