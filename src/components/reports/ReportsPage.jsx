import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilePdf, FaFileExcel, FaEnvelope, FaFileInvoice, FaChartBar, FaFilter } from "react-icons/fa";

const ReportsPage = () => {
  return (
    <div className="container-fluid px-4 py-3"> 
      <h2 className="text-primary text-center mb-4">📊 Invoice Reports</h2>

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

      {/* أزرار التصفية والبحث */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-5">
        <select className="form-select  w-25 shadow-sm border-primary mb-2 mb-md-0">
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
        <input type="text" className="form-control  w-25 shadow-sm border-primary" placeholder="Search invoices..." />
      </div>

      <div className="card shadow mb-4 mt-4">
        <div className=" mt-3 card-header bg-dark text-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 "><FaFileInvoice className="me-2" /> Invoice List</h5>
           
        </div>
        <div className="card-body" style={{width:"100%"}}>
          <table className="table table-striped table-bordered text-center  " style={{width:"100%"}} >
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Invoice No.</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>INV-1001</td>
                <td>339 EGP</td>
                <td><span className="badge bg-success">Paid</span></td>
                <td>Credit Card</td>
                <td>2024-03-10</td>
                <td>
                  <button className="btn btn-sm btn-primary me-1"><FaFilePdf /></button>
                  <button className="btn btn-sm btn-danger"><FaEnvelope /></button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>INV-1002</td>
                <td>450 EGP</td>
                <td><span className="badge bg-danger">Pending</span></td>
                <td>Bank Transfer</td>
                <td>2024-03-11</td>
                <td>
                  <button className="btn btn-sm btn-primary me-1"><FaFilePdf /></button>
                  <button className="btn btn-sm btn-danger"><FaEnvelope /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5><FaChartBar /> Invoice Trends</h5>
              <img src="https://via.placeholder.com/500x250" className="img-fluid" alt="Graph" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5><FaChartBar /> Status Distribution</h5>
              <img src="https://via.placeholder.com/500x250" className="img-fluid" alt="Chart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
