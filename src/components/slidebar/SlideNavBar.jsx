import React, { useState, useEffect } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineReceipt } from "react-icons/md";
import { FaFolderPlus, FaFileInvoiceDollar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import imageslide from "../../images/logo.svg";
import "./SlideNavBar.css";
import { AiOutlineInfoCircle, AiOutlineHome } from "react-icons/ai";
import Swal from "sweetalert2";
import { supabase } from "../../supabaseClient";

const SlideNavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsVisible(window.innerWidth > 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNavbar = () => setIsVisible((v) => !v);

  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user");

  let normalizedRole = "";
  try {
    normalizedRole = String(JSON.parse(rawUser || "{}")?.role || "").trim().toLowerCase();
  } catch {
    normalizedRole = "";
  }

  const isClient     = normalizedRole === "client" || normalizedRole === "customer";
  const isFreelancer = normalizedRole === "freelancer";
  const isLoggedIn   = !!token || !!rawUser || !!normalizedRole;

  const profilePath = isClient
    ? "/profileclient"
    : isFreelancer
      ? "/profilefreelancer"
      : "/profile";

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });
    if (!result.isConfirmed) return;
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;
  const isProfileActive = () =>
    isActive("/profile") || isActive("/profileclient") || isActive("/profilefreelancer");

  return (
    <div className={`slide-navbar ${isVisible ? "show" : ""}`}>
      {/* TOP */}
      <div className="slide-top">
        <div className="hamburger-wrapper">
          <RiMenu2Fill style={{ fontSize: "42px" }}
            className="slidemenu text-light fw-bold"
            onClick={toggleNavbar}
          />
        </div>
        <div className="slide-logo-wrap">
          <img src={imageslide} alt="Logo" />
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="slide-bottom">
        <ul>
          {/* MAIN */}
          <li className="nav-section">
            <span className="nav-section-title">Main</span>
          </li>
          <li className="nav-item">
            <Link to="/" data-tip="Home"
              className={`nav-link d-flex align-items-center ${isActive("/") ? "active" : ""}`}>
              <AiOutlineHome className="slideicons" />
              <span className="nav-label">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" data-tip="About Us"
              className={`nav-link d-flex align-items-center ${isActive("/about") ? "active" : ""}`}>
              <AiOutlineInfoCircle className="slideicons" />
              <span className="nav-label">About Us</span>
            </Link>
          </li>

          {/* INVOICES — لما يكون logged in */}
          {isLoggedIn && (isClient || isFreelancer) && (
            <>
              <li className="nav-divider-li"><div className="nav-divider" /></li>
              <li className="nav-section">
                <span className="nav-section-title">Invoices</span>
              </li>

              {/* Freelancer → Create Invoice */}
              {isFreelancer && (
                <li className="nav-item">
                  <Link to="/create-invoice" data-tip="Create Invoice"
                    className={`nav-link d-flex align-items-center ${isActive("/create-invoice") ? "active" : ""}`}>
                    <MdOutlineReceipt className="slideicons" />
                    <span className="nav-label">Create Invoice</span>
                  </Link>
                </li>
              )}

              {/* Client → Add Projects */}
              {isClient && (
                <li className="nav-item">
                  <Link to="/addanewpro" data-tip="Add Projects"
                    className={`nav-link d-flex align-items-center ${isActive("/addanewpro") ? "active" : ""}`}>
                    <FaFolderPlus className="slideicons" />
                    <span className="nav-label">Add Projects</span>
                  </Link>
                </li>
              )}

              {/* Client → My Invoices ← الجديد */}
              {isClient && (
                <li className="nav-item">
                  <Link to="/my-invoices" data-tip="My Invoices"
                    className={`nav-link d-flex align-items-center ${isActive("/my-invoices") ? "active" : ""}`}>
                    <FaFileInvoiceDollar className="slideicons" />
                    <span className="nav-label">My Invoices</span>
                  </Link>
                </li>
              )}
            </>
          )}

          {/* ACCOUNT */}
          {isLoggedIn && (isClient || isFreelancer) && (
            <>
              <li className="nav-divider-li"><div className="nav-divider" /></li>
              <li className="nav-section">
                <span className="nav-section-title">Account</span>
              </li>

              {isFreelancer && (
                <li className="nav-item">
                  <Link to="/report" data-tip="Reports"
                    className={`nav-link d-flex align-items-center ${isActive("/report") ? "active" : ""}`}>
                    <TbReportSearch className="slideicons" />
                    <span className="nav-label">Reports</span>
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link to={profilePath} data-tip="Profile"
                  className={`nav-link d-flex align-items-center ${isProfileActive() ? "active" : ""}`}>
                  <CgProfile className="slideicons" />
                  <span className="nav-label">Profile</span>
                </Link>
              </li>

              <li className="nav-divider-li"><div className="nav-divider" /></li>

              <li className="nav-item">
                <button onClick={handleLogout} data-tip="Logout"
                  className="nav-link nav-btn logout d-flex align-items-center">
                  <FaArrowRightFromBracket className="slideicons" />
                  <span className="nav-label">Logout</span>
                </button>
              </li>
            </>
          )}

          {/* غير مسجل */}
          {!isLoggedIn && (
            <>
              <li className="nav-divider-li"><div className="nav-divider" /></li>
              <li className="nav-item">
                <Link to="/profile" data-tip="Profile"
                  className={`nav-link d-flex align-items-center ${isActive("/profile") ? "active" : ""}`}>
                  <CgProfile className="slideicons" />
                  <span className="nav-label">Profile</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SlideNavBar;