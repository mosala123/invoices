import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import imageprofile from "../../images/profile.webp";
import { 
  FaBolt, FaPaperPlane, FaChartLine, 
  FaUser, FaUserTie, FaTwitter, FaFacebook, 
  FaLinkedin, FaCheckCircle 
} from "react-icons/fa";
import { FiMail, FiPhone, FiSend } from "react-icons/fi";
import './Noprofile.css';

const Noprofile = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="noprofile-page">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="hero-section py-5"
      >
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <motion.div 
              variants={fadeInLeft}
              className="col-lg-7 text-center text-lg-start"
            >
              <motion.h1 
                variants={fadeInUp}
                className="display-4 fw-bold mb-3 gradient-text"
              >
                Automated Invoice System
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="lead mb-4 text-secondary"
              >
                A complete solution for creating and managing invoices automatically. 
                Designed specifically for freelancers to help them organize their payments 
                with ease and professionalism.
              </motion.p>
              
              <motion.p 
                variants={fadeInUp}
                className="mb-4 text-secondary"
              >
                Whether you're handling multiple clients or managing recurring payments, 
                our system ensures smooth, error-free invoicing with real-time status updates.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="d-flex flex-column flex-md-row gap-3 align-items-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(74, 197, 181, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-primary btn-lg px-5 rounded-pill"
                  style={{ borderColor: '#4AC5B5', color: '#4AC5B5' }}
                >
                  See How It Works
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInRight}
              className="col-lg-5 text-center mt-4 mt-lg-0"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="image-wrapper position-relative"
              >
                <div className="blob-bg"></div>
                <img
                  src={imageprofile}
                  alt="Invoice System"
                  className="img-fluid rounded-4 shadow-lg position-relative"
                  style={{ zIndex: 1 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Welcome Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="welcome-section py-5"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 rounded-pill px-4 py-2 mb-3" 
                  style={{ color: '#4AC5B5', border: '1px solid rgba(74, 197, 181, 0.2)' }}>
              🎉 Welcome to Our Community
            </span>
            <h2 className="fw-bold display-6 mb-3">Join Thousands of Freelancers</h2>
            <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: '700px' }}>
              Join thousands of users and freelancers building their future with us.
              Create an account and get started today!
            </p>
          </motion.div>

          <div className="row justify-content-center g-4">
            <motion.div variants={scaleIn} className="col-lg-5 col-md-6">
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="card border-0 rounded-4 p-4 h-100 text-center shadow-sm"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ 
                    width: '70px', 
                    height: '70px', 
                    background: 'rgba(74, 197, 181, 0.1)',
                    color: '#4AC5B5'
                  }}
                >
                  <FaUser className="fs-2" />
                </motion.div>
                <h4 className="fw-bold mb-3">Register as User</h4>
                <p className="text-secondary mb-4">Create an account to access all features and manage your invoices.</p>
                <Link 
                  to="/registerclient" 
                  className="btn btn-primary rounded-pill py-2 mt-auto"
                  style={{ background: '#4AC5B5', borderColor: '#4AC5B5' }}
                >
                  Sign Up as User
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn} className="col-lg-5 col-md-6">
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="card border-0 rounded-4 p-4 h-100 text-center shadow-sm"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ 
                    width: '70px', 
                    height: '70px', 
                    background: 'rgba(13, 110, 253, 0.1)',
                    color: '#0d6efd'
                  }}
                >
                  <FaUserTie className="fs-2" />
                </motion.div>
                <h4 className="fw-bold mb-3">Register as Freelancer</h4>
                <p className="text-secondary mb-4">Join as a freelancer and offer your services with professional invoicing.</p>
                <Link 
                  to="/registerfreelancer" 
                  className="btn btn-primary rounded-pill py-2 mt-auto"
                  style={{ background: '#0d6efd', borderColor: '#0d6efd' }}
                >
                  Sign Up as Freelancer
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="features-section py-5 bg-light"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 rounded-pill px-4 py-2 mb-3"
                  style={{ color: '#4AC5B5', border: '1px solid rgba(74, 197, 181, 0.2)' }}>
              ✨ System Features
            </span>
            <h2 className="fw-bold display-6 mb-3">Everything You Need</h2>
            <p className="text-secondary fs-5">Powerful tools to streamline your invoicing process</p>
          </motion.div>

          <div className="row g-4">
            {[
              { icon: <FaBolt />, title: "Automated Invoice Generation", desc: "Create professional invoices with a single click based on your project data.", color: "#4AC5B5" },
              { icon: <FaPaperPlane />, title: "Instant Client Delivery", desc: "Send invoices automatically via email for seamless transactions.", color: "#0d6efd" },
              { icon: <FaChartLine />, title: "Detailed Financial Reports", desc: "Get insightful reports on your income and earnings monthly and annually.", color: "#6f42c1" }
            ].map((feature, index) => (
              <motion.div key={index} variants={scaleIn} className="col-md-4">
                <motion.div 
                  whileHover={{ y: -10, boxShadow: `0 20px 30px ${feature.color}20` }}
                  className="card border-0 rounded-4 p-4 h-100 text-center feature-card"
                  style={{ borderBottom: `3px solid ${feature.color}` }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      background: `${feature.color}15`,
                      color: feature.color 
                    }}
                  >
                    <span className="fs-2">{feature.icon}</span>
                  </motion.div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p className="text-secondary mb-0">{feature.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="how-it-works py-5"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <h2 className="fw-bold display-6 mb-3">How Does It Work?</h2>
            <p className="text-secondary fs-5">Four simple steps to professional invoicing</p>
          </motion.div>

          <div className="row g-4">
            {[
              { num: 1, title: "Enter Project Details", desc: "Fill in the details of the project or service", color: "#4AC5B5" },
              { num: 2, title: "Generate Invoice", desc: "System automatically generates the invoice", color: "#0d6efd" },
              { num: 3, title: "Send to Client", desc: "Send via email or WhatsApp instantly", color: "#FFB347" },
              { num: 4, title: "Track Payment", desc: "Monitor status and send reminders", color: "#FF6B6B" }
            ].map((step, index) => (
              <motion.div key={index} variants={scaleIn} className="col-md-3 col-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center step-card"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: step.color,
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      boxShadow: `0 10px 20px ${step.color}40`
                    }}
                  >
                    {step.num}
                  </motion.div>
                  <h5 className="fw-bold mb-2">{step.title}</h5>
                  <p className="text-secondary small">{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="why-choose-us py-5 bg-light"
      >
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div variants={fadeInLeft} className="col-lg-6">
              <h2 className="fw-bold display-6 mb-4 gradient-text">Why Choose Our System?</h2>
              
              {[
                "Save 80% of Your Invoicing Time",
                "Reduce Manual Accounting Errors",
                "Keep All Your Invoices Organized",
                "Generate Accurate Financial Reports"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="d-flex align-items-start mb-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FaCheckCircle className="text-success fs-4 me-3 flex-shrink-0" style={{ color: '#4AC5B5' }} />
                  <div>
                    <h5 className="fw-bold mb-1">{item}</h5>
                    <p className="text-secondary mb-0">
                      {index === 0 && "Automate your invoicing process and generate invoices in seconds, eliminating manual paperwork."}
                      {index === 1 && "Our system ensures accuracy in calculations, minimizing the risk of mistakes in financial records."}
                      {index === 2 && "Access and manage all your invoices in one place, making tracking and retrieval easy and efficient."}
                      {index === 3 && "Get detailed insights into your earnings and expenditures with automatically generated reports."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInRight} className="col-lg-6">
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg video-wrapper">
                <iframe
                  className="rounded-4"
                  src="https://www.youtube.com/embed/U19ugEMlcxI"
                  title="Why Invoicing is Important"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Comparison Table */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="comparison-section py-5"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <h2 className="fw-bold display-6 mb-3">Comparison with Traditional Methods</h2>
          </motion.div>

          <motion.div variants={scaleIn} className="table-responsive">
            <table className="table table-hover align-middle comparison-table">
              <thead>
                <tr>
                  <th className="p-3">Criteria</th>
                  <th className="p-3">Automated System</th>
                  <th className="p-3">Traditional Method</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { criteria: "Time Required", auto: "5 Minutes", autoColor: "text-success", trad: "1 Hour", tradColor: "text-danger" },
                  { criteria: "Accuracy", auto: "100%", autoColor: "text-success", trad: "Prone to Errors", tradColor: "text-danger" },
                  { criteria: "Organization", auto: "Centralized & Searchable", autoColor: "text-success", trad: "Scattered Files", tradColor: "text-danger" },
                  { criteria: "Tracking", auto: "Automated", autoColor: "text-success", trad: "Manual", tradColor: "text-danger" }
                ].map((row, index) => (
                  <motion.tr 
                    key={index}
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(74, 197, 181, 0.05)' }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <td className="fw-bold p-3">{row.criteria}</td>
                    <td className={`fw-bold ${row.autoColor} p-3`}>{row.auto}</td>
                    <td className={`fw-bold ${row.tradColor} p-3`}>{row.trad}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="faq-section py-5 bg-light"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <h2 className="fw-bold display-6 mb-3">Frequently Asked Questions</h2>
          </motion.div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {[
                { q: "Is the system free?", a: "Yes, the basic version is free with limited features. Paid subscriptions are available for advanced features." },
                { q: "How can I reset my password?", a: "Click on 'Forgot Password' on the login page and enter your email to receive a reset link." },
                { q: "Can I export invoices?", a: "Yes, the system supports exporting invoices in PDF and Excel formats." }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(74, 197, 181, 0.15)' }}
                  className="card border-0 rounded-4 p-4 mb-3 shadow-sm faq-card"
                >
                  <h5 className="fw-bold mb-2" style={{ color: '#4AC5B5' }}>{faq.q}</h5>
                  <p className="text-secondary mb-0">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="contact-section py-5 text-white"
        style={{ background: 'linear-gradient(135deg, #4AC5B5 0%, #0d6efd 100%)' }}
      >
        <div className="container">
          <div className="row g-4">
            <motion.div variants={fadeInUp} className="col-md-4">
              <h5 className="fw-bold mb-3">Contact Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex align-items-center">
                  <FiMail className="me-2" /> support@invoicesystem.com
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <FiPhone className="me-2" /> +966 12 345 6789
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="col-md-4">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                {[FaTwitter, FaFacebook, FaLinkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="text-white"
                  >
                    <Icon className="fs-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="col-md-4">
              <h5 className="fw-bold mb-3">Newsletter</h5>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control rounded-pill-start border-0"
                  placeholder="Your Email"
                  style={{ padding: '0.75rem 1.5rem' }}
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-light rounded-pill-end px-4 fw-bold"
                  style={{ color: '#4AC5B5' }}
                >
                  <FiSend />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 opacity-75">© 2024 Invoice System. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="text-white text-decoration-none me-3 opacity-75 hover-opacity-100">Terms & Conditions</a>
              <a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Noprofile;