import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../rtk/slices/productslise';
import { FaUser, FaEnvelope, FaServicestack, FaAlignLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Addtocart } from '../rtk/slices/cartslise';
import { FaCartShopping } from 'react-icons/fa6';

const CreateInvoices = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (products.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  
  const filteredProducts = products.filter((pro) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      pro.customerName.toLowerCase().includes(searchLower) ||
      pro.customerEmail.toLowerCase().includes(searchLower) ||
      pro.serviceTitle.toLowerCase().includes(searchLower) ||
      pro.serviceDescription.toLowerCase().includes(searchLower);

    const matchesFilter = filterBy
      ? pro.serviceTitle.toLowerCase().includes(filterBy.toLowerCase())
      : true;

    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="pt-5 pb-5"  style={{ position: "relative"}}>

<div 
    style={{ 
      position: "fixed",  
      display: "inline-block",
      top: "15%", 
      right: "3%", 
      zIndex:"99"
    }}
  >
    <Link   className='text-dark ' to="/cartinvoices"> <FaCartShopping className="slideicons fs-4" /></Link>

   
    <span 
      className="badge bg-danger rounded-circle" 
      style={{ 
        position: "absolute", 
        top: "-16px", 
        right: "-10px", 
        width: "20px", 
        height: "20px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: "12px",
        zIndex: 99
      }}
    >
      {cart.length}
    </span>

  </div>



      <div className="container">
        
        <div className="text-center pt-4 pb-3">
          <p className="text-success fw-semibold mt-3">
            Welcome 👋 <br />
            Thank you for using our service! Your invoice has been successfully created.
            Have a great day 💼✨
          </p>
        </div>


 


        <div className="d-flex justify-content-between align-items-center mb-3 px-4 mt-5">
        
          <div className="w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, title or description..."
              style={{ backgroundColor: '#f0f8ff' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
 


          <div className="ms-2   ">
            <select
              className="form-select"
              style={{ minWidth: '150px', backgroundColor: '#f0f8ff' }}
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="">All Services</option>
              {[...new Set(products.map((p) => p.serviceTitle))].map((title, idx) => (
                <option key={idx} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
 
        


        <div className="row mt-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-danger mt-4"><div className="text-center text-secondary mt-5">
            <h5 className="mb-3">🔍 Hmm... Nothing matches your search</h5>
            <p>Try adjusting your keywords or filters to find what you're looking for.</p>
          </div>
          </p>
          ) : (
            filteredProducts.map((pro, index) => (
              <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                <div className="card mb-4 shadow-sm py-3 px-0 text-start rounded-4 invoice-card">
                  <div className="card-body" style={{ width: '100%' }}>
                    <p className="card-title text-primary d-flex align-items-center">
                      <FaUser className="me-2 text-dark" />
                      {pro.customerName}
                    </p>
                    <p className="card-text">
                      <FaEnvelope className="me-2 text-secondary" />
                      {pro.customerEmail}
                    </p>
                    <p className="card-text">
                      <FaServicestack className="me-2 text-success" />
                      {pro.serviceTitle}
                    </p>
                    <p className="card-text d-flex align-items-center">
                      <FaAlignLeft className="me-2 text-info" />
                      {pro.serviceDescription.slice(0, 40)}..
                    </p>
                    <div className="d-flex gap-3 mt-4">
                      <Link to={`/ProductsDetails/${pro.invoiceId}`} className="btn btn-primary btn-hover">
                        Details
                      </Link>
                      <button
                        className="btn btn-success btn-hover"
                        onClick={() => dispatch(Addtocart(pro))}
                      >
                        Add To Invoices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateInvoices;
