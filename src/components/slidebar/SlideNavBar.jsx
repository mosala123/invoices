import React, { useState, useEffect } from "react";
import { CgProfile, CgAdd } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom"; // استيراد useLocation
import imageslide from "../../images/logo.svg";
import "./SlideNavBar.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { LiaFileInvoiceSolid } from "react-icons/lia";

const SlideNavBar = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth > 1080);
  const location = useLocation(); // الحصول على مسار الصفحة الحالي

  const toggleNavbar = () => {
    if (window.innerWidth <= 1080) {
      setIsVisible(!isVisible);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 1080);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`slide-navbar ${isVisible ? "show" : ""}`}>
      <div className="d-flex align-items-center justify-content-between w-100 mb-3">
        <RiMenu2Fill className="slidemenu" onClick={toggleNavbar} />
      </div>

      <div className="slide-top">
        <div className="d-flex gap-2 align-items-center Logo">
          <img src={imageslide} alt="Slide Navbar  " />
        </div>
      </div>

      <div className="slide-bottom text-start">
        <ul>
          <li>
            <Link
              to="/"
              className={`d-flex gap-3 ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <AiOutlineInfoCircle className="slideicons" />
              <span className={isVisible ? "" : "d-none"}>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`d-flex gap-3 ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <AiOutlineHome className="slideicons" />
              <span className={isVisible ? "" : "d-none"}>About Us</span>
            </Link>
          </li>
          <li>
            <Link
              to="/create-invoice"
              className={`d-flex gap-3 ${
                location.pathname === "/create-invoice" ? "active" : ""
              }`}
            >
              <CgAdd className="slideicons" />
              <span className={isVisible ? "" : "d-none"}>Create Invoice</span>
            </Link>
          </li>
          <li>
            <Link
              to="/invoiceslist"
              className={`d-flex gap-3 ${
                location.pathname === "/invoiceslist" ? "active" : ""
              }`}
            >
              <LiaFileInvoiceSolid className="slideicons" />
              <span className={isVisible ? "" : "d-none"}>Invoices List</span>
            </Link>
          </li>
          <li>
            <Link
              to="/report"
              className={`d-flex gap-3 ${
                location.pathname === "/report" ? "active" : ""
              }`}
            >
              <TbReportSearch className="slideicons" />
              <span className={isVisible ? "" : "d-none"}>Reports</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`d-flex gap-3 ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <CgProfile className="slideicons" />
              <span className={isVisible ? "" : "d-none"}>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SlideNavBar;