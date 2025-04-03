import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { account } from "../user/appwrite";
import { useNavigate } from "react-router-dom";

const AddProjects = () => {

  // add anew pro 
  const [data, setdata] = useState({
    ProjectTitle: "",
    Deadline: "",
    Category: "",
    ExpectedDuration: "",
    PriorityLevel: "",
    ServiceType: "",
    PaymentMethod: "",
    ProjectDescription: "",
    AttachProjectFiles: null,
  });
  const [items, setitems] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const AddNewProject = (e) => {
    e.preventDefault();

    if (
      !data.ProjectTitle ||
      !data.Deadline ||
      !data.Category ||
      !data.ExpectedDuration ||
      !data.PriorityLevel ||
      !data.ServiceType ||
      !data.PaymentMethod ||
      !data.ProjectDescription
    ) {
      setError("Please fill in all required fields!");
      return;
    }

    setitems([...items, data]);
    setdata({
      ProjectTitle: "",
      Deadline: "",
      Category: "",
      ExpectedDuration: "",
      PriorityLevel: "",
      ServiceType: "",
      PaymentMethod: "",
      ProjectDescription: "",
      AttachProjectFiles: null,
    });

    setError("");
  };




  // get user 
  const [clientUser, setclientUser] = useState({})
  useEffect(() => {

    const getUserData = async () => {

      try {
        const userdata = await account.get()

        setclientUser(userdata)
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }

    getUserData()
  }, [])





  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <h2 className="text-center text-primary mb-4">Add Your Project</h2>

        <form className="p-4 bg-white shadow-lg rounded">
          {error && <p className="text-danger text-center">{error}</p>}


          <div className="row mb-3">
            {/* Owner Name */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Your Name</label>
              <p className="border rounded p-2 bg-light"> {clientUser?.name || "Loading..."}</p>
            </div>

            {/* Owner Email */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Your Email</label>
              <p className="border rounded p-2 bg-light">{clientUser?.email || "Loading..."}</p>
            </div>
          </div>


          {/* Project Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Project Title</label>
            <input
              name="ProjectTitle"
              value={data.ProjectTitle}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Category & Deadline */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Category</label>
              <select
                name="Category"
                value={data.Category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select category</option>
                <option>Web Development</option>
                <option>Graphic Design</option>
                <option>Mobile App</option>
                <option>Marketing</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Deadline</label>
              <input
                name="Deadline"
                value={data.Deadline}
                onChange={handleChange}
                type="date"
                className="form-control"
                required
              />
            </div>
          </div>

          {/* Expected Duration & Cost Range */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Expected Duration</label>
              <select
                name="ExpectedDuration"
                value={data.ExpectedDuration}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" >Select duration</option>
                <option>Less than 1 week</option>
                <option>1 - 4 weeks</option>
                <option>1 - 3 months</option>
                <option>More than 3 months</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Estimated Cost Range</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., $500 - $1000"
                required
              />
            </div>
          </div>

          {/* Priority & Experience Level */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Priority Level</label>
              <select
                name="PriorityLevel"
                value={data.PriorityLevel}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select priority</option>
                <option>Normal</option>
                <option>Urgent</option>
                <option>High Priority</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Required Experience Level</label>
              <select className="form-select"  >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>
          </div>

          {/* Service Type & Communication Method */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Service Type</label>
              <select
                name="ServiceType"
                value={data.ServiceType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select service type</option>
                <option>One-time Project</option>
                <option>Ongoing Work</option>
                <option>Maintenance & Support</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Preferred Communication Method</label>
              <select className="form-select" required>
                <option>Email</option>
                <option>Phone Call</option>
                <option>Video Call</option>
                <option>Messaging Platform</option>
              </select>
            </div>
          </div>

          {/* Payment Details */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Payment Method</label>
              <select
                name="PaymentMethod"
                value={data.PaymentMethod}
                onChange={handleChange}
                className="form-select"

              >
                <option value="">Select payment method</option>
                <option>PayPal</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Project Description</label>
            <textarea
              name="ProjectDescription"
              value={data.ProjectDescription}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Describe your project..."
            ></textarea>
          </div>

          {/* Upload Files */}
          <div className="mb-3">
            <label className="form-label fw-bold">Attach Project Files</label>
            <input type="file" className="form-control" multiple />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary px-5 py-2" onClick={AddNewProject}>
              Submit Project
            </button>
          </div>
        </form>

        {/* add a new pro */}
        <div className="container mt-4">
          <div className="row">
            {items.map((pro, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body text-start w-100">
                    <h5 className="card-title text-primary">{pro.ProjectTitle}</h5>
                    <p className="card-text"><strong>Deadline:</strong> {pro.Deadline}</p>
                    <p className="card-text"><strong>Category:</strong> {pro.Category}</p>
                    <p className="card-text"><strong>Description:</strong> {pro.ProjectDescription}</p>
                  </div>
                  <div className="d-flex   gap-2 p-3 w-100" style={{ alignItems: "flex-start", justifyItems: "flex-start" }}>
                    <button className="btn btn-primary w-auto">Edit</button>
                    <button className="btn btn-danger w-auto">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



      </div>
    </div>
  );
};

export default AddProjects;
