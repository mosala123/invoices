import React from 'react';
import { motion } from 'framer-motion';
import './Stats.css';

const Stats = () => {
  const statsData = [
    { value: "10,000+", label: "مستقل وشركة يثقون بنا" },
    { value: "50%", label: "توفير في الوقت المستغرق" },
    { value: "50,000+", label: "عملية مالية ناجحة" },
    { value: "50+", label: "دولة حول العالم" }
  ];

  return (
    <div className="stats-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="fw-bold display-6"
          >
            إحصائياتنا تتحدث عنا
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-muted"
          >
            نحن نساعدك على تقييم وإدارة أعمالك في دقائق معدودة
          </motion.p>
        </div>

        <div className="row g-4 justify-content-center">
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="col-lg-3 col-md-6"
            >
              <div className="stat-card p-4 text-center rounded-4 bg-white shadow-sm">
                <h2 className="fw-bold text-primary mb-2">{stat.value}</h2>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;
