//  import React, { useEffect, useState } from 'react';
//  import { useParams, useNavigate } from 'react-router-dom';
//  import { useDispatch, useSelector } from 'react-redux';
//  import {
//    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaReceipt,
//    FaMoneyBillWave, FaClock, FaGlobe, FaCheckCircle, FaCalendarAlt, FaListAlt, FaArrowLeft, FaPlusCircle, FaCommentDots,
//    FaTelegramPlane
//  } from 'react-icons/fa';
//  import { FaCcAmazonPay } from "react-icons/fa";
//  import { GiHomeGarage } from "react-icons/gi";
//  import { BsX } from 'react-icons/bs';
//  import "./ContactClient.css"
//  import { Addtocart } from '../rtk/slices/cartslise';
//  import { fetchProduct } from '../rtk/slices/productslise';
//  const InvoicesDetails = () => {
//    const { invoiceId } = useParams();
//    const navigate = useNavigate();
//    const dispatch = useDispatch();
//    const products = useSelector((state) => state.products);
 
//    const invoice = products.find(
//      (item) => item.invoiceId.toString() === invoiceId
//    );
 
//   useEffect(() => {
//      dispatch(fetchProduct());
//    }, [dispatch]);
 
 
//    if (!invoice) {
//      return (
//        <div className="text-center mt-5">
//          <h4 className="text-danger">Invoice not found</h4>
//        </div>
//      );
//    }
 
 
 
 
 
 
 
//    const [opencontact, setOpencontact] = useState(false);
 
//    const handleOpenClose = () => {
//      setOpencontact(!opencontact);
//    };
 
//    const [messages, setMessages] = useState('');
//    const [messageWritten, setMessageWritten] = useState([
//      { sender: 'client', text: 'Hello, Freelancer! How are you today?' },
//      { sender: 'freelancer', text: 'Hello! I am doing great, thank you for asking!' }
//    ]);
 
//    const handleSendMessage = (e) => {
//      e.preventDefault();
//      if (messages.trim() !== '') {
//        setMessageWritten([...messageWritten, { sender: 'freelancer', text: messages }]);
//        setMessages('');
//      }
//    };
 
 
 
 
 
//    return (
//      <div style={{ marginLeft: "10px ", position: "relative" }} className='pt-4 pb-5'>
//        <div className="container my-5  " >
//          <h2 className="text-center text-primary mb-4">
//            <FaReceipt className="me-2" />
//            Services  Details
//          </h2>
 
//          <div className="row justify-content-center">
//            <div className="col-12 col-md-10 col-lg-8">
//              <div className="card shadow rounded-4 p-4">
//                <div className="mb-3">
//                  <p  >
//                    <FaUser className="me-2" />
//                    customerName :    <span className='text-primary'>{invoice.customerName}</span>
//                  </p>
//                  <p><FaEnvelope className="me-2 text-secondary" />customerEmail : <span className='text-primary'>   {invoice.customerEmail} </span> </p>
//                  <p><FaPhone className="me-2 text-success" /> customerPhone :  <span className='text-primary'> {invoice.customerPhone} </span> </p>
//                  <p><FaMapMarkerAlt className="me-2 text-danger" />customerAddress :  <span className='text-primary'>  {invoice.customerAddress}, {invoice.city}, {invoice.country} - {invoice.postalCode} </span></p>
//                  <p><GiHomeGarage className="me-2 text-dark" /> companyName :  <span className='text-primary'>  {invoice.companyName} </span>  </p>
//                  <p><FaBuilding className="me-2 text-info" />postalCode : <span className='text-primary'>   {invoice.postalCode} </span> </p>
//                  <p><FaGlobe className="me-2 text-warning" /> Tax Number: <span className='text-primary'>  {invoice.taxNumber}</span>  </p>
//                </div>
 
//                <hr />
 
