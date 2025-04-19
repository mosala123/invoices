import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPages from "./components/about us/AboutPages";
import CreateInvoices from "./components/create invoices/CreateInvoices";
import InvoicesDetails from "./components/create invoices/InvoicesDetails";
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
import ShapeInvoices from "./components/shapeinvo/ShapeInvoices";
import CartInvoices from "./components/create invoices/CartInvoices";

function App() {
  return (
    <div className="app-container">
      <SlideNavBar />

      {/* المحتوى الرئيسي */}
      <div className="main-content">
        <Routes>

          {/* add new post  */}
          <Route path="/addanewpro" element={<AddProjects />} />
          {/* -------------------------------------------------------------------------- */}


          {/* invoices    الواتير  */}

          {/* ------------------------------ */}

          {/* user ------------------------------------------------------------------*/}
          <Route path="/profile" element={<Profileme />} />
          <Route path="/profilefreelancer" element={<ProfileFreelancer />} />
          <Route path="/profileclient" element={<ProfileClient />} />
          <Route path="/registerclient" element={<RegisterCustomer />} />
          <Route path="/loginclient" element={<LoginCustomer />} />
          <Route path="/loginfreelancer" element={<LoginFreelancer />} />
          <Route path="/registerfreelancer" element={<RegisterFreelancer />} />

          {/* ----------------------------------------------------------------------------- */}

          {/* home pages --------------------------------------------------------------------  */}
          <Route path="/" element={<Homepages />} />
          <Route path="/about" element={<AboutPages />} />
          <Route path="/create-invoice" element={<CreateInvoices />} />


          <Route path="/ProductsDetails/:invoiceId" element={<InvoicesDetails />} />


          <Route path="/cartinvoices" element={<CartInvoices />} />
          {/* genertaion invoices  */}
          <Route path="/invoice/:invoiceId" element={<ShapeInvoices />} />



          <Route path="/report" element={<ReportsPage />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
