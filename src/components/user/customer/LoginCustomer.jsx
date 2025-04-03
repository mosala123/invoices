import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import loginImage from "../../../images/signup-image-removebg-preview.png";
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../appwrite';
import { toast } from 'react-toastify';

const LoginCustomer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      toast.success("Login successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/addanewpro");
      }, 3000);
    } catch (error) {
      toast.error("Login failed! Please check your credentials.", { position: "top-right" });
    }
  };

  return (
    <div className="LoginCustomer container d-flex mt-2 justify-content-center">
      <div className="card mt-5 p-5 mb-5 shadow-lg" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="row">
          {/* Form Section */}
          <div className="col-lg-6 col-md-12">
          <h4 className="mb-4 text-primary text-center text-lg-start">
  Welcome Back! 👋 <br />
  Log in to continue your journey with us.
</h4>

            <form onSubmit={handleLogin}>
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
              <div className="form-group d-flex align-items-center mb-4 border-bottom pb-2">
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

              {/* Remember Me */}
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="rememberMe" required />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn btn-primary w-100 rounded-pill">Login</button>
                 {/* Login Link */}
                 <div className="text-start mt-3">
                <p>Don't have an account? <Link to="/registerclient" className="text-primary">Register Here</Link></p>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center mt-4">
            <img src={loginImage} alt="login" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCustomer;
