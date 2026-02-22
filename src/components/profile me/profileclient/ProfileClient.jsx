import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaEdit, FaSignOutAlt, FaPlusCircle, FaSave, FaTimes,
  FaBuilding, FaCalendarAlt, FaExclamationTriangle
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import Noprofile from "../Noprofile";

const Field = ({ icon, label, value }) => (
  <div className="d-flex align-items-start gap-3 mb-3">
    <div style={{ width:36, height:36, borderRadius:10, background:"#e8f5e9",
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#1e8e3e", flexShrink:0, fontSize:15 }}>{icon}</div>
    <div>
      <p style={{ fontSize:"0.72rem", color:"#888", marginBottom:2,
        textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</p>
      <p style={{ fontWeight:600, color:"#202124", marginBottom:0, fontSize:"0.9rem" }}>
        {value || "—"}
      </p>
    </div>
  </div>
);

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText="Confirm", cancelText="Cancel", type="warning" }) => {
  const colors = {
    warning: { bg:"#fff3e0", icon:"#f57c00", confirm:"#f57c00", hover:"#e65100" },
    danger:  { bg:"#ffebee", icon:"#d32f2f", confirm:"#d32f2f", hover:"#b71c1c" },
    info:    { bg:"#e8f5e9", icon:"#1e8e3e", confirm:"#1e8e3e", hover:"#137333" },
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

/* ================================================================ */
const ProfileClient = () => {
  const navigate = useNavigate();
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [authUid,  setAuthUid]  = useState(null); // ✅ نحفظ الـ UUID من auth مش من localStorage
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen:false, type:"info", title:"", message:"", onConfirm:null
  });

  /* ── fetch profile ── */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) { setNotFound(true); setLoading(false); return; }

        const authUser = authData.user;
        const uuid = authUser.id; // ✅ دايمًا UUID من auth
        setAuthUid(uuid);

        // ✅ البحث بالـ UUID مش بالـ email
        const { data, error } = await supabase
          .from("clients")
          .select("*")
          .eq("id", uuid)
          .maybeSingle();

        if (!error && data) {
          setUserData(data);
          setFormData(data);
          localStorage.setItem("user", JSON.stringify({ ...data, role:"client" }));
          setNotFound(false);
          return;
        }

        // مستخدم جديد - fallback
        const fallback = {
          id:         uuid,
          name:       authUser.user_metadata?.name || authUser.email?.split("@")[0] || "",
          email:      authUser.email || "",
          phone:      "",
          address:    "",
          occupation: "Client",
          bio:        "",
          role:       "client",
        };
        localStorage.setItem("user", JSON.stringify(fallback));
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
      if (!authUid) throw new Error("Not authenticated");

      const profileData = {
        name:       formData.name,
        email:      formData.email,
        phone:      formData.phone,
        address:    formData.address,
        occupation: formData.occupation,
        bio:        formData.bio,
        role:       "client",
      };

      // ✅ upsert بالـ UUID الصح دايمًا
      const { error } = await supabase
        .from("clients")
        .upsert({ id: authUid, ...profileData }, { onConflict: "id" });

      if (error) throw error;

      const updated = { ...userData, ...profileData, id: authUid };
      setUserData(updated);
      localStorage.setItem("user", JSON.stringify({ ...updated, role:"client" }));
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

  const handleCancelEdit = () => {
    setConfirmDialog({
      isOpen:true, type:"warning",
      title:"Discard Changes?",
      message:"You have unsaved changes. Are you sure?",
      confirmText:"Discard", cancelText:"Stay",
      onConfirm:() => { setConfirmDialog(p=>({...p,isOpen:false})); setEditMode(false); }
    });
  };

  if (loading) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", height:"100vh", gap:14 }}>
      <div className="spinner-border" style={{ color:"#1e8e3e", width:44, height:44 }} role="status"/>
      <p style={{ color:"#888", fontSize:"0.9rem" }}>Loading your profile…</p>
    </div>
  );

  if (notFound || !userData) return <Noprofile />;

  const initial  = (userData.name || "C")[0].toUpperCase();
  const joinDate = userData.created_at
    ? new Date(userData.created_at).toLocaleDateString("en-GB", { year:"numeric", month:"long" })
    : null;

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8", fontFamily:"'Segoe UI',sans-serif" }}>

      {/* HERO */}
      <div style={{ background:"linear-gradient(135deg,#1e8e3e 0%,#34a853 60%,#4ac5b5 100%)",
        padding:"48px 0 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:220, height:220,
          borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160,
          borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }}/>

        <div className="container text-center text-white position-relative" style={{ zIndex:2 }}>
          <motion.div initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:"spring", damping:14 }}>
            <div style={{ width:100, height:100, borderRadius:"50%",
              background:"rgba(255,255,255,0.2)", border:"3px solid rgba(255,255,255,0.5)",
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              fontSize:"2.6rem", fontWeight:800, color:"#fff",
              boxShadow:"0 8px 30px rgba(0,0,0,0.2)", marginBottom:14 }}>
              {initial}
            </div>
          </motion.div>

          <motion.h2 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.15 }} style={{ fontWeight:700, marginBottom:4 }}>
            {userData.name || "Client"}
          </motion.h2>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}
            style={{ opacity:0.82, marginBottom:0, fontSize:"0.95rem" }}>
            {userData.occupation || "Client Account"}
          </motion.p>
          {joinDate && (
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
              style={{ opacity:0.6, fontSize:"0.8rem", marginTop:4, marginBottom:0 }}>
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
      <div className="container" style={{ marginTop:-28 }}>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-8">
            <motion.div initial="hidden" animate="show" variants={fadeUp}
              style={{ background:"#fff", borderRadius:20,
                boxShadow:"0 4px 24px rgba(0,0,0,0.08)", padding:"28px 30px" }}>

              <h6 style={{ fontWeight:700, color:"#1e8e3e", fontSize:"0.8rem",
                textTransform:"uppercase", letterSpacing:1, marginBottom:20 }}>
                Basic Information
              </h6>

              <div className="row g-2">
                <div className="col-md-6">
                  <Field icon={<FaEnvelope/>}    label="Email"      value={userData.email}/>
                  <Field icon={<FaPhone/>}        label="Phone"      value={userData.phone}/>
                </div>
                <div className="col-md-6">
                  <Field icon={<FaMapMarkerAlt/>} label="Address"    value={userData.address}/>
                  <Field icon={<FaBuilding/>}     label="Occupation" value={userData.occupation}/>
                </div>
              </div>

              {userData.bio && (
                <div style={{ background:"#f8fdf9", borderRadius:12, padding:"14px 18px",
                  borderLeft:"4px solid #34a853", marginTop:8 }}>
                  <p style={{ fontSize:"0.85rem", color:"#666", marginBottom:4, fontWeight:600 }}>Bio</p>
                  <p style={{ color:"#333", lineHeight:1.75, marginBottom:0, fontSize:"0.9rem" }}>
                    {userData.bio}
                  </p>
                </div>
              )}

              <div className="d-flex gap-3 flex-wrap mt-4">
                <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                  onClick={() => { setFormData({...userData}); setEditMode(true); }}
                  style={{ background:"#1e8e3e", color:"#fff", border:"none", borderRadius:50,
                    padding:"10px 28px", fontWeight:600, fontSize:"0.88rem", cursor:"pointer",
                    display:"flex", alignItems:"center", gap:8 }}>
                  <FaEdit/> Edit Profile
                </motion.button>

                <Link to="/addanewpro">
                  <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                    style={{ background:"#e8f5e9", color:"#1e8e3e", border:"none", borderRadius:50,
                      padding:"10px 28px", fontWeight:600, fontSize:"0.88rem", cursor:"pointer",
                      display:"flex", alignItems:"center", gap:8 }}>
                    <FaPlusCircle/> Add Project
                  </motion.button>
                </Link>

                <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                  onClick={handleLogoutWithConfirm}
                  style={{ background:"#fce8e6", color:"#d93025", border:"none", borderRadius:50,
                    padding:"10px 28px", fontWeight:600, fontSize:"0.88rem", cursor:"pointer",
                    display:"flex", alignItems:"center", gap:8 }}>
                  <FaSignOutAlt/> Logout
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editMode && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
            zIndex:1050, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
            <motion.div initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.92 }}
              style={{ background:"#fff", borderRadius:20, padding:"32px 28px",
                width:"100%", maxWidth:540, maxHeight:"90vh", overflowY:"auto" }}>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 style={{ fontWeight:700, color:"#1e8e3e", marginBottom:0 }}>Edit Profile</h5>
                <button onClick={handleCancelEdit}
                  style={{ background:"#f1f3f4", border:"none", borderRadius:"50%",
                    width:34, height:34, cursor:"pointer", color:"#555",
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <FaTimes/>
                </button>
              </div>

              <div className="row g-3">
                {[["Name","name"],["Phone","phone"],["Address","address"],["Occupation","occupation"]].map(([lbl,key]) => (
                  <div key={key} className="col-md-6">
                    <label style={{ fontSize:"0.78rem", color:"#888", fontWeight:600, marginBottom:5 }}>{lbl}</label>
                    <input type="text" className="form-control" value={formData[key] || ""}
                      onChange={e => setFormData({...formData,[key]:e.target.value})}
                      style={{ borderRadius:10, fontSize:"0.88rem", borderColor:"#e0e0e0" }}/>
                  </div>
                ))}
                <div className="col-12">
                  <label style={{ fontSize:"0.78rem", color:"#888", fontWeight:600, marginBottom:5 }}>Bio</label>
                  <textarea className="form-control" rows={3} value={formData.bio || ""}
                    onChange={e => setFormData({...formData, bio:e.target.value})}
                    style={{ borderRadius:10, fontSize:"0.88rem", borderColor:"#e0e0e0", resize:"none" }}/>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4 justify-content-end">
                <button onClick={handleCancelEdit}
                  style={{ background:"#f1f3f4", border:"none", borderRadius:50,
                    padding:"9px 22px", fontWeight:600, fontSize:"0.85rem", cursor:"pointer" }}>
                  Cancel
                </button>
                <button onClick={handleUpdateWithConfirm} disabled={saving}
                  style={{ background:"#1e8e3e", color:"#fff", border:"none", borderRadius:50,
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

export default ProfileClient;