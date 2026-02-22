import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaEnvelope, FaPhone, FaBriefcase, FaEdit, FaSignOutAlt,
  FaStar, FaGraduationCap, FaGlobe, FaSave, FaTimes,
  FaCalendarAlt, FaTrash, FaExclamationTriangle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser, supabase } from "../../../supabaseClient";
import Noprofile from "../Noprofile";

const Field = ({ icon, label, value }) => (
  <div className="d-flex align-items-start gap-3 mb-3">
    <div style={{ width:36, height:36, borderRadius:10, background:"#e8f0fe",
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#1a73e8", flexShrink:0, fontSize:14 }}>{icon}</div>
    <div>
      <p style={{ fontSize:"0.72rem", color:"#888", marginBottom:2,
        textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</p>
      <p style={{ fontWeight:600, color:"#202124", marginBottom:0, fontSize:"0.9rem" }}>
        {value || "—"}
      </p>
    </div>
  </div>
);

const StatCard = ({ value, label, accent }) => (
  <div style={{ background:"#fff", borderRadius:14, padding:"16px 12px",
    textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.07)",
    border:`1px solid ${accent}22` }}>
    <h4 style={{ fontWeight:800, color:accent, marginBottom:2, fontSize:"1.4rem" }}>{value}</h4>
    <p style={{ color:"#888", fontSize:"0.78rem", marginBottom:0 }}>{label}</p>
  </div>
);

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText="Confirm", cancelText="Cancel", type="warning" }) => {
  const colors = {
    warning: { bg:"#fff3e0", icon:"#f57c00", confirm:"#f57c00", hover:"#e65100" },
    danger:  { bg:"#ffebee", icon:"#d32f2f", confirm:"#d32f2f", hover:"#b71c1c" },
    info:    { bg:"#e8f0fe", icon:"#1a73e8", confirm:"#1a73e8", hover:"#0d47a1" },
  };
  const c = colors[type] || colors.warning;
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
          zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0, scale:0.8 }} transition={{ type:"spring", damping:25 }}
            style={{ background:"#fff", borderRadius:20, padding:"28px 24px",
              width:"100%", maxWidth:400, boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:c.bg,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>
                <FaExclamationTriangle style={{ color:c.icon }}/>
              </div>
              <div>
                <h5 style={{ fontWeight:700, color:"#202124", marginBottom:4 }}>{title}</h5>
                <p style={{ color:"#5f6368", fontSize:"0.9rem", marginBottom:0 }}>{message}</p>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={onClose} style={{ background:"#f1f3f4", border:"none", borderRadius:50,
                padding:"8px 20px", fontWeight:600, fontSize:"0.85rem", cursor:"pointer" }}>
                {cancelText}
              </button>
              <button onClick={onConfirm}
                style={{ background:c.confirm, color:"#fff", border:"none", borderRadius:50,
                  padding:"8px 24px", fontWeight:600, fontSize:"0.85rem", cursor:"pointer" }}
                onMouseEnter={e=>e.target.style.background=c.hover}
                onMouseLeave={e=>e.target.style.background=c.confirm}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.45 } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

const ProfileFreelancer = () => {
  const navigate = useNavigate();
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen:false, type:"warning", title:"", message:"", onConfirm:null
  });

  /* ── fetch profile + count invoices ── */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authUser = await getAuthenticatedUser();
        if (!authUser) { setNotFound(true); setLoading(false); return; }
        const userId   = authUser.id;

        const { data, error } = await supabase
          .from("freelancers")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (!error && data) {
          // ✅ عدّ الـ invoices تلقائي
          const { count } = await supabase
            .from("invoices")
            .select("*", { count:"exact", head:true })
            .eq("user_id", userId);

          setUserData({ ...data, completed_projects: count || 0 });
          setFormData(data);
          setNotFound(false);
          return;
        }

        // fallback من localStorage
        const cachedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const fallback = {
          id:          userId,
          name:        cachedUser?.name || authUser.user_metadata?.name || authUser.email?.split("@")[0] || "",
          email:       authUser.email || "",
          phone:       cachedUser?.phone || "",
          current_job: cachedUser?.current_job || "Freelancer",
          skills:      cachedUser?.skills || "",
          experience:  cachedUser?.experience || "",
          education:   cachedUser?.education || "",
          languages:   cachedUser?.languages || "",
          portfolio:   cachedUser?.portfolio || "",
          completed_projects: 0,
        };
        localStorage.setItem("user", JSON.stringify({ ...fallback, role:"freelancer" }));
        setUserData(fallback);
        setFormData(fallback);
        setNotFound(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  /* ── update ── */
  const handleUpdate = async () => {
    setSaving(true);
    try {
      const authUser = await getAuthenticatedUser();
      if (!authUser) throw new Error("Not authenticated");
      const userId = authUser.id;

      const { error } = await supabase
        .from("freelancers")
        .update({
          name:        formData.name,
          phone:       formData.phone,
          current_job: formData.current_job,
          skills:      formData.skills,
          experience:  formData.experience,
          education:   formData.education,
          languages:   formData.languages,
          portfolio:   formData.portfolio,
        })
        .eq("id", userId);

      if (error) throw error;

      // إعادة عدّ الـ invoices بعد الحفظ
      const { count } = await supabase
        .from("invoices")
        .select("*", { count:"exact", head:true })
        .eq("user_id", userId);

      const updated = { ...userData, ...formData, completed_projects: count || 0 };
      setUserData(updated);
      localStorage.setItem("user", JSON.stringify({ ...updated, role:"freelancer" }));
      toast.success("Profile updated successfully! ✅");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateWithConfirm = () => {
    setConfirmDialog({
      isOpen:true, type:"info",
      title:"Save Changes?",
      message:"Are you sure you want to update your profile?",
      confirmText:"Save", cancelText:"Cancel",
      onConfirm:() => { setConfirmDialog(p=>({...p,isOpen:false})); handleUpdate(); }
    });
  };

  const handleLogoutWithConfirm = () => {
    setConfirmDialog({
      isOpen:true, type:"warning",
      title:"Logout?",
      message:"Are you sure you want to logout?",
      confirmText:"Logout", cancelText:"Stay",
      onConfirm:() => {
        setConfirmDialog(p=>({...p,isOpen:false}));
        supabase.auth.signOut();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/");
      }
    });
  };

  const handleDeleteAccount = () => {
    setConfirmDialog({
      isOpen:true, type:"danger",
      title:"Delete Account?",
      message:"This cannot be undone. All your data will be permanently deleted.",
      confirmText:"Delete", cancelText:"Keep Account",
      onConfirm: async () => {
        setConfirmDialog(p=>({...p,isOpen:false}));
        try {
          const authUser = await getAuthenticatedUser();
          if (authUser) {
            await supabase.from("freelancers").delete().eq("id", authUser.id);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Account deleted");
            navigate("/");
          }
        } catch (err) {
          toast.error("Failed to delete account.");
        }
      }
    });
  };

  if (loading) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", height:"100vh", gap:14 }}>
      <div className="spinner-border" style={{ color:"#1a73e8", width:44, height:44 }} role="status"/>
      <p style={{ color:"#888", fontSize:"0.9rem" }}>Loading your profile…</p>
    </div>
  );

  if (notFound || !userData) return <Noprofile />;

  const initial  = (userData.name || "F")[0].toUpperCase();
  const joinDate = userData.created_at
    ? new Date(userData.created_at).toLocaleDateString("en-GB", { year:"numeric", month:"long" })
    : null;
  const skills = userData.skills
    ? userData.skills.split(",").map(s=>s.trim()).filter(Boolean)
    : [];

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8", fontFamily:"'Segoe UI',sans-serif" }}>

      {/* HERO */}
      <div style={{ background:"linear-gradient(135deg,#1a73e8 0%,#0d47a1 60%,#4ac5b5 100%)",
        padding:"48px 0 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:260, height:260,
          borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-50, left:-50, width:200, height:200,
          borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }}/>

        <div className="container text-center text-white position-relative" style={{ zIndex:2 }}>
          <motion.div initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:"spring", damping:14 }}>
            <div style={{ width:100, height:100, borderRadius:"50%",
              background:"rgba(255,255,255,0.18)", border:"3px solid rgba(255,255,255,0.5)",
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              fontSize:"2.6rem", fontWeight:800, color:"#fff",
              boxShadow:"0 8px 30px rgba(0,0,0,0.2)", marginBottom:14 }}>
              {initial}
            </div>
          </motion.div>

          <motion.h2 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.15 }} style={{ fontWeight:700, marginBottom:4 }}>
            {userData.name || "Freelancer"}
          </motion.h2>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.22 }}
            style={{ opacity:0.82, marginBottom:6, fontSize:"0.95rem" }}>
            {userData.current_job || "Freelancer"}
          </motion.p>

          {userData.rating && (
            <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.3 }}
              style={{ display:"inline-flex", alignItems:"center", gap:5,
                background:"rgba(255,255,255,0.2)", borderRadius:50, padding:"4px 14px", fontSize:"0.85rem" }}>
              <FaStar style={{ color:"#ffd700" }}/> {userData.rating} Rating
            </motion.div>
          )}

          {joinDate && (
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
              style={{ opacity:0.6, fontSize:"0.8rem", marginTop:8, marginBottom:0 }}>
              <FaCalendarAlt style={{ marginRight:5 }}/> Member since {joinDate}
            </motion.p>
          )}
        </div>

        <div style={{ position:"absolute", bottom:-2, left:0, right:0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width:"100%", height:48 }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f0f4f8"/>
          </svg>
        </div>
      </div>

      {/* BODY */}
      <div className="container" style={{ marginTop:-24 }}>
        <motion.div initial="hidden" animate="show" variants={stagger}>

          {/* stats */}
          <motion.div variants={fadeUp} className="row g-3 mb-4">
            <div className="col-4">
              <StatCard value={userData.rating || "—"} label="Rating" accent="#1a73e8"/>
            </div>
            <div className="col-4">
              {/* ✅ بيتحدث تلقائي من عدد الـ invoices */}
              <StatCard value={userData.completed_projects} label="Projects Done" accent="#1e8e3e"/>
            </div>
            <div className="col-4">
              <StatCard value="100%" label="Satisfaction" accent="#e37400"/>
            </div>
          </motion.div>

          <div className="row g-4">
            {/* Personal Info */}
            <motion.div variants={fadeUp} className="col-lg-6">
              <div style={{ background:"#fff", borderRadius:20,
                boxShadow:"0 4px 24px rgba(0,0,0,0.07)", padding:"24px 26px" }}>
                <h6 style={{ fontWeight:700, color:"#1a73e8", fontSize:"0.78rem",
                  textTransform:"uppercase", letterSpacing:1, marginBottom:18 }}>Personal Info</h6>
                <Field icon={<FaEnvelope/>} label="Email"     value={userData.email}/>
                <Field icon={<FaPhone/>}    label="Phone"     value={userData.phone}/>
                <Field icon={<FaGlobe/>}    label="Languages" value={userData.languages}/>
                {userData.portfolio && (
                  <div className="d-flex align-items-start gap-3 mb-2">
                    <div style={{ width:36, height:36, borderRadius:10, background:"#e8f0fe",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#1a73e8", flexShrink:0, fontSize:14 }}><FaGlobe/></div>
                    <div>
                      <p style={{ fontSize:"0.72rem", color:"#888", marginBottom:2,
                        textTransform:"uppercase", letterSpacing:"0.5px" }}>Portfolio</p>
                      <a href={userData.portfolio} target="_blank" rel="noreferrer"
                        style={{ fontWeight:600, color:"#1a73e8", fontSize:"0.9rem" }}>
                        {userData.portfolio}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Skills & Experience */}
            <motion.div variants={fadeUp} className="col-lg-6">
              <div style={{ background:"#fff", borderRadius:20,
                boxShadow:"0 4px 24px rgba(0,0,0,0.07)", padding:"24px 26px" }}>
                <h6 style={{ fontWeight:700, color:"#1a73e8", fontSize:"0.78rem",
                  textTransform:"uppercase", letterSpacing:1, marginBottom:18 }}>Skills & Experience</h6>
                <Field icon={<FaBriefcase/>}    label="Experience" value={userData.experience}/>
                <Field icon={<FaGraduationCap/>} label="Education"  value={userData.education}/>
                {skills.length > 0 && (
                  <div>
                    <p style={{ fontSize:"0.72rem", color:"#888", marginBottom:8,
                      textTransform:"uppercase", letterSpacing:"0.5px" }}>Skills</p>
                    <div className="d-flex flex-wrap gap-2">
                      {skills.map((s,i) => (
                        <span key={i} style={{ background:"#e8f0fe", color:"#1a73e8",
                          borderRadius:50, padding:"4px 12px", fontSize:"0.8rem", fontWeight:600 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* action buttons */}
          <motion.div variants={fadeUp} className="d-flex gap-3 flex-wrap mt-4 mb-5">
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              onClick={() => { setFormData({...userData}); setEditMode(true); }}
              style={{ background:"#1a73e8", color:"#fff", border:"none", borderRadius:50,
                padding:"10px 28px", fontWeight:600, fontSize:"0.88rem", cursor:"pointer",
                display:"flex", alignItems:"center", gap:8 }}>
              <FaEdit/> Edit Profile
            </motion.button>
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              onClick={handleLogoutWithConfirm}
              style={{ background:"#fce8e6", color:"#d93025", border:"none", borderRadius:50,
                padding:"10px 28px", fontWeight:600, fontSize:"0.88rem", cursor:"pointer",
                display:"flex", alignItems:"center", gap:8 }}>
              <FaSignOutAlt/> Logout
            </motion.button>
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              onClick={handleDeleteAccount}
              style={{ background:"#ffebee", color:"#d32f2f", border:"none", borderRadius:50,
                padding:"10px 28px", fontWeight:600, fontSize:"0.88rem", cursor:"pointer",
                display:"flex", alignItems:"center", gap:8 }}>
              <FaTrash/> Delete Account
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editMode && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
            zIndex:1050, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
            <motion.div initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.92 }}
              style={{ background:"#fff", borderRadius:20, padding:"32px 28px",
                width:"100%", maxWidth:580, maxHeight:"90vh", overflowY:"auto" }}>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 style={{ fontWeight:700, color:"#1a73e8", marginBottom:0 }}>Edit Profile</h5>
                <button onClick={() => setEditMode(false)}
                  style={{ background:"#f1f3f4", border:"none", borderRadius:"50%",
                    width:34, height:34, cursor:"pointer", color:"#555",
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <FaTimes/>
                </button>
              </div>

              <div className="row g-3">
                {[["Name","name"],["Phone","phone"],["Current Job","current_job"],
                  ["Education","education"],["Languages","languages"],["Portfolio URL","portfolio"]].map(([lbl,key]) => (
                  <div key={key} className="col-md-6">
                    <label style={{ fontSize:"0.78rem", color:"#888", fontWeight:600, marginBottom:5 }}>{lbl}</label>
                    <input type="text" className="form-control" value={formData[key] || ""}
                      onChange={e => setFormData({...formData,[key]:e.target.value})}
                      style={{ borderRadius:10, fontSize:"0.88rem", borderColor:"#e0e0e0" }}/>
                  </div>
                ))}
                <div className="col-12">
                  <label style={{ fontSize:"0.78rem", color:"#888", fontWeight:600, marginBottom:5 }}>
                    Skills <span style={{ color:"#bbb", fontWeight:400 }}>(comma separated)</span>
                  </label>
                  <input type="text" className="form-control" value={formData.skills || ""}
                    onChange={e => setFormData({...formData, skills:e.target.value})}
                    placeholder="React, Node.js, Figma…"
                    style={{ borderRadius:10, fontSize:"0.88rem", borderColor:"#e0e0e0" }}/>
                </div>
                <div className="col-12">
                  <label style={{ fontSize:"0.78rem", color:"#888", fontWeight:600, marginBottom:5 }}>Experience</label>
                  <textarea className="form-control" rows={2} value={formData.experience || ""}
                    onChange={e => setFormData({...formData, experience:e.target.value})}
                    style={{ borderRadius:10, fontSize:"0.88rem", borderColor:"#e0e0e0", resize:"none" }}/>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4 justify-content-end">
                <button onClick={() => setEditMode(false)}
                  style={{ background:"#f1f3f4", border:"none", borderRadius:50,
                    padding:"9px 22px", fontWeight:600, fontSize:"0.85rem", cursor:"pointer" }}>
                  Cancel
                </button>
                <button onClick={handleUpdateWithConfirm} disabled={saving}
                  style={{ background:"#1a73e8", color:"#fff", border:"none", borderRadius:50,
                    padding:"9px 24px", fontWeight:600, fontSize:"0.85rem", cursor:"pointer",
                    display:"flex", alignItems:"center", gap:7, opacity:saving?0.7:1 }}>
                  {saving
                    ? <><span className="spinner-border spinner-border-sm"/> Saving…</>
                    : <><FaSave/> Save Changes</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(p=>({...p,isOpen:false}))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        type={confirmDialog.type}
      />
    </div>
  );
};

export default ProfileFreelancer;
