import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMoneyBillWave, FaCalendarAlt, FaUser, FaReceipt, FaPhoneAlt, FaEnvelope, FaTag, FaTasks, FaRegFileAlt, FaClock } from 'react-icons/fa';
import { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoArrowBackSharp } from 'react-icons/io5';
import { accountFreelancer } from '../user/appwritefreelancer';

const ShapeInvoices = ({ days = 7, hours = 0, minutes = 0, seconds = 0 }) => {
  const { invoiceId } = useParams();
  const totalTimeInMs = (
    (days * 24 * 60 * 60) +
    (hours * 60 * 60) +
    (minutes * 60) +
    (seconds)
  ) * 1000;
  
  
  const [endTime] = useState(new Date().getTime() + totalTimeInMs);
  const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());
  const [timerActive, setTimerActive] = useState(true);  

  useEffect(() => {
    if (!timerActive) {
      return;  
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        setTimerActive(false); 
        alert('Time is up!'); 
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, timerActive]);  

  const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((timeLeft % (1000 * 60)) / 1000);
 







  const cartItems = useSelector((state) => state.cart);

  if (!Array.isArray(cartItems)) {
    console.error("Error: 'cart.items' is not an array or is undefined:", cartItems);
    return <div className="text-center text-danger mt-5">Error loading invoices</div>;
  }

  const invoice = cartItems.find(item => String(item.invoiceId) === invoiceId); // ✅ تأكدنا إنهم String

  if (!invoice) {
    return <div className="text-center text-danger mt-5">Invoice not found</div>;
  }

const navigate =useNavigate()
// get freelancer account
const [freelanceraccount, setfreelanceraccount] = useState(null); // الافضل تبدأ بـ null

useEffect(() => {
  const GetUserData = async () => {
    const getUser = await accountFreelancer.get();
    setfreelanceraccount(getUser);
  };

  GetUserData();
}, []);

  return (
    <div className='pt-5 pb-5 ' style={{width:"100%"}}>
       <div className="   p-0" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:"100%" }}>
      <div className=" p-4 shadow-lg border-0 rounded" style={{ width: '95%', maxWidth: '800px', display: 'flex', flexDirection: 'column' }}>
        <div className="text-center mb-3">
          <h3 className='mb-3' style={{ color: '#007bff' }}>Service Invoice</h3>
        </div>

        

        {/* Customer and freelancer information */}
        <div className="row mb-2">
  <div className="col-md-12 col-lg-6 col-sm-12">
    <div className="form-group mb-2">
      <label htmlFor="customerName" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Customer Name:</label>
      <input
        type="text"
        id="customerName"
        className="form-control"
        value={invoice.customerName}
        disabled
        style={{ backgroundColor: '#f0f8ff', width: '100%' }}
      />
    </div>
    <div className="form-group mb-2">
      <label htmlFor="customerEmail" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Email:</label>
      <input
        type="email"
        id="customerEmail"
        className="form-control"
        value={invoice.customerEmail}
        disabled
        style={{ backgroundColor: '#f0f8ff', width: '100%' }}
      />
    </div>
    <div className="form-group mb-2">
      <label htmlFor="customerPhone" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Phone Number:</label>
      <input
        type="tel"
        id="customerPhone"
        className="form-control"
        value={invoice.customerPhone}
        disabled
        style={{ backgroundColor: '#f0f8ff', width: '100%' }}
      />
    </div>
  </div>

  <div className="col-md-12 col-lg-6 col-sm-12">
  <div className="form-group mb-2">
    <label htmlFor="freelancerName" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
      Freelancer Name:
    </label>
    <input
      type="text"
      id="freelancerName"
      placeholder="Please Enter Name..."
      className="form-control"
      value={freelanceraccount?.name || ''}
      style={{ backgroundColor: '#f0f8ff', width: '100%' }}
      readOnly 
    />
  </div>

  <div className="form-group mb-2">
    <label htmlFor="freelancerEmail" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
      Email:
    </label>
    <input
      type="email"
      id="freelancerEmail"
      placeholder="Please Enter Email..."
      className="form-control"
      value={freelanceraccount?.email || ''}
      style={{ backgroundColor: '#f0f8ff', width: '100%' }}
      readOnly
    />
  </div>

  
</div>

