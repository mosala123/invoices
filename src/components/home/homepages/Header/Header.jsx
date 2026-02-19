import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Header.css';
import img1 from '../../../../images/man10.png';

const Header = () => {
  return (
    <div className="header-section py-5 overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-lg-6 col-md-12 text-right"
          >
            <div className="header-content">
              <h1 className="display-4 fw-bold mb-4">
                حلول <span className="text-primary">الفواتير الإلكترونية</span> <br />
                والإدارة المالية الذكية
              </h1>
              <p className="lead text-muted mb-5">
                نظام متكامل مصمم للمستقلين والشركات الصغيرة، يجعل عملية إصدار الفواتير، تتبع المصروفات، والإدارة المالية أمراً في غاية السهولة.
              </p>
              <div className="d-flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/create-invoice" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
                    ابدأ الآن مجاناً
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/about" className="btn btn-outline-secondary btn-lg rounded-pill px-5">
                    تعرف علينا
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="col-lg-6 col-md-12 mt-5 mt-lg-0 text-center"
          >
            <div className="image-wrapper position-relative">
              <div className="blob-bg"></div>
              <img className="img-fluid position-relative z-index-1" src={img1} alt="Finance Illustration" style={{ maxWidth: '80%' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Header;
