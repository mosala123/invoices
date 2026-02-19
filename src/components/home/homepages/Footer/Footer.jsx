import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../../../../images/logo.svg";

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3 bg-dark text-white">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <img className="logo mb-3" src={logo} alt="Logo" style={{ height: '50px', filter: 'brightness(0) invert(1)' }} />
              <p className="text-light opacity-75">
                منصة ذكية للمستقلين والشركات الصغيرة لإنشاء فواتير احترافية تلقائياً وبكل سهولة. نهدف لتبسيط الإدارة المالية للجميع.
              </p>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 text-primary">روابط سريعة</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none opacity-75">الرئيسية</Link></li>
              <li className="mb-2"><Link to="/about" className="text-light text-decoration-none opacity-75">من نحن</Link></li>
              <li className="mb-2"><Link to="/create-invoice" className="text-light text-decoration-none opacity-75">إنشاء فاتورة</Link></li>
              <li className="mb-2"><Link to="/report" className="text-light text-decoration-none opacity-75">التقارير</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4 text-primary">النشرة البريدية</h5>
            <p className="text-light opacity-75 small mb-3">اشترك للحصول على آخر التحديثات والميزات الجديدة.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control border-0" placeholder="بريدك الإلكتروني" />
              <button className="btn btn-primary px-3" type="button">اشترك</button>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4 text-primary">تواصل معنا</h5>
            <p className="text-light opacity-75 mb-2">البريد الإلكتروني:</p>
            <a href="mailto:elmosalah74@gmail.com" className="text-light text-decoration-none fw-bold">elmosalah74@gmail.com</a>
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <div className="text-center">
          <p className="mb-0 opacity-50 small">
            © 2026 نظام توليد الفواتير التلقائي - تم التطوير بكل ❤️ بواسطة فريق يلا بينا
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
