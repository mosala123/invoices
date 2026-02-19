import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import loginImage from "../../../images/signup-image-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginFreelancer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Mocking login for UI demonstration
    if (email && password) {
      toast.success("تم تسجيل الدخول بنجاح! أهلاً بك يا بطل.", { position: "top-right" });
      localStorage.setItem("user", JSON.stringify({ email, role: 'freelancer' }));
      localStorage.setItem("token", "mock-token-freelancer");
      setTimeout(() => {
        navigate("/create-invoice");
      }, 2000);
    } else {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور.", { position: "top-right" });
    }
  };

  return (
    <div className="login-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="row justify-content-center"
        >
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Form Section */}
                <div className="col-lg-6 p-4 p-lg-5 bg-white">
                  <div className="mb-4">
                    <Link to="/" className="text-decoration-none text-muted small d-flex align-items-center mb-3">
                      <FaArrowLeft className="me-2" /> العودة للرئيسية
                    </Link>
                    <h2 className="fw-bold text-primary mb-2">أهلاً بك مجدداً! 🚀</h2>
                    <p className="text-muted">سجل دخولك كمستقل للبدء في إصدار فواتيرك الاحترافية.</p>
                  </div>

                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted">البريد الإلكتروني</label>
                      <div className="input-group bg-light rounded-3 p-1">
                        <span className="input-group-text border-0 bg-transparent text-primary">
                          <MdEmail size={20} />
                        </span>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="form-control border-0 bg-transparent shadow-none"
                          placeholder="example@mail.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-bold text-muted">كلمة المرور</label>
                      <div className="input-group bg-light rounded-3 p-1">
                        <span className="input-group-text border-0 bg-transparent text-primary">
                          <RiLockPasswordFill size={20} />
                        </span>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control border-0 bg-transparent shadow-none"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="rememberMe" />
                        <label className="form-check-label small text-muted" htmlFor="rememberMe">تذكرني</label>
                      </div>
                      <a href="#" className="text-primary small text-decoration-none">نسيت كلمة المرور؟</a>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm mb-3"
                    >
                      تسجيل الدخول
                    </motion.button>

                    <div className="text-center">
                      <p className="small text-muted mb-0">
                        ليس لديك حساب؟ <Link to="/registerfreelancer" className="text-primary fw-bold text-decoration-none">أنشئ حساب مستقلاً الآن</Link>
                      </p>
                    </div>
                  </form>
                </div>

                {/* Image Section */}
                <div className="col-lg-6 bg-primary bg-opacity-10 d-none d-lg-flex align-items-center justify-content-center p-5">
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <img src={loginImage} alt="login" className="img-fluid mb-4" style={{ maxWidth: '80%' }} />
                    <h4 className="fw-bold text-primary">حوّل عملك الحر إلى احتراف</h4>
                    <p className="text-muted px-4">نحن نوفر لك الأدوات اللازمة لتنظيم أمورك المالية والتركيز على إبداعك.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginFreelancer;
