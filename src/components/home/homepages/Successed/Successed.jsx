import React from "react";
import { motion } from "framer-motion";
import "./Successed.css";
import img from "../../../../images/man2.webp";
import img1 from "../../../../images/Group3.svg";
import img2 from "../../../../images/Group.svg";
import img3 from "../../../../images/Group2.svg";
import img4 from "../../../../images/Vector2.svg";

const Successed = () => {
  const benefits = [
    { img: img1, text: "Hassle-free financial management", color: "#4AC5B5" },
    { img: img2, text: "Easy to use and high performance", color: "#0d6efd" },
    { img: img3, text: "Affordable for growing teams", color: "#4AC5B5" },
    { img: img4, text: "Built to support business growth", color: "#0d6efd" },
  ];

  return (
    <div className="success-section py-5 overflow-hidden">
      <div className="container">
        <div className="row align-items-center g-5">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="col-lg-6">
            <div className="position-relative">
              <div className="position-absolute top-50 start-50 translate-middle" style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(74, 197, 181, 0.1) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }}></div>

              <motion.img whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} src={img} alt="Success Story" className="img-fluid rounded-4 shadow-lg position-relative" style={{ zIndex: 1 }} />

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="position-absolute bottom-0 end-0 bg-white p-3 rounded-4 shadow-lg" style={{ transform: "translate(-20px, -20px)", zIndex: 2 }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success bg-opacity-10 p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#4AC5B5">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: "#4AC5B5" }}>+98%</h6>
                    <small className="text-secondary">Satisfied customers</small>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="col-lg-6">
            <div className="success-content">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-4 py-2">Customer Success</span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="display-5 fw-bold mb-4">
                Helping Small Businesses
                <br />
                <span style={{ color: "#4AC5B5" }}>Grow Faster</span>
              </motion.h2>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lead text-secondary mb-5 fs-5">
                Automate invoicing, track payments, and get clear financial insights without complexity.
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="visible" className="benefits-list">
                {benefits.map((item) => (
                  <motion.div key={item.text} variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } } }} className="d-flex align-items-center gap-3 mb-4 p-3 rounded-3" style={{ background: "linear-gradient(90deg, rgba(74, 197, 181, 0.05), transparent)" }}>
                    <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.3 }} className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: `${item.color}15`, width: "48px", height: "48px" }}>
                      <img src={item.img} alt="" style={{ width: "28px", height: "28px" }} />
                    </motion.div>

                    <p className="fw-medium mb-0 fs-6" style={{ color: "#2d3436" }}>{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Successed;
