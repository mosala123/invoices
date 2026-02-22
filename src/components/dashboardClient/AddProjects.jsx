import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

const PRIORITY = {
  High:   { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", dot: "#dc2626", label: "🔴 High"   },
  Medium: { bg: "#fffbeb", color: "#d97706", border: "#fde68a", dot: "#d97706", label: "🟡 Medium" },
  Low:    { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", dot: "#16a34a", label: "🟢 Low"    },
};

const EMPTY = {
  project_name:"", deadline:"", category:"", expected_duration:"",
  priority_level:"", service_type:"", payment_method:"", description:"", budget:"",
};

/* ── SVG Icons ── */
const Ico = {
  edit:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>,
  trash:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  eye:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  plus:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  check:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>,
  close:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  calendar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  money:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  clock:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  user:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  mail:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  briefcase:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="18" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  tag:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
};

const Label = ({ children, required, icon }) => (
  <label className="form-label d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569" }}>
    {icon && <span style={{ color: "#6366f1" }}>{icon}</span>}
    {children}
    {required && <span className="text-danger" style={{ fontSize: "1.2rem", lineHeight: 1 }}>*</span>}
  </label>
);

const Chip = ({ icon, label, value, bg = "#f8fafc", color = "#475569" }) => value ? (
  <span className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ background: bg, color, border: "1px solid #e2e8f0", fontSize: "0.85rem", fontWeight: 500 }}>
    {icon} {value}
  </span>
) : null;

