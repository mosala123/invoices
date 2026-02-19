import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaReceipt,
  FaMoneyBillWave, FaClock, FaGlobe, FaCheckCircle, FaCalendarAlt, FaListAlt, FaArrowRight, FaPlusCircle, FaCommentDots,
  FaTelegramPlane
} from 'react-icons/fa';
import { FaCcAmazonPay, FaCartShopping } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { BsX } from 'react-icons/bs';
import "./ContactClient.css";
import { Addtocart } from '../rtk/slices/cartslise';
import { fetchProduct } from '../rtk/slices/productslise';

const InvoicesDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const invoice = products.find(
    (item) => item.invoiceId.toString() === invoiceId
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const [opencontact, setOpencontact] = useState(false);
  const [messages, setMessages] = useState('');
  const [messageWritten, setMessageWritten] = useState([
    { sender: 'client', text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟' },
    { sender: 'freelancer', text: 'أهلاً بك، أنا مهتم بهذه الخدمة.' }
  ]);

  if (!invoice) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h4 className="text-danger mb-3">عذراً، الفاتورة غير موجودة</h4>
          <button className="btn btn-primary rounded-pill" onClick={() => navigate('/create-invoice')}>العودة للخدمات</button>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messages.trim() !== '') {
      setMessageWritten([...messageWritten, { sender: 'freelancer', text: messages }]);
      setMessages('');
    }
  };

  return (
    <div className="details-page py-5 bg-light min-vh-100">
      {/* Floating Cart Button */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="floating-cart shadow-lg"
        style={{ 
          position: "fixed", top: "100px", right: "30px", zIndex: 1000,
          backgroundColor: "#0d6efd", padding: "15px", borderRadius: "50%"
        }}
      >
        <Link to="/cartinvoices" className="text-white position-relative">
          <FaCartShopping size={24} />
          {cart.length > 0 && (
            <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
              {cart.length}
            </span>
          )}
        </Link>
      </motion.div>

      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h2 className="fw-bold text-primary mb-2">
            <FaReceipt className="me-2" /> تفاصيل الخدمة
          </h2>
          <p className="text-muted">مراجعة كافة البيانات قبل الإضافة للفاتورة</p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card border-0 shadow-sm rounded-4 overflow-hidden"
            >
              <div className="row g-0">
                <div className="col-md-6 border-end bg-white p-4 p-lg-5">
                  <h5 className="fw-bold mb-4 border-bottom pb-2 text-primary">بيانات العميل</h5>
                  <div className="info-list">
                    <div className="d-flex align-items-center mb-3">
                      <FaUser className="text-muted me-3" />
                      <div><small className="text-muted d-block">اسم العميل</small><strong>{invoice.customerName}</strong></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaEnvelope className="text-muted me-3" />
                      <div><small className="text-muted d-block">البريد الإلكتروني</small><strong>{invoice.customerEmail}</strong></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaPhone className="text-muted me-3" />
                      <div><small className="text-muted d-block">رقم الهاتف</small><strong>{invoice.customerPhone}</strong></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaMapMarkerAlt className="text-muted me-3" />
                      <div><small className="text-muted d-block">العنوان</small><strong>{invoice.customerAddress}, {invoice.city}</strong></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <GiHomeGarage className="text-muted me-3" />
                      <div><small className="text-muted d-block">الشركة</small><strong>{invoice.companyName}</strong></div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 bg-light p-4 p-lg-5">
                  <h5 className="fw-bold mb-4 border-bottom pb-2 text-primary">تفاصيل الخدمة والمالية</h5>
                  <div className="info-list">
                    <div className="d-flex align-items-center mb-3">
                      <FaListAlt className="text-muted me-3" />
                      <div><small className="text-muted d-block">عنوان الخدمة</small><strong>{invoice.serviceTitle}</strong></div>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <FaCheckCircle className="text-muted me-3 mt-1" />
                      <div><small className="text-muted d-block">الوصف</small><strong>{invoice.serviceDescription}</strong></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaClock className="text-muted me-3" />
                      <div><small className="text-muted d-block">وقت التسليم</small><strong>{invoice.deliveryTime}</strong></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaCcAmazonPay className="text-muted me-3" />
                      <div><small className="text-muted d-block">طريقة الدفع</small><strong>{invoice.paymentMethod}</strong></div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaMoneyBillWave className="text-success me-3" />
                      <div><small className="text-muted d-block">السعر الإجمالي</small><strong className="text-success fs-5">{invoice.price} EGP</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer bg-white p-4 border-0">
                <div className="d-flex gap-3 flex-wrap justify-content-center">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-outline-secondary rounded-pill px-4" onClick={() => navigate(-1)}>
                    العودة للخلف
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-success rounded-pill px-4" onClick={() => dispatch(Addtocart(invoice))}>
                    <FaPlusCircle className="me-2" /> إضافة للفاتورة
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary rounded-pill px-4" onClick={() => setOpencontact(true)}>
                    <FaCommentDots className="me-2" /> تواصل مع العميل
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {opencontact && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="chat-overlay"
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
              onClick={() => setOpencontact(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="chat-sidebar bg-white shadow-lg"
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', zIndex: 1060, display: 'flex', flexDirection: 'column' }}
            >
              <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">محادثة مع العميل</h5>
                <BsX size={30} className="cursor-pointer" onClick={() => setOpencontact(false)} />
              </div>
              
              <div className="flex-grow-1 p-4 overflow-auto bg-light">
                {messageWritten.map((msg, index) => (
                  <div key={index} className={`d-flex mb-3 ${msg.sender === 'freelancer' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`p-3 rounded-4 shadow-sm ${msg.sender === 'freelancer' ? 'bg-primary text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '80%' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 bg-white border-top">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light rounded-pill px-4" 
                    placeholder="اكتب رسالتك هنا..." 
                    value={messages}
                    onChange={(e) => setMessages(e.target.value)}
                  />
                  <button className="btn btn-primary rounded-circle ms-2 p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <FaTelegramPlane />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvoicesDetails;
