import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import registerImage from "../../../images/signup-image-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterFreelancer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      toast.error("كلمات المرور غير متطابقة!", { position: "top-right" });
      return;
    }
    
    // Mocking registration for UI demonstration
    toast.success("تم إنشاء حساب المستقل بنجاح! انطلق الآن.", { position: "top-right" });
    setTimeout(() => {
      navigate("/loginfreelancer");
    }, 2000);
  };

  return (
    <div className="register-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="row justify-content-center"
        >
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Form Section */}
                <div className="col-lg-6 p-4 p-lg-5 bg-white order-2 order-lg-1">
                  <div className="mb-4">
                    <Link to="/" className="text-decoration-none text-muted small d-flex align-items-center mb-3">
                      <FaArrowLeft className="me-2" /> العودة للرئيسية
                    </Link>
                    <h2 className="fw-bold text-primary mb-2">انضم كمستقل! 🚀</h2>
                    <p className="text-muted">ابدأ رحلتك الاحترافية وأصدر فواتيرك بكل سهولة.</p>
                  </div>

                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted">الاسم الكامل</label>
                      <div className="input-group bg-light rounded-3 p-1">
                        <span className="input-group-text border-0 bg-transparent text-primary">
                          <MdPerson size={20} />
                        </span>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control border-0 bg-transparent shadow-none"
                          placeholder="أدخل اسمك بالكامل"
                          required
                        />
                      </div>
                    </div>

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

                    <div className="mb-3">
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

                    <div className="mb-4">
                      <label className="form-label small fw-bold text-muted">تأكيد كلمة المرور</label>
                      <div className="input-group bg-light rounded-3 p-1">
                        <span className="input-group-text border-0 bg-transparent text-primary">
                          <RiLockPasswordLine size={20} />
                        </span>
                        <input
                          value={repassword}
                          onChange={(e) => setRepassword(e.target.value)}
                          type="password"
                          className="form-control border-0 bg-transparent shadow-none"
                          placeholder="أعد كتابة كلمة المرور"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-check mb-4">
                      <input type="checkbox" className="form-check-input" id="terms" required />
                      <label className="form-check-label small text-muted" htmlFor="terms">
                        أوافق على <a href="#" className="text-primary text-decoration-none">الشروط والأحكام</a>.
                      </label>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm mb-3"
                    >
                      إنشاء حساب مستقل
                    </motion.button>

                    <div className="text-center">
                      <p className="small text-muted mb-0">
                        لديك حساب بالفعل؟ <Link to="/loginfreelancer" className="text-primary fw-bold text-decoration-none">سجل دخولك هنا</Link>
                      </p>
                    </div>
                  </form>
                </div>

                {/* Image Section */}
                <div className="col-lg-6 bg-primary bg-opacity-10 d-none d-lg-flex align-items-center justify-content-center p-5 order-1 order-lg-2">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <img src={registerImage} alt="register" className="img-fluid mb-4" style={{ maxWidth: '80%' }} />
                    <h4 className="fw-bold text-primary">أهلاً بك في عالم الاحتراف</h4>
                    <p className="text-muted px-4">نحن هنا لندعمك في كل خطوة من خطوات عملك الحر، من أول فاتورة وحتى النجاح الكبير.</p>
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

export default RegisterFreelancer;
