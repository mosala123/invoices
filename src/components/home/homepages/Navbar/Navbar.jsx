import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';
import logo from "../../../../images/logo.svg";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm ps-3 pe-3"
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="logo me-2" src={logo} alt="Logo" style={{ height: '40px' }} />
          <span className="fw-bold text-primary">InvoGen</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/about">من نحن</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/create-invoice">إنشاء فاتورة</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/report">التقارير</Link>
            </li>
          </ul>
          
          <div className="d-flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/loginfreelancer" className="btn btn-outline-primary rounded-pill px-4">تسجيل دخول</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/registerfreelancer" className="btn btn-primary rounded-pill px-4 text-white">ابدأ الآن</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
