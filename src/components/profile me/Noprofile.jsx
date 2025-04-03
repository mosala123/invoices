import React from 'react';
import { useState } from 'react';
import imageprofile from "../../images/profile.webp"
import { FaBolt, FaPaperPlane, FaChartLine } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaUser, FaUserTie } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Noprofile = () => {

  return (
    <div className="  "   >



  <header className="bg-white text-dark py-5 p-2  ">
      <div className="container">
        <div className="row align-items-center">
         
          {/* Title, description, and CTA buttons */}
          <div className="col-lg-7 text-center text-lg-start" style={{direction:"ltr"}}>
            <h1 className="display-4 fw-bold mb-3">Automated Invoice System</h1>
            <p className="lead mb-4">
              A complete solution for creating and managing invoices automatically. Designed specifically for freelancers 
              to help them organize their payments with ease and professionalism. Keep track of your transactions effortlessly 
              and get detailed reports on your financial performance.
            </p>
            <p className="mb-4">
              Whether you're handling multiple clients or managing recurring payments, our system ensures smooth, error-free 
              invoicing with real-time status updates. Take control of your finances today!
            </p>
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center"  >
              <button className="btn btn-outline-primary btn-lg px-4">See How It Works</button>
            </div>
          </div>
     {/* Illustration Image */}
     <div className="col-lg-5 text-center mt-4 mt-lg-0">
            <img
              src={imageprofile}
              alt="Invoice System"
              className="img-fluid rounded shadow"
            />
          </div>
        
        </div>
      </div>
    </header>




    <section className="py-5 bg-light">
      <div className="container">
      <div className="text-center mb-2">
          <h2 className="fw-bold">Welcome to Our Community! 🎉</h2>
          <p className="text-muted fs-5">
            Join thousands of users and freelancers building their future with us.  
            Create an account and get started today!
          </p>
        </div>
        <div className="row justify-content-center align-items-center ">
          
          {/* تسجيل كمستخدم عادي */}
          <div className="col-lg-5 col-md-12 mb-2 ">
            <div className="card shadow-sm border-0 text-center p-4" style={{width:"100%"}}>
              <FaUser className="text-primary display-4 mb-3" />
              <h5 className="fw-bold">Register as User</h5>
              <p className="text-muted">Create an account to access all features.</p>
              <Link to="/registerclient" className="btn btn-primary w-100">Sign Up</Link>
            </div>
          </div>

          {/* تسجيل كمستقل */}
          <div className="col-lg-5 col-md-12  mb-2">
            <div className="card shadow-sm border-0 text-center p-4" style={{width:"100%"}}>
              <FaUserTie className="text-success display-4 mb-3" />
              <h5 className="fw-bold">Register as Freelancer</h5>
              <p className="text-muted">Join us as a freelancer and offer your services.</p>
              <Link to="/registerfreelancer" className="btn btn-success w-100">Sign Up as Freelancer</Link>
            </div>
          </div>

        </div>
      </div>
    </section>





 

    <section className=" py-5 bg-light">
      <div className="container text-center">  
        <h2 className="text-center mb-2 fw-bold">System Features</h2>
        <div className="row justify-content-center g-4" style={{alignItems:"center"}}>  
          
          {/* Feature 1: Automated Invoice Generation */}
          <div className="col-md-4 col-sm-12">
            <div className="card h-100 border-0 shadow-sm text-center" style={{width:"100%"}}>
              <div className="card-body p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <FaBolt className="text-primary fs-2" />
                </div>
                <h4 className="card-title">Automated Invoice Generation</h4>
                <p className="card-text">
                  Create professional invoices with a single click based on your project data.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Direct Client Sending */}
          <div className="col-md-4 col-sm-12">
            <div className="card h-100 border-0 shadow-sm text-center" style={{width:"100%"}}>
              <div className="card-body p-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <FaPaperPlane className="text-success fs-2" />
                </div>
                <h4 className="card-title">Instant Client Delivery</h4>
                <p className="card-text">
                  Send invoices automatically via email for seamless transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Financial Reports */}
          <div className="col-md-4 col-sm-12">
            <div className="card h-100 border-0 shadow-sm text-center" style={{width:"100%"}}>
              <div className="card-body p-4">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <FaChartLine className="text-info fs-2" />
                </div>
                <h4 className="card-title">Detailed Financial Reports</h4>
                <p className="card-text">
                  Get insightful reports on your income and earnings monthly and annually.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>







    <section className="py-5  p-2 bg-light" style={{direction:"ltr"}}>
  <div className="container">
    <h2 className="text-center mb-5 fw-bold">How Does the System Work?</h2>
    <div className="row g-4">
      
      {/* Step 1: Enter Project Details */}
      <div className="col-md-3 col-6">
        <div className="text-center">
          <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
               style={{ width: "50px", height: "50px" }}>
            <span className="fs-4">1</span>
          </div>
          <h5>Enter Project Details</h5>
          <p className="text-muted">Fill in the details of the project or provided service.</p>
        </div>
      </div>

      {/* Step 2: Generate Invoice */}
      <div className="col-md-3 col-6">
        <div className="text-center">
          <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
               style={{ width: "50px", height: "50px" }}>
            <span className="fs-4">2</span>
          </div>
          <h5>Generate Invoice</h5>
          <p className="text-muted">The system automatically generates the invoice.</p>
        </div>
      </div>

      {/* Step 3: Send to Client */}
      <div className="col-md-3 col-6">
        <div className="text-center">
          <div className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
               style={{ width: "50px", height: "50px" }}>
            <span className="fs-4">3</span>
          </div>
          <h5>Send to Client</h5>
          <p className="text-muted">Send the invoice via email or WhatsApp.</p>
        </div>
      </div>

      {/* Step 4: Track Payment */}
      <div className="col-md-3 col-6">
        <div className="text-center">
          <div className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
               style={{ width: "50px", height: "50px" }}>
            <span className="fs-4">4</span>
          </div>
          <h5>Track Payment</h5>
          <p className="text-muted">Monitor invoice status and send reminders.</p>
        </div>
      </div>

    </div>
  </div>
