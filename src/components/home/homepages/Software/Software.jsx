import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Software.css";
import img from "../../../../images/Discover.webp";
import img1 from "../../../../images/Group3.svg";
import img2 from "../../../../images/Group.svg";
import img3 from "../../../../images/Group2.svg";
import img4 from "../../../../images/Vector2.svg";

const Software = () => {
  const features = [
    { img: img1, title: "Smart Invoices", desc: "Generate professional invoices in seconds.", color: "#4AC5B5" },
    { img: img2, title: "Financial Reports", desc: "Track your performance with interactive charts.", color: "#0d6efd" },
    { img: img3, title: "Tax Ready", desc: "Structure your billing data for compliance workflows.", color: "#4AC5B5" },
    { img: img4, title: "Multi-Currency", desc: "Issue invoices in multiple currencies worldwide.", color: "#0d6efd" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="software-section py-5 overflow-hidden">
      <div className="container">
        <div className="text-center mb-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-4 py-2 mb-3">Business Software</span>
            <h2 className="display-5 fw-bold mb-3">
              Powerful Tools For <span style={{ color: "#4AC5B5" }}>Smarter Finance</span>
            </h2>
            <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "700px" }}>
              Everything you need to manage invoices and billing in one place.
            </p>
          </motion.div>
        </div>

        <div className="row align-items-center gy-5">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="col-lg-6">
            <div className="image-container position-relative">
              <div className="position-absolute top-50 start-50 translate-middle" style={{ width: "300px", height: "300px", background: "radial-gradient(circle, rgba(74, 197, 181, 0.1) 0%, transparent 70%)", filter: "blur(40px)", zIndex: 0 }}></div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="position-relative rounded-4 overflow-hidden shadow-lg" style={{ zIndex: 1 }}>
                <img src={img} className="img-fluid w-100" alt="Software Preview" style={{ transition: "transform 0.5s ease" }} />
              </motion.div>
            </div>
          </motion.div>

          <div className="col-lg-6">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="features-grid row g-4">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants} className="col-md-6">
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }} className="feature-card p-4 rounded-4 bg-white shadow-sm h-100 border-0 position-relative overflow-hidden">
                    <div className="position-absolute top-0 start-0 w-100" style={{ height: "4px", background: `linear-gradient(90deg, ${feature.color}, transparent)`, borderRadius: "4px 4px 0 0" }}></div>

                    <motion.img whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} src={feature.img} alt={feature.title} className="mb-3" style={{ width: "48px", height: "48px" }} />

                    <h5 className="fw-bold mb-2" style={{ color: feature.color }}>{feature.title}</h5>
                    <p className="text-secondary small mb-0 lh-base">{feature.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="cta-box mt-5 p-5 rounded-5 text-white text-center position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4AC5B5 0%, #0d6efd 100%)" }}>
          <div className="position-relative">
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="fw-bold mb-4 display-6">
              Start Your Free Trial Today
            </motion.h3>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-5 fs-5 opacity-90">
              Join thousands of freelancers managing their work more efficiently.
            </motion.p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/registerfreelancer" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg" style={{ color: "#4AC5B5" }}>
                  Start Now
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/report" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold">
                  View Reports
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Software;
