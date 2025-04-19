import React from 'react'
import './Navbar.css'
import logo from "../../../../images/logo.svg"

const  Navbar=()=> {
  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ps-3 pe-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><img className="logo" src={logo} alt=""/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a aria-current="page" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a aria-current="page" href="#">Benefits</a>
                </li>
                <li className="nav-item">
                  <a aria-current="page" href="#">About Us</a>
                </li>
                <li className="nav-item">
                  <a aria-current="page" href="#">Contact Us</a>
                </li>

              </ul>
              <form className="d-flex">
                <button className="login btn btn-outline-light" style={{ borderRadius: '30px 0px 0px 30px' }}>Log In</button>
                <button className="login btn btn-outline-light" style={{ borderRadius: '0px 30px 30px 0px' }}>Sign Up</button>
              </form>
            </div>
          </div>
        </nav>
  )
}

export default Navbar
