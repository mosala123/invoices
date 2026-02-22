import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../../../images/logo.svg";

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3 bg-dark text-white">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <img className="logo mb-3" src={logo} alt="Logo" style={{ height: "50px", filter: "brightness(0) invert(1)" }} />
              <p className="text-light opacity-75">
                A smart platform for freelancers and small teams to create invoices quickly and keep finances organized.
              </p>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 text-primary">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none opacity-75">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="text-light text-decoration-none opacity-75">About</Link></li>
              <li className="mb-2"><Link to="/create-invoice" className="text-light text-decoration-none opacity-75">Create Invoice</Link></li>
              <li className="mb-2"><Link to="/report" className="text-light text-decoration-none opacity-75">Reports</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4 text-primary">Newsletter</h5>
            <p className="text-light opacity-75 small mb-3">Subscribe to get product updates and new features.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control border-0" placeholder="Your email" />
              <button className="btn btn-primary px-3" type="button">Subscribe</button>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4 text-primary">Contact</h5>
            <p className="text-light opacity-75 mb-2">Email:</p>
            <a href="mailto:elmosalah74@gmail.com" className="text-light text-decoration-none fw-bold">elmosalah74@gmail.com</a>
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <div className="text-center">
          <p className="mb-0 opacity-50 small">© 2026 InvoGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
