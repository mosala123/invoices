import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProduct } from '../rtk/slices/productslise';
import { FaUser, FaEnvelope, FaServicestack, FaAlignLeft, FaSearch, FaFilter } from 'react-icons/fa';
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
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="spinner-border text-primary" 
          role="status"
        >
          <span className="visually-hidden">جاري التحميل...</span>
        </motion.div>
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
    <div className="create-invoices-page py-5 bg-light min-vh-100">
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
          <h2 className="fw-bold text-primary mb-3">إنشاء وإدارة الفواتير</h2>
          <p className="text-muted">مرحباً بك 👋 يمكنك هنا تصفح الخدمات المتاحة وإضافتها لفاتورتك بسهولة.</p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="row g-3 mb-5 align-items-center bg-white p-4 rounded-4 shadow-sm">
          <div className="col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><FaSearch className="text-muted" /></span>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="ابحث بالاسم، البريد، أو نوع الخدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><FaFilter className="text-muted" /></span>
              <select
                className="form-select border-0 bg-light"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="">كل الخدمات</option>
                {[...new Set(products.map((p) => p.serviceTitle))].map((title, idx) => (
                  <option key={idx} value={title}>{title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          <AnimatePresence>
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-12 text-center py-5"
              >
                <div className="text-muted">
                  <FaSearch size={50} className="mb-3 opacity-25" />
                  <h5>عذراً، لم نجد أي نتائج تطابق بحثك</h5>
                  <p>حاول تغيير كلمات البحث أو الفلاتر.</p>
                </div>
              </motion.div>
            ) : (
              filteredProducts.map((pro, index) => (
                <motion.div 
                  key={pro.invoiceId || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="col-lg-4 col-md-6"
                >
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden invoice-card">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                          <FaUser className="text-primary" />
                        </div>
                        <h6 className="fw-bold mb-0">{pro.customerName}</h6>
                      </div>
                      
                      <div className="mb-3 small text-muted">
                        <div className="d-flex align-items-center mb-2">
                          <FaEnvelope className="me-2" /> {pro.customerEmail}
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <FaServicestack className="me-2 text-success" /> {pro.serviceTitle}
                        </div>
                        <div className="d-flex align-items-start">
                          <FaAlignLeft className="me-2 mt-1 text-info" /> 
                          <span>{pro.serviceDescription.slice(0, 60)}...</span>
                        </div>
                      </div>

                      <div className="d-flex gap-2 mt-auto pt-3 border-top">
                        <Link to={`/ProductsDetails/${pro.invoiceId}`} className="btn btn-outline-primary flex-grow-1 rounded-pill">
                          التفاصيل
                        </Link>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary flex-grow-1 rounded-pill"
                          onClick={() => dispatch(Addtocart(pro))}
                        >
                          إضافة للفاتورة
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoices;
