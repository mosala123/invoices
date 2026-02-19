import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import imageslide from "../../images/logo.svg";
import "./SlideNavBar.css";
import { AiOutlineInfoCircle, AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";

const SlideNavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNavbar = () => {
    setIsVisible(!isVisible);
  };

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
=======
import { CgProfile, CgAdd } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";  
import imageslide from "../../images/logo.svg";
import "./SlideNavBar.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

const SlideNavBar = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth > 1080);
  const location = useLocation();  

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


 const cart=useSelector((state)=>state.cart)


>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885

  return (
    <div className={`slide-navbar ${isVisible ? "show" : ""}`}>
      <div className="d-flex align-items-center justify-content-between w-100 mb-3">
        <RiMenu2Fill className="slidemenu" onClick={toggleNavbar} />
      </div>

      <div className="slide-top">
        <div className="d-flex gap-2 align-items-center Logo">
<<<<<<< HEAD
          <img src={imageslide} alt="Slide Navbar" className="img-fluid" />
        </div>
        
      </div>

      <div className="slide-bottom">
        <ul className="list-unstyled">
          <li>
            <Link
              to="/"
              className={`d-flex align-items-center gap-3 ${
=======
          <img src={imageslide} alt="Slide Navbar  " />
        </div>
      </div>

      <div className="slide-bottom text-start">
        <ul  >
          <li  >
            <Link  
              to="/"
              className={`d-flex gap-3 ${
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <AiOutlineInfoCircle className="slideicons" />
<<<<<<< HEAD
              <span>Home</span>
=======
              <span className={isVisible ? "" : "d-none"}>Home</span>
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
            </Link>
          </li>
          <li>
            <Link
              to="/about"
<<<<<<< HEAD
              className={`d-flex align-items-center gap-3 ${
=======
              className={`d-flex gap-3 ${
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <AiOutlineHome className="slideicons" />
<<<<<<< HEAD
              <span>About Us</span>
            </Link>
          </li>

          {token && token !== "" && (
            <>
              <li>
                <Link
                  to="/report"
                  className={`d-flex align-items-center gap-3 ${
                    location.pathname === "/report" ? "active" : ""
                  }`}
                >
                  <TbReportSearch className="slideicons" />
                  <span>Reports</span>
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="d-flex align-items-center gap-3 btn btn-link text-start p-0 w-100"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <FaArrowRightFromBracket className="slideicons" />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}

          <li>
            <Link
              to="/profile"
              className={`d-flex align-items-center gap-3 ${
=======
              <span className={isVisible ? "" : "d-none"}>About Us</span>
            </Link>
          </li>
         
          {/* <li>
            <Link
              to="/invoiceslist"
              className={`d-flex gap-3 ${
                location.pathname === "/invoiceslist" ? "active" : ""
              }`}
            >
              <LiaFileInvoiceSolid className="slideicons" />
              <span className={isVisible ? "" : "d-none"}>Invoices List</span>
            </Link>
          </li> */}
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
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <CgProfile className="slideicons" />
<<<<<<< HEAD
              <span>Profile</span>
            </Link>
          </li>
=======
              <span className={isVisible ? "" : "d-none"}>Profile</span>
            </Link>
 
          </li>




 








>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
        </ul>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default SlideNavBar;
=======
export default SlideNavBar;
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
