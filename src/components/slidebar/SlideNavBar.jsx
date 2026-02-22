import React, { useState, useEffect } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineReceipt } from "react-icons/md";
import { FaFolderPlus } from "react-icons/fa";
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

  /* -- auto-collapse on small screens -- */
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

  const isClient = normalizedRole === "client" || normalizedRole === "customer";
  const isFreelancer = normalizedRole === "freelancer";
  const isLoggedIn = !!token || !!rawUser || !!normalizedRole;

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

  /* -- helper: is current path? -- */
  const isActive = (path) => location.pathname === path;
  const isProfileActive = () =>
    isActive("/profile") || isActive("/profileclient") || isActive("/profilefreelancer");

  return (
    <div className={`slide-navbar ${isVisible ? "show" : ""}`}>
      {/* --- TOP: hamburger + logo --- */}
      <div className="slide-top">
        {/* hamburger — only visible <=992 */}
        <RiMenu2Fill className="slidemenu" onClick={toggleNavbar} />

        <div className="slide-logo-wrap">
          <img src={imageslide} alt="Logo" />
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <div className="slide-bottom">
        <ul>
          {/* -- MAIN section -- */}
          <li><span className="nav-section-title">Main</span></li>

          <li>
            <Link
              to="/"
              data-tip="Home"
              className={`d-flex align-items-center gap-2 ${isActive("/") ? "active" : ""}`}
            >
              <AiOutlineHome className="slideicons" />
              <span className="nav-label">Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              data-tip="About Us"
              className={`d-flex align-items-center gap-2 ${isActive("/about") ? "active" : ""}`}
            >
              <AiOutlineInfoCircle className="slideicons" />
              <span className="nav-label">About Us</span>
            </Link>
          </li>

          {/* -- INVOICES section (only when logged in) -- */}
          {isLoggedIn && (isClient || isFreelancer) && (
            <>
              <li><div className="nav-divider" /></li>
              <li><span className="nav-section-title">Invoices</span></li>

              <li>
                {isClient ? (
                  <Link
                    to="/addanewpro"
                    data-tip="Add Projects"
                    className={`d-flex align-items-center gap-2 ${isActive("/addanewpro") ? "active" : ""}`}
                  >
                    <FaFolderPlus className="slideicons" />
                    <span className="nav-label">Add Projects</span>
                  </Link>
                ) : (
                  <Link
                    to="/create-invoice"
                    data-tip="Create Invoice"
                    className={`d-flex align-items-center gap-2 ${isActive("/create-invoice") ? "active" : ""}`}
                  >
                    <MdOutlineReceipt className="slideicons" />
                    <span className="nav-label">Create Invoice</span>
                  </Link>
                )}
              </li>
            </>
          )}

          {/* -- ACCOUNT section (only when logged in) -- */}
          {isLoggedIn && (isClient || isFreelancer) && (
            <>
              <li><div className="nav-divider" /></li>
              <li><span className="nav-section-title">Account</span></li>

              <li>
                <Link
                  to="/report"
                  data-tip="Reports"
                  className={`d-flex align-items-center gap-2 ${isActive("/report") ? "active" : ""}`}
                >
                  <TbReportSearch className="slideicons" />
                  <span className="nav-label">Reports</span>
                </Link>
              </li>

              <li>
                <Link
                  to={profilePath}
                  data-tip="Profile"
                  className={`d-flex align-items-center gap-2 ${isProfileActive() ? "active" : ""}`}
                >
                  <CgProfile className="slideicons" />
                  <span className="nav-label">Profile</span>
                </Link>
              </li>

              <li><div className="nav-divider" /></li>

              <li>
                <button
                  onClick={handleLogout}
                  data-tip="Logout"
                  className="nav-btn logout d-flex align-items-center gap-2"
                >
                  <FaArrowRightFromBracket className="slideicons" />
                  <span className="nav-label">Logout</span>
                </button>
              </li>
            </>
          )}

          {/* profile visible when NOT logged in */}
          {!isLoggedIn && (
            <>
              <li><div className="nav-divider" /></li>
              <li>
                <Link
                  to="/profile"
                  data-tip="Profile"
                  className={`d-flex align-items-center gap-2 ${isActive("/profile") ? "active" : ""}`}
                >
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
