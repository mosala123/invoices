import React, { useEffect, useState } from "react";
import { account } from "../../user/appwrite";
import { toast } from "react-toastify";
import { FaUserCircle, FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const savedData = localStorage.getItem("userData");
        if (savedData) {
          setUserData(JSON.parse(savedData));
          setUserclient(true); // اعتبره مسجل خلاص لو عنده بيانات محفوظة
        } else {
          const userDataFromAccount = await account.get();
          setUserclient(userDataFromAccount);
          setUserData({
            name: userDataFromAccount.name || "",
            email: userDataFromAccount.email || "",
            phone: userDataFromAccount.phone || "",
            occupation: userDataFromAccount.occupation || "",
            address: userDataFromAccount.address || "",
            bio: userDataFromAccount.bio || "",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await account.deleteSession("current");
        toast.success("Logged out successfully!", { position: "top-right" });
        setUserclient(null);
        localStorage.removeItem("userData"); // نحذف البيانات لو عمل لوج آوت
        navigate("/profile");
      } catch (error) {
        toast.error("Failed to log out!");
      }
    }
  };

  const handleUpdate = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    toast.success("Profile updated and saved successfully!");
    setEditMode(false);
  };

  return (
    <div className="pb-5">
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "" }}>
        {userclient ? (
          <div className="row w-100">
            <div className="col-12 col-md-12 col-lg-8 mx-auto">
              <div className="card shadow-lg p-4 rounded w-100">
                <div className="text-center">
                  <FaUserCircle className="text-primary mb-3" size={150} />
                  <h2 className="text-dark">{userData.name || "No Name"}</h2>
                  <p className="text-muted">{userData.email || "No email"}</p>
                </div>

                {editMode ? (
                  <div className="p-3">
                    <div className="row">
                      {["name", "phone", "occupation", "address", "bio"].map((field, idx) => (
                        <div key={idx} className={`col-12 col-md-6 mb-3 ${field === "bio" ? "col-md-12" : ""}`}>
                          <label className="fw-bold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                          {field === "bio" ? (
                            <textarea
                              className="form-control"
                              rows="3"
                              value={userData.bio}
                              onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                              placeholder="Write something about yourself"
                            />
                          ) : (
                            <input
                              type="text"
                              className="form-control"
                              value={userData[field]}
                              onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                              placeholder={`Enter your ${field}`}
                            />
                          )}
                        </div>
                      ))}
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
                  <div className="mt-4 px-3">
                    <div className="row">
                      <div className="col-12 col-md-6 mb-2">
                        <FaEnvelope className="me-2 text-success" /> Email: <span className="text-primary">{userData.email || "No Email"}</span>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FaPhone className="me-2 text-success" /> Phone: <span className="text-primary">{userData.phone || "Add phone"}</span>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FaBriefcase className="me-2 text-success" /> Occupation: <span className="text-primary">{userData.occupation || "Add Job"}</span>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FaMapMarkerAlt className="me-2 text-success" /> Address: <span className="text-primary">{userData.address || "Add Address"}</span>
                      </div>
                      <div className="col-12 mt-2 text-muted">Bio: <span className="text-primary">{userData.bio || "Add Bio Available"}</span></div>
                    </div>

                    <Link to="/addanewpro" className="btn btn-primary mt-5 mb-3">Add Your Services</Link>

                    <div className="d-flex justify-content-between mt-2 mb-3 text-md-center" style={{ whiteSpace: "wrap" }}>
                      <button className="btn btn-primary flex-grow-1 me-2 d-flex align-items-center text-center justify-content-center" onClick={() => setEditMode(true)}>
                        <FaEdit className="me-2" /> Edit Profile
                      </button>
                      <button className="btn btn-danger flex-grow-1 ms-2 d-flex align-items-center text-center justify-content-center" onClick={handleLogout}>
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
