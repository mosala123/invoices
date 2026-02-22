import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Software.css";

// صور عصرية من Unsplash (مجانية)
const images = {
  // الصورة الرئيسية
  mainPreview: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&h=600&fit=crop&auto=format",
  
  // صور خلفية للبطاقات
  cardBackgrounds: [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=200&h=200&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=200&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&auto=format"
  ],
  
  // أيقونات SVG مباشرة
  icons: {
    invoice: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/file-text.svg",
    report: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/graph-up.svg",
    tax: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/calculator.svg",
    currency: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/currency-dollar.svg"
  }
};

const Software = () => {
  // ألوان محسنة
  const colors = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent1: "#06b6d4",
    accent2: "#10b981",
    gradient1: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    gradient2: "linear-gradient(135deg, #06b6d4, #10b981)",
    gradient3: "linear-gradient(135deg, #f97316, #f59e0b)"
  };

  const features = [
    { 
      icon: images.icons.invoice, 
      title: "Smart Invoices", 
      desc: "Generate professional invoices in seconds with automatic calculations.",
      color: colors.primary,
      gradient: colors.gradient1,
      bgImage: images.cardBackgrounds[0]
    },
    { 
      icon: images.icons.report, 
      title: "Financial Reports", 
      desc: "Track your performance with interactive charts and real-time analytics.",
      color: colors.accent1,
      gradient: colors.gradient2,
      bgImage: images.cardBackgrounds[1]
    },
    { 
      icon: images.icons.tax, 
      title: "Tax Ready", 
      desc: "Structure your billing data for compliance workflows and easy filing.",
      color: colors.accent2,
      gradient: colors.gradient1,
      bgImage: images.cardBackgrounds[2]
    },
    { 
      icon: images.icons.currency, 
      title: "Multi-Currency", 
      desc: "Issue invoices in multiple currencies with real-time exchange rates.",
      color: colors.secondary,
      gradient: colors.gradient3,
      bgImage: images.cardBackgrounds[3]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.3 
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 80,
        damping: 15
      } 
    },
  };

  return (
    <div className="software-section py-5 overflow-hidden">
      {/* خلفية متحركة */}
      <div className="software-background">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="circuit-pattern"></div>
      </div>

      <div className="container position-relative">
        {/* Header محسن */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="software-badge"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="18" rx="2" ry="2"/>
                <line x1="8" y1="9" x2="16" y2="9"/>
                <line x1="8" y1="13" x2="16" y2="13"/>
                <line x1="8" y1="17" x2="12" y2="17"/>
              </svg>
              Business Software
            </motion.span>

            <h2 className="software-title display-5 fw-bold mb-3 mt-4">
              Powerful Tools For{' '}
              <span className="gradient-text">
                Smarter Finance
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="software-subtitle text-secondary fs-5 mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Everything you need to manage invoices, track expenses, and grow your business in one powerful platform.
            </motion.p>
          </motion.div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="row align-items-center gy-5">
          {/* الجانب الأيسر - الصورة */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-lg-6"
          >
            <div className="image-showcase position-relative">
              {/* دوائر متحركة في الخلفية */}
              <div className="floating-circles">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="circle circle1"
                  style={{ background: colors.primary }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                  className="circle circle2"
                  style={{ background: colors.accent1 }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 45, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2,
                  }}
                  className="circle circle3"
                  style={{ background: colors.accent2 }}
                />
              </div>

              {/* الصورة الرئيسية مع تأثيرات */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="main-image-wrapper position-relative rounded-4 overflow-hidden shadow-xl"
              >
                <img
                  src={images.mainPreview}
                  className="img-fluid w-100"
                  alt="Software Preview"
                />
                
                {/* تراكب متدرج */}
                <div className="image-overlay"></div>
                
                {/* عناصر واجهة مستخدم متحركة */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="ui-element element1"
                >
                  <div className="ui-dot" style={{ background: colors.primary }}></div>
                  <span>+45% Growth</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="ui-element element2"
                >
                  <div className="ui-dot" style={{ background: colors.accent1 }}></div>
                  <span>1,234 Invoices</span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ui-element element3"
                >
                  <div className="ui-chart">
                    <div className="chart-bar" style={{ height: "30px" }}></div>
                    <div className="chart-bar" style={{ height: "50px" }}></div>
                    <div className="chart-bar" style={{ height: "40px" }}></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* الجانب الأيمن - المميزات */}
          <div className="col-lg-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="features-grid row g-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="col-md-6"
                >
                  <motion.div
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      boxShadow: `0 30px 50px ${feature.color}25`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="feature-card-enhanced p-4 rounded-4 h-100"
                  >
                    {/* صورة خلفية */}
                    <div
                      className="feature-bg-image"
                      style={{
                        backgroundImage: `url(${feature.bgImage})`,
                      }}
                    />

                    {/* شريط علوي متدرج */}
                    <div
                      className="feature-top-bar"
                      style={{ background: feature.gradient }}
                    />

                    {/* أيقونة محسنة */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="feature-icon-wrapper mb-3"
                      style={{ background: `${feature.color}15` }}
                    >
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="feature-icon"
                        style={{ filter: `brightness(0) invert(${feature.color === colors.primary ? '0.4' : '0.5'})` }}
                      />
                    </motion.div>

                    {/* المحتوى */}
                    <h5 className="feature-title fw-bold mb-2" style={{ color: feature.color }}>
                      {feature.title}
                    </h5>
                    <p className="feature-description text-secondary small mb-0 lh-base">
                      {feature.desc}
                    </p>

                    {/* مؤشر تقدم متحرك */}
                    <motion.div
                      className="feature-progress"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      style={{ background: feature.gradient }}
                    />

                    {/* رابط "اعرف المزيد" */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ x: 5 }}
                      className="feature-link mt-3"
                    >
                      <span style={{ color: feature.color }}>Learn more →</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Section محسنة */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="cta-enhanced mt-5 p-5 rounded-5 text-white text-center position-relative overflow-hidden"
        >
          {/* خلفية متحركة */}
          <div className="cta-background">
            <div className="cta-orb orb1"></div>
            <div className="cta-orb orb2"></div>
            <div className="cta-orb orb3"></div>
          </div>

          <div className="position-relative">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="cta-title fw-bold mb-4 display-6"
            >
              Start Your Free Trial Today
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="cta-description mb-5 fs-5"
            >
              Join thousands of freelancers managing their work more efficiently.
              <br />
              No credit card required.
            </motion.p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/registerfreelancer"
                  className="cta-button-primary btn btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
                >
                  <span className="button-content">
                    Start Now
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/report"
                  className="cta-button-secondary btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold"
                >
                  <span className="button-content">
                    View Reports
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18M18 17V9M12 17V5M6 17v-3"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* شارات الثقة */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="trust-badges mt-4"
            >
              <div className="d-flex justify-content-center gap-4">
                <span className="trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  No credit card
                </span>
                <span className="trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  256-bit SSL
                </span>
                <span className="trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  24/7 Support
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Software;