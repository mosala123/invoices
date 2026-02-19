import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaServicestack, FaTrash, FaFileInvoice, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Deletcart } from '../rtk/slices/cartslise';
import { Link, useNavigate } from 'react-router-dom';

const CartInvoices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [filterStatus, setFilterStatus] = useState("All");

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذفها!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(Deletcart(id));
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تمت إزالة العنصر من الفاتورة.',
          icon: 'success',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  };

  const filteredCart = filterStatus === "All"
    ? cart
    : cart.filter((item) => item.status === filterStatus);

  return (
    <div className="cart-invoices-page py-5 bg-light min-vh-100">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3"
        >
          <div>
            <h2 className="fw-bold text-primary mb-1">سلة الفواتير 🧾</h2>
            <p className="text-muted mb-0">إدارة الخدمات المضافة وتوليد الفواتير النهائية</p>
          </div>
          
          <div className="d-flex gap-3 align-items-center">
            <label className="fw-bold text-muted d-none d-md-block">تصفية حسب الحالة:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select border-0 shadow-sm rounded-pill px-4"
              style={{ width: 'auto' }}
            >
              <option value="All">الكل</option>
              <option value="Open">مفتوحة</option>
              <option value="In Progress">قيد التنفيذ</option>
              <option value="Completed">مكتملة</option>
            </select>
          </div>
        </motion.div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="ps-4 py-3">#</th>
                  <th className="py-3">العميل</th>
                  <th className="py-3">الخدمة</th>
                  <th className="py-3">وقت التسليم</th>
                  <th className="py-3">السعر</th>
                  <th className="py-3">الحالة</th>
                  <th className="py-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredCart.length === 0 ? (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td colSpan="7" className="text-center py-5">
                        <div className="py-4">
                          <FaFileInvoice size={50} className="text-muted mb-3 opacity-25" />
                          <h5 className="text-muted">السلة فارغة حالياً</h5>
                          <Link to="/create-invoice" className="btn btn-primary rounded-pill mt-3 px-4">
                            إضافة خدمات جديدة
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ) : (
                    filteredCart.map((item, index) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="ps-4 fw-bold text-muted">{index + 1}</td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-bold">{item.customerName}</span>
                            <span className="small text-muted">{item.customerEmail}</span>
                          </div>
                        </td>
                        <td><span className="badge bg-light text-dark border">{item.serviceTitle}</span></td>
                        <td>{item.deliveryTime}</td>
                        <td className="fw-bold text-primary">{item.price}</td>
                        <td>
                          <span className={`badge rounded-pill px-3 py-2 ${
                            item.status === "Open" ? "bg-warning text-dark" :
                            item.status === "In Progress" ? "bg-info text-white" : "bg-success"
                          }`}>
                            {item.status === "Open" ? "مفتوحة" : 
                             item.status === "In Progress" ? "قيد التنفيذ" : "مكتملة"}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-primary btn-sm rounded-pill px-3"
                              onClick={() => navigate(`/invoice/${item.invoiceId}`)}
                            >
                              توليد فاتورة
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-danger btn-sm rounded-circle p-2"
                              onClick={() => handleDelete(item.id)}
                            >
                              <FaTrash />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <motion.button 
          whileHover={{ x: -5 }}
          className="btn btn-link text-decoration-none text-muted mt-4 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowRight /> العودة للخلف
        </motion.button>
      </div>
    </div>
  );
};

export default CartInvoices;
