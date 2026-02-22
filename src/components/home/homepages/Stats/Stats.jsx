import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiUsers, FiClock, FiCheckCircle, FiGlobe, FiTrendingUp, FiAward } from "react-icons/fi";
import "./Stats.css";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // ألوان محسنة - أكثر عصرية وتناسقاً
  const colors = {
    primary: "#6366f1", // Indigo
    secondary: "#8b5cf6", // Purple
    accent1: "#06b6d4", // Cyan
    accent2: "#10b981", // Emerald
    gradient1: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    gradient2: "linear-gradient(135deg, #06b6d4, #10b981)"
  };

  const statsData = [
    { 
      value: 12500, 
      label: "Freelancers and teams trust us", 
      suffix: "+", 
      color: colors.primary,
      gradient: colors.gradient1,
      icon: <FiUsers className="stat-icon" />,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&auto=format" // صورة تعاون
    },
    { 
      value: 76, 
      label: "Time saved on invoicing", 
      suffix: "%", 
      color: colors.accent1,
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
      icon: <FiClock className="stat-icon" />,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&auto=format" // صورة وقت
    },
    { 
      value: 350000, 
      label: "Successful financial operations", 
      suffix: "+", 
      color: colors.accent2,
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      icon: <FiCheckCircle className="stat-icon" />,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop&auto=format" // صورة نجاح
    },
    { 
      value: 95, 
      label: "Countries served", 
      suffix: "+", 
      color: colors.secondary,
      gradient: colors.gradient1,
      icon: <FiGlobe className="stat-icon" />,
      image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=100&h=100&fit=crop&auto=format" // صورة عالم
    },
  ];

  // Counter Component محسن
  const Counter = ({ end, duration = 2.5, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const isCountInView = useInView(countRef, { once: true });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (isCountInView && !hasAnimated) {
        setHasAnimated(true);
        setTimeout(() => {
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);

          return () => clearInterval(timer);
        }, delay * 1000);
      }
    }, [isCountInView, end, duration, hasAnimated, delay]);

    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return <span ref={countRef} className="counter-value">{formatNumber(count)}</span>;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <div className="stats-section py-5 overflow-hidden" ref={ref}>
      {/* خلفية متحركة */}
      <div className="stats-background">
        <div className="gradient-orb orbl"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
      </div>

      <div className="container position-relative">
        {/* Header محسن */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-5"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="stats-badge"
          >
            <FiTrendingUp className="me-2" /> 📊 Real-Time Statistics
          </motion.span>

          <h2 className="stats-title display-6 fw-bold mb-3">
            Growth in <span className="gradient-text-main">Numbers</span>
          </h2>

          <motion.p 
            className="stats-subtitle text-secondary fs-5 mx-auto"
            style={{ maxWidth: "600px" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Track performance and run your business with confidence. 
            Join thousands of satisfied users worldwide.
          </motion.p>
        </motion.div>

        {/* Stats Cards محسنة */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="row g-4 justify-content-center"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="col-lg-3 col-md-6 col-sm-6"
            >
              <motion.div
                whileHover={{ 
                  y: -12, 
                  boxShadow: `0 30px 50px ${stat.color}25`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="stat-card-enhanced p-4 text-center rounded-4 h-100"
              >
                {/* صورة مصغرة في الخلفية */}
                <div 
                  className="stat-card-bg-image"
                  style={{
                    backgroundImage: `url(${stat.image})`,
                    opacity: 0.03
                  }}
                />

                {/* أيقونة محسنة */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    delay: index * 0.1 + 0.3, 
                    type: "spring", 
                    stiffness: 200,
                    damping: 15
                  }}
                  className="stat-icon-wrapper mx-auto mb-3"
                  style={{ 
                    background: `linear-gradient(145deg, ${stat.color}15, ${stat.color}05)`,
                    borderColor: stat.color
                  }}
                >
                  {stat.icon}
                </motion.div>

                <div className="position-relative">
                  {/* العدد */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="stat-number-wrapper"
                  >
                    <span 
                      className="stat-number"
                      style={{ 
                        background: stat.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      <Counter end={stat.value} delay={index * 0.2} />
                      {stat.suffix}
                    </span>
                  </motion.div>

                  {/* النص */}
                  <p className="stat-label mb-0">
                    {stat.label}
                  </p>

                  {/* مؤشر صغير أسفل البطاقة */}
                  <motion.div 
                    className="stat-progress"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    style={{ backgroundColor: stat.color }}
                  />
                </div>

                {/* تأثير متوهج عند التحويم */}
                <motion.div
                  className="stat-glow-effect"
                  style={{ background: `radial-gradient(circle at center, ${stat.color}40, transparent 70%)` }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 0.8, scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* قسم إضافي - شارة الجودة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-5"
        >
          <div className="trust-badge">
            <FiAward className="trust-icon" />
            <span>Trusted by leading companies worldwide</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;