</div>


        {/* Invoice date and due date */}
        <div className="row mb-2">
          <div className="col-md-12  col-lg-6  col-sm-12">
            <div className="form-group mb-2">
              <label htmlFor="invoiceDate" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Invoice Issue Date:</label>
              <input
                type="date"
                id="invoiceDate"
                className="form-control"
                value="2025-04-10"
                disabled
                style={{ backgroundColor: '#f0f8ff', width: '100%' }}
              />
            </div>
          </div>
          <div className="col-md-12  col-lg-6  col-sm-12">
            <div className="form-group mb-2">
              <label htmlFor="invoiceNumber" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Invoice Number:</label>
              <input
                type="text"
                id="invoiceNumber"
                className="form-control"
                value="INV-1001"
                disabled
                style={{ backgroundColor: '#f0f8ff', width: '100%' }}
              />
            </div>
          </div>
        </div>
         
        {/* Payment method */}
        <div className="mb-2">
          <label htmlFor="paymentMethod" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Payment Method:</label>
          <select
            id="paymentMethod"
            className="form-control"
            style={{ backgroundColor: '#f0f8ff', width: '100%' }}
          >
            <option>Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Additional conditions */}
        <div className="mb-2">
          <label htmlFor="additionalConditions" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Additional Conditions (If Any):</label>
          <textarea
            id="additionalConditions"
            className="form-control"
            rows="2"
            style={{ backgroundColor: '#f0f8ff', width: '100%' }}
          >
            None
           </textarea>
        </div>

        {/* Service description */}
        <div className="mb-2">
          <h5 style={{ color: '#6c757d', fontSize: '1rem', fontWeight: 'bold' }}>Service Description:</h5>
          <input
            type="text"
            className="form-control"
            value="User Interface design for a website with a responsive homepage."
            disabled
            style={{ backgroundColor: '#f0f8ff', width: '100%' }}
          />
        </div>

        {/* Agreed tasks */}
        <div className="mb-2">
          <h5 style={{ color: '#6c757d', fontSize: '1rem', fontWeight: 'bold' }}><FaTasks /> Agreed Tasks:</h5>
          <ul style={{ color: '#495057', fontSize: '0.9rem' }}>
            <li>User Interface Design.</li>
            <li>Homepage Development.</li>
            <li>Performance Testing on different devices.</li>
          </ul>
        </div>

        {/* Cost details */}
        <div className="table-responsive mb-3" style={{ flexGrow: 1 }}>
  <table className="table table-bordered table-striped" style={{ fontSize: '0.9rem' }}>
    <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
      <tr>
        <th>Service Title</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className='text-primary'>{invoice.serviceTitle}</td>
        <td className='text-primary'>{invoice.price} EGP</td>
      </tr>

      {/* Subtotal */}
      <tr>
        <td className="text-start"><strong>Subtotal</strong></td>
        <td>{invoice.price} EGP</td>
      </tr>

      {/* Tax */}
      <tr>
        <td className="text-start"><strong>Tax (14%)</strong></td>
        <td>{(invoice.price * 0.14).toFixed(2)} EGP</td>
      </tr>

      {/* Total */}
      <tr>
  <td className="text-start text-success"><strong>Total (with Tax)</strong></td>
  <td className="text-success"><strong>{(invoice.price * 1.14).toFixed(2)} EGP</strong></td>
</tr>

    </tbody>
  </table>
</div>


       

        <div className="mt-3">
  <h5 style={{ fontWeight: 'bold' }}>Payment Terms:</h5>
  <ul style={{ color: '#495057', fontSize: '0.9rem' }}>
    <li>50% of the total amount is due upon invoice creation.</li>
    <li>The remaining 50% is due within 7 days from the invoice date.</li>
    <li>If the customer fails to pay the remaining amount after 7 days, a late fee of 2% per day will be added.</li>
  </ul>
</div>

{/* Countdown Timer */}
<div className="container mt-5 py-4 mb-5 border rounded shadow-sm bg-light">
      <div className="row text-center">
        <div className="col-lg-3">
          <h4>{d}</h4>
          <p>Days</p>
        </div>
        <div className="col-lg-3">
          <h4>{h}</h4>
          <p>Hours</p>
        </div>
        <div className="col-lg-3">
          <h4>{m}</h4>
          <p>Minutes</p>
        </div>
        <div className="col-lg-3">
          <h4>{s}</h4>
          <p>Seconds</p>
        </div>
      </div>
    </div>

 
  {/* Create invoice button */}
  <div className="text-center">
          <button className="btn btn-primary">Save Invoices   </button>
        </div>

        <div style={{display:"flex",alignItems:"flex-start"}}>
<button className='btn btn-info   mb-3 ' onClick={()=>navigate(-1)}> back  <IoArrowBackSharp  />        </button>

</div>
      </div>
    </div>
    </div>
  );
}

export default ShapeInvoices;
