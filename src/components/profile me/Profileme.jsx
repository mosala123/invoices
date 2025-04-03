import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { account } from '../user/appwrite';
import { accountFreelancer} from '../user/appwritefreelancer'
import ProfileClient from './profileclient/ProfileClient';
import ProfileFreelancer from './profilefreelancer/ProfileFreelancer';
import { toast } from 'react-toastify';
import { FaUser, FaBriefcase } from 'react-icons/fa';
import Noprofile from './Noprofile';

const ProfileMe = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const clientUser = await account.get();
        if (clientUser) {
          setUserType('client');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error checking client user:', error);
      }

      try {
        const freelancerUser = await accountFreelancer.get();
        if (freelancerUser) {
          setUserType('freelancer');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error checking freelancer user:', error);
      }

      setUserType(null);
      setLoading(false);
      
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (!userType) {
    return (
      <div className='  '>
         <Noprofile />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {userType === 'client' && <ProfileClient />}
      {userType === 'freelancer' && <ProfileFreelancer />}
    </div>
  );
};

export default ProfileMe;