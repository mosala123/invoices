import React from 'react';
import './Header.css';
import img1 from '../../../../images/man10.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="px-4 pb-5 pt-5" style={{ background: 'linear-gradient(128.29deg, var(--primary-color) 10.95%, var(--secondary-color) 75.16%)' }}>
      <div className="container">
        <div className="row px-3">
          <div className="col-sm-12 col-lg-6 col-md-12">
            <div className="box">
              <b>Smart<br /> Finance & <br /><span>E-Invoice</span><br /> Solution<br /></b>
              <b><p className=" - ">Designed for freelancers and small businesses, our all-in-one platform</p></b>
              <b><p className=" ">makes invoicing, expense tracking, and financial management</p></b>
              <b><p className=" ">effortless.</p></b>
              <Link to="/create-invoice" className="Allbtn1" style={{ textDecoration: 'none' }}>Get Started Today</Link>
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 col-md-12">
            <div className="divmask">
              <img className="mask" src={img1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
