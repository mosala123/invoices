import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";
import logo from "../../../../images/logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/create-invoice", label: "Create Invoice" },
    { path: "/report", label: "Reports" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar navbar-expand-lg navbar-light fixed-top ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}
      style={{ transition: "all 0.3s ease" }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="logo me-2" src={logo} alt="Logo" style={{ height: "40px" }} />
          <span className="fw-bold" style={{ color: "#4AC5B5" }}>InvoGen</span>
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  className={`nav-link fw-medium px-3 ${location.pathname === link.path ? "active" : ""}`}
                  to={link.path}
                  style={{ color: location.pathname === link.path ? "#4AC5B5" : "#2d3436" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex gap-2">
            <Link to="/loginfreelancer" className="btn btn-outline-primary rounded-pill px-4" style={{ borderColor: "#4AC5B5", color: "#4AC5B5" }}>
              Sign In
            </Link>
            <Link to="/registerfreelancer" className="btn btn-primary rounded-pill px-4 text-white" style={{ background: "#4AC5B5", borderColor: "#4AC5B5" }}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
