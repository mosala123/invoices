import React from "react";
import { motion } from "framer-motion";
import "./Time.css";

// صور عصرية من Unsplash (مجانية)
const images = {
  // أيقونات المميزات (SVG مباشرة)
  featureIcons: {
    saveTime: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/clock.svg",
    getPaid: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/wallet2.svg",
    stayOrganized: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/layout-three-columns.svg",
    workAnywhere: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/cloud-arrow-up.svg"
  },
  
  // صور القسم الرئيسي
  mainImages: [
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=400&fit=crop&auto=format", // محاسبة
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop&auto=format", // فواتير
    "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1200&h=600&fit=crop&auto=format", // تحليل مالي
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format" // أعمال
  ],
  
  // صور العملاء (شخصيات متنوعة)
  testimonials: [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format", // رجل أعمال
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format", // سيدة أعمال
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format", // مستشار
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format" // مصممة
  ]
};

const Time = () => {
  // ألوان محسنة
  const colors = {
    primary: "#6366f1", // Indigo
    secondary: "#8b5cf6", // Purple
    accent1: "#06b6d4", // Cyan
    accent2: "#10b981", // Emerald
    gradient1: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    gradient2: "linear-gradient(135deg, #06b6d4, #10b981)"
  };

  const features = [
    { 
      icon: images.featureIcons.saveTime, 
      title: "Save Time", 
      desc: "Create invoices in seconds instead of hours.", 
      color: colors.primary,
      gradient: colors.gradient1
    },
    { 
      icon: images.featureIcons.getPaid, 
      title: "Get Paid Faster", 
      desc: "Automatic reminders for outstanding payments.", 
      color: colors.accent1,
      gradient: colors.gradient2
    },
    { 
      icon: images.featureIcons.stayOrganized, 
      title: "Stay Organized", 
      desc: "Keep invoices and expenses in one place.", 
      color: colors.accent2,
      gradient: colors.gradient1
    },
    { 
      icon: images.featureIcons.workAnywhere, 
      title: "Work Anywhere", 
      desc: "Cloud access across devices, 24/7.", 
      color: colors.secondary,
      gradient: colors.gradient2
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Creative Director",
      image: images.testimonials[0],
      text: "Transformou completamente nosso fluxo de trabalho. Economizamos horas preciosas todas as semanas.",
      rating: 5,
      company: "Design Studio"
    },
    {
      name: "Sara Mahmoud",
      role: "Tech Lead",
      image: images.testimonials[1],
      text: "Interface intuitiva e recursos poderosos. A melhor ferramenta que já usei para gestão financeira.",
      rating: 5,
      company: "Innovation Labs"
    },
    {
      name: "Omar Abdelrahman",
      role: "Freelancer",
      image: images.testimonials[2],
      text: "Finalmente encontrei uma solução que entende as necessidades de freelancers. Simplesmente perfeito!",
      rating: 5,
      company: "Creative Hub"
    },
    {
      name: "Laila Mostafa",
      role: "Product Manager",
      image: images.testimonials[3],
      text: "A automação de lembretes aumentou nossa taxa de pagamento em 40%. Recomendo fortemente!",
      rating: 5,
      company: "Digital Solutions"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
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
    <section className="time-section py-5 overflow-hidden">
      {/* خلفية متحركة */}
      <div className="time-background">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
      </div>

      <div className="container position-relative">
        {/* Header محسن */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, ease: "easeOut" }} 
          className="text-center mb-5"
        >
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="time-badge"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Smart Solutions
          </motion.span>

          <h2 className="time-title display-5 fw-bold mb-3">
            Work Faster,{' '}
            <span className="gradient-text">
              Get Paid Sooner
            </span>
          </h2>

          <motion.p 
            className="time-subtitle text-secondary fs-5 mx-auto"
            style={{ maxWidth: "700px" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Smart tools built to simplify daily financial operations and boost your productivity.
          </motion.p>
        </motion.div>

        {/* Features Grid محسن */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          className="row g-4 mb-5"
        >
          {features.map((item, index) => (
            <motion.div 
              key={item.title} 
              variants={itemVariants} 
              className="col-lg-3 col-md-6 col-sm-6"
            >
              <motion.div 
                whileHover={{ 
                  y: -12, 
                  boxShadow: `0 30px 50px ${item.color}25`
                }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }} 
                className="feature-card p-4 text-center rounded-4 h-100"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                  className="feature-icon-wrapper mx-auto mb-3"
                  style={{ background: `${item.color}15` }}
                >
                  <img 
                    src={item.icon} 
                    alt={item.title}
                    className="feature-icon"
                    style={{ filter: `brightness(0) invert(1)` }}
                  />
                </motion.div>

                <h5 className="feature-title fw-bold mb-2" style={{ color: item.color }}>
                  {item.title}
                </h5>
                <p className="feature-desc text-secondary small mb-0">{item.desc}</p>

                <motion.div 
                  className="feature-progress"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  style={{ backgroundColor: item.color }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Section محسنة */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
          className="gallery-section mb-5"
        >
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <div className="row g-4 h-100">
                <div className="col-6">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="gallery-card h-100"
                  >
                    <img 
                      src={images.mainImages[0]} 
                      alt="Financial Dashboard"
                      className="gallery-img"
                    />
                    <div className="gallery-overlay">
                      <span className="gallery-tag">Analytics</span>
                    </div>
                  </motion.div>
                </div>
                <div className="col-6">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="gallery-card h-100"
                  >
                    <img 
                      src={images.mainImages[1]} 
                      alt="Invoice Management"
                      className="gallery-img"
                    />
                    <div className="gallery-overlay">
                      <span className="gallery-tag">Invoicing</span>
                    </div>
                  </motion.div>
                </div>
                <div className="col-12">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="gallery-card h-100"
                  >
                    <img 
                      src={images.mainImages[2]} 
                      alt="Financial Reports"
                      className="gallery-img"
                      style={{ height: "250px" }}
                    />
                    <div className="gallery-overlay">
                      <span className="gallery-tag">Reports</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="gallery-card h-100"
              >
                <img 
                  src={images.mainImages[3]} 
                  alt="Business Growth"
                  className="gallery-img"
                  style={{ height: "100%", minHeight: "500px" }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Growth</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section محسنة */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="testimonials-section"
        >
          <h3 className="testimonials-title text-center mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h3>

          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-lg-3 col-md-6"
              >
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="testimonial-card p-4 rounded-4 h-100"
                >
                  <div className="testimonial-header mb-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="testimonial-image"
                    />
                    <div>
                      <h6 className="testimonial-name fw-bold mb-1">
                        {testimonial.name}
                      </h6>
                      <p className="testimonial-role small mb-1">
                        {testimonial.role}
                      </p>
                      <p className="testimonial-company small text-primary">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="testimonial-rating mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="rating-star">★</span>
                    ))}
                  </div>

                  <p className="testimonial-text text-secondary mb-0">
                    "{testimonial.text}"
                  </p>

                  <div className="testimonial-quote">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M10 11h-4v-4h4v4zm8 0h-4v-4h4v4z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section جديدة */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="cta-section text-center mt-5"
        >
          <div className="cta-content p-5 rounded-4">
            <h3 className="cta-title mb-3">Ready to save time?</h3>
            <p className="cta-text mb-4">Join thousands of satisfied users today</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button"
            >
              Start Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Time;