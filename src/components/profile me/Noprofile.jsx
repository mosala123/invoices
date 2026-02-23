import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBolt, FaPaperPlane, FaChartLine,
  FaUser, FaUserTie, FaTwitter, FaFacebook,
  FaLinkedin, FaCheckCircle, FaRocket, FaClock,
  FaShieldAlt, FaUsers, FaGlobe, FaAward,
  FaStar, FaRegEnvelope, FaRegBell, FaRegUser
} from "react-icons/fa";
import { FiMail, FiPhone, FiSend, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BiMessageDetail, BiUser, BiBriefcase } from "react-icons/bi";
import { MdOutlinePayment, MdWork, MdOutlineDashboard } from "react-icons/md";
import { IoIosStats, IoIosSettings } from "react-icons/io";
import './Noprofile.css';

// صور محسنة من Unsplash (مجانية)
const images = {
  // صورة بروفايل احترافية
  profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&auto=format",
  // صور المميزات
  feature1: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&auto=format",
  feature2: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=400&fit=crop&auto=format",
  feature3: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",

  // صور الشهادات
  testimonial1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format",
  testimonial2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format",
  testimonial3: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format",

  // صور إضافية
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format"
};

const Noprofile = () => {
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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="noprofile-page">
      {/* خلفية متحركة */}
      <div className="page-background">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="pattern-dots"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="hero-section py-5 position-relative"
      >
        <div className="container position-relative">
          <div className="row align-items-center min-vh-80 g-5">
            <motion.div
              variants={fadeInLeft}
              className="col-lg-7 text-center text-lg-start"
            >
              <motion.div
                variants={fadeInUp}
                className="hero-badge mb-4"
              >
                <FaRocket className="me-2" />
                Professional Profile
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="hero-title display-4 fw-bold mb-4"
              >
                Your Complete <span className="gradient-text">Professional</span>
                <br />Profile Management
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="hero-description lead mb-4"
              >
                Manage your professional identity, showcase your work, and connect with clients
                all in one place. Create a profile that stands out and attracts opportunities.
              </motion.p>


<div className="hero-stats d-flex flex-wrap justify-content-center align-items-center gap-4 mb-4">
  <div className="stat-item p-3 rounded text-center bg-white shadow-sm">
    <h3 className="fw-bold mb-0">
      <span className="text-primary link-primary text-decoration-none">10k+</span>
    </h3>
    <small className="text-dark fw-bold ">Active Users</small>
  </div>
  
  <div className="stat-item p-3 rounded text-center bg-white shadow-sm">
    <h3 className="fw-bold mb-0">
      <span className="text-success link-success text-decoration-none">5k+</span>
    </h3>
    <small className="text-dark fw-bold">Professionals</small>
  </div>
  
  <div className="stat-item p-3 rounded text-center bg-white shadow-sm">
    <h3 className="fw-bold mb-0">
      <span className="text-info link-info text-decoration-none">98%</span>
    </h3>
    <small className="text-dark fw-bold ">Satisfaction</small>
  </div>
</div>


              <motion.div
                variants={fadeInUp}
                className="d-flex flex-column flex-md-row gap-3 align-items-center px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg px-5 rounded-pill hero-btn nowrap d-flex"
                  style={{ background: colors.gradient1, border: 'none', flexWrap: "nowrap" }}
                >
                  <span className="d-flex align-items-center gap-2"  >
                    Create Your Profile
                    <FiArrowRight />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-primary btn-lg px-5 rounded-pill hero-btn-outline"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  View Examples
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              className="col-lg-5 text-center mt-4 mt-lg-0 mt-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="image-showcase position-relative"
              >
                <div className="floating-shapes">
                  <div className="shape shape1" style={{ background: colors.primary }}></div>
                  <div className="shape shape2" style={{ background: colors.accent1 }}></div>
                  <div className="shape shape3" style={{ background: colors.accent2 }}></div>
                </div>

                <img
                  src={images.profileImage}
                  alt="Professional Profile"
                  className="hero-image img-fluid rounded-4 shadow-xl"
                />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="floating-card card1"
                >
                  <FaCheckCircle className="text-success me-2" />
                  <span>Verified Professional</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="floating-card card2"
                >
                  <FaAward className="me-2" style={{ color: colors.accent1 }} />
                  <span>Top Rated</span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="floating-icon"
                >
                  <FaUsers style={{ color: colors.primary }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Welcome Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="welcome-section py-5"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <span className="section-badge">
              🎉 Welcome Aboard
            </span>
            <h2 className="section-title display-6 fw-bold mb-3">
              Join Thousands of <span className="gradient-text">Professionals</span>
            </h2>
            <p className="section-description text-secondary fs-5 mx-auto">
              Create your professional profile and start connecting with opportunities today.
              Choose the account type that fits your needs.
            </p>
          </motion.div>

          <div className="row justify-content-center g-4">
            <motion.div variants={scaleIn} className="col-lg-5 col-md-6">
              <motion.div
                whileHover={{ y: -15 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="register-card card border-0 rounded-4 p-4 h-100"
              >
                <div className="card-shine"></div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="card-icon-wrapper mx-auto mb-4"
                  style={{ background: `${colors.primary}15`, color: colors.primary }}
                >
                  <FaUser className="fs-2" />
                </motion.div>
                <h4 className="fw-bold mb-3">Register as User</h4>
                <p className="text-secondary mb-4">Create a personal account to access all features, manage your profile, and connect with freelancers.</p>
                <ul className="list-unstyled text-start mb-4">
                  <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: colors.primary }} /> Personal dashboard</li>
                  <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: colors.primary }} /> Project management</li>
                  <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: colors.primary }} /> Client communication</li>
                </ul>
                <Link
                  to="/registerclient"
                  className="register-btn btn rounded-pill py-3 mt-auto"
                  style={{ background: colors.gradient1 }}
                >
                  Sign Up as User
                  <FiArrowRight className="ms-2" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn} className="col-lg-5 col-md-6">
              <motion.div
                whileHover={{ y: -15 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="register-card card border-0 rounded-4 p-4 h-100"
              >
                <div className="card-shine"></div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="card-icon-wrapper mx-auto mb-4"
                  style={{ background: `${colors.accent1}15`, color: colors.accent1 }}
                >
                  <FaUserTie className="fs-2" />
                </motion.div>
                <h4 className="fw-bold mb-3">Register as Freelancer</h4>
                <p className="text-secondary mb-4">Join as a freelancer to offer your services, showcase your portfolio, and manage professional invoicing.</p>
                <ul className="list-unstyled text-start mb-4">
                  <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: colors.accent1 }} /> Professional portfolio</li>
                  <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: colors.accent1 }} /> Invoice generation</li>
                  <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: colors.accent1 }} /> Earnings dashboard</li>
                </ul>
                <Link
                  to="/registerfreelancer"
                  className="register-btn btn rounded-pill py-3 mt-auto"
                  style={{ background: colors.gradient2 }}
                >
                  Sign Up as Freelancer
                  <FiArrowRight className="ms-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="features-section py-5 bg-light"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <span className="section-badge">
              ✨ Powerful Features
            </span>
            <h2 className="section-title display-6 fw-bold mb-3">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="section-description text-secondary fs-5">
              Powerful tools to manage your professional profile and grow your business
            </p>
          </motion.div>

          <div className="row g-4">
            {[
              { icon: <FaBolt />, title: "Quick Profile Setup", desc: "Create your professional profile in minutes with our intuitive interface.", color: colors.primary, image: images.feature1 },
              { icon: <MdOutlineDashboard />, title: "Personal Dashboard", desc: "Get a complete overview of your projects, earnings, and activities.", color: colors.accent1, image: images.feature2 },
              { icon: <IoIosStats />, title: "Performance Analytics", desc: "Track your growth with detailed insights and performance metrics.", color: colors.accent2, image: images.feature3 },
              { icon: <BiBriefcase />, title: "Portfolio Showcase", desc: "Display your best work and attract more clients.", color: colors.accent3, image: images.dashboard },
              { icon: <MdOutlinePayment />, title: "Secure Payments", desc: "Receive payments securely with integrated payment systems.", color: colors.primary, image: images.analytics },
              { icon: <IoIosSettings />, title: "Customization Options", desc: "Personalize your profile to match your brand identity.", color: colors.accent1, image: images.feature1 }
            ].map((feature, index) => (
              <motion.div key={index} variants={scaleIn} className="col-md-4">
                <motion.div
                  whileHover={{ y: -15, boxShadow: `0 30px 50px ${feature.color}25` }}
                  className="feature-card-enhanced card border-0 rounded-4 p-4 h-100"
                >
                  <div className="feature-bg" style={{ backgroundImage: `url(${feature.image})` }}></div>
                  <div className="feature-content">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="feature-icon-wrapper mx-auto mb-4"
                      style={{ background: `${feature.color}15`, color: feature.color }}
                    >
                      <span className="fs-2">{feature.icon}</span>
                    </motion.div>
                    <h4 className="fw-bold mb-3">{feature.title}</h4>
                    <p className="text-secondary mb-0">{feature.desc}</p>
                    <motion.div
                      className="feature-link mt-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ x: 5 }}
                    >
                      <span style={{ color: feature.color }}>Learn more →</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="how-it-works py-5"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <span className="section-badge">
              🔄 Simple Process
            </span>
            <h2 className="section-title display-6 fw-bold mb-3">
              How Does It <span className="gradient-text">Work?</span>
            </h2>
            <p className="section-description text-secondary fs-5">
              Four simple steps to create and manage your professional profile
            </p>
          </motion.div>

          <div className="position-relative">
            {/* خط متصل بين الخطوات */}
            <div className="step-connector d-none d-md-block"></div>

            <div className="row g-4">
              {[
                { num: 1, title: "Create Account", desc: "Sign up in seconds with your email", icon: <BiUser />, color: colors.primary },
                { num: 2, title: "Build Profile", desc: "Add your information and portfolio", icon: <FaRegUser />, color: colors.accent1 },
                { num: 3, title: "Get Verified", desc: "Verify your identity and skills", icon: <FaCheckCircle />, color: colors.accent2 },
                { num: 4, title: "Start Growing", desc: "Connect with clients and opportunities", icon: <FaRocket />, color: colors.accent3 }
              ].map((step, index) => (
                <motion.div key={index} variants={scaleIn} className="col-md-3 col-6">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="step-card-enhanced text-center"
                  >
                    <div className="step-number-wrapper" style={{ background: step.color }}>
                      <span className="step-number">{step.num}</span>
                    </div>
                    <div className="step-icon-wrapper" style={{ color: step.color }}>
                      {step.icon}
                    </div>
                    <h5 className="fw-bold mb-2 mt-3">{step.title}</h5>
                    <p className="text-secondary small">{step.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="why-choose-us py-5 bg-light"
      >
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div variants={fadeInLeft} className="col-lg-6">
              <span className="section-badge mb-3">
                ⭐ Why Choose Us
              </span>
              <h2 className="section-title display-6 fw-bold mb-4">
                The Smart Choice for <span className="gradient-text">Your Career</span>
              </h2>

              <div className="benefits-grid">
                {[
                  { icon: <FaClock />, title: "Save 80% of Your Time", desc: "Streamlined profile creation and management saves you hours of work." },
                  { icon: <FaShieldAlt />, title: "Secure & Reliable", desc: "Your data is protected with enterprise-grade security and encryption." },
                  { icon: <FaUsers />, title: "Grow Your Network", desc: "Connect with thousands of potential clients and collaborators." },
                  { icon: <FaGlobe />, title: "Global Opportunities", desc: "Access opportunities from around the world, right from your dashboard." }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="benefit-item d-flex align-items-start mb-4"
                    whileHover={{ x: 15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="benefit-icon me-3" style={{ color: index === 0 ? colors.primary : index === 1 ? colors.accent1 : index === 2 ? colors.accent2 : colors.accent3 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">{item.title}</h5>
                      <p className="text-secondary mb-0">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg rounded-pill px-5"
                  style={{ background: colors.gradient1, border: 'none' }}
                >
                  Get Started Now
                  <FiArrowRight className="ms-2" />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight} className="col-lg-6">
              <div className="video-wrapper-enhanced rounded-4 overflow-hidden shadow-xl">
                <div className="video-overlay"></div>
                <iframe
                  className="w-100"
                  style={{ height: "350px" }}
                  src="https://www.youtube.com/embed/U19ugEMlcxI"
                  title="Professional Profile Importance"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <motion.div
                  className="video-play-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaRocket />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="testimonials-section py-5"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <span className="section-badge">
              💬 Success Stories
            </span>
            <h2 className="section-title display-6 fw-bold mb-3">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </motion.div>

          <div className="row g-4">
            {[
              { name: "Ahmed Hassan", role: "Freelance Designer", image: images.testimonial1, text: "This platform transformed my career. I've connected with amazing clients and grown my business significantly!", rating: 5 },
              { name: "Sara Ahmed", role: "Web Developer", image: images.testimonial2, text: "The profile tools are incredible. I love how professional my portfolio looks and how easy it is to manage.", rating: 5 },
              { name: "Omar Mahmoud", role: "Content Creator", image: images.testimonial3, text: "Finally found a platform that understands freelancers' needs. The support team is fantastic!", rating: 5 }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn} className="col-md-4">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="testimonial-card-enhanced p-4 rounded-4 h-100"
                >
                  <div className="testimonial-quote">"</div>

                  {/* تقييم النجوم */}
                  <div className="testimonial-rating mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} style={{ color: "#fbbf24" }} className="me-1" />
                    ))}
                  </div>

                  <p className="testimonial-text mb-4">{testimonial.text}</p>

                  <div className="testimonial-author d-flex align-items-center gap-3">
                    <img src={testimonial.image} alt={testimonial.name} className="testimonial-image rounded-circle" />
                    <div>
                      <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                      <small className="text-secondary">{testimonial.role}</small>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="stats-section py-5 bg-light"
      >
        <div className="container">
          <div className="row g-4 text-center">
            <motion.div variants={scaleIn} className="col-md-3 col-6">
              <div className="stat-card p-4">
                <FaUsers className="display-4 mb-3" style={{ color: colors.primary }} />
                <h2 className="fw-bold mb-2">15K+</h2>
                <p className="text-secondary">Active Users</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="col-md-3 col-6">
              <div className="stat-card p-4">
                <BiBriefcase className="display-4 mb-3" style={{ color: colors.accent1 }} />
                <h2 className="fw-bold mb-2">8K+</h2>
                <p className="text-secondary">Projects Completed</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="col-md-3 col-6">
              <div className="stat-card p-4">
                <FaAward className="display-4 mb-3" style={{ color: colors.accent2 }} />
                <h2 className="fw-bold mb-2">98%</h2>
                <p className="text-secondary">Satisfaction Rate</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="col-md-3 col-6">
              <div className="stat-card p-4">
                <FaGlobe className="display-4 mb-3" style={{ color: colors.accent3 }} />
                <h2 className="fw-bold mb-2">50+</h2>
                <p className="text-secondary">Countries</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="faq-section py-5"
      >
        <div className="container">
          <motion.div variants={fadeInUp} className="text-center mb-5">
            <span className="section-badge">
              ❓ FAQ
            </span>
            <h2 className="section-title display-6 fw-bold mb-3">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {[
                { q: "Is the profile creation free?", a: "Yes, creating a basic profile is completely free. Premium features are available with our paid plans." },
                { q: "How can I verify my profile?", a: "You can verify your profile by providing identification documents and proof of skills/experience." },
                { q: "Can I export my portfolio?", a: "Yes, you can export your portfolio in PDF format or share a public link to your profile." },
                { q: "How do I connect with clients?", a: "Clients can find you through search, or you can apply to projects that match your skills." }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, x: 5 }}
                  className="faq-card-enhanced card border-0 rounded-4 p-4 mb-3 shadow-sm"
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="faq-number" style={{ background: colors.gradient1 }}>
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{ color: colors.primary }}>{faq.q}</h5>
                      <p className="text-secondary mb-0">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="newsletter-section py-5"
        style={{ background: colors.gradient1 }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center text-white">
              <motion.h2 variants={fadeInUp} className="fw-bold mb-4">
                Stay Updated with Our Newsletter
              </motion.h2>
              <motion.p variants={fadeInUp} className="mb-4 opacity-90">
                Get the latest tips, trends, and opportunities delivered straight to your inbox.
              </motion.p>
              <motion.div variants={scaleIn} className="newsletter-form mx-auto" style={{ maxWidth: "500px" }}>
                <div className="d-flex gap-2">
                  <input
                    type="email"
                    className="form-control form-control-lg rounded-pill border-0"
                    placeholder="Enter your email"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-light btn-lg rounded-pill px-4"
                  >
                    <FiSend />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="contact-section py-5 bg-light"
      >
        <div className="container">
          <div className="row g-4">
            <motion.div variants={fadeInLeft} className="col-md-4">
              <div className="contact-card p-4 rounded-4 shadow-sm">
                <FaRegEnvelope className="fs-1 mb-3" style={{ color: colors.primary }} />
                <h5 className="fw-bold mb-3">Email Us</h5>
                <p className="text-secondary mb-2">support@profilesystem.com</p>
                <p className="text-secondary">info@profilesystem.com</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="col-md-4">
              <div className="contact-card p-4 rounded-4 shadow-sm">
                <FiPhone className="fs-1 mb-3" style={{ color: colors.accent1 }} />
                <h5 className="fw-bold mb-3">Call Us</h5>
                <p className="text-secondary mb-2">+1 (555) 123-4567</p>
                <p className="text-secondary">+1 (555) 987-6543</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInRight} className="col-md-4">
              <div className="contact-card p-4 rounded-4 shadow-sm">
                <FaRegBell className="fs-1 mb-3" style={{ color: colors.accent2 }} />
                <h5 className="fw-bold mb-3">Follow Us</h5>
                <div className="social-icons d-flex gap-3">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="social-icon"
                    style={{ background: "#1877F2" }}
                  >
                    <FaFacebook />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="social-icon"
                    style={{ background: "#1DA1F2" }}
                  >
                    <FaTwitter />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="social-icon"
                    style={{ background: "#0A66C2" }}
                  >
                    <FaLinkedin />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer-enhanced py-4 text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 opacity-75">
                © {new Date().getFullYear()} Profile System. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link to="/terms" className="footer-link me-3">Terms & Conditions</Link>
              <Link to="/privacy" className="footer-link me-3">Privacy Policy</Link>
              <Link to="/cookies" className="footer-link">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Noprofile;