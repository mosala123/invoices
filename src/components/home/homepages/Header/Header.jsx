import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Header.css";
import img1 from "../../../../images/man10.png";

const Header = () => {
  return (
    <div className="header-section min-vh-100 d-flex align-items-center position-relative overflow-hidden">
      <div
        className="position-absolute w-100 h-100"
        style={{ background: "radial-gradient(circle at 30% 50%, rgba(74, 197, 181, 0.05) 0%, transparent 50%)" }}
      ></div>

      <div className="container position-relative">
        <div className="row align-items-center g-5 min-vh-100">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-lg-6 text-center text-lg-start"
          >
            <div className="header-content pe-lg-5">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-4">
                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-4 py-2">
                  Complete Invoicing Platform
                </span>
              </motion.div>

              <h1 className="display-3 fw-bold mb-4">
                Smart <span className="text-primary" style={{ color: "#4AC5B5" }}>E-Invoicing</span>
                <br />
                And Financial Management
              </h1>

              <p className="lead text-secondary mb-5 fs-5">
                A complete platform built for freelancers and small teams. Create invoices, track spending, and manage
                your finances with less effort.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/ " className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow-lg" style={{ background: "#4AC5B5", borderColor: "#4AC5B5" }}>
                    Start Free
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/about" className="btn btn-outline-secondary btn-lg rounded-pill px-5 py-3" style={{ borderColor: "#4AC5B5", color: "#4AC5B5" }}>
                    Learn More
                  </Link>
                </motion.div>
              </div>

              <div className="row g-4 mt-5">
                {[
                  { value: "10k+", label: "Active Users" },
                  { value: "50k+", label: "Invoices Created" },
                  { value: "95%", label: "Customer Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label} className="col-4">
                    <h3 className="h4 fw-bold mb-1" style={{ color: "#4AC5B5" }}>{stat.value}</h3>
                    <p className="small text-secondary mb-0">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-lg-6 d-none d-lg-block"
          >
            <div className="image-wrapper position-relative text-center">
              <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                  width: "400px",
                  height: "400px",
                  background: "radial-gradient(circle, rgba(74, 197, 181, 0.2) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  zIndex: 0,
                }}
              ></div>

              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="img-fluid position-relative"
                src={img1}
                alt="Finance Illustration"
                style={{ maxWidth: "90%", zIndex: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
