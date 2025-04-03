import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPages from "./components/about us/AboutPages";
import CreateInvoices from "./components/create invoices/CreateInvoices";
import InvoicesDetails from "./components/create invoices/InvoicesDetails";
import InvoicesList from "./components/invoices list/InvoicesList";
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
import InvoicesListDetails from "./components/invoices list/InvoicesListDetails";
import Homepages from "./components/home/Homepages";
import AddProjects from "./components/dashboardClient/AddProjects";

function App() {
  return (
    <div className="app-container">
      <SlideNavBar />

      {/* المحتوى الرئيسي */}
      <div className="main-content">
        <Routes>
          <Route path="/addanewpro" element={<AddProjects />} />

          {/* user */}
          <Route path="/FinanceAdvisor/profile" element={<Profileme />} />
          <Route
            path="/FinanceAdvisor/profilefreelancer"
            element={<ProfileFreelancer />}
          />
          <Route
            path="/FinanceAdvisor/profileclient"
            element={<ProfileClient />}
          />

          <Route
            path="/FinanceAdvisor/registerclient"
            element={<RegisterCustomer />}
          />
          <Route
            path="/FinanceAdvisor/loginclient"
            element={<LoginCustomer />}
          />
          <Route
            path="/FinanceAdvisor/loginfreelancer"
            element={<LoginFreelancer />}
          />
          <Route
            path="/FinanceAdvisor/registerfreelancer"
            element={<RegisterFreelancer />}
          />

          {/* ----------- */}

          {/* invoince  */}
          <Route
            path="/FinanceAdvisor/invoicedetails/:invoicesId"
            element={<InvoicesDetails />}
          />

          <Route path="/FinanceAdvisor/about" element={<AboutPages />} />
          <Route
            path="/FinanceAdvisor/create-invoice"
            element={<CreateInvoices />}
          />
          <Route
            path="/FinanceAdvisor/invoiceslist"
            element={<InvoicesList />}
          />
          <Route path="/FinanceAdvisor/report" element={<ReportsPage />} />

          <Route
            path="/FinanceAdvisor/invoice-details/:invoiceId"
            element={<InvoicesListDetails />}
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
