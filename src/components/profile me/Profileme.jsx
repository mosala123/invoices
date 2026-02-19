import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import ProfileClient from './profileclient/ProfileClient';
import ProfileFreelancer from './profilefreelancer/ProfileFreelancer';
=======
import { useNavigate, Link } from 'react-router-dom';
import { account } from '../user/appwrite';
import { accountFreelancer} from '../user/appwritefreelancer'
import ProfileClient from './profileclient/ProfileClient';
import ProfileFreelancer from './profilefreelancer/ProfileFreelancer';
import { toast } from 'react-toastify';
import { FaUser, FaBriefcase } from 'react-icons/fa';
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
import Noprofile from './Noprofile';

const ProfileMe = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
<<<<<<< HEAD
        // Get user data from localStorage
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (!userData || !token) {
          // No user data or token found - show Noprofile
          setUserType(null);
          setLoading(false);
          return;
        }

        const parsedUserData = JSON.parse(userData);
        
        // Check if user is freelancer
        if (parsedUserData.role === 'freelancer' || parsedUserData.user_type === 'freelancer') {
          setUserType('freelancer');
          navigate('/profilefreelancer');
        } else {
          // If not freelancer, then it's a regular client
          setUserType('client');
          navigate('/profileclient');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking user:', error);
        setUserType(null);
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);
=======
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
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
<<<<<<< HEAD

  // If no user type (not logged in), show Noprofile
  if (!userType) {
    return <Noprofile />;
  }

  // Show appropriate profile based on user type
=======
  if (!userType) {
    return (
      <div className='  '>
         <Noprofile />
      </div>
    );
  }

>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
  return (
    <div className="container mt-5">
      {userType === 'client' && <ProfileClient />}
      {userType === 'freelancer' && <ProfileFreelancer />}
    </div>
  );
};

export default ProfileMe;