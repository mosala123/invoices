import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FaUserCircle, FaEnvelope, FaPhone, FaBriefcase, FaEdit, 
  FaSignOutAlt, FaStar, FaCode, FaGraduationCap, FaGlobe 
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Noprofile from '../Noprofile';

const ProfileFreelancer = () => {
  const [userFreelancer, setUserFreelancer] = useState(true); // Mocked for UI
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'محمد صلاح',
    email: 'elmosalah74@gmail.com',
    phone: '0123456789',
    currentJob: 'مطور واجهات أمامية (Frontend Developer)',
    skills: 'React, JavaScript, Bootstrap, Framer Motion',
    experience: '3 سنوات في تطوير تطبيقات الويب',
    education: 'بكالوريوس هندسة برمجيات',
    portfolio: 'https://portfolio.com',
    website: 'https://website.com',
    languages: 'العربية، الإنجليزية',
    rating: 4.8,
    completedProjects: 25
  });
  
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      localStorage.removeItem('token');
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/');
    }
  };

  const handleUpdate = () => {
    toast.success('تم تحديث الملف الشخصي بنجاح');
    setEditMode(false);
  };

  if (!userFreelancer) return <Noprofile />;

  return (
    <div className="profile-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card border-0 shadow-sm rounded-4 overflow-hidden"
            >
              {/* Header Background */}
              <div className="profile-header bg-primary py-5 text-center text-white position-relative">
                <div className="position-relative z-index-1">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <FaUserCircle size={120} className="mb-3 border border-4 border-white rounded-circle shadow" />
                  </motion.div>
                  <h2 className="fw-bold mb-1">{userData.name}</h2>
                  <p className="opacity-75 mb-0">{userData.currentJob}</p>
                </div>
                <div className="header-shape"></div>
              </div>

              <div className="card-body p-4 p-lg-5">
                <div className="row g-4">
                  {/* Stats Row */}
                  <div className="col-12">
                    <div className="row g-3 text-center">
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-4">
                          <h4 className="fw-bold text-primary mb-0">{userData.rating} <FaStar className="fs-5 mb-1" /></h4>
                          <small className="text-muted">التقييم العام</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-4">
                          <h4 className="fw-bold text-primary mb-0">{userData.completedProjects}</h4>
                          <small className="text-muted">مشروع مكتمل</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-4">
                          <h4 className="fw-bold text-primary mb-0">100%</h4>
                          <small className="text-muted">رضا العملاء</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="col-md-6">
                    <h5 className="fw-bold mb-4 border-bottom pb-2 text-primary">المعلومات الشخصية</h5>
                    <div className="info-list">
                      <div className="d-flex align-items-center mb-3">
                        <FaEnvelope className="text-muted me-3" />
                        <div><small className="text-muted d-block">البريد الإلكتروني</small><strong>{userData.email}</strong></div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <FaPhone className="text-muted me-3" />
                        <div><small className="text-muted d-block">رقم الهاتف</small><strong>{userData.phone}</strong></div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <FaGlobe className="text-muted me-3" />
                        <div><small className="text-muted d-block">اللغات</small><strong>{userData.languages}</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h5 className="fw-bold mb-4 border-bottom pb-2 text-primary">المهارات والخبرات</h5>
                    <div className="info-list">
                      <div className="d-flex align-items-center mb-3">
                        <FaCode className="text-muted me-3" />
                        <div><small className="text-muted d-block">المهارات</small><strong>{userData.skills}</strong></div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <FaBriefcase className="text-muted me-3" />
                        <div><small className="text-muted d-block">الخبرة</small><strong>{userData.experience}</strong></div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <FaGraduationCap className="text-muted me-3" />
                        <div><small className="text-muted d-block">التعليم</small><strong>{userData.education}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-5 justify-content-center flex-wrap">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="btn btn-primary rounded-pill px-5 shadow"
                    onClick={() => setEditMode(true)}
                  >
                    <FaEdit className="me-2" /> تعديل الملف الشخصي
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="btn btn-outline-danger rounded-pill px-5"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> تسجيل الخروج
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Modal (Simplified) */}
      <AnimatePresence>
        {editMode && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-5 rounded-4 shadow-lg"
              style={{ maxWidth: '600px', width: '90%' }}
            >
              <h3 className="fw-bold mb-4 text-primary">تعديل البيانات</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small text-muted">الاسم</label>
                  <input type="text" className="form-control rounded-3" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">الوظيفة</label>
                  <input type="text" className="form-control rounded-3" value={userData.currentJob} onChange={(e) => setUserData({...userData, currentJob: e.target.value})} />
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted">المهارات</label>
                  <textarea className="form-control rounded-3" rows="3" value={userData.skills} onChange={(e) => setUserData({...userData, skills: e.target.value})}></textarea>
                </div>
              </div>
              <div className="d-flex gap-3 mt-4 justify-content-end">
                <button className="btn btn-light rounded-pill px-4" onClick={() => setEditMode(false)}>إلغاء</button>
                <button className="btn btn-primary rounded-pill px-4" onClick={handleUpdate}>حفظ التغييرات</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .profile-header {
          background: linear-gradient(135deg, #0d6efd 0%, #00d1b2 100%) !important;
          border-bottom-left-radius: 50% 20%;
          border-bottom-right-radius: 50% 20%;
        }
        .header-shape {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          background: white;
          clip-path: polygon(0 100%, 100% 100%, 100% 0);
          opacity: 0.1;
        }
        .info-list strong {
          color: #2d3436;
        }
      `}} />
    </div>
  );
};

export default ProfileFreelancer;
