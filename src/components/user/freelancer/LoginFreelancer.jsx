import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import loginImage from "../../../images/signup-image-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { accountFreelancer } from "../appwritefreelancer";

const LoginFreelancer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await accountFreelancer.createEmailPasswordSession(email, password);
      toast.success("Login successful!", { position: "top-right" });

      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      toast.error("Login failed! Please check your credentials.", { position: "top-right" });
    }
  };

  return (
    <div className="LoginFreelancer container d-flex mt-5 justify-content-center">
      <div className="card mt-5 p-5 mb-5 shadow-lg m-3 " style={{ maxWidth: "1000px", width: "100%" }}>
        <div className="row">
          {/* Form Section */}
          <div className="col-lg-6 col-md-12">
          <h4 className="mb-4 text-primary">Welcome Back! Log in to Your Account</h4>

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-3">
                <MdEmail className="me-2 fs-4 text-primary" />
                <input
                  type="email"
                  className="form-control border-0 shadow-none"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-group d-flex align-items-center mb-4 border-bottom pb-3">
                <RiLockPasswordFill className="me-2 fs-4 text-primary" />
                <input
                  type="password"
                  className="form-control border-0 shadow-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
 {/* Remember Me */}
 <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="rememberMe" required />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>
              {/* Login Button */}
              <button type="submit" className=" btn btn-primary w-100 rounded-pill">
                Login
              </button>
            </form>

            {/* Register Link */}
            <div className="text-start mt-3">
              <p>
                Don't have an account?{" "}
                <a href="/registerfreelancer" className="text-primary">Register now</a>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center mt-4">
            <img src={loginImage} alt="Login" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFreelancer;
