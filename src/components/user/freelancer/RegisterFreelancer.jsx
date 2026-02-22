import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { FaArrowLeft, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import registerImage from "../../../images/signup-image-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient";

const InputField = ({ icon, label, type, value, onChange, placeholder, rightEl }) => (
  <div className="mb-3">
    <label style={{ fontSize:"0.78rem",fontWeight:700,color:"#555",
      marginBottom:6,display:"block",textTransform:"uppercase",letterSpacing:"0.5px" }}>
      {label}
    </label>
    <div style={{ display:"flex",alignItems:"center",background:"#f5f7fa",
      borderRadius:12,border:"1.5px solid #e8ecf0",padding:"0 14px",
      transition:"border-color .2s,box-shadow .2s" }}
      onFocus={e=>{e.currentTarget.style.borderColor="#1e8e3e";e.currentTarget.style.boxShadow="0 0 0 3px rgba(30,142,62,.1)"}}
      onBlur={e=>{e.currentTarget.style.borderColor="#e8ecf0";e.currentTarget.style.boxShadow="none"}}>
      <span style={{ color:"#1e8e3e",fontSize:18,marginRight:10,flexShrink:0 }}>{icon}</span>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required
        style={{ flex:1,border:"none",background:"transparent",outline:"none",
          padding:"12px 0",fontSize:"0.9rem",color:"#333" }}/>
      {rightEl}
    </div>
  </div>
);

const RegisterFreelancer = () => {
  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [repass,     setRepass]     = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const navigate = useNavigate();

  const passwordStrength = () => {
    if (!password) return null;
    if (password.length < 6)  return { label:"Weak",   color:"#d93025", width:"30%" };
    if (password.length < 10) return { label:"Medium", color:"#e37400", width:"65%" };
    return                           { label:"Strong", color:"#1e8e3e", width:"100%" };
  };
  const strength = passwordStrength();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repass) { toast.error("Passwords do not match!"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    if (!name.trim())        { toast.error("Please enter your full name."); return; }

    setLoading(true);
    try {
      // 1. Supabase Auth signUp
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { name: name.trim(), role: "freelancer" } },
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error("Registration failed. Please try again.");
      }

      // 2. Insert into freelancers table
      const { error: insertError } = await supabase
        .from("freelancers")
        .upsert(
          { id: data.user.id, name: name.trim(), email: email.trim().toLowerCase(), role: "freelancer" },
          { onConflict: "id" }
        );

      if (insertError) {
        console.error("Insert freelancer error:", insertError.message);
        // لا نوقف التسجيل
      }

      const accessToken = data.session?.access_token;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            role: "freelancer",
          })
        );
        toast.success("Account created successfully!");
        navigate("/profile");
      } else {
        toast.success("Account created! Please check your email to confirm, then login.");
        navigate("/loginfreelancer");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.message?.toLowerCase().includes("already registered")) {
        toast.error("This email is already registered. Please login instead.");
      } else {
        toast.error(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(135deg,#f0fdf4 0%,#e6f4ea 100%)",
      display:"flex",alignItems:"center",padding:"40px 0",fontFamily:"'Segoe UI',sans-serif" }}>
      <div className="container">
        <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }}
          transition={{ duration:0.5 }} className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">

            <div style={{ borderRadius:24,overflow:"hidden",
              boxShadow:"0 20px 60px rgba(30,142,62,.12)",display:"flex" }}
              className="flex-column flex-lg-row">

              {/* IMAGE SIDE */}
              <div className="d-flex auth-visual-panel" style={{ flex:1,flexDirection:"column",
                alignItems:"center",justifyContent:"center",
                background:"linear-gradient(135deg,#1e8e3e 0%,#137333 100%)",
                padding:"44px 36px",textAlign:"center" }}>
                <motion.div initial={{ x:-40,opacity:0 }} animate={{ x:0,opacity:1 }}
                  transition={{ delay:0.25 }}>
                  <div style={{ position:"relative",marginBottom:24 }}>
                    <div style={{ position:"absolute",top:-20,left:-20,width:80,height:80,
                      borderRadius:"50%",background:"rgba(255,255,255,0.1)" }}/>
                    <img src={registerImage} alt="register"
                      style={{ maxWidth:"75%",position:"relative",zIndex:1 }}/>
                  </div>
                  <h4 style={{ fontWeight:800,color:"#fff",marginBottom:10,fontSize:"1.25rem" }}>
                    Welcome to the World of Professionals
                  </h4>
                  <p style={{ color:"rgba(255,255,255,0.75)",fontSize:"0.86rem",lineHeight:1.75 }}>
                    We support you at every step of your freelance journey.
                  </p>
                  <div style={{ marginTop:20,display:"flex",flexDirection:"column",gap:10,textAlign:"left" }}>
                    {["Issue professional invoices instantly",
                      "Get paid faster with organized tracking",
                      "Build your freelance portfolio"].map((f,i)=>(
                      <div key={i} style={{ display:"flex",alignItems:"center",gap:10,
                        background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"9px 14px" }}>
                        <FaCheckCircle style={{ color:"#4ac5b5",flexShrink:0 }}/>
                        <span style={{ color:"rgba(255,255,255,0.9)",fontSize:"0.82rem" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* FORM SIDE */}
              <div style={{ flex:1,background:"#fff",padding:"36px 40px",overflowY:"auto" }}>

                <Link to="/" style={{ display:"inline-flex",alignItems:"center",gap:7,
                  color:"#888",fontSize:"0.82rem",textDecoration:"none",marginBottom:24 }}
                  onMouseEnter={e=>e.currentTarget.style.color="#1e8e3e"}
                  onMouseLeave={e=>e.currentTarget.style.color="#888"}>
                  <FaArrowLeft /> Back to Home
                </Link>

                <div style={{ marginBottom:26 }}>
                  <div style={{ width:46,height:46,borderRadius:14,background:"#e6f4ea",
                    display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>
                    <span style={{ fontSize:"1.4rem" }}>🚀</span>
                  </div>
                  <h2 style={{ fontWeight:800,color:"#1a1a2e",marginBottom:5,fontSize:"1.65rem" }}>
                    Join as Freelancer
                  </h2>
                  <p style={{ color:"#888",fontSize:"0.88rem",marginBottom:0 }}>
                    Start your professional journey and issue invoices with ease.
                  </p>
                </div>

                <form onSubmit={handleRegister}>
                  <InputField
                    icon={<MdPerson/>} label="Full Name" type="text"
                    value={name} onChange={e=>setName(e.target.value)}
                    placeholder="Enter your full name"/>

                  <InputField
                    icon={<MdEmail/>} label="Email Address" type="email"
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="example@mail.com"/>

                  <InputField
                    icon={<RiLockPasswordFill/>} label="Password"
                    type={showPass?"text":"password"}
                    value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    rightEl={
                      <button type="button" onClick={()=>setShowPass(v=>!v)}
                        style={{ background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:16,padding:0 }}>
                        {showPass?<FaEyeSlash/>:<FaEye/>}
                      </button>
                    }/>

                  {strength && (
                    <div style={{ marginTop:-8,marginBottom:14 }}>
                      <div style={{ height:4,background:"#eee",borderRadius:4,overflow:"hidden" }}>
                        <div style={{ height:"100%",width:strength.width,background:strength.color,
                          borderRadius:4,transition:"width .3s,background .3s" }}/>
                      </div>
                      <p style={{ fontSize:"0.72rem",color:strength.color,marginTop:4,marginBottom:0,fontWeight:600 }}>
                        {strength.label} password
                      </p>
                    </div>
                  )}

                  <InputField
                    icon={<RiLockPasswordLine/>} label="Confirm Password"
                    type={showRepass?"text":"password"}
                    value={repass} onChange={e=>setRepass(e.target.value)}
                    placeholder="Re-enter your password"
                    rightEl={
                      <button type="button" onClick={()=>setShowRepass(v=>!v)}
                        style={{ background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:16,padding:0 }}>
                        {showRepass?<FaEyeSlash/>:<FaEye/>}
                      </button>
                    }/>

                  {repass && (
                    <p style={{ fontSize:"0.75rem",marginTop:-8,marginBottom:12,fontWeight:600,
                      color:password===repass?"#1e8e3e":"#d93025" }}>
                      {password===repass?"✓ Passwords match":"✗ Passwords do not match"}
                    </p>
                  )}

                  <div style={{ display:"flex",alignItems:"flex-start",gap:10,marginBottom:22 }}>
                    <input type="checkbox" required style={{ accentColor:"#1e8e3e",marginTop:2,flexShrink:0 }}/>
                    <span style={{ fontSize:"0.82rem",color:"#777" }}>
                      I agree to the{" "}
                      <a href="#" style={{ color:"#1e8e3e",textDecoration:"none",fontWeight:600 }}>Terms & Conditions</a>
                      {" "}and{" "}
                      <a href="#" style={{ color:"#1e8e3e",textDecoration:"none",fontWeight:600 }}>Privacy Policy</a>
                    </span>
                  </div>

                  <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                    type="submit" disabled={loading}
                    style={{ width:"100%",padding:"13px 0",borderRadius:50,border:"none",
                      background:"linear-gradient(135deg,#1e8e3e,#137333)",color:"#fff",
                      fontWeight:700,fontSize:"0.95rem",cursor:loading?"not-allowed":"pointer",
                      opacity:loading?0.8:1,display:"flex",alignItems:"center",
                      justifyContent:"center",gap:8,marginBottom:16,
                      boxShadow:"0 6px 20px rgba(30,142,62,.35)" }}>
                    {loading
                      ?<><span className="spinner-border spinner-border-sm"/>Creating account…</>
                      :"Create Freelancer Account"}
                  </motion.button>

                  <p style={{ textAlign:"center",fontSize:"0.85rem",color:"#888",marginBottom:0 }}>
                    Already have an account?{" "}
                    <Link to="/loginfreelancer" style={{ color:"#1e8e3e",fontWeight:700,textDecoration:"none" }}>
                      Sign in here
                    </Link>
                  </p>
                </form>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterFreelancer;
