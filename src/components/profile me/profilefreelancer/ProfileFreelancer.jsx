import React, { useEffect, useState } from 'react';
import { accountFreelancer } from '../../user/appwritefreelancer';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEnvelope, FaPhone, FaBriefcase, FaEdit, FaTrash, FaCode, FaGraduationCap, FaLink, FaGlobe } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Noprofile from '../Noprofile';

const ProfileFreelancer = () => {
  const [userfreelancer, setUserfreelancer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    currentJob: '', // استبدال occupation بـ currentJob
    skills: '',
    experience: '',
    education: '',
    portfolio: '',
    website: '',
    languages: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await accountFreelancer.get();
        setUserfreelancer(userData);
        setUserData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          currentJob: userData.currentJob || '', // استبدال occupation بـ currentJob
          skills: userData.skills || '',
          experience: userData.experience || '',
          education: userData.education || '',
          portfolio: userData.portfolio || '',
          website: userData.website || '',
          languages: userData.languages || '',
        });
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await accountFreelancer.deleteSession('current');
        toast.success('Logged out successfully!', { position: 'top-right' });
        setUserfreelancer(null);
        navigate('/profile');
      } catch (error) {
        toast.error('Failed to log out!');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      // هنا يجب إضافة كود لتحديث البيانات في Appwrite
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update profile!');
    }
  };

  return (
    <div className="pb-5">
      <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
        {userfreelancer ? (
          <div className="row w-100">
            <div className="col-12 col-md-12 col-lg-8 mx-auto">
              <div className="card shadow-lg p-4 rounded w-100">
                <div className="text-center">
                  <FaUserCircle className="text-primary mb-3" size={150} />
                  <h2 className="text-dark"> {userData.name || 'No Name'}</h2>
                  <p className="text-muted"> {userData.currentJob || 'No Job'}</p> {/* استبدال occupation بـ currentJob */}
                </div>

                {editMode ? (
                  <div className="p-3">
                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Name</label>
                        <input type="text" className="form-control" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} placeholder="Enter your name" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Phone</label>
                        <input type="tel" className="form-control" value={userData.phone} onChange={(e) => { const onlyNumbers = e.target.value.replace(/\D/g, ''); setUserData({ ...userData, phone: onlyNumbers }); }} placeholder="Enter your phone number" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Current Job</label> {/* استبدال occupation بـ currentJob */}
                        <input type="text" className="form-control" value={userData.currentJob} onChange={(e) => setUserData({ ...userData, currentJob: e.target.value })} placeholder="Enter your current job" /> {/* استبدال occupation بـ currentJob */}
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Skills</label>
                        <input type="text" className="form-control" value={userData.skills} onChange={(e) => setUserData({ ...userData, skills: e.target.value })} placeholder="Enter your skills" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Experience</label>
                        <textarea className="form-control" rows="3" value={userData.experience} onChange={(e) => setUserData({ ...userData, experience: e.target.value })} placeholder="Enter your experience" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Education</label>
                        <input type="text" className="form-control" value={userData.education} onChange={(e) => setUserData({ ...userData, education: e.target.value })} placeholder="Enter your education" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Portfolio</label>
                        <input type="text" className="form-control" value={userData.portfolio} onChange={(e) => setUserData({ ...userData, portfolio: e.target.value })} placeholder="Enter your portfolio URL" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Website</label>
                        <input type="text" className="form-control" value={userData.website} onChange={(e) => setUserData({ ...userData, website: e.target.value })} placeholder="Enter your website URL" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label className="fw-bold">Languages</label>
                        <input type="text" className="form-control" value={userData.languages} onChange={(e) => setUserData({ ...userData, languages: e.target.value })} placeholder="Enter your languages" />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <button className="btn btn-success flex-grow-1 me-2" onClick={handleUpdate}>
                        Save Changes
                      </button>
                      <button className="btn btn-secondary flex-grow-1 ms-2" onClick={() => setEditMode(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 px-3 ">
                    <div className="row">
                      <div className="col-12 col-md-6 mb-2">
                        <FaEnvelope className="me-2 text-primary" /> Email : {userData.email || 'No Email'}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FaPhone className="me-2 text-success" /> Phone : {userData.phone || 'No Phone'}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FaBriefcase className="me-2 text-warning" /> Current Job : {userData.currentJob || 'No Job'} {/* استبدال occupation بـ currentJob */}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FaCode className="me-2 text-info" /> Skills : {userData.skills || 'No Skills Available'}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        Experience : {userData.experience || 'No Experience Available'}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FaGraduationCap className="me-2 text-warning" /> Education : {userData.education || 'No Education Available'}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
  <FaLink className="me-2 text-danger" /> Portfolio : 
  {userData.portfolio ? (
    <a href={userData.portfolio} target="_blank" rel="noopener noreferrer">
      {userData.portfolio}
    </a>
  ) : (
    'No Portfolio Available'
  )}
</div>
<div className="col-12 col-md-6 mb-2">
  <FaGlobe className="me-2 text-secondary" /> Website : 
  {userData.website ? (
    <a href={userData.website} target="_blank" rel="noopener noreferrer">
      {userData.website}
    </a>
  ) : (
    'No Website Available'
  )}
</div>
                      <div className="col-12 col-md-6 mb-2">
                        Languages : {userData.languages || 'No Languages Available'}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-5 mb-3">
                      <button className="btn btn-primary flex-grow-1 me-2" onClick={() => setEditMode(true)}>
                        <FaEdit className="me-2" /> Edit Profile
                      </button>
                      <button className="btn btn-danger flex-grow-1 ms-2" onClick={handleLogout}>
                        <FaTrash className="me-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Noprofile /> 
        )}
      </div>
    </div>
  );
};

export default ProfileFreelancer;