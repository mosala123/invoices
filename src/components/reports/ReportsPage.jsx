import React from "react";
import { motion } from "framer-motion";
import { 
  FaFileInvoice, FaChartBar, FaMoneyBillWave, FaUsers, 
  FaCalendarAlt, FaCheckCircle, FaClock, FaExclamationTriangle 
} from "react-icons/fa";
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import CartInvoices from "../create invoices/CartInvoices";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportsPage = () => {
  // Mock Data for Charts
  const invoiceTrendsData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'الفواتير الصادرة',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const statusDistributionData = {
    labels: ['مدفوعة', 'قيد الانتظار', 'متأخرة'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#198754', '#ffc107', '#dc3545'],
        borderWidth: 0,
      },
    ],
  };

  const revenueData = {
    labels: ['الخدمات', 'المنتجات', 'الاستشارات'],
    datasets: [
      {
        label: 'الإيرادات (EGP)',
        data: [45000, 32000, 18000],
        backgroundColor: ['#0d6efd', '#0dcaf0', '#6610f2'],
        borderRadius: 10,
      },
    ],
  };

  const stats = [
    { title: "إجمالي الإيرادات", value: "95,000 EGP", icon: <FaMoneyBillWave />, color: "text-success", trend: "+12%" },
    { title: "العملاء النشطون", value: "48", icon: <FaUsers />, color: "text-primary", trend: "+5 جديد" },
    { title: "متوسط وقت الدفع", value: "6 أيام", icon: <FaCalendarAlt />, color: "text-warning", trend: "-2 يوم" },
    { title: "الفواتير المكتملة", value: "156", icon: <FaCheckCircle />, color: "text-info", trend: "98%" }
  ];

  return (
    <div className="reports-page py-5 bg-light min-vh-100">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h2 className="fw-bold text-primary mb-2">📊 التقارير والتحليلات المالية</h2>
          <p className="text-muted">نظرة شاملة على أداء أعمالك ونمو إيراداتك</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="col-lg-3 col-md-6"
            >
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <div className={`fs-1 mb-3 ${stat.color}`}>{stat.icon}</div>
                <h6 className="text-muted mb-1">{stat.title}</h6>
                <h4 className="fw-bold mb-2">{stat.value}</h4>
                <span className={`badge rounded-pill ${stat.color === 'text-success' ? 'bg-success' : 'bg-primary'} bg-opacity-10 ${stat.color}`}>
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card border-0 shadow-sm rounded-4 p-4 h-100"
            >
              <h5 className="fw-bold mb-4"><FaChartBar className="me-2 text-primary" /> اتجاهات الفواتير</h5>
              <div style={{ height: '300px' }}>
                <Line 
                  data={invoiceTrendsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                  }}
                />
              </div>
            </motion.div>
          </div>
          <div className="col-lg-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card border-0 shadow-sm rounded-4 p-4 h-100"
            >
              <h5 className="fw-bold mb-4">توزيع الحالات</h5>
              <div style={{ height: '300px' }}>
                <Doughnut 
                  data={statusDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Revenue Bar Chart & Summary */}
        <div className="row g-4 mb-5">
          <div className="col-lg-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card border-0 shadow-sm rounded-4 p-4 h-100"
            >
              <h5 className="fw-bold mb-4">الإيرادات حسب الفئة</h5>
              <div style={{ height: '300px' }}>
                <Bar 
                  data={revenueData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                  }}
                />
              </div>
            </motion.div>
          </div>
          <div className="col-lg-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-primary text-white"
            >
              <h5 className="fw-bold mb-4">ملخص الأداء الشهري</h5>
              <div className="summary-list">
                <div className="d-flex align-items-center mb-4">
                  <FaCheckCircle className="fs-3 me-3" />
                  <div>
                    <h6 className="mb-0">نمو الإيرادات</h6>
                    <small className="opacity-75">زيادة بنسبة 15% مقارنة بالشهر الماضي</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <FaClock className="fs-3 me-3" />
                  <div>
                    <h6 className="mb-0">سرعة التحصيل</h6>
                    <small className="opacity-75">تحسن بنسبة 20% في سرعة دفع الفواتير</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <FaExclamationTriangle className="fs-3 me-3 text-warning" />
                  <div>
                    <h6 className="mb-0">تنبيه المتأخرات</h6>
                    <small className="opacity-75">هناك 3 فواتير تجاوزت موعد الاستحقاق</small>
                  </div>
                </div>
              </div>
              <button className="btn btn-light rounded-pill w-100 mt-auto fw-bold text-primary">تحميل التقرير الكامل (PDF)</button>
            </motion.div>
          </div>
        </div>

        {/* Detailed List Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card border-0 shadow-sm rounded-4 overflow-hidden"
        >
          <div className="card-header bg-white py-3 border-0">
            <h5 className="fw-bold mb-0 text-primary"><FaFileInvoice className="me-2" /> قائمة الفواتير التفصيلية</h5>
          </div>
          <div className="p-0">
            <CartInvoices />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsPage;
