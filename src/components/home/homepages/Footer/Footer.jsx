// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Footer.css";

// أيقونات SVG مباشرة
const icons = {
  // أيقونات التواصل الاجتماعي
  facebook: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/facebook.svg",
  twitter: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/twitter-x.svg",
  linkedin: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/linkedin.svg",
  instagram: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/instagram.svg",
  github: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/github.svg",
  
  // أيقونات التواصل
  email: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/envelope.svg",
  phone: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/telephone.svg",
  location: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/geo-alt.svg",
  
  // أيقونات القائمة
  home: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/house.svg",
  info: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/info-circle.svg",
  file: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/file-text.svg",
  graph: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/graph-up.svg",
  shield: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/shield-check.svg",
  
  // أيقونات الدفع
  visa: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/credit-card.svg",
  paypal: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/paypal.svg",
  mastercard: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/credit-card-2-front.svg",
};

const Footer = () => {
  // ألوان محسنة لكل نوع
  const colors = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent1: "#06b6d4",
    accent2: "#10b981",
    accent3: "#f97316",
    social: {
      facebook: "#1877f2",
      twitter: "#1da1f2",
      linkedin: "#0a66c2",
      instagram: "#e4405f",
      github: "#333",
    },
    contact: {
      email: "#ea4335",
      phone: "#34a853",
      location: "#fbbc05",
    },
    payment: {
      visa: "#1a1f71",
      mastercard: "#eb001b",
      paypal: "#003087",
    },
    gradient1: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    gradient2: "linear-gradient(135deg, #06b6d4, #10b981)",
    gradient3: "linear-gradient(135deg, #f97316, #f59e0b)",
  };

  // روابط سريعة مع أيقونات
  const quickLinks = [
    { to: "/", label: "Home", icon: icons.home, color: colors.primary },
    { to: "/about", label: "About Us", icon: icons.info, color: colors.secondary },
    { to: "/create-invoice", label: "Create Invoice", icon: icons.file, color: colors.accent1 },
    { to: "/report", label: "Financial Reports", icon: icons.graph, color: colors.accent2 },
    { to: "/privacy", label: "Privacy Policy", icon: icons.shield, color: colors.accent3 },
  ];

  // معلومات الاتصال مع ألوان مخصصة
  const contactInfo = [
    { 
      type: "email", 
      value: "elmosalah74@gmail.com", 
      icon: icons.email, 
      link: "mailto:elmosalah74@gmail.com",
      color: colors.contact.email 
    },
    { 
      type: "phone", 
      value: "+1 (555) 123-4567", 
      icon: icons.phone, 
      link: "tel:+15551234567",
      color: colors.contact.phone 
    },
    { 
      type: "address", 
      value: "123 Business Ave, Suite 100", 
      icon: icons.location, 
      link: "#",
      color: colors.contact.location 
    },
  ];

  // روابط التواصل الاجتماعي مع ألوانها الأصلية
  const socialLinks = [
    { platform: "Facebook", icon: icons.facebook, url: "https://facebook.com", color: colors.social.facebook },
    { platform: "Twitter", icon: icons.twitter, url: "https://twitter.com", color: colors.social.twitter },
    { platform: "LinkedIn", icon: icons.linkedin, url: "https://linkedin.com", color: colors.social.linkedin },
    { platform: "Instagram", icon: icons.instagram, url: "https://instagram.com", color: colors.social.instagram },
    { platform: "GitHub", icon: icons.github, url: "https://github.com", color: colors.social.github },
  ];

  // طرق الدفع مع ألوان مخصصة
  const paymentMethods = [
    { name: "Visa", icon: icons.visa, color: colors.payment.visa },
    { name: "Mastercard", icon: icons.mastercard, color: colors.payment.mastercard },
    { name: "PayPal", icon: icons.paypal, color: colors.payment.paypal },
  ];

  // إحصائيات سريعة
  const stats = [
    { value: "10k+", label: "Users", color: colors.primary },
    { value: "50k+", label: "Invoices", color: colors.accent1 },
    { value: "98%", label: "Satisfaction", color: colors.accent2 },
  ];

  // متغيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <footer className="footer-enhanced pt-5 pb-3 text-white position-relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="footer-background">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* خط علوي متحرك */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="footer-top-line"
        style={{ background: colors.gradient1 }}
      />

      <div className="container position-relative">
        {/* الصف العلوي */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="row gy-5 gx-4"
        >
          {/* العمود الأول - العلامة التجارية */}
          <motion.div variants={itemVariants} className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="logo-wrapper mb-3"
              >
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="12" fill="url(#gradient)" />
                  <path d="M15 25L22 32L35 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1"/>
                      <stop offset="1" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="brand-name ms-2 fw-bold fs-4">InvoGen</span>
              </motion.div>

              <p className="brand-description text-light opacity-75 mb-4">
                A smart platform for freelancers and small teams to create invoices quickly and keep finances organized.
              </p>

              {/* إحصائيات سريعة - بألوان مختلفة */}
              <div className="footer-stats d-flex gap-3 mb-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="stat-item"
                  >
                    <h6 className="fw-bold mb-0" style={{ color: stat.color }}>{stat.value}</h6>
                    <small className="text-dark fw-bold">{stat.label}</small>
                  </motion.div>
                ))}
              </div>

              {/* أيقونات التواصل الاجتماعي - كل واحد بلونه */}
              <div className="social-links d-flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="social-link rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      backgroundColor: `${social.color}20`,
                      borderColor: social.color 
                    }}
                  >
                    <img 
                      src={social.icon} 
                      alt={social.platform} 
                      style={{ 
                        width: "18px", 
                        height: "18px",
                        filter: "brightness(0) invert(1)",
                        transition: "all 0.3s ease"
                      }} 
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* العمود الثاني - روابط سريعة */}
          <motion.div variants={itemVariants} className="col-lg-2 col-md-6">
            <h5 className="footer-title fw-bold mb-4 position-relative">
              Quick Links
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "30px" }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="title-underline"
                style={{ background: colors.primary }}
              />
            </h5>
            <ul className="footer-links list-unstyled">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="mb-2"
                >
                  <Link
                    to={link.to}
                    className="text-light text-decoration-none d-flex align-items-center gap-2"
                  >
                    <img 
                      src={link.icon} 
                      alt="" 
                      style={{ 
                        width: "16px", 
                        height: "16px", 
                        filter: "brightness(0) saturate(100%) invert(1)",
                        opacity: 0.8,
                        transition: "all 0.3s ease"
                      }} 
                    />
                    <span className="link-text" style={{ color: link.color }}>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* العمود الثالث - النشرة البريدية */}
          <motion.div variants={itemVariants} className="col-lg-3 col-md-6">
            <h5 className="footer-title fw-bold mb-4 position-relative">
              Newsletter
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "30px" }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="title-underline"
                style={{ background: colors.accent1 }}
              />
            </h5>
            <p className="text-light opacity-75 small mb-3">
              Subscribe to get product updates, new features, and exclusive offers.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="newsletter-wrapper position-relative mb-3"
            >
              <input
                type="email"
                className="newsletter-input form-control border-0"
                placeholder="Your email address"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="newsletter-button btn position-absolute end-0 top-50 translate-middle-y"
                style={{ background: colors.gradient1, color: "white" }}
              >
                <img 
                  src={icons.email} 
                  alt="" 
                  style={{ 
                    width: "18px", 
                    height: "18px", 
                    filter: "brightness(0) invert(1)" 
                  }} 
                />
              </motion.button>
            </motion.div>

            {/* طرق الدفع - بألوان مختلفة */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="payment-methods mt-4"
            >
              <p className="small text-light opacity-50 mb-2">Secure payment methods:</p>
              <div className="d-flex gap-2">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    whileHover={{ y: -3 }}
                    transition={{ delay: index * 0.1 }}
                    className="payment-icon p-2 rounded bg-white bg-opacity-10 d-flex align-items-center gap-1"
                  >
                    <img 
                      src={method.icon} 
                      alt={method.name} 
                      style={{ 
                        width: "24px", 
                        height: "24px", 
                        filter: "brightness(0) saturate(100%) invert(1)",
                        opacity: 0.7 
                      }} 
                    />
                    <span className="small fw-bold" style={{ color: method.color }}>{method.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* العمود الرابع - معلومات الاتصال */}
          <motion.div variants={itemVariants} className="col-lg-3 col-md-6">
            <h5 className="footer-title fw-bold mb-4 position-relative">
              Contact Us
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "30px" }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="title-underline"
                style={{ background: colors.accent2 }}
              />
            </h5>

            <ul className="contact-list list-unstyled">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={info.type}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="mb-3"
                >
                  <a
                    href={info.link}
                    className="text-light text-decoration-none d-flex align-items-start gap-2"
                  >
                    <img 
                      src={info.icon} 
                      alt="" 
                      style={{ 
                        width: "18px", 
                        height: "18px", 
                        filter: "brightness(0) saturate(100%) invert(1)",
                        opacity: 0.7, 
                        marginTop: "2px",
                        transition: "all 0.3s ease"
                      }} 
                    />
                    <span className="contact-text opacity-75 small" style={{ color: info.color }}>{info.value}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* شارة الثقة */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="trust-badge mt-4 p-2 rounded-3"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <div className="d-flex align-items-center gap-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <div>
                  <small className="fw-bold d-block">SSL Secure</small>
                  <small className="opacity-50">256-bit encryption</small>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* خط فاصل متحرك */}
        <motion.hr
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.25 }}
          transition={{ delay: 1, duration: 1 }}
          className="my-4"
          style={{ borderColor: "white" }}
        />

        {/* الصف السفلي - الحقوق والروابط */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="row align-items-center"
        >
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 opacity-50 small">
              © {new Date().getFullYear()} InvoGen. All rights reserved.
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <div className="legal-links d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="/terms" className="text-light text-decoration-none opacity-50 small">Terms</Link>
              <Link to="/privacy" className="text-light text-decoration-none opacity-50 small">Privacy</Link>
              <Link to="/cookies" className="text-light text-decoration-none opacity-50 small">Cookies</Link>
            </div>
          </div>
        </motion.div>

        {/* زر العودة للأعلى */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          whileHover={{ y: -5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scroll-top-btn position-absolute d-flex align-items-center justify-content-center rounded-circle border-0"
          style={{ background: colors.gradient1, color: "white", right: "20px", bottom: "20px", width: "45px", height: "45px" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;