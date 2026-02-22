import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-lg-8"
          >
            <div className="contact-card p-5 rounded-5 shadow-lg bg-white">
              <div className="text-center mb-5">
                <h2 className="fw-bold display-6 text-primary">Contact Us</h2>
                <p className="text-muted">We are here to help with questions, support, and onboarding.</p>
              </div>

              <form>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control border-0 bg-light rounded-3" id="name" placeholder="Full Name" />
                      <label htmlFor="name">Full Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="email" className="form-control border-0 bg-light rounded-3" id="email" placeholder="Email Address" />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control border-0 bg-light rounded-3" id="subject" placeholder="Subject" />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea className="form-control border-0 bg-light rounded-3" placeholder="Your Message" id="message" style={{ height: "150px" }}></textarea>
                      <label htmlFor="message">Your Message</label>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary btn-lg rounded-pill px-5 shadow" type="submit">
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
