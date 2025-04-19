import React from 'react'
import './Footer.css'
import logo from "../../../../images/logo.svg"

const  Footer=()=> {
  return (
    <div className='Footer'>
      <div className="Top_F row">
        <div className="col-lg-3 col-md-12">
          <div className="one_F">
            <img className="logo" src={logo} alt="Website Logo" />
            <p>A smart platform for freelancers and small businesses to create professional invoices automatically and effortlessly.</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-12 text-start"   >
          <div className="one_F">
            <b>QUICK LINKS</b>
            <div className='text-start '>
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Create Invoice</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="one_FL">
            <b>NEWSLETTER</b>
            <p>Subscribe to get updates on features and special offers directly to your inbox.</p>
            <div className="input-group mb-3">
              <input type='email' className="form-control" placeholder="Your Email Address" aria-label="Email" aria-describedby="button-addon2" />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="one_F">
            <b>CONTACT</b>
            <p>Email: <a className='__email ' href="mailto:mohamedelsaidmedo192003@gmail.com" style={{}}>elmosalah74@gmail.com</a></p>
          </div>
        </div>
      </div>
      <div className="Bottom_F">
        <p>© 2025 Auto Invoice Generator - Built with ❤️ Team Yalla Bina </p>
      </div>
    </div>
  )
}

export default Footer
