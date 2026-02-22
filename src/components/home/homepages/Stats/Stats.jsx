import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiUsers, FiClock, FiCheckCircle, FiGlobe } from "react-icons/fi";
import "./Stats.css";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const statsData = [
    { 
      value: 10500, 
      label: "Freelancers and teams trust us", 
      suffix: "+", 
      color: "#4AC5B5",
      icon: <FiUsers className="stat-icon" />
    },
    { 
      value: 68, 
      label: "Time saved on invoicing", 
      suffix: "%", 
      color: "#0d6efd",
      icon: <FiClock className="stat-icon" />
    },
    { 
      value: 250000, 
      label: "Successful financial operations", 
      suffix: "+", 
      color: "#4AC5B5",
      icon: <FiCheckCircle className="stat-icon" />
    },
    { 
      value: 85, 
      label: "Countries served", 
      suffix: "+", 
      color: "#0d6efd",
      icon: <FiGlobe className="stat-icon" />
    },
  ];

  // Counter Component
  const Counter = ({ end, duration = 2.5 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const isCountInView = useInView(countRef, { once: true });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (isCountInView && !hasAnimated) {
        setHasAnimated(true);
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
      }
    }, [isCountInView, end, duration, hasAnimated]);

    // Format number with commas
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return <span ref={countRef}>{formatNumber(count)}</span>;
  };

  // Variants for animations
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="stats-section py-5 overflow-hidden" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="badge bg-primary bg-opacity-10 rounded-pill px-4 py-2 mb-3"
            style={{ color: "#4AC5B5", border: "1px solid rgba(74, 197, 181, 0.2)" }}
          >
            📊 Platform Stats
          </motion.span>

          <h2 className="fw-bold display-6 mb-3">
            Numbers That <span className="gradient-text">Show Results</span>
          </h2>

          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "600px" }}>
            Track performance and run your business with confidence.
          </p>
        </motion.div>

        {/* Stats Cards */}
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
                  y: -8, 
                  boxShadow: `0 20px 40px ${stat.color}20`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="stat-card p-4 text-center rounded-4 bg-white h-100 position-relative overflow-hidden"
              >
                {/* Colored line on top */}
                <div 
                  className="position-absolute top-0 start-0 w-100"
                  style={{ 
                    height: "4px", 
                    background: stat.color,
                    opacity: 0.3
                  }}
                />

                {/* Icon Circle - صغير ومناسب */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                  className="d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: `${stat.color}15`,
                    borderRadius: "50%",
                    color: stat.color,
                    fontSize: "1.5rem",
                  }}
                >
                  {stat.icon}
                </motion.div>

                {/* Content */}
                <div className="position-relative">
                  {/* Number */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ 
                      delay: index * 0.1 + 0.3, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                    className="fw-bold mb-2"
                    style={{ 
                      color: stat.color,
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      lineHeight: 1.2
                    }}
                  >
                    <Counter end={stat.value} />
                    {stat.suffix}
                  </motion.div>

                  {/* Label */}
                  <p className="text-secondary mb-0 fw-medium" style={{ fontSize: "0.9rem" }}>
                    {stat.label}
                  </p>
                </div>

                {/* Simple hover effect - colored dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.2 }}
                  className="position-absolute"
                  style={{
                    width: "120px",
                    height: "120px",
                    background: stat.color,
                    borderRadius: "50%",
                    bottom: "-40px",
                    right: "-40px",
                    zIndex: 0,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: "100%" } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-5 mx-auto"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, #4AC5B5, transparent)",
            maxWidth: "300px",
            margin: "0 auto"
          }}
        />
      </div>
    </div>
  );
};

export default Stats;