import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Header.css";

// صور عصرية من Unsplash
const heroImages = {
  main: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=800&fit=crop&auto=format", // صورة محاسبة وفواتير
  pattern: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=400&fit=crop&auto=format", // خلفية نقش
  floating1: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=200&fit=crop&auto=format", // عنصر عائم 1
  floating2: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=150&h=150&fit=crop&auto=format", // عنصر عائم 2
};

const Header = () => {
  // ألوان محسنة
  const colors = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent1: "#06b6d4",
    accent2: "#10b981",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
  };

  // متغيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="header-section min-vh-100 d-flex align-items-center position-relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="header-background">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* جسيمات متحركة */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            style={{
              background: `radial-gradient(circle, ${colors.primary}${Math.floor(Math.random() * 30 + 10).toString(16)}, transparent)`,
            }}
          />
        ))}
      </div>

      <div className="container position-relative">
        <div className="row align-items-center min-vh-100 g-5">
          {/* الجانب الأيسر - النصوص */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-lg-6 text-center text-lg-start"
          >
            <div className="header-content pe-lg-5">
              {/* شارة مميزة */}
              <motion.div variants={itemVariants} className="mb-4">
                <span className="header-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Complete Invoicing Platform
                </span>
              </motion.div>

              {/* العنوان الرئيسي */}
              <motion.h1 variants={itemVariants} className="header-title display-3 fw-bold mb-4">
                Smart <span className="gradient-text">E-Invoicing</span>
                <br />
                And Financial Management
              </motion.h1>

              {/* الوصف */}
              <motion.p variants={itemVariants} className="header-description lead text-secondary mb-5 fs-5">
                A complete platform built for freelancers and small teams.
                Create invoices, track spending, and manage your finances with less effort.
              </motion.p>

              {/* الأزرار */}
              <motion.div variants={itemVariants} className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/"
                    className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow-lg"
                    style={{
                      background: colors.gradient,
                      border: "none",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <span className="btn-content">Start Free</span>
                    <motion.div
                      className="btn-shine"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/about"
                    className="btn btn-outline-primary btn-lg rounded-pill px-5 py-3"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>

              {/* الإحصائيات */}
              <div variants={itemVariants} className="stats-container mt-5 text-center">
                <div className="row g-4 justify-content-center">
                  {[
                    { value: "10k+", label: "Active Users", icon: " " },
                    { value: "50k+", label: "Invoices Created", icon: "" },
                    { value: "95%", label: "Customer Satisfaction", icon: "" },
                  ].map((stat) => (
                    <div key={stat.label} className="col-4">
                      <div className="stat-item p-3">
s                        <h3 className="stat-value h4 fw-bold mb-1">{stat.value}</h3>
                        <p className="stat-label small text-secondary mb-0">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* الجانب الأيمن - الصور */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="col-lg-6 d-none d-lg-block"
          >
            <div className="image-showcase position-relative">
              {/* الصورة الرئيسية */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="main-image-wrapper"
              >
                <img
                  src={heroImages.main}
                  alt="Financial Dashboard"
                  className="main-image"
                />
                <div className="image-glow"></div>
              </motion.div>

              {/* عناصر عائمة */}
              <motion.div
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
                className="floating-element element1"
              >
                <img src={heroImages.floating1} alt="Floating element" />
                <div className="floating-badge">
                  <span className="badge-text">+25%</span>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
                className="floating-element element2"
              >
                <img src={heroImages.floating2} alt="Floating element" />
                <div className="floating-badge">
                  <span className="badge-text">$10.5k</span>
                </div>
              </motion.div>

              {/* أيقونات متحركة */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="floating-icon icon1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.primary}>
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="floating-icon icon2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.accent1}>
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="floating-icon icon3"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.accent2}>
                  <polygon points="12,2 22,7 22,17 12,22 2,17 2,7 12,2" />
                </svg>
              </motion.div>

              {/* خطوط متحركة */}
              <svg className="animated-lines" viewBox="0 0 200 200">
                <motion.path
                  d="M 50,100 Q 100,50 150,100"
                  stroke={colors.primary}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* شريط التمرير للأسفل */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="scroll-indicator"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="scroll-mouse"
        >
          <div className="scroll-wheel"></div>
        </motion.div>
        <span className="scroll-text">Scroll</span>
      </motion.div>
    </div>
  );
};

export default Header;