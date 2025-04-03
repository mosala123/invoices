import React, { useEffect, useState } from "react";
import { FaEnvelope, FaUser, FaInfoCircle, FaPhone, FaCommentDots, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchProduct } from "../rtk/slices/productslise";
import { useDispatch, useSelector } from "react-redux";
import { catogeyproduct } from "../rtk/slices/catogryslise";
import { useLocation } from "react-router-dom";
const CreateInvoices = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const catogry = useSelector((state) => state.catogry);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(catogeyproduct());
  }, [dispatch]);


  // filter card 
  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  const filterCard = (categoryName) => {
    if (categoryName === "all") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) => service.occupation === categoryName);
      setFilteredServices(filtered);
    }
  };


  // search 
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) =>
          service.name.toLowerCase().includes(value) ||
          service.email.toLowerCase().includes(value) ||
          service.website.toLowerCase().includes(value)
      );
      setFilteredServices(filtered);
    }
  };


  return (
    <>



      <div className="create-invoices pb-5">
        <div className="container mt-4">
          <h2 className="text-center mb-4 text-primary">Available Services</h2>

          {/* Search and Filter Section */}
          <div className="d-flex justify-content-between mb-4">
            <input
              type="text"
              className="form-control w-50 shadow-sm border-primary"
              placeholder="Search for a service or client..."
              value={searchTerm}
              onChange={handleSearch}
            />



            <select className="form-select w-25 shadow-sm border-primary" onChange={(e) => filterCard(e.target.value)}>
              <option value="all">All</option>
              {catogry.map((cat) => (
                <option key={cat.id} value={cat.occupation}>
                  {cat.occupation}
                </option>
              ))}
            </select>
          </div>



          {/* Invoice Cards Section */}
          <div className="row d-flex   ">


            {/* Messages Section */}
            <div className="alert alert-info d-flex align-items-center shadow-sm mb-0 ">
              <FaCommentDots className="me-2  " /> You have new messages from clients!
            </div>


            {filteredServices.map((serv) => (
              <>
                <div key={serv.id} className="mt-0 col-lg-4 col-md-6 col-sm-12  d-flex justify-content-center">
                  <div className="card invoice-card shadow-sm" style={{ width: "100%" }}>
                    <div className="card-body">
                      <p className="card-text text-muted">
                        <FaUser className="me-2" /> {serv.name}
                      </p>
                      <p className="card-text text-muted">
                        <FaEnvelope className="me-2" /> {serv.email}
                      </p>
                      <p className="card-text">
                        <FaBriefcase className="me-2 text-warning" /> {serv.occupation}
                      </p>
                      <p className="card-text">Looking for an expert web developer to build a modern web application using React.</p>
                      <div className="d-flex gap-3">
                        <Link to={`FinanceAdvisor/invoicedetails/${serv.id}`} className="btn btn-primary d-flex align-items-center gap-1">
                          <FaInfoCircle className="me-1" /> Details
                        </Link>
                        <button className="btn btn-success d-flex align-items-center gap-1">
                          <FaPhone className="me-1" /> Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>


          {searchTerm !== "" && filteredServices.length === 0 && (
            <div className="alert alert-warning text-center mt-4">
              No results found for your search! ❌  <br />
              Try refining your keywords or checking for any typos.
              
            </div>
          )}

        </div>
      </div>

    </>
  );
};

export default CreateInvoices;
