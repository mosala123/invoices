import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaInfoCircle, FaShoppingCart } from "react-icons/fa";

const AddProjects = () => {
  // Form data state
  const [formData, setFormData] = useState({
    project_name: "",
    deadline: "",
    category: "",
    expected_duration: "",
    priority_level: "",
    service_type: "",
    payment_method: "",
    description: "",
    budget: "",
  });

  const [projectsList, setProjectsList] = useState([]);
  const [clientUser, setClientUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [editingProject, setEditingProject] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  // Fetch logged-in customer's data
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost/invoice_project/backend/api/auth/profile/read.php",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok) {
        if (result.success && result.data) {
          setClientUser(result.data);
        }
      } else {
          toast.error(result.message || "Failed to load user data.");
        return;
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data.");
    }
  };

  // Fetch customer's projects
  const fetchProjects = async () => {
    try {
      console.log('=== STARTING PROJECTS FETCH ===');
      const response = await fetch(
        "http://localhost/invoice_project/backend/api/projects/read.php",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // يعمل json file  يحط فيه الداتا اللي راجعة من ال fetch دا 
      // وبعدين كل ما يعمل add  يزود عليه ولما يعمل delete يحذف منه
      // وبعدين يروح في صفحة create incoice يقرأ الداتا من ال json
      // ويتعامل عادي كا json بمعني 
      // انه هيظهرله كل المشاريع المضافة في ال json 
      // وبعدين يضيف في ال cart ويخزن كل حاجة json ويتعامل json
      
      
      console.log('Fetched Data:', data);
      
      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      if (data.success && Array.isArray(data.projects)) {
        console.log('Setting projects list with:', data.projects);
        setProjectsList(data.projects);
      } else {
        console.log('No projects found or invalid data structure');
        setProjectsList([]);
      }
      console.log('=== PROJECTS FETCH COMPLETED ===');
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjectsList([]);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit new project
  const handleAddNewProject = async (e) => {
    e.preventDefault();
    setError("");

    console.log('=== STARTING PROJECT ADDITION ===');
    console.log('Form Data:', formData);

    if (
      !formData.project_name ||
      !formData.deadline ||
      !formData.category ||
      !formData.description
    ) {
      setError("Please fill in all required fields!");
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      console.log('1. Sending request to server...');
      const response = await fetch(
        "http://localhost/invoice_project/backend/api/projects/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log('2. Server Response:', result);
      
      if (response.ok && result.success) {
        console.log('3. Project added successfully!');
        console.log('Current projectsList:', projectsList);
        
        // Add the new project to the list immediately
        const newProject = {
          id: result.project_id,
          ...formData
        };
        
        console.log('4. New Project Object:', newProject);
        
        setProjectsList(prevList => {
          console.log('5. Previous List:', prevList);
          const updatedList = [...prevList, newProject];
          console.log('6. Updated List:', updatedList);
          return updatedList;
        });
        
        toast.success(result.message || "Project submitted successfully!");
        
        // Clear form
        setFormData({
          project_name: "",
          deadline: "",
          category: "",
          expected_duration: "",
          priority_level: "",
          service_type: "",
          payment_method: "",
          description: "",
          budget: "",
        });
        
        console.log('7. Form cleared, fetching updated list...');
        await fetchProjects();
        console.log('=== PROJECT ADDITION COMPLETED ===');
      } else {
        console.log('Error Response:', result);
        if (response.status === 401) {
          navigate('/login');
        } else if (response.status === 422) {
          const errorMessage = result.errors ? 
            Object.values(result.errors).join(', ') : 
            result.message;
          setError(errorMessage);
          toast.error(errorMessage);
        } else {
          console.error('Project creation failed:', result);
          toast.error(result.message || "Failed to submit project. Please try again.");
        }
      }
    } catch (error) {
      console.error('Error in project creation:', error);
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred.");
    }
  };

  const handleUpdateProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost/invoice_project/backend/api/projects/update.php`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            project_id: projectId
          }),
        }
      );

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Update the existing project in the list
        setProjectsList(prevList => 
          prevList.map(project => 
            project.project_id === projectId 
              ? { ...project, ...formData }
              : project
          )
        );
        
        setEditingProject(null);
        setFormData({
          project_name: "",
          description: "",
          category: "",
          deadline: "",
          expected_duration: "",
          priority_level: "",
          service_type: "",
          payment_method: "",
          budget: "",
        });
        toast.success('Project updated successfully!');
      } else {
        throw new Error(result.message || 'Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error(error.message || 'Failed to update project. Please try again.');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(
          `http://localhost/invoice_project/backend/api/projects/delete.php?id=${projectId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        
        if (response.ok && result.success) {
          setProjectsList(prevList => prevList.filter(project => project.project_id !== projectId));
          toast.success("Project deleted successfully!");
        } else {
          toast.error(result.message || "Failed to delete project");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the project");
      }
    }
  };

  const handleAddToCart = (project) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (existingCart.some(item => item.project_id === project.project_id)) {
      toast.info("Project is already in your cart!");
      return;
    }
    
    existingCart.push(project);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    toast.success("Project added to cart successfully!");
  };

  // Add this new function to handle edit click
  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({
      project_name: project.project_name,
      deadline: project.deadline,
      category: project.category,
      expected_duration: project.expected_duration,
      priority_level: project.priority_level,
      service_type: project.service_type,
      payment_method: project.payment_method,
      description: project.description,
      budget: project.budget,
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add this function to toggle details
  const toggleDetails = (projectId) => {
    setShowDetails(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
=======
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




>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <h2 className="text-center text-primary mb-4">Add Your Project</h2>

<<<<<<< HEAD
        {/* Project Submission Form */}
        <form
          className="p-4 bg-white shadow-lg rounded mb-5"
          onSubmit={handleAddNewProject}
        >
          {error && <p className="text-danger text-center">{error}</p>}

=======
        <form className="p-4 bg-white shadow-lg rounded">
          {error && <p className="text-danger text-center">{error}</p>}


>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
          <div className="row mb-3">
            {/* Owner Name */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Your Name</label>
<<<<<<< HEAD
              <p className="border rounded p-2 bg-light">
                {clientUser?.name || "Loading..."}
              </p>
=======
              <p className="border rounded p-2 bg-light"> {clientUser?.name || "Loading..."}</p>
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
            </div>

            {/* Owner Email */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Your Email</label>
<<<<<<< HEAD
              <p className="border rounded p-2 bg-light">
                {clientUser?.email || "Loading..."}
              </p>
            </div>
          </div>

=======
              <p className="border rounded p-2 bg-light">{clientUser?.email || "Loading..."}</p>
            </div>
          </div>


>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
          {/* Project Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Project Title</label>
            <input
<<<<<<< HEAD
              name="project_name"
              value={formData.project_name}
=======
              name="ProjectTitle"
              value={data.ProjectTitle}
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
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
<<<<<<< HEAD
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Enter project category"
                required
              />
=======
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
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Deadline</label>
              <input
<<<<<<< HEAD
                name="deadline"
                value={formData.deadline}
=======
                name="Deadline"
                value={data.Deadline}
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
                onChange={handleChange}
                type="date"
                className="form-control"
                required
              />
            </div>
          </div>

<<<<<<< HEAD
=======
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

>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
          {/* Project Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Project Description</label>
            <textarea
<<<<<<< HEAD
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Describe your project in detail"
              required
            ></textarea>
          </div>

          {/* Additional Details */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Expected Duration</label>
              <input
                name="expected_duration"
                value={formData.expected_duration}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="e.g., 2 weeks, 1 month"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Priority Level</label>
              <select
                name="priority_level"
                value={formData.priority_level}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Service Type</label>
              <input
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="e.g., Web Development, Design"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Payment Method</label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Payment Method</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Budget</label>
            <input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Enter your budget range"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5">
=======
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
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
              Submit Project
            </button>
          </div>
        </form>

<<<<<<< HEAD
        {/* Projects List */}
        <div className="mt-5 bg-light p-4 rounded shadow">
          <h3 className="text-center text-primary mb-4">Your Projects List</h3>
          <div className="row">
            {projectsList && projectsList.length > 0 ? (
              projectsList.map((project) => (
                <div key={project.project_id} className="col-md-6 mb-4">
                  <div className="card h-100 border-primary">
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">{project.project_name}</h5>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <h6 className="text-primary">Description:</h6>
                          <p className="text-dark">{project.description}</p>
                        </div>
                        <div className="col-md-6">
                          <h6 className="text-primary">Category:</h6>
                          <p className="text-dark">{project.category}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <h6 className="text-primary">Deadline:</h6>
                          <p className="text-dark">{project.deadline}</p>
                        </div>
                        <div className="col-md-6">
                          <h6 className="text-primary">Expected Duration:</h6>
                          <p className="text-dark">{project.expected_duration || "Not specified"}</p>
                        </div>
                      </div>
                      {showDetails[project.project_id] && (
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6 className="text-primary">Priority Level:</h6>
                            <p className="text-dark">{project.priority_level || "Not specified"}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="text-primary">Service Type:</h6>
                            <p className="text-dark">{project.service_type || "Not specified"}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="text-primary">Payment Method:</h6>
                            <p className="text-dark">{project.payment_method || "Not specified"}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="text-primary">Budget:</h6>
                            <p className="text-dark">{project.budget || "Not specified"}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="card-footer bg-transparent border-top mt-auto">
                      <div className="d-flex justify-content-between">
                        <div className="btn-group">
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEditClick(project)}
                          >
                            <FaEdit className="me-1" /> Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm me-2" 
                            onClick={() => handleDeleteProject(project.project_id)}
                          >
                            <FaTrash className="me-1" /> Delete
                          </button>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => toggleDetails(project.project_id)}
                          >
                            <FaInfoCircle className="me-1" /> Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">
                  You haven't added any projects yet. Add your first project using the form above!
                </p>
              </div>
            )}
          </div>
        </div>
=======
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



>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
      </div>
    </div>
  );
};

export default AddProjects;
