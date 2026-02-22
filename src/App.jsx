// src/App.jsx
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AboutPages from "./components/about us/AboutPages";
import CreateInvoices from "./components/create invoices/CreateInvoices";
import ShapeInvoices from "./components/shapeinvo/ShapeInvoices";
import LoginCustomer from "./components/user/customer/LoginCustomer";
import RegisterCustomer from "./components/user/customer/RegisterCustomer";
import LoginFreelancer from "./components/user/freelancer/LoginFreelancer";
import RegisterFreelancer from "./components/user/freelancer/RegisterFreelancer";
import SlideNavBar from "./components/slidebar/SlideNavBar";
import ReportsPage from "./components/reports/ReportsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileFreelancer from "./components/profile me/profilefreelancer/ProfileFreelancer";
import ProfileClient from "./components/profile me/profileclient/ProfileClient";
import Profileme from "./components/profile me/Profileme";
import Homepages from "./components/home/Homepages";
import AddProjects from "./components/dashboardClient/AddProjects";
import CartInvoices from "./components/create invoices/CartInvoices";

function App() {
  useLocation();

  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user");

  let normalizedRole = "";
  try {
    normalizedRole = String(JSON.parse(rawUser || "{}")?.role || "").trim().toLowerCase();
  } catch {
    normalizedRole = "";
  }

  const isLoggedIn = !!token || !!rawUser || !!normalizedRole;
  const isClient = normalizedRole === "client" || normalizedRole === "customer";
  const isFreelancer = normalizedRole === "freelancer";

  return (
    <div className="app-container">
      <SlideNavBar />
      <div className="main-content">
        <Routes>
            <Route
              path="/addanewpro"
              element={
                !isLoggedIn ? <Navigate to="/loginclient" replace /> :
                isClient ? <AddProjects /> : <Navigate to="/create-invoice" replace />
              }
            />

            <Route path="/profile" element={<Profileme />} />
            
            <Route
              path="/profilefreelancer"
              element={
                !isLoggedIn ? <Navigate to="/loginfreelancer" replace /> :
                isFreelancer ? <ProfileFreelancer /> : <Navigate to="/profile" replace />
              }
            />
            
            <Route
              path="/profileclient"
              element={
                !isLoggedIn ? <Navigate to="/loginclient" replace /> :
                isClient ? <ProfileClient /> : <Navigate to="/profile" replace />
              }
            />
            
            <Route path="/registerclient" element={<RegisterCustomer />} />
            <Route path="/loginclient" element={<LoginCustomer />} />
            <Route path="/loginfreelancer" element={<LoginFreelancer />} />
            <Route path="/registerfreelancer" element={<RegisterFreelancer />} />

            <Route path="/" element={<Homepages />} />
            <Route path="/about" element={<AboutPages />} />
            
            <Route
              path="/create-invoice"
              element={
                !isLoggedIn ? <Navigate to="/loginfreelancer" replace /> :
                isFreelancer ? <CreateInvoices /> : <Navigate to="/addanewpro" replace />
              }
            />
            
            <Route
              path="/ProductsDetails/:invoiceId"
              element={!isLoggedIn ? <Navigate to="/loginfreelancer" replace /> : <ShapeInvoices />}
            />
            
            <Route
              path="/cartinvoices"
              element={!isLoggedIn ? <Navigate to="/loginfreelancer" replace /> : <CartInvoices />}
            />
            
            <Route
              path="/invoice/:invoiceId"
              element={!isLoggedIn ? <Navigate to="/loginfreelancer" replace /> : <ShapeInvoices />}
            />
            
            <Route
              path="/report"
              element={
                !isLoggedIn ? <Navigate to="/profile" replace /> :
                isFreelancer ? <ReportsPage /> : <Navigate to="/profile" replace />
              }
            />
        </Routes>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
