import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Software.css';
import img from "../../../../images/Discover.webp";
import img1 from "../../../../images/Group3.svg";
import img2 from "../../../../images/Group.svg";
import img3 from "../../../../images/Group2.svg";
import img4 from "../../../../images/Vector2.svg";

const Software = () => {
  const features = [
    { img: img1, title: "الفواتير الذكية", desc: "توليد فواتير احترافية تلقائياً" },
    { img: img2, title: "تقارير مالية", desc: "رؤى شاملة لأدائك المالي" },
    { img: img3, title: "الامتثال الضريبي", desc: "دعم كامل لضريبة القيمة المضافة" },
    { img: img4, title: "دعم العملات", desc: "إصدار فواتير بمختلف العملات" }
  ];

  return (
    <div className="software-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary fw-bold text-uppercase"
          >
            برمجيات الأعمال الرائدة عالمياً
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="display-5 fw-bold"
          >
            أدوات قوية لإدارة مالية ذكية
          </motion.h2>
        </div>

        <div className="row align-items-center gy-5">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-lg-6"
          >
            <div className="image-container shadow-lg rounded-4 overflow-hidden">
              <img src={img} className="img-fluid" alt="Software Preview" />
            </div>
          </motion.div>

          <div className="col-lg-6">
            <div className="features-grid row g-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="col-md-6"
                >
                  <div className="feature-card p-4 rounded-4 bg-white shadow-sm h-100 border-bottom border-primary border-3">
                    <img src={feature.img} alt={feature.title} className="mb-3" style={{ width: '40px' }} />
                    <h5 className="fw-bold">{feature.title}</h5>
                    <p className="text-muted small mb-0">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="cta-box mt-5 p-5 rounded-5 text-white text-center shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #00d1b2 100%)' }}
        >
          <h3 className="fw-bold mb-4">احصل على نسخة تجريبية مجانية الآن</h3>
          <p className="mb-4 opacity-75">انضم إلى آلاف المستقلين الذين يديرون أعمالهم بذكاء</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/registerfreelancer" className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-primary">
              ابدأ الآن
            </Link>
            <Link to="/report" className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold">
              عرض التقارير
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Software;
