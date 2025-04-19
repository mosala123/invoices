import React, { useState } from "react";
import { MdEmail, MdPerson, MdPhone, MdWork } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import registerImage from "../../../images/signup-image-removebg-preview.png";
import { ID } from "appwrite"; // Import ID for unique user creation
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountFreelancer } from "../appwritefreelancer";

const RegisterFreelancer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [about, setAbout] = useState("");
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
      await accountFreelancer.create(ID.unique(), email, password, name);

      toast.success("Registration successful!", { position: "top-right" });

      setTimeout(() => {
        navigate("/loginfreelancer");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "An error occurred during registration!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="RegisterFreelancer container d-flex mt-2 justify-content-center">
      <div className="card mt-5 p-5 mb-5 shadow-lg m-2 m-lg-5 " style={{ maxWidth: "1000px", width: "100%" }}>
        <div className="row">
          {/* Form Section */}
          <div className="col-lg-6 col-md-12">
          <h2 className="mb-4 text-primary">Join as a Freelancer & Start Your Journey Today!</h2>

            <form onSubmit={handleRegister}>
              {/* Full Name */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
                <MdPerson className="me-2 fs-4 text-primary" />
                <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
                <MdEmail className="me-2 fs-4 text-primary" />
                <input
                  type="email"
                  className="form-control border-0 shadow-none"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

           
              
 

              {/* Password */}
              <div className="form-group d-flex align-items-center mb-3 border-bottom pb-2">
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

              {/* Confirm Password */}
              <div className="form-group d-flex align-items-center mb-4 border-bottom pb-2">
                <RiLockPasswordFill className="me-2 fs-4 text-primary" />
                <input
                  type="password"
                  className="form-control border-0 shadow-none"
                  placeholder="Confirm Password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="rememberMe" required />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>
              {/* Register Button */}
              <button type="submit" className="btn btn-primary w-100 rounded-pill">Register</button>
            </form>

            {/* Login Link */}
            <div className="text-start mt-3">
              <p>
                Already have an account? {" "}
                <Link to="/loginfreelancer" className="text-primary">Login</Link>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center mt-4">
            <img src={registerImage} alt="Register Freelancer" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFreelancer;