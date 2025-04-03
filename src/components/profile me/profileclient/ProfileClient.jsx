import React, { useEffect, useState } from "react";
import { account } from "../../user/appwrite";
import { toast } from "react-toastify";
import { FaUserCircle, FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Noprofile from "../Noprofile";

const ProfileClient = () => {
  const [userclient, setUserclient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await account.get();
        setUserclient(userData);
        setUserData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          occupation: userData.occupation || "",
          address: userData.address || "",
          bio: userData.bio || "",
        });
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    getUserData();
  }, []);
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await account.deleteSession("current");
        toast.success("Logged out successfully!", {
          position: "top-right",
        });
  
        setUserclient(null);
  
        // التوجيه إلى الصفحة الرئيسية
        navigate("/profile");
      } catch (error) {
        toast.error("Failed to log out!");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="pb-5">
       <div className="  container-fluid d-flex align-items-center justify-content-center   " style={{minHeight:""}}>
      {userclient ? (
        <div className="row w-100 ">
          <div className="col-12 col-md-12 col-lg-8 mx-auto">
            <div className="card shadow-lg p-4 rounded w-100">
              <div className="text-center">
                <FaUserCircle className="text-primary mb-3" size={150} />
                <h2 className="text-dark"> {userData.name || "No Name"}</h2>
                <p className="text-muted"> {userData.email || "No Job"}</p>
              </div>

              {editMode ? (
                <div className="p-3">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="fw-bold">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="fw-bold">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={userData.phone}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(/\D/g, ""); // السماح بالأرقام فقط
                          setUserData({ ...userData, phone: onlyNumbers });
                        }}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="fw-bold">Occupation</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userData.occupation}
                        onChange={(e) => setUserData({ ...userData, occupation: e.target.value })}
                        placeholder="Enter your job"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="fw-bold">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        placeholder="Enter your address"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="fw-bold">Bio</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                        placeholder="Write something about yourself"
                      />
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
                      <FaEnvelope className="me-2 text-primary" /> Email : {userData.email || "No Email"}
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <FaPhone className="me-2 text-success" /> Phone : {userData.phone || "No Phone"}
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <FaBriefcase className="me-2 text-warning" /> Occupation : {userData.occupation || "No Job"}
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <FaMapMarkerAlt className="me-2 text-danger" /> Address :  {userData.address || "No Address"}
                    </div>
                    <div className="col-12 mt-2 text-muted"> Bio : {userData.bio || "No Bio Available"}</div>
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

export default ProfileClient;
