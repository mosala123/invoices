import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../../images/signup-image-removebg-preview.png";
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

const LoginFreelancer = () => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          throw new Error("Wrong email or password. Please try again.");
        }
        if (error.message === "Email not confirmed") {
          throw new Error("Please confirm your email first. Check your inbox for the confirmation link.");
        }
        throw error;
      }

      const user = data.user;
      if (!user) throw new Error("Login failed. Please try again.");
      const accessToken = data.session?.access_token;
      if (accessToken) localStorage.setItem("token", accessToken);

      // جلب بروفايل الـ freelancer
      const { data: profile } = await supabase
        .from("freelancers")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // لو مش لاقي البروفايل، ننشئه تلقائياً
      if (!profile) {
        const userData = {
          id:    user.id,
          email: user.email,
          name:  user.user_metadata?.name || user.email.split("@")[0],
          role:  "freelancer",
        };

        const { data: newProfile } = await supabase
          .from("freelancers")
          .upsert(userData, { onConflict: "id" })
          .select()
          .single();

        const finalProfile = newProfile || userData;
        localStorage.setItem("user", JSON.stringify({ ...finalProfile, role: "freelancer" }));
        toast.success("Welcome back, Pro! 🚀");
        // ✨ تعديل هنا: التوجيه إلى صفحة البروفايل
        navigate("/profile");
        return;
      }

      // بروفايل موجود
      localStorage.setItem("user", JSON.stringify({ ...profile, role: "freelancer" }));
      toast.success("Welcome back, Pro! 🚀");
      // ✨ تعديل هنا: التوجيه إلى صفحة البروفايل
      navigate("/profile");

    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please check your credentials.");
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

              {/* FORM SIDE */}
              <div style={{ flex:1,background:"#fff",padding:"40px 44px" }}>

                <Link to="/" style={{ display:"inline-flex",alignItems:"center",gap:7,
                  color:"#888",fontSize:"0.82rem",textDecoration:"none",marginBottom:28 }}
                  onMouseEnter={e=>e.currentTarget.style.color="#1e8e3e"}
                  onMouseLeave={e=>e.currentTarget.style.color="#888"}>
                  <FaArrowLeft /> Back to Home
                </Link>

                <div style={{ marginBottom:30 }}>
                  <div style={{ width:46,height:46,borderRadius:14,background:"#e6f4ea",
                    display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14 }}>
                    <span style={{ fontSize:"1.4rem" }}>🚀</span>
                  </div>
                  <h2 style={{ fontWeight:800,color:"#1a1a2e",marginBottom:6,fontSize:"1.7rem" }}>
                    Welcome Back, Pro!
                  </h2>
                  <p style={{ color:"#888",fontSize:"0.9rem",marginBottom:0 }}>
                    Sign in to your freelancer account and start issuing invoices professionally.
                  </p>
                </div>

                <form onSubmit={handleLogin}>
                  <InputField
                    icon={<MdEmail />} label="Email Address" type="email"
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="example@mail.com" />

                  <InputField
                    icon={<RiLockPasswordFill />} label="Password"
                    type={showPass?"text":"password"}
                    value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="••••••••"
                    rightEl={
                      <button type="button" onClick={()=>setShowPass(v=>!v)}
                        style={{ background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:16,padding:0 }}>
                        {showPass?<FaEyeSlash/>:<FaEye/>}
                      </button>
                    }/>

                  <div style={{ display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:22 }}>
                    <label style={{ display:"flex",alignItems:"center",gap:7,
                      fontSize:"0.82rem",color:"#666",cursor:"pointer" }}>
                      <input type="checkbox" style={{ accentColor:"#1e8e3e" }}/>
                      Remember me
                    </label>
                    <a href="#" style={{ color:"#1e8e3e",fontSize:"0.82rem",textDecoration:"none" }}>
                      Forgot password?
                    </a>
                  </div>

                  <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                    type="submit" disabled={loading}
                    style={{ width:"100%",padding:"13px 0",borderRadius:50,border:"none",
                      background:"linear-gradient(135deg,#1e8e3e,#137333)",color:"#fff",
                      fontWeight:700,fontSize:"0.95rem",cursor:loading?"not-allowed":"pointer",
                      opacity:loading?0.8:1,display:"flex",alignItems:"center",
                      justifyContent:"center",gap:8,marginBottom:20,
                      boxShadow:"0 6px 20px rgba(30,142,62,.35)" }}>
                    {loading
                      ?<><span className="spinner-border spinner-border-sm"/>Signing in...</>
                      :"Sign In"}
                  </motion.button>

                  <p style={{ textAlign:"center",fontSize:"0.85rem",color:"#888",marginBottom:0 }}>
                    Don't have an account?{" "}
                    <Link to="/registerfreelancer" style={{ color:"#1e8e3e",fontWeight:700,textDecoration:"none" }}>
                      Register as Freelancer
                    </Link>
                  </p>

                  <div style={{ display:"flex",alignItems:"center",gap:12,margin:"20px 0" }}>
                    <div style={{flex:1,height:1,background:"#eee"}}/>
                    <span style={{color:"#bbb",fontSize:"0.8rem"}}>or</span>
                    <div style={{flex:1,height:1,background:"#eee"}}/>
                  </div>

                  <p style={{ textAlign:"center",fontSize:"0.82rem",color:"#aaa",marginBottom:0 }}>
                    Are you a client?{" "}
                    <Link to="/loginclient" style={{ color:"#1a73e8",fontWeight:700,textDecoration:"none" }}>
                      Sign in here
                    </Link>
                  </p>
                </form>
              </div>

              {/* IMAGE SIDE */}
              <div className="d-flex auth-visual-panel" style={{ flex:1,flexDirection:"column",
                alignItems:"center",justifyContent:"center",
                background:"linear-gradient(135deg,#1e8e3e 0%,#137333 100%)",
                padding:"44px 40px",textAlign:"center" }}>
                <motion.div initial={{ x:40,opacity:0 }} animate={{ x:0,opacity:1 }}
                  transition={{ delay:0.25 }}>
                  <div style={{ position:"relative",marginBottom:28 }}>
                    <div style={{ position:"absolute",top:-20,right:-20,width:80,height:80,
                      borderRadius:"50%",background:"rgba(255,255,255,0.1)" }}/>
                    <div style={{ position:"absolute",bottom:-10,left:-15,width:50,height:50,
                      borderRadius:"50%",background:"rgba(255,255,255,0.08)" }}/>
                    <img src={loginImage} alt="login"
                      style={{ maxWidth:"75%",position:"relative",zIndex:1 }}/>
                  </div>
                  <h4 style={{ fontWeight:800,color:"#fff",marginBottom:12,fontSize:"1.3rem" }}>
                    Turn Your Work Into Profession
                  </h4>
                  <p style={{ color:"rgba(255,255,255,0.75)",fontSize:"0.88rem",lineHeight:1.7 }}>
                    We provide you with the tools needed to organize your finances and focus on your creativity.
                  </p>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginTop:20 }}>
                    {["Fast Invoicing","Secure","Reports"].map((f,i)=>(
                      <span key={i} style={{ background:"rgba(255,255,255,0.15)",color:"#fff",
                        borderRadius:50,padding:"5px 14px",fontSize:"0.78rem",fontWeight:600 }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginFreelancer;
