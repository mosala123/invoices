import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaBullseye, FaUsers, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import imageabout from "../../images/istockphoto-1347264285-612x612.webp";
import mosalah from "../../images/mosalah.jpg";
import kalil from "../../images/photo_2025-04-19_13-30-23.jpg";

const AboutPages = () => {
  const team = [
    { name: "محمد صلاح", role: "مطور واجهات أمامية", img: mosalah },
    { name: "خليل إبراهيم", role: "مطور واجهات خلفية", img: kalil }
  ];

  return (
    <div className="about-page py-5 bg-light min-vh-100">
      <div className="container">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold text-primary mb-3">نظام توليد الفواتير التلقائي</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            نحن هنا لتبسيط حياتك المالية. منصتنا تهدف لتمكين المستقلين والشركات الصغيرة من خلال حلول تقنية ذكية ومبتكرة.
          </p>
        </motion.div>

        {/* Introduction Section */}
        <div className="row align-items-center gy-5 mb-5">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-lg-6"
          >
            <div className="p-4 bg-white rounded-4 shadow-sm border-start border-primary border-5">
              <h3 className="fw-bold text-primary mb-4 d-flex align-items-center">
                <FaRocket className="me-2" /> مقدمة المشروع
              </h3>
              <p className="text-dark mb-3">
                في المشهد الرقمي سريع التطور اليوم، يواجه العاملون المستقلون وأصحاب الأعمال الصغيرة تحديات كبيرة في إدارة عملياتهم المالية وإصدار الفواتير.
              </p>
              <p className="text-muted">
                تم تطوير نظامنا كحل مبتكر يبسط عملية إنشاء الفواتير وإدارة المدفوعات وتحسين الكفاءة المالية، مما يتيح لك التركيز على ما تفعله بشكل أفضل: تنمية عملك.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="col-lg-6 text-center"
          >
            <img src={imageabout} alt="About Us" className="img-fluid rounded-5 shadow-lg" style={{ maxWidth: '85%' }} />
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <motion.div 
              whileHover={{ y: -10 }}
              className="card border-0 shadow-sm rounded-4 p-4 h-100"
            >
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <FaLightbulb className="text-primary fs-3" />
              </div>
              <h4 className="fw-bold">رؤيتنا</h4>
              <p className="text-muted">
                نتصور مستقبلاً حيث يمكن للمستقلين وأصحاب الأعمال الصغيرة إدارة شؤونهم المالية بسهولة دون عناء الفواتير اليدوية، لنكون الحل الرائد عالمياً.
              </p>
            </motion.div>
          </div>
          <div className="col-md-6">
            <motion.div 
              whileHover={{ y: -10 }}
              className="card border-0 shadow-sm rounded-4 p-4 h-100"
            >
              <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <FaBullseye className="text-success fs-3" />
              </div>
              <h4 className="fw-bold">رسالتنا</h4>
              <p className="text-muted">
                تقديم حل مبتكر وآمن وفعال لإصدار الفواتير يبسط العمليات المالية، مع الالتزام بتوفير الدقة والشفافية والأتمتة في كل خطوة.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-5"
        >
          <h2 className="fw-bold mb-5 d-flex align-items-center justify-content-center">
            <FaUsers className="me-3 text-primary" /> فريق العمل
          </h2>
          <div className="row g-4 justify-content-center">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="col-lg-3 col-md-6"
              >
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                  <img src={member.img} alt={member.name} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary small mb-3">{member.role}</p>
                    <div className="d-flex justify-content-center gap-3">
                      <a href="#" className="text-muted"><FaGithub /></a>
                      <a href="#" className="text-muted"><FaLinkedin /></a>
                      <a href="#" className="text-muted"><FaTwitter /></a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-primary text-white p-5 rounded-5 text-center shadow-lg"
        >
          <h2 className="fw-bold mb-4">هل أنت مستعد للبدء؟</h2>
          <p className="mb-5 opacity-75">انضم إلينا اليوم واجعل إدارة فواتيرك أمراً في غاية السهولة.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/registerclient" className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-primary">تسجيل كعميل</Link>
            <Link to="/registerfreelancer" className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold">تسجيل كمستقل</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPages;
