import React from "react";
import { motion } from "framer-motion";
import "./Time.css";
import img1 from "../../../../images/icone1.svg";
import img2 from "../../../../images/icone2.svg";
import img3 from "../../../../images/icone3.svg";
import img4 from "../../../../images/icone4.svg";
import img5 from "../../../../images/Rectangle 44.png";
import img6 from "../../../../images/Rectangle 199.png";
import img7 from "../../../../images/Rectangle 166.png";
import img8 from "../../../../images/Mask group3.png";
import img9 from "../../../../images/Rectangle 200.png";
import img10 from "../../../../images/Ellipse 2.jpg";

const Time = () => {
  const features = [
    { img: img1, title: "Save Time", desc: "Create invoices in seconds instead of hours.", color: "#4AC5B5" },
    { img: img2, title: "Get Paid Faster", desc: "Automatic reminders for outstanding payments.", color: "#0d6efd" },
    { img: img3, title: "Stay Organized", desc: "Keep invoices and expenses in one place.", color: "#4AC5B5" },
    { img: img4, title: "Work Anywhere", desc: "Cloud access across devices, 24/7.", color: "#0d6efd" },
  ];

  const testimonials = [
    {
      name: "Ahmed Mohamed",
      role: "Freelance Graphic Designer",
      image: img10,
      text: "This platform changed how I work. I now save hours every week on invoicing and expenses.",
      rating: 5,
    },
    {
      name: "Sara Ahmed",
      role: "Web Developer",
      image: img8,
      text: "The clean design and simple workflow made this my go-to system.",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="time-section py-5 overflow-hidden">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-4 py-2 mb-3">Save Time</span>
          <h2 className="display-5 fw-bold mb-3">
            Work Faster, <span style={{ color: "#4AC5B5" }}>Get Paid Sooner</span>
          </h2>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "700px" }}>
            Smart tools built to simplify daily financial operations.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="row g-4 mb-5">
          {features.map((item) => (
            <motion.div key={item.title} variants={itemVariants} className="col-lg-3 col-md-6 col-sm-6">
              <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }} className="time-card p-4 text-center rounded-4 bg-white shadow-sm h-100 border-0">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mb-3 d-inline-block">
                  <img src={item.img} alt={item.title} style={{ width: "64px", height: "64px", filter: `drop-shadow(0 4px 8px ${item.color}40)` }} />
                </motion.div>
                <h5 className="fw-bold mb-2" style={{ color: item.color }}>{item.title}</h5>
                <p className="text-secondary small mb-0">{item.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="row g-4 align-items-center mb-5">
          <div className="col-lg-5">
            <div className="row g-3">
              <div className="col-6">
                <motion.img whileHover={{ scale: 1.05 }} src={img5} alt="" className="img-fluid rounded-4 shadow-sm w-100" style={{ height: "180px", objectFit: "cover" }} />
              </div>
              <div className="col-6">
                <motion.img whileHover={{ scale: 1.05 }} src={img6} alt="" className="img-fluid rounded-4 shadow-sm w-100" style={{ height: "180px", objectFit: "cover" }} />
              </div>
              <div className="col-12">
                <motion.img whileHover={{ scale: 1.02 }} src={img9} alt="" className="img-fluid rounded-4 shadow-sm w-100" style={{ height: "200px", objectFit: "cover" }} />
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <motion.img whileHover={{ scale: 1.02 }} src={img7} alt="" className="img-fluid rounded-4 shadow-lg w-100" style={{ height: "400px", objectFit: "cover" }} />
          </div>
        </motion.div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} initial={{ opacity: 0, x: index === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} className="col-lg-6">
              <motion.div whileHover={{ y: -5 }} className="testimonial-card p-4 rounded-4 bg-white shadow-sm h-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="position-relative">
                    <img src={testimonial.image} alt={testimonial.name} className="rounded-circle" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                    <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-2 border-white"></span>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                    <p className="text-secondary small mb-0">{testimonial.role}</p>
                  </div>

                  <div className="ms-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{ color: "#FFD700" }}>★</span>
                    ))}
                  </div>
                </div>

                <p className="text-secondary mb-0 fst-italic">"{testimonial.text}"</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Time;
