import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const InvoicesList = () => {
  return (
    <div className=" container  mt-5">
      <h3 className="text-center mb-5">📜 Invoice List</h3>


      {/* search select  */}
      <div className="d-flex justify-content-between  ">
        <select className="form-select w-25 shadow-sm border-primary"  >
          <option value="all">All</option>
          <option value="all">Paid </option>
          <option value="all">All</option>
        </select>

        <input
          type="text"
          className="form-control w-50 shadow-sm border-primary"
          placeholder="Search for a invoices paind or ..."
        />
      </div>




      <div className="mt-4 d-flex align-items-center   card shadow-sm p-3  " style={{ width: "100%", whiteSpace: "nowrap", overflow: "scroll" }}>
        <Table striped bordered hover className="text-center">
          <thead className="table-primary">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>#</th>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Buyer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>INV-1001</td>
              <td>2025-03-16</td>
              <td>Ahmed Ali</td>
              <td>500 EGP</td>
              <td><Badge bg="success">Paid</Badge></td>
              <td>
                <Link to="/invoice-details/INV-1001">
                  <Button variant="info" size="sm">View Details</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>INV-1001</td>
              <td>2025-03-16</td>
              <td>Ahmed Ali</td>
              <td>500 EGP</td>
              <td><Badge bg="success">Paid</Badge></td>
              <td>
                <Link to="/invoice-details/INV-1001">
                  <Button variant="info" size="sm">View Details</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>INV-1001</td>
              <td>2025-03-16</td>
              <td>Ahmed Ali</td>
              <td>500 EGP</td>
              <td><Badge bg="success">Paid</Badge></td>
              <td>
                <Link to="/invoice-details/INV-1001">
                  <Button variant="info" size="sm">View Details</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>INV-1001</td>
              <td>2025-03-16</td>
              <td>Ahmed Ali</td>
              <td>500 EGP</td>
              <td><Badge bg="success">Paid</Badge></td>
              <td>
                <Link to="/invoice-details/INV-1001">
                  <Button variant="info" size="sm">View Details</Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default InvoicesList;