</section>








<section className="py-5 bg-light" style={{ direction: "ltr" }}>
  <div className="container">
    <h2 className="text-center mb-5 fw-bold text-primary">Why Choose Our System?</h2>
    <div className="row align-items-center">

      {/* Text Section on the Left */}
      <div className="col-lg-6">
        <ul className="list-unstyled">
          <li className="mb-4 d-flex align-items-start">
            <i className="bi bi-check-circle-fill text-success me-3 fs-4"></i>
            <div>
              <h5 className="fw-bold">Save 80% of Your Invoicing Time</h5>
              <p className="text-muted mb-0">Automate your invoicing process and generate invoices in seconds, eliminating manual paperwork.</p>
            </div>
          </li>
          <li className="mb-4 d-flex align-items-start">
            <i className="bi bi-check-circle-fill text-success me-3 fs-4"></i>
            <div>
              <h5 className="fw-bold">Reduce Manual Accounting Errors</h5>
              <p className="text-muted mb-0">Our system ensures accuracy in calculations, minimizing the risk of mistakes in financial records.</p>
            </div>
          </li>
          <li className="mb-4 d-flex align-items-start">
            <i className="bi bi-check-circle-fill text-success me-3 fs-4"></i>
            <div>
              <h5 className="fw-bold">Keep All Your Invoices Organized</h5>
              <p className="text-muted mb-0">Access and manage all your invoices in one place, making tracking and retrieval easy and efficient.</p>
            </div>
          </li>
          <li className="mb-4 d-flex align-items-start">
            <i className="bi bi-check-circle-fill text-success me-3 fs-4"></i>
            <div>
              <h5 className="fw-bold">Generate Accurate Financial Reports</h5>
              <p className="text-muted mb-0">Get detailed insights into your earnings and expenditures with automatically generated reports.</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Video Section on the Right */}
      <div className="col-lg-6">
        <div className="ratio ratio-16x9 shadow rounded">
        <iframe
  className="rounded border w-100"
  width="560"
  height="315"
  src="https://www.youtube.com/embed/U19ugEMlcxI"
  title="Why Invoicing is Important for Businesses"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

        </div>
      </div>

    </div>
  </div>
</section>


 

 



<section className="py-5   text-start" dir="ltr">
  <div className="container">
    <h2 className="text-center mb-4 fw-bold text-primary">Comparison with Traditional Methods</h2>
    <div className="table-responsive">
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th width="30%">Criteria</th>
            <th>Automated System</th>
            <th>Traditional Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-bold">Time Required</td>
            <td className="text-success fw-bold">5 Minutes</td>
            <td className="text-danger">1 Hour</td>
          </tr>
          <tr>
            <td className="fw-bold">Accuracy</td>
            <td className="text-success fw-bold">100%</td>
            <td className="text-danger">Prone to Errors</td>
          </tr>
          <tr>
            <td className="fw-bold">Organization</td>
            <td className="text-success fw-bold">Centralized & Easily Searchable</td>
            <td className="text-danger">Scattered Papers & Files</td>
          </tr>
          <tr>
            <td className="fw-bold">Tracking</td>
            <td className="text-success fw-bold">Automated</td>
            <td className="text-danger">Manual</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>






{/* 10. Frequently Asked Questions */}
<section className="py-5 bg-light text-start" dir="ltr">
  <div className="container">
    <h2 className="text-center mb-5 fw-bold">Frequently Asked Questions</h2>
    <div className="border rounded p-4 bg-white shadow-sm m-2">

      {/* Question 1 */}
      <div className="mb-4">
        <h5 className="fw-bold">Is the system free?</h5>
        <p>Yes, the basic version is free with limited features. There are also paid subscriptions for more advanced features.</p>
      </div>

      {/* Question 2 */}
      <div className="mb-4">
        <h5 className="fw-bold">How can I reset my password?</h5>
        <p>You can click on "Forgot Password" on the login page and enter your email to receive a reset link.</p>
      </div>

      {/* Question 3 */}
      <div className="mb-4">
        <h5 className="fw-bold">Can I export invoices?</h5>
        <p>Yes, the system supports exporting invoices in PDF and Excel formats.</p>
      </div>

    </div>
  </div>
</section>






    
  {/* 12. Contact Information */}
  <section className="py-5 bg-primary text-white px-3" dir="ltr">
        <div className="container">
          <div className="row">

            {/* Contact Us */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <FiMail className="me-2" /> support@invoicesystem.com
                </li>
                <li className="mb-2">
                  <FiPhone className="me-2" /> +966 12 345 6789
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5>Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="#" className="text-white">
                  <FaTwitter className="fs-4" />
                </a>
                <a href="#" className="text-white">
                  <FaFacebook className="fs-4" />
                </a>
                <a href="#" className="text-white">
                  <FaLinkedin className="fs-4" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-md-4">
              <h5>Newsletter</h5>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your Email" 
                />
                <button className="btn btn-light" type="button">
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row">

            {/* Copyright */}
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">© 2024 Invoice System. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="text-white text-decoration-none me-3">Terms & Conditions</a>
              <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
            </div>

          </div>
        </div>
      </footer>








    
    </div>
  );
};

export default Noprofile;