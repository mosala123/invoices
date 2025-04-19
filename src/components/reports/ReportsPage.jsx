import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilePdf, FaFileExcel, FaEnvelope, FaFileInvoice, FaChartBar, FaFilter } from "react-icons/fa";
import CartInvoices from "../create invoices/CartInvoices";

const ReportsPage = () => {
  return (
    <div className="container-fluid px-4 py-3 pt-5"> 
      <h2 className="text-primary text-center mb-5">📊 Invoice Reports</h2>

      {/* الإحصائيات */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 col-12 mb-3">
          <div className="card text-center shadow w-100">
            <div className="card-body">
              <h5>Total Invoices</h5>
              <h3 className="text-info">120</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 mb-3">
          <div className="card text-center shadow w-100">
            <div className="card-body">
              <h5>Paid Invoices</h5>
              <h3 className="text-success">80</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 mb-3">
          <div className="card text-center shadow w-100">
            <div className="card-body">
              <h5>Pending Invoices</h5>
              <h3 className="text-danger">20</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 mb-3">
          <div className="card text-center shadow w-100">
            <div className="card-body">
              <h5>Total Amount</h5>
              <h3 className="text-warning">50,000 EGP</h3>
            </div>
          </div>
        </div>
      </div>

      

      <div className="card shadow mb-4 mt-4" style={{width:"100%"}}>
        <div   className="  card-header bg-dark text-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 "><FaFileInvoice className="me-2" /> Invoice List</h5>
           
        </div>
       <CartInvoices />
      </div>

      <div className="row pb-5">
  <div className="col-md-6">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5><FaChartBar /> Invoice Trends</h5>
        <img
          src="https://quickchart.io/chart?c={type:'line',data:{labels:['Jan','Feb','Mar','Apr'],datasets:[{label:'Invoices',data:[10,20,15,30]}]}}"
          className="img-fluid"
          alt="Invoice Trends"
        />
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5><FaChartBar /> Status Distribution</h5>
        <img
          src="https://quickchart.io/chart?c={type:'pie',data:{labels:['Open','In Progress','Completed'],datasets:[{data:[5,8,12]}]}}"
          className="img-fluid"
          alt="Status Distribution"
        />
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ReportsPage;
