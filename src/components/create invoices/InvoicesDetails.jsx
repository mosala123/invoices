import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser, FaArrowLeft, FaEnvelope, FaBriefcase, FaDollarSign, FaCalendarAlt, FaClock, FaInfoCircle, FaMapMarkerAlt, FaCheckCircle, FaPhone } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InvoicesDetails.css';
import image from "../../images/logo1.webp";

const InvoicesDetails = () => {
  const { invoicesId } = useParams();  
  const navigate = useNavigate();
  const services = useSelector((state) => state.services);

  const service = services.find((serv) => serv.id === Number(invoicesId));

  if (!service) {
    return <div className="text-center mt-5 text-danger">Service not found!</div>;
  }

  return (
    <div className=" pb-5 invoices-details d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
      <div className="card shadow-lg px-4 py-5 mw-75 mx-auto">
        <div className="row">
          <div className="col-12">
            <div className="service-details text-start px-3">
              <h2 className="text-primary mb-3 animate__animated animate__fadeInDown">
                <FaBriefcase className="me-2" /> {service.title || "Not Available"}
              </h2>
              <div className="row">
                <div className="col-12 col-md-6">
                  <p className="text-muted"><FaUser className="me-2 text-dark" /> {service.name || "Not Available"}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="text-muted"><FaEnvelope className="me-2 text-dark" /> {service.email || "Not Available"}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="text-muted"><FaPhone className="me-2 text-dark" /> {service.phone || "Not Available"}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="text-muted"><FaMapMarkerAlt className="me-2 text-dark" /> {service.location || "Not Available"}</p>
                </div>
              </div>
              <div className="details-section mt-5 ">
                <h4 className="text-dark mb-2"><FaInfoCircle className="me-2" /> Service Information</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <p><FaDollarSign className="text-success me-1" /> Price: ${service.price || "Not Available"}</p>
                  </div>
                  <div className="col-12 col-md-6">
                    <p><FaClock className="text-warning me-1" /> Duration: {service.duration || "Not Available"} Days</p>
                  </div>
                  <div className="col-12 col-md-6">
                    <p><FaCalendarAlt className="text-info me-1" /> Posted On: {service.postedDate || "Not Available"}</p>
                  </div>
                  <div className="col-12 col-md-6">
                    <p><FaCheckCircle className="text-success me-1" /> Status: {service.status || "Not Available"}</p>
                  </div>
                </div>
                <p className="mt-3">{service.description || "Not Available"}</p>
              </div>
              <div className="d-flex gap-3 mt-4">
              <button onClick={() => navigate(-1)} className="btn btn-primary d-flex align-items-center gap-2 shadow-lg px-4 py-2">
                  <FaArrowLeft className="me-1" /> Back
                </button>
                <button className="btn btn-success d-flex align-items-center gap-2 shadow-lg px-4 py-2">
                  <FaEnvelope className="me-1" /> Contact Client
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default InvoicesDetails;