//                <div className="mb-3">
//                  <p >
//                    <FaListAlt className="me-2" />
//                    serviceTitle :  <span className=' me-2 text-primary'>  {invoice.serviceTitle} </span>
//                  </p>
//                  <p><FaCheckCircle className="me-2 text-primary" /> serviceDescription : <span className='text-primary'>  {invoice.serviceDescription} </span></p>
//                  <p><FaClock className="me-2 text-info" /> Delivery : <span className='text-primary'> {invoice.deliveryTime}  </span>  </p>
//                  <p> <FaCcAmazonPay className="me-2 text-dark" /> Payment Method: <span className='text-primary'> {invoice.paymentMethod} </span> </p>
//                  <p><FaCalendarAlt className="me-2 text-warning" /> Due Date :  <span className='text-primary'>  {invoice.dueDate}</span></p>
//                  <p><FaCalendarAlt className="me-2 text-secondary" /> Invoice Date :  <span className='text-primary'> {invoice.invoiceDate}</span></p>
//                  <p><FaMoneyBillWave className="me-2 text-success" /> Price: <span className='text-primary'>  {invoice.price} EGP </span>   </p>
//                </div>
 
//                <div className="d-flex gap-3 mt-4" style={{ flexWrap: "wrap" }}>
//                  <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//                    <FaArrowLeft className="me-2" />
//                    Back
//                  </button>
//                  <button className="btn btn-success" 
//                   onClick={() => dispatch(Addtocart(invoice))}
//                  >
//                    <FaPlusCircle className="me-2" />
//                    Add to Invoices
//                  </button>
 
//                  <button className="btn btn-primary" onClick={handleOpenClose}>
//                    <FaCommentDots className="me-2" />
//                    Contact
//                  </button>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
 
//        {/* contact  */}
//        <div className="ContactClient">
 
//          <div className={`card bg-dark shadow-lg rounded-3 pb-4 ${opencontact ? 'open' : ''}`} style={{ height: '90vh', maxWidth: "390px " }}>
//            <BsX
//              size={28}
//              className={`cursor-pointer text-dark bg-light ${opencontact ? 'close' : ''}`}
//              style={{ position: 'absolute', left: '10px', top: '20px', borderRadius: '50%', cursor: 'pointer' }}
//              onClick={handleOpenClose}
//            />
//            <div className="d-flex justify-content-center align-items-center   ">
//              <div className="card-header  mt-5      bg-primary text-white mt-4 mb-5 pb-0 px-4" style={{ borderRadius: "20px " }}>
//                <h5  > Chat with Client</h5>
//              </div>
//            </div>
 
//            <div className="card-body p-3 overflow-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
//              {messageWritten.map((msg, index) => (
//                <div key={index} className={`d-flex ${msg.sender === 'client' ? 'justify-content-start' : 'justify-content-end'} mb-3`}>
//                  <div className={`p-3 rounded-3 ${msg.sender === 'client' ? 'bg-light' : 'bg-primary text-white'}`} style={{ maxWidth: '75%' }}>
//                    {msg.text}
//                  </div>
//                </div>
//              ))}
//            </div>
 
//            <div className="card-footer p-3   " style={{}}>
//              <form onSubmit={handleSendMessage} className="d-flex align-items-center">
//                <input
//                  required
//                  type="text"
//                  className="form-control me-2 rounded-pill p-3 "
//                  placeholder="Write Your Message .."
//                  style={{ fontSize: '16px', height: '50px' }}
//                  value={messages}
//                  onChange={(e) => setMessages(e.target.value)}
//                />
//                <button
//                  type="submit"
//                  className="btn btn-primary "
//                  style={{
//                    borderRadius: '50%',
//                    width: '50px',
//                    height: '50px',
//                    display: "flex",
//                    alignItems: "center",
//                    justifyContent: "center",
 
//                  }}
//                >
//                  <FaTelegramPlane size={24} />
//                </button>
 
//              </form>
//            </div>
//          </div>
 
//        </div>
 
 
 
 
 
 
 
//      </div>
//    );
//  };
 
//  export default InvoicesDetails;
 