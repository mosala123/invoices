import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaServicestack } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Deletcart } from '../rtk/slices/cartslise';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const CartInvoices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [filterStatus, setFilterStatus] = useState("All");

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(Deletcart(id));
        Swal.fire(
          'Deleted!',
          'The item has been removed from your cart.',
          'success'
        );
      }
    });
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredCart =
    filterStatus === "All"
      ? cart
      : cart.filter((item) => item.status === filterStatus);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-start px-2 text-primary">🧾 Cart Invoices</h3>
        <select
          value={filterStatus}
          onChange={handleStatusChange}
          className="form-select w-auto"
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="table-responsive px-2">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr className='text-center'>
              <th scope="col">#</th>
              <th scope="col" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Customer Name <FaUser className="ms-2" /></th>
              <th scope="col">Email <FaEnvelope className="ms-2" /></th>
              <th scope="col">Service <FaServicestack className="ms-2" /></th>
              <th style={{whiteSpace:"nowrap"}} scope="col">Delivery Time</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCart.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-danger">
                  😔 Your cart is currently empty or no items match the selected status.
                  <br />
                  <Link to="/create-invoice" className="btn btn-primary mt-3">
                    Create-Invoices
                  </Link>
                </td>
              </tr>
            ) : (
              filteredCart.map((carts, index) => (
                <tr key={carts.id} className='text-center'>
                  <th scope="row">{index + 1}</th>
                  <td>{carts.customerName}</td>
                  <td>{carts.customerEmail}</td>
                  <td style={{whiteSpace:"nowrap"}}>{carts.serviceTitle}</td>
                  <td>{carts.deliveryTime}</td>
                  <td>{carts.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        carts.status === "Open"
                          ? "bg-warning text-dark"
                          : carts.status === "In Progress"
                          ? "bg-info text-dark"
                          : "bg-success"
                      }`}
                    >
                      {carts.status}
                    </span>
                  </td>
                  <td style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "nowrap" }}>
                    <button style={{whiteSpace:"nowrap"}}
                      className="btn btn-primary"
                      onClick={() => navigate(`/invoice/${carts.invoiceId}`)}
                    >
                      Generate Invoice
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(carts.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button className='btn btn-info mt-4' onClick={() => navigate(-1)}>
        Back <IoArrowBackSharp />
      </button>
    </div>
  );
};

export default CartInvoices;