const AddProjects = () => {
  const [formData, setFormData] = useState(EMPTY);
  const [projectsList, setProjectsList] = useState([]);
  const [clientUser, setClientUser] = useState(null);
  const [error, setError] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [openCards, setOpenCards] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  /* fetch user */
  const loadUser = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) { navigate("/loginclient"); return; }
    const { data } = await supabase.from("clients").select("*").eq("id", auth.user.id).single();
    if (data) setClientUser(data);
    else setClientUser({ id: auth.user.id, email: auth.user.email, name: auth.user.user_metadata?.name || auth.user.email });
  };

  /* fetch projects */
  const loadProjects = async () => {
    setFetching(true);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return;
    const { data, error } = await supabase
      .from("projects").select("*").eq("client_id", auth.user.id)
      .order("created_at", { ascending: false });
    if (!error) setProjectsList(data || []);
    setFetching(false);
  };

  useEffect(() => { loadUser(); loadProjects(); }, []);

  const hc = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  /* submit */
  const handleSubmit = async e => {
    e.preventDefault(); setError("");
    if (!formData.project_name || !formData.deadline || !formData.category || !formData.description) {
      setError("Please fill in all required fields."); return;
    }
    setLoading(true);
    try {
      if (editingProject) {
        const result = await Swal.fire({
          title: 'Confirm Update',
          text: 'Are you sure you want to update this project?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#6366f1',
          cancelButtonColor: '#ef4444',
          confirmButtonText: 'Yes, update',
          cancelButtonText: 'Cancel',
          reverseButtons: true
        });

        if (!result.isConfirmed) {
          setLoading(false);
          return;
        }

        const { error } = await supabase.from("projects").update({ ...formData }).eq("id", editingProject.id);
        if (error) throw error;
        setProjectsList(p => p.map(x => x.id === editingProject.id ? { ...x, ...formData } : x));
        
        await Swal.fire({
          title: 'Updated!',
          text: 'Project has been updated successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        
        setEditingProject(null);
      } else {
        const { data: auth } = await supabase.auth.getUser();
        const { data, error } = await supabase.from("projects")
          .insert({ ...formData, client_id: auth.user.id, client_name: clientUser?.name, client_email: clientUser?.email })
          .select().single();
        if (error) throw error;
        setProjectsList(p => [data, ...p]);
        
        await Swal.fire({
          title: 'Success!',
          text: 'Project has been added successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
      setFormData(EMPTY);
    } catch (err) {
      setError(err.message);
      Swal.fire({
        title: 'Error!',
        text: err.message || "Something went wrong.",
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally { setLoading(false); }
  };

  /* delete with confirmation */
  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this project? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) { 
      setProjectsList(p => p.filter(x => x.id !== id)); 
      
      await Swal.fire({
        title: 'Deleted!',
        text: 'Project has been deleted successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    }
  };

  const startEdit = proj => {
    setEditingProject(proj);
    setFormData({ 
      project_name: proj.project_name, 
      deadline: proj.deadline, 
      category: proj.category,
      expected_duration: proj.expected_duration || "", 
      priority_level: proj.priority_level || "",
      service_type: proj.service_type || "", 
      payment_method: proj.payment_method || "",
      description: proj.description, 
      budget: proj.budget || "" 
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setEditingProject(null); setFormData(EMPTY); setError(""); };
  const toggleCard = id => setOpenCards(p => ({ ...p, [id]: !p[id] }));

  const initial = (clientUser?.name || "U")[0].toUpperCase();
  const isEditing = !!editingProject;

  /* stats */
  const stats = [
    { value: projectsList.length, label: "Total Projects", icon: "📊", color: "#6366f1", bg: "#eef2ff" },
    { value: projectsList.filter(p => p.priority_level === "High").length, label: "High Priority", icon: "🔥", color: "#dc2626", bg: "#fef2f2" },
    { value: projectsList.filter(p => p.priority_level === "Medium").length, label: "Medium Priority", icon: "⚡", color: "#d97706", bg: "#fffbeb" },
    { value: projectsList.filter(p => p.priority_level === "Low").length, label: "Low Priority", icon: "💧", color: "#16a34a", bg: "#f0fdf4" },
  ];

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .form-control:focus, .form-select:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 0.25rem rgba(99,102,241,0.25) !important;
        }
        
        .project-card {
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease;
        }
        
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(99,102,241,0.15) !important;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .stat-card {
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .action-btn {
          transition: all 0.2s ease;
        }
        
        .action-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>

      {/* Hero Section */}
      <div className="position-relative" style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%)",
        padding: "48px 0 80px",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div className="position-absolute rounded-circle" style={{
          top: -100,
          right: -50,
          width: 300,
          height: 300,
          background: "rgba(255,255,255,0.1)",
          pointerEvents: "none",
        }} />
        <div className="position-absolute rounded-circle" style={{
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          background: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }} />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center justify-content-between g-4 mb-4">
            {/* User Info */}
            <div className="col-12 col-lg-6">
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{
                  width: "70px",
                  height: "70px",
                  background: "rgba(255,255,255,0.2)",
                  border: "3px solid rgba(255,255,255,0.5)",
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                }}>
                  {initial}
                </div>
                <div>
                  <p className="text-white mb-1" style={{ fontSize: "14px" }}>
                    Welcome back! 👋
                  </p>
                  <h1 className="text-white mb-1" style={{ fontSize: "28px", fontWeight: "700" }}>
                    {clientUser?.name || "Loading..."}
                  </h1>
                  <div className="d-flex align-items-center gap-3 text-white">
                    <span className="d-flex align-items-center gap-2">
                      {Ico.mail} {clientUser?.email || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="col-12 col-lg-6">
              <div className="row g-2">
                {stats.map((stat, index) => (
                  <div key={index} className="col-6 col-sm-3">
                    <div className="stat-card p-3 text-center rounded-4" style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}>
                      <div className="fs-3 mb-1">{stat.icon}</div>
                      <div className="fs-4 fw-bold text-white lh-1">{stat.value}</div>
                      <div className="small text-white-50 fw-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="position-absolute bottom-0 start-0 end-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "60px", display: "block" }}>
            <path d="M0,20 C360,50 1080,10 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ marginTop: "-30px" }}>
        
        {/* Form Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="bg-white rounded-4 shadow-lg overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.1)" }}>
              {/* Form Header */}
              <div className="p-4" style={{
                background: isEditing 
                  ? "linear-gradient(135deg, #f97316, #ef4444)"
                  : "linear-gradient(135deg, #4f46e5, #8b5cf6)",
              }}>
                <div className="d-flex align-items-center justify-content-between ">
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-2">{isEditing ? "✏️" : "🚀"}</span>
                    <div>
                      <h2 className="text-white mb-1 fs-5 fw-bold pt-3 ">
                        {isEditing ? "Edit Project" : "Create New Project"}
                      </h2>
                      <p className="text-white-50 mb-0 small">
                        {isEditing ? "Update your project details below" : "Fill in the details to get started"}
                      </p>
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      onClick={cancelEdit}
                      className="btn btn-light bg-white bg-opacity-20 border-0 rounded-3 p-2"
                      style={{ color: "#fff" }}
                    >
                      {Ico.close}
                    </button>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mx-4 mt-4 p-3 rounded-3" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-5">⚠️</span>
                    {error}
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4">
                <div className="row g-4">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <Label required icon={Ico.briefcase}>Project Name</Label>
                    <input
                      name="project_name"
                      value={formData.project_name}
                      onChange={hc}
                      className="form-control rounded-3 py-3"
                      placeholder="e.g., E-commerce Website"
                    />

                    <div className="mt-4">
                      <Label required icon={Ico.tag}>Category</Label>
                      <input
                        name="category"
                        value={formData.category}
                        onChange={hc}
                        className="form-control rounded-3 py-3"
                        placeholder="e.g., Web Development"
                      />
                    </div>

                    <div className="mt-4">
                      <Label required icon={Ico.calendar}>Deadline</Label>
                      <input
                        name="deadline"
                        value={formData.deadline}
                        onChange={hc}
                        type="date"
                        className="form-control rounded-3 py-3"
                      />
                    </div>

                    <div className="mt-4">
                      <Label icon={Ico.clock}>Expected Duration</Label>
                      <input
                        name="expected_duration"
                        value={formData.expected_duration}
                        onChange={hc}
                        className="form-control rounded-3 py-3"
                        placeholder="e.g., 2 weeks"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <Label icon={Ico.money}>Budget</Label>
                    <input
                      name="budget"
                      value={formData.budget}
                      onChange={hc}
                      className="form-control rounded-3 py-3"
                      placeholder="e.g., $5,000"
                    />

                    <div className="mt-4">
                      <Label>Priority Level</Label>
                      <select
                        name="priority_level"
                        value={formData.priority_level}
                        onChange={hc}
                        className="form-select rounded-3 py-3"
                      >
                        <option value="">Select priority...</option>
                        <option value="Low">🟢 Low</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="High">🔴 High</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <Label>Service Type</Label>
                      <input
                        name="service_type"
                        value={formData.service_type}
                        onChange={hc}
                        className="form-control rounded-3 py-3"
                        placeholder="e.g., UI/UX Design"
                      />
                    </div>

                    <div className="mt-4">
                      <Label>Payment Method</Label>
                      <select
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={hc}
                        className="form-select rounded-3 py-3"
                      >
                        <option value="">Select payment method...</option>
                        <option value="Bank Transfer">🏦 Bank Transfer</option>
                        <option value="PayPal">💳 PayPal</option>
                        <option value="Cash">💵 Cash</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Full Width Description */}
                <div className="mt-4">
                  <Label required>Description</Label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={hc}
                    rows="4"
                    className="form-control rounded-3"
                    placeholder="Describe your project in detail..."
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4 d-flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-grow-1 py-3 border-0 fw-semibold rounded-4"
                    style={{
                      background: isEditing
                        ? "linear-gradient(135deg, #f97316, #ef4444)"
                        : "linear-gradient(135deg, #4f46e5, #8b5cf6)",
                      boxShadow: isEditing
                        ? "0 8px 20px rgba(239,68,68,0.3)"
                        : "0 8px 20px rgba(99,102,241,0.3)",
                    }}
                  >
                    {loading ? (
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Processing...
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        {isEditing ? Ico.check : Ico.plus}
                        {isEditing ? "Update Project" : "Create Project"}
                      </div>
                    )}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="btn btn-light py-3 px-4 fw-semibold rounded-4"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="fs-4 fw-bold text-dark d-flex align-items-center gap-3">
                Your Projects
                <span className="badge bg-primary bg-gradient px-3 py-2 rounded-pill fs-6 fw-semibold">
                  {projectsList.length} Total
                </span>
              </h2>
            </div>

            {fetching ? (
              <div className="bg-white rounded-4 shadow-sm p-5 text-center">
                <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-secondary">Loading your projects...</p>
              </div>
            ) : projectsList.length === 0 ? (
              <div className="bg-white rounded-4 p-5 text-center border border-2 border-dashed">
                <div className="display-1 mb-3">📁</div>
                <h3 className="h5 fw-semibold text-dark mb-2">No Projects Yet</h3>
                <p className="text-secondary mb-0 mx-auto" style={{ maxWidth: "400px" }}>
                  Start by creating your first project using the form above. Your projects will appear here.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {projectsList.map((proj, idx) => {
                  const priority = PRIORITY[proj.priority_level];
                  const isOpen = openCards[proj.id];

                  return (
                    <div key={proj.id} className="col-12 col-md-6 col-xl-4">
                      <div className="project-card bg-white rounded-4 overflow-hidden h-100" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
                        {/* Priority Bar */}
                        <div style={{
                          height: "6px",
                          background: priority
                            ? `linear-gradient(90deg, ${priority.color}, ${priority.color}80)`
                            : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                        }} />

                        <div className="p-4">
                          {/* Header */}
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h3 className="h6 fw-bold text-dark mb-2">
                                {proj.project_name}
                              </h3>
                              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold">
                                {proj.category}
                              </span>
                            </div>
                            {priority && (
                              <span className="badge px-3 py-2 rounded-pill d-flex align-items-center gap-2" style={{ background: priority.bg, color: priority.color }}>
                                <span className="rounded-circle" style={{ width: "8px", height: "8px", background: priority.dot }} />
                                {proj.priority_level}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-secondary small mb-3" style={{
                            display: "-webkit-box",
                            WebkitLineClamp: isOpen ? "unset" : 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}>
                            {proj.description}
                          </p>

                          {/* Tags */}
                          <div className="d-flex flex-wrap gap-2 mb-3">
                            <Chip icon={Ico.calendar} value={proj.deadline} />
                            <Chip icon={Ico.money} value={proj.budget} />
                            {proj.expected_duration && (
                              <Chip icon={Ico.clock} value={proj.expected_duration} />
                            )}
                          </div>

                          {/* Expanded Details */}
                          {isOpen && (
                            <div className="bg-light rounded-3 p-3 mb-3">
                              <div className="row g-3">
                                {proj.service_type && (
                                  <div className="col-6">
                                    <p className="small text-secondary fw-semibold mb-1">SERVICE TYPE</p>
                                    <p className="small text-dark fw-medium mb-0">{proj.service_type}</p>
                                  </div>
                                )}
                                {proj.payment_method && (
                                  <div className="col-6">
                                    <p className="small text-secondary fw-semibold mb-1">PAYMENT METHOD</p>
                                    <p className="small text-dark fw-medium mb-0">{proj.payment_method}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="d-flex gap-2 pt-3 border-top">
                            <button
                              className="action-btn btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0 fw-semibold"
                              onClick={() => startEdit(proj)}
                              style={{ background: "#eef2ff", color: "#4f46e5" }}
                            >
                              {Ico.edit} Edit
                            </button>
                            <button
                              className="action-btn btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0 fw-semibold"
                              onClick={() => handleDelete(proj.id)}
                              style={{ background: "#fef2f2", color: "#dc2626" }}
                            >
                              {Ico.trash} Delete
                            </button>
                            <button
                              className="action-btn btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0 fw-semibold ms-auto"
                              onClick={() => toggleCard(proj.id)}
                              style={{ background: "#f1f5f9", color: "#475569" }}
                            >
                              {isOpen ? Ico.eyeOff : Ico.eye} {isOpen ? "Less" : "More"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="py-5" />
    </div>
  );
};

export default AddProjects;