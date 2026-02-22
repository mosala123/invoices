import React from "react";
import { motion } from "framer-motion";
import "./Successed.css";

// صور عصرية من Unsplash (مجانية)
const images = {
  // الصورة الرئيسية
  mainSuccess: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop&auto=format", // صورة اجتماع نجاح
  
  // صور خلفية للفوائد
  benefitBackgrounds: [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=200&h=200&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=200&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&auto=format"
  ],
  
  // صور إضافية
  successBadge: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&auto=format",
  celebration: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=150&h=150&fit=crop&auto=format"
};

// أيقونات SVG محسنة
const icons = {
  check: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/check-circle.svg",
  star: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/star.svg",
  graph: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/graph-up.svg",
  people: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/people.svg",
  rocket: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/rocket.svg",
  wallet: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/wallet2.svg",
  clock: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/clock.svg",
  globe: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/globe.svg"
};

const Successed = () => {
  // ألوان محسنة
  const colors = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent1: "#06b6d4",
    accent2: "#10b981",
    accent3: "#f97316",
    gradient1: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    gradient2: "linear-gradient(135deg, #06b6d4, #10b981)",
    gradient3: "linear-gradient(135deg, #f97316, #f59e0b)"
  };

  const benefits = [
    { 
      icon: icons.wallet, 
      text: "Hassle-free financial management", 
      color: colors.primary,
      gradient: colors.gradient1,
      bgImage: images.benefitBackgrounds[0],
      stats: "40% less time"
    },
    { 
      icon: icons.rocket, 
      text: "Easy to use and high performance", 
      color: colors.accent1,
      gradient: colors.gradient2,
      bgImage: images.benefitBackgrounds[1],
      stats: "99.9% uptime"
    },
    { 
      icon: icons.people, 
      text: "Affordable for growing teams", 
      color: colors.accent2,
      gradient: colors.gradient1,
      bgImage: images.benefitBackgrounds[2],
      stats: "From $9/month"
    },
    { 
      icon: icons.graph, 
      text: "Built to support business growth", 
      color: colors.accent3,
      gradient: colors.gradient3,
      bgImage: images.benefitBackgrounds[3],
      stats: "+156% growth"
    },
  ];

  // إحصائيات إضافية
  const successStats = [
    { value: "10k+", label: "Active Users", icon: icons.people, color: colors.primary },
    { value: "50k+", label: "Invoices Created", icon: icons.check, color: colors.accent1 },
    { value: "98%", label: "Satisfaction Rate", icon: icons.star, color: colors.accent2 },
  ];

  // شهادات سريعة
  const testimonials = [
    { name: "Ahmed S.", role: "Freelancer", quote: "Best decision for my business", rating: 5 },
    { name: "Sara M.", role: "Agency Owner", quote: "Incredible time saver", rating: 5 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="success-section py-5 overflow-hidden">
      {/* خلفية متحركة */}
      <div className="success-background">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="pattern-dots"></div>
      </div>

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* الجانب الأيسر - الصورة المحسنة */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-lg-6"
          >
            <div className="image-showcase-enhanced position-relative">
              {/* دوائر متحركة */}
              <div className="floating-shapes">
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
                  className="shape shape1"
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
                  className="shape shape2"
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
                  className="shape shape3"
                  style={{ background: colors.accent2 }}
                />
              </div>

              {/* الصورة الرئيسية مع تأثيرات */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="main-image-enhanced position-relative rounded-4 overflow-hidden shadow-xl"
              >
                <img
                  src={images.mainSuccess}
                  alt="Success Story"
                  className="img-fluid w-100"
                />
                
                {/* تراكب متدرج */}
                <div className="image-gradient-overlay"></div>
                
                {/* عناصر متحركة على الصورة */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="floating-card card1"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="success-badge-icon" style={{ background: colors.primary }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0" style={{ color: colors.primary }}>+98%</h6>
                      <small>Satisfied customers</small>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="floating-card card2"
                >
                  <div className="d-flex align-items-center gap-2">
                    <img src={images.successBadge} alt="team" className="rounded-circle" style={{ width: "30px", height: "30px", objectFit: "cover" }} />
                    <div>
                      <h6 className="fw-bold mb-0">10k+</h6>
                      <small>Active users</small>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="rotating-icon"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </motion.div>
              </motion.div>

              {/* شريط إحصائيات أسفل الصورة */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="stats-strip mt-4 p-3 rounded-4 bg-white shadow-lg"
              >
                <div className="row g-3">
                  {successStats.map((stat, index) => (
                    <div key={stat.label} className="col-4">
                      <div className="stat-item-mini text-center">
                        <img src={stat.icon} alt="" className="stat-mini-icon mb-1" style={{ filter: `brightness(0) invert(${index === 0 ? '0.4' : index === 1 ? '0.5' : '0.6'})` }} />
                        <h6 className="fw-bold mb-0" style={{ color: stat.color }}>{stat.value}</h6>
                        <small className="text-secondary">{stat.label}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* الجانب الأيمن - المحتوى المحسن */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-lg-6"
          >
            <div className="success-content-enhanced">
              {/* شارة مميزة */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <span className="success-badge">
                  <img src={icons.star} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
                  Customer Success Stories
                </span>
              </motion.div>

              {/* العنوان الرئيسي */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="success-title display-5 fw-bold mb-4"
              >
                Helping Small Businesses
                <br />
                <span className="gradient-text">
                  Grow Faster
                </span>
              </motion.h2>

              {/* الوصف */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="success-description lead text-secondary mb-5 fs-5"
              >
                Automate invoicing, track payments, and get clear financial insights without complexity. 
                Join thousands of successful businesses.
              </motion.p>

              {/* قائمة الفوائد المحسنة */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="benefits-grid mb-5"
              >
                {benefits.map((item, index) => (
                  <motion.div
                    key={item.text}
                    variants={itemVariants}
                    className="benefit-card-enhanced mb-3"
                  >
                    <motion.div
                      whileHover={{
                        x: 10,
                        boxShadow: `0 15px 30px ${item.color}20`,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="d-flex align-items-center gap-3 p-3 rounded-3"
                      style={{
                        background: `linear-gradient(90deg, ${item.color}08, transparent)`,
                        borderLeft: `4px solid ${item.color}`,
                      }}
                    >
                      {/* صورة خلفية */}
                      <div
                        className="benefit-bg"
                        style={{
                          backgroundImage: `url(${item.bgImage})`,
                        }}
                      />

                      {/* أيقونة */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="benefit-icon-wrapper rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`,
                          width: "54px",
                          height: "54px",
                        }}
                      >
                        <img
                          src={item.icon}
                          alt=""
                          style={{
                            width: "28px",
                            height: "28px",
                            filter: `brightness(0) invert(${item.color === colors.primary ? '0.4' : '0.5'})`,
                          }}
                        />
                      </motion.div>

                      {/* النص والإحصائية */}
                      <div className="flex-grow-1">
                        <p className="fw-medium mb-1" style={{ color: "#1e293b" }}>
                          {item.text}
                        </p>
                        <small className="benefit-stats" style={{ color: item.color }}>
                          {item.stats}
                        </small>
                      </div>

                      {/* سهم */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="benefit-arrow"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* قسم الشهادات السريعة */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="quick-testimonials"
              >
                <div className="d-flex gap-3">
                  {testimonials.map((t, i) => (
                    <div key={i} className="testimonial-mini p-2 rounded-3 bg-white shadow-sm">
                      <div className="d-flex align-items-center gap-2">
                        <div className="testimonial-avatar" style={{ background: colors.primary }}>
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <small className="fw-bold d-block">{t.name}</small>
                          <small className="text-secondary">{t.role}</small>
                        </div>
                      </div>
                      <div className="mt-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <span key={i} style={{ color: "#fbbf24" }}>★</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* زر الدعوة للإجراء */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="cta-wrapper mt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg rounded-pill px-5 py-3 fw-bold"
                  style={{
                    background: colors.gradient1,
                    color: "white",
                    border: "none",
                    boxShadow: `0 15px 30px ${colors.primary}40`,
                  }}
                >
                  <span className="d-flex align-items-center gap-2">
                    Start Your Success Story
                    <img src={icons.rocket} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Successed;