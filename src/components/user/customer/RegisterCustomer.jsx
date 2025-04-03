import React, { useState } from 'react';
import { MdPerson, MdEmail, MdWork, MdPhone } from "react-icons/md";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import imageregisterclient from "../../../images/signup-image-removebg-preview.png";
import { useNavigate, Link } from 'react-router-dom';
import { account } from '../appwrite';
import { toast } from 'react-toastify';
import { ID } from 'appwrite';

const RegisterCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");  // New Job Title field
  const [phone, setPhone] = useState("");  // New Phone field
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }
    try {
      await account.create(ID.unique(), email, password, name);
      toast.success("Registration successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/loginclient");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "An error occurred during registration!", { position: "top-right" });
    }
  };

  return (
    <div className="RegisterCustomer container d-flex mt-2 justify-content-center">
      <div className="card mt-5 p-5 mb-5 shadow-lg" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="row">
          {/* Form Section */}
          <div className="col-lg-6 col-md-12">
            <h4 className="mb-4 text-primary text-lg-start">
               Join Us Today! <br />
              Create your account and start your journey.
            </h4>

            <form onSubmit={handleRegister}>
              {/* Name */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
                <MdPerson className="me-2 fs-4 text-primary" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* Job Title */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
                <MdWork className="me-2 fs-4 text-primary" />
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Job Title (e.g., Software Engineer)"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
                <MdPhone className="me-2 fs-4 text-primary" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="form-control border-0 shadow-none"
                  placeholder="Phone Number"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
                <MdEmail className="me-2 fs-4 text-primary" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control border-0 shadow-none"
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
                <RiLockPasswordFill className="me-2 fs-4 text-primary" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control border-0 shadow-none"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="form-group d-flex align-items-center mb-4 border-bottom pb-2">
                <RiLockPasswordLine className="me-2 fs-4 text-primary" />
                <input
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  type="password"
                  className="form-control border-0 shadow-none"
                  placeholder="Repeat Your Password"
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">I agree to the terms and conditions</label>
              </div>

              {/* Register Button */}
              <button type="submit" className="btn btn-primary w-100 rounded-pill">Register</button>

              {/* Login Link */}
              <div className="text-start mt-3">
                <p>Already have an account? <Link to="/loginclient" className="text-primary">Login</Link></p>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center mt-4">
            <img src={imageregisterclient} alt="register client" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
