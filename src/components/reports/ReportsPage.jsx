// ReportsPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaFileInvoice, FaChartBar, FaMoneyBillWave, FaUsers,
  FaCalendarAlt, FaCheckCircle, FaClock, FaExclamationTriangle,
  FaDownload, FaSync, FaArrowUp, FaArrowDown
} from "react-icons/fa";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, ArcElement, BarElement, Filler
} from "chart.js";
import { getAuthenticatedUser, supabase } from "../../supabaseClient";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n || 0);

const EMPTY_STATS = {
  totalRevenue: 0, activeClients: 0,
  totalInvoices: 0, overdueInvoices: 0,
  revenueGrowth: 0, paymentEfficiency: 0,
};

const ReportsPage = () => {
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats,      setStats]      = useState(EMPTY_STATS);
  const [invoices,   setInvoices]   = useState([]);
  const [dbError,    setDbError]    = useState(null);
  const [chartData,  setChartData]  = useState({
    trends:       { labels: [], datasets: [] },
    distribution: { labels: [], datasets: [] },
    monthly:      { labels: [], datasets: [] },
  });

  const fetchData = async () => {
    setRefreshing(true);
    setDbError(null);
    try {
      const user = await getAuthenticatedUser();
      if (!user) {
        setDbError("Not authenticated. Please login first.");
        return;
      }

      const { data: rows, error: fetchErr } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchErr) {
        setDbError(`Database error: ${fetchErr.message} (code: ${fetchErr.code})`);
        return;
      }

      const inv = rows || [];
      setInvoices(inv);

      const now    = new Date();
      const msMonth = 30 * 24 * 60 * 60 * 1000;

      const getAmount = (r) => Number(r.total || r.price || r.amount || 0);
      const totalRevenue = inv.reduce((s, r) => s + getAmount(r), 0);

      const getEmail = (r) => r.customer_email || r.client_email || r.email || "";
      const uniqueClients = new Set(inv.map(getEmail).filter(Boolean)).size;

      const getDueDate = (r) => r.due_date || r.dueDate;
      const overdue = inv.filter(r => {
        const d = getDueDate(r);
        return d && new Date(d) < now;
      }).length;

      const lastMonthRev = inv
        .filter(r => now - new Date(r.created_at) <= msMonth)
        .reduce((s, r) => s + getAmount(r), 0);
      const prevMonthRev = inv
        .filter(r => { const d = now - new Date(r.created_at); return d > msMonth && d <= 2 * msMonth; })
        .reduce((s, r) => s + getAmount(r), 0);
      const growth = prevMonthRev
        ? +(((lastMonthRev - prevMonthRev) / prevMonthRev) * 100).toFixed(1)
        : 0;

      setStats({
        totalRevenue,
        activeClients: uniqueClients,
        totalInvoices: inv.length,
        overdueInvoices: overdue,
        revenueGrowth: growth,
        paymentEfficiency: inv.length ? +(((inv.length - overdue) / inv.length) * 100).toFixed(1) : 0,
      });

      const last6 = [...Array(6)].map((_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (5 - i));
        return { label: d.toLocaleString("en-US", { month: "short" }), m: d.getMonth(), y: d.getFullYear() };
      });

      const monthly = last6.map(({ m, y }) =>
        inv.filter(r => {
          const d = new Date(r.created_at);
          return d.getMonth() === m && d.getFullYear() === y;
        }).reduce((s, r) => s + getAmount(r), 0)
      );

      setChartData({
        trends: {
          labels: last6.map(x => x.label),
          datasets: [{
            label: "Revenue", data: monthly,
            borderColor: "#4AC5B5", backgroundColor: "rgba(74,197,181,0.1)",
            tension: 0.4, fill: true,
            pointBackgroundColor: "#4AC5B5", pointBorderColor: "#fff",
            pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
          }],
        },
        distribution: {
          labels: ["On Time", "Overdue"],
          datasets: [{
            data: [inv.length - overdue, overdue],
            backgroundColor: ["#4AC5B5", "#FF6B6B"],
            borderWidth: 0, hoverOffset: 10,
          }],
        },
        monthly: {
          labels: last6.map(x => x.label),
          datasets: [{
            label: "Revenue",
            data: monthly,
            backgroundColor: ["#4AC5B5","#6366f1","#f59e0b","#0d6efd","#10b981","#8b5cf6"],
            borderRadius: 8, barPercentage: 0.65,
          }],
        },
      });

    } catch (err) {
      console.error("Unexpected error:", err);
      setDbError(`Unexpected error: ${err.message}`);
      toast.error("Error loading data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const sub = supabase
      .channel("invoices_ch")
      .on("postgres_changes", { event: "*", schema: "public", table: "invoices" }, fetchData)
      .subscribe();
    return () => sub.unsubscribe();
  }, []);

  // دوال مساعدة لاستخراج البيانات
  const getCustomerName  = r => r.customer_name  || r.client_name  || r.name  || "—";
  const getCustomerEmail = r => r.customer_email || r.client_email || r.email || "—";
  const getService       = r => r.service_title  || r.service      || r.title || "—";
  const getTotal         = r => Number(r.total || r.price || r.amount || 0);
  const getPayment       = r => r.payment_method || r.paymentMethod || "—";
  const getDue           = r => r.due_date || r.dueDate || "—";
  const isOverdue        = r => { const d = getDue(r); return d !== "—" && new Date(d) < new Date(); };

  // دالة تحميل التقرير الكامل
  const downloadCSV = () => {
    if (!invoices.length) {
      toast.warning("No data to export");
      return;
    }

    const headers = [
      "Invoice ID", "Client Name", "Client Email", "Service",
      "Total (EGP)", "Payment Method", "Due Date", "Status", "Created At"
    ];

    const rows = invoices.map(inv => [
      inv.invoice_id || inv.id,
      getCustomerName(inv),
      getCustomerEmail(inv),
      getService(inv),
      getTotal(inv).toFixed(2),
      getPayment(inv),
      getDue(inv),
      isOverdue(inv) ? "Overdue" : "On Time",
      new Date(inv.created_at).toLocaleDateString()
    ]);

    const summaryRow = [
      "SUMMARY",
      `Total Revenue: ${fmt(stats.totalRevenue)} EGP`,
      `Active Clients: ${stats.activeClients}`,
      `Total Invoices: ${stats.totalInvoices}`,
      `Overdue: ${stats.overdueInvoices}`,
      `Growth: ${stats.revenueGrowth}%`,
      `Efficiency: ${stats.paymentEfficiency}%`,
      "",
      `Generated: ${new Date().toLocaleString()}`
    ];

    const allRows = [headers, ...rows, [], summaryRow];

    const csvContent = allRows
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", `report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Report downloaded as CSV");
  };

  const chartOpts = () => ({
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1e293b",
        callbacks: { label: ctx => `${ctx.raw.toLocaleString()} EGP` } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { callback: v => v.toLocaleString() } },
      x: { grid: { display: false } },
    },
  });

  const cards = [
    { title:"Total Revenue",   value:`${fmt(stats.totalRevenue)} EGP`, icon:<FaMoneyBillWave/>, color:"#4AC5B5", bg:"rgba(74,197,181,0.12)", trend:`${stats.revenueGrowth>0?"+":""}${stats.revenueGrowth}%`, up:stats.revenueGrowth>=0 },
    { title:"Active Clients",  value:stats.activeClients,              icon:<FaUsers/>,          color:"#6366f1", bg:"rgba(99,102,241,0.12)",  trend:`${stats.activeClients} unique`, up:true },
    { title:"Total Invoices",  value:stats.totalInvoices,              icon:<FaFileInvoice/>,    color:"#0d6efd", bg:"rgba(13,110,253,0.12)",  trend:`${stats.paymentEfficiency}% on time`, up:stats.paymentEfficiency>=80 },
    { title:"Overdue",         value:stats.overdueInvoices,            icon:<FaExclamationTriangle/>, color:"#FF6B6B", bg:"rgba(255,107,107,0.12)", trend:stats.overdueInvoices===0?"All clear ✅":"Needs attention", up:stats.overdueInvoices===0 },
  ];

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9", padding:"16px" }}>
      <div style={{ textAlign:"center" }}>
        <div className="spinner-border" style={{ color:"#4AC5B5", width:48, height:48 }} role="status"/>
        <p style={{ color:"#94a3b8", marginTop:14 }}>Loading reports...</p>
      </div>
    </div>
  );

  if (dbError) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"#f1f5f9", fontFamily:"'Nunito','Segoe UI',sans-serif", padding:"16px" }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"clamp(24px, 5vw, 48px)", maxWidth:560, width:"100%",
        boxShadow:"0 4px 30px rgba(0,0,0,0.1)", textAlign:"center" }}>
        <div style={{ fontSize:"clamp(2rem, 8vw, 3rem)", marginBottom:16 }}>⚠️</div>
        <h4 style={{ color:"#1e293b", fontWeight:800, marginBottom:12, fontSize:"clamp(1.1rem, 4vw, 1.5rem)" }}>Database Error</h4>
        <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:12,
          padding:"14px 18px", marginBottom:20, textAlign:"left", overflowX:"auto" }}>
          <code style={{ color:"#dc2626", fontSize:"clamp(0.7rem, 3vw, 0.82rem)", lineHeight:1.7, wordBreak:"break-word" }}>{dbError}</code>
        </div>
        <p style={{ color:"#64748b", fontSize:"clamp(0.75rem, 3.5vw, 0.88rem)", marginBottom:24 }}>
          {dbError.includes("does not exist") || dbError.includes("schema cache")
            ? "⚡ The 'invoices' table doesn't exist yet. Run the SQL file below in Supabase SQL Editor."
            : "Check the error above and make sure your Supabase table is set up correctly."
          }
        </p>
        {(dbError.includes("does not exist") || dbError.includes("schema cache")) && (
          <div style={{ background:"#f8faff", border:"1px solid #e0e7ff", borderRadius:10,
            padding:"12px 16px", textAlign:"left", marginBottom:20, fontFamily:"monospace",
            fontSize:"clamp(0.7rem, 3vw, 0.78rem)", color:"#475569", lineHeight:1.8, overflowX:"auto" }}>
            <strong style={{color:"#6366f1"}}>Supabase SQL Editor → New Query → paste:</strong><br/><br/>
            CREATE TABLE public.invoices (<br/>
            &nbsp;&nbsp;id UUID DEFAULT gen_random_uuid() PRIMARY KEY,<br/>
            &nbsp;&nbsp;invoice_id TEXT, user_id UUID,<br/>
            &nbsp;&nbsp;customer_name TEXT, customer_email TEXT,<br/>
            &nbsp;&nbsp;customer_phone TEXT, freelancer_name TEXT,<br/>
            &nbsp;&nbsp;freelancer_email TEXT, service_title TEXT,<br/>
            &nbsp;&nbsp;price NUMERIC, tax NUMERIC, total NUMERIC,<br/>
            &nbsp;&nbsp;payment_method TEXT, invoice_date TEXT,<br/>
            &nbsp;&nbsp;due_date TEXT, tax_number TEXT,<br/>
            &nbsp;&nbsp;created_at TIMESTAMPTZ DEFAULT NOW()<br/>
            );
          </div>
        )}
        <button onClick={fetchData}
          style={{ background:"linear-gradient(135deg,#4AC5B5,#0d6efd)", color:"#fff",
            border:"none", borderRadius:12, padding:"11px 28px", fontWeight:800,
            cursor:"pointer", fontFamily:"inherit", fontSize:"clamp(0.8rem, 3.5vw, 0.9rem)" }}>
          🔄 Retry
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#f1f5f9",
      fontFamily:"'Nunito','Segoe UI',sans-serif", paddingBottom:60 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing:border-box; }
        .scard { transition:transform .22s, box-shadow .22s; }
        .scard:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(0,0,0,0.1) !important; }
        .irow:hover { background:#f8faff !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation:fadeUp .35s ease both; }
        @keyframes spin { to{transform:rotate(360deg)} }

        .four-col, .two-col {
          display: grid;
          gap: clamp(12px, 2vw, 18px);
        }
        .four-col { grid-template-columns: repeat(4, 1fr); }
        .two-col { grid-template-columns: repeat(2, 1fr); }

        @media (max-width: 1024px) {
          .four-col { grid-template-columns: repeat(2, 1fr); }
          .two-col { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .four-col { grid-template-columns: 1fr; }
          .two-col { grid-template-columns: 1fr; }
          .scard { padding: 18px !important; }
        }
        @media (max-width: 480px) {
          .scard h3 { font-size: 1.3rem !important; }
          .scard p { font-size: 0.65rem !important; }
        }

        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          font-size: clamp(0.7rem, 2.5vw, 0.84rem);
        }
        .invoice-table th,
        .invoice-table td {
          padding: clamp(8px, 2vw, 12px) clamp(8px, 2vw, 18px);
          white-space: nowrap;
        }
        @media (max-width: 600px) {
          .invoice-table th,
          .invoice-table td {
            white-space: normal;
            word-break: break-word;
          }
        }
        .invoice-table th {
          font-size: clamp(0.65rem, 2.2vw, 0.71rem);
        }
      `}</style>

      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a5f 60%,#0e4d3a)",
        padding:"clamp(20px, 5vw, 38px) clamp(16px, 4vw, 36px) clamp(40px, 8vw, 68px)", 
        position:"relative", overflow:"hidden" }}>
        {[[300,-80,-60,.07],[180,null,-40,null,.06,60]].map(([sz,t,r,o,o2,l],i)=>(
          <div key={i} style={{ position:"absolute",width:sz,height:sz,borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.15)",
            background:`rgba(255,255,255,${o||o2})`,
            top:t,right:r,left:l,pointerEvents:"none" }}/>
        ))}
        <div style={{ position:"relative", zIndex:2,
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <h2 style={{ color:"#fff",fontWeight:900,fontSize:"clamp(1.2rem, 5vw, 1.55rem)",marginBottom:6 }}>
              📊 Financial Reports
            </h2>
            <p style={{ color:"rgba(255,255,255,0.55)",fontSize:"clamp(0.75rem, 3vw, 0.87rem)",margin:0 }}>
              Real-time overview · {invoices.length} invoices loaded
            </p>
          </div>
          <button onClick={fetchData} disabled={refreshing}
            style={{ padding:"clamp(6px, 2vw, 9px) clamp(16px, 4vw, 22px)",borderRadius:50,border:"1px solid rgba(255,255,255,0.2)",
              background:"rgba(255,255,255,0.1)",color:"#fff",fontSize:"clamp(0.75rem, 3vw, 0.85rem)",
              fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",gap:8 }}>
            <FaSync style={{ animation:refreshing?"spin 1s linear infinite":"none" }}/>
            Refresh
          </button>
        </div>
        <div style={{ position:"absolute",bottom:-1,left:0,right:0 }}  >
          <svg viewBox="0 0 1440 55" preserveAspectRatio="none" style={{ width:"100%",height:55,display:"block" }}>
            <path d="M0,28 C480,58 960,0 1440,32 L1440,55 L0,55 Z" fill="#f1f5f9"/>
          </svg>
        </div>
      </div>

      <div style={{ padding:"0 clamp(12px, 4vw, 36px)", marginTop:-16 }}>

        <div className="four-col fu mt-5" style={{ marginBottom:24, animationDelay:".05s" }}>
          {cards.map((c,i)=>(
            <div key={i} className="scard" style={{ background:"#fff",borderRadius:18,
              padding:"clamp(16px, 3vw, 20px) clamp(16px, 3vw, 22px)",boxShadow:"0 2px 14px rgba(0,0,0,0.07)",
              border:"1px solid rgba(0,0,0,0.04)",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-8,right:-8,fontSize:"clamp(3rem, 8vw, 4.5rem)",
                color:c.color,opacity:.07,pointerEvents:"none" }}>{c.icon}</div>
              <div style={{ width:"clamp(36px, 8vw, 42px)",height:"clamp(36px, 8vw, 42px)",borderRadius:11,background:c.bg,color:c.color,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(0.9rem, 3vw, 1.1rem)",marginBottom:12 }}>
                {c.icon}
              </div>
              <p style={{ color:"#94a3b8",fontSize:"clamp(0.65rem, 2.5vw, 0.72rem)",fontWeight:700,
                textTransform:"uppercase",letterSpacing:"0.7px",margin:"0 0 5px" }}>{c.title}</p>
              <h3 style={{ color:c.color,fontWeight:900,fontSize:"clamp(1.2rem, 5vw, 1.55rem)",margin:"0 0 10px",lineHeight:1 }}>
                {c.value}
              </h3>
              <span style={{ display:"inline-flex",alignItems:"center",gap:5,
                background:c.up?"#f0fdf4":"#fff5f5",
                color:c.up?"#16a34a":"#dc2626",
                borderRadius:20,padding:"3px clamp(6px, 2vw, 10px)",fontSize:"clamp(0.65rem, 2.5vw, 0.73rem)",fontWeight:800 }}>
                {c.up?<FaArrowUp style={{fontSize:9}}/>:<FaArrowDown style={{fontSize:9}}/>}
                {c.trend}
              </span>
            </div>
          ))}
        </div>

        <div className="two-col fu" style={{ marginBottom:22, animationDelay:".15s" }}>
          <div style={{ background:"#fff",borderRadius:18,padding:"clamp(16px, 3vw, 22px) clamp(16px, 3vw, 24px)",boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",marginBottom:18, fontSize:"clamp(0.9rem, 3.5vw, 1rem)",
              display:"flex",alignItems:"center",gap:8 }}>
              <FaChartBar style={{color:"#4AC5B5"}}/> Revenue — Last 6 Months
            </h5>
            <div style={{ height:"clamp(180px, 40vw, 260px)" }}><Line data={chartData.trends} options={chartOpts()}/></div>
          </div>
          <div style={{ background:"#fff",borderRadius:18,padding:"clamp(16px, 3vw, 22px) clamp(16px, 3vw, 24px)",boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",marginBottom:18, fontSize:"clamp(0.9rem, 3.5vw, 1rem)" }}>Invoice Status</h5>
            <div style={{ height:"clamp(150px, 35vw, 200px)" }}>
              <Doughnut data={chartData.distribution} options={{
                responsive:true,maintainAspectRatio:false,
                plugins:{ legend:{position:"bottom",labels:{padding:14,font:{size:12}}},
                  tooltip:{backgroundColor:"#1e293b",
                    callbacks:{label:ctx=>`${ctx.label}: ${ctx.raw}`}} },
                cutout:"68%",
              }}/>
            </div>
            <div style={{ display:"flex",justifyContent:"center",gap:"clamp(12px, 4vw, 24px)",marginTop:14, flexWrap:"wrap" }}>
              {[{l:"On Time",v:invoices.length-stats.overdueInvoices,c:"#4AC5B5"},
                {l:"Overdue",v:stats.overdueInvoices,c:"#FF6B6B"}].map(s=>(
                <div key={s.l} style={{ textAlign:"center" }}>
                  <p style={{ fontWeight:900,fontSize:"clamp(1rem, 4vw, 1.25rem)",color:s.c,margin:0 }}>{s.v}</p>
                  <p style={{ fontSize:"clamp(0.65rem, 2.5vw, 0.72rem)",color:"#94a3b8",margin:0,fontWeight:700 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="two-col fu" style={{ marginBottom:22, animationDelay:".25s" }}>
          <div style={{ background:"#fff",borderRadius:18,padding:"clamp(16px, 3vw, 22px) clamp(16px, 3vw, 24px)",boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",marginBottom:18, fontSize:"clamp(0.9rem, 3.5vw, 1rem)" }}>Monthly Revenue</h5>
            <div style={{ height:"clamp(180px, 40vw, 250px)" }}><Bar data={chartData.monthly} options={chartOpts()}/></div>
          </div>
          <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a5f)",
            borderRadius:18,padding:"clamp(18px, 4vw, 26px) clamp(18px, 4vw, 28px)",boxShadow:"0 2px 14px rgba(0,0,0,0.12)",
            position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",width:"clamp(120px, 30vw, 180px)",height:"clamp(120px, 30vw, 180px)",borderRadius:"50%",
              background:"rgba(255,255,255,0.05)",top:-50,right:-50,pointerEvents:"none" }}/>
            <div style={{ position:"relative" }}>
              <h5 style={{ color:"#fff",fontWeight:800,marginBottom:22, fontSize:"clamp(0.9rem, 3.5vw, 1rem)" }}>Performance Summary</h5>
              {[
                {icon:<FaCheckCircle/>,  label:"Revenue Growth",  sub:`${stats.revenueGrowth>0?"+":""}${stats.revenueGrowth}% vs last month`, c:"#4AC5B5"},
                {icon:<FaUsers/>,        label:"Active Clients",  sub:`${stats.activeClients} unique clients`, c:"#6366f1"},
                {icon:<FaClock/>,        label:"On-Time Rate",    sub:`${stats.paymentEfficiency}% of invoices`, c:"#f59e0b"},
                {icon:<FaExclamationTriangle/>, label:"Overdue",  sub:`${stats.overdueInvoices} past due date`, c:"#FF6B6B"},
              ].map((r,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",gap:"clamp(8px, 2vw, 12px)",marginBottom:i<3?18:0, flexWrap:"wrap" }}>
                  <div style={{ width:"clamp(32px, 6vw, 38px)",height:"clamp(32px, 6vw, 38px)",borderRadius:10,flexShrink:0,
                    background:"rgba(255,255,255,0.1)",color:r.c,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(0.8rem, 3vw, 0.95rem)" }}>
                    {r.icon}
                  </div>
                  <div>
                    <p style={{ color:"#fff",fontWeight:700,margin:0,fontSize:"clamp(0.75rem, 3vw, 0.86rem)" }}>{r.label}</p>
                    <p style={{ color:"rgba(255,255,255,0.5)",margin:0,fontSize:"clamp(0.65rem, 2.5vw, 0.76rem)" }}>{r.sub}</p>
                  </div>
                </div>
              ))}
              <button onClick={downloadCSV}
                style={{ width:"100%",marginTop:22,padding:"clamp(8px, 2vw, 10px) 0",borderRadius:11,
                  background:"linear-gradient(135deg,#4AC5B5,#0d6efd)",color:"#fff",
                  border:"none",fontWeight:800,fontSize:"clamp(0.75rem, 3vw, 0.87rem)",cursor:"pointer",
                  fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
                <FaDownload/> Download Full Report
              </button>
            </div>
          </div>
        </div>

        <div className="fu mt-4" style={{ background:"#fff",borderRadius:18,
          boxShadow:"0 2px 14px rgba(0,0,0,0.07)",overflow:"hidden",animationDelay:".35s" }}>
          <div style={{ padding:"clamp(12px, 3vw, 18px) clamp(16px, 4vw, 24px)",borderBottom:"1px solid #f1f5f9",
            display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",margin:0,display:"flex",alignItems:"center",gap:8, fontSize:"clamp(0.9rem, 3.5vw, 1rem)" }}>
              <FaFileInvoice style={{color:"#4AC5B5"}}/>
              Invoice List
              <span style={{ background:"linear-gradient(135deg,#4AC5B5,#0d6efd)",color:"#fff",
                borderRadius:20,padding:"2px 10px",fontSize:"clamp(0.65rem, 2.5vw, 0.7rem)",fontWeight:800 }}>
                {invoices.length}
              </span>
            </h5>
            <div style={{ display:"flex",gap:8, flexWrap:"wrap" }}>
              {[{l:`${invoices.length-stats.overdueInvoices} On Time`,bg:"rgba(74,197,181,0.1)",c:"#4AC5B5"},
                {l:`${stats.overdueInvoices} Overdue`,bg:"rgba(255,107,107,0.1)",c:"#FF6B6B"}].map(b=>(
                <span key={b.l} style={{ background:b.bg,color:b.c,borderRadius:20,
                  padding:"4px clamp(8px, 2vw, 13px)",fontSize:"clamp(0.7rem, 2.5vw, 0.76rem)",fontWeight:800, whiteSpace:"nowrap" }}>{b.l}</span>
              ))}
            </div>
          </div>

          {invoices.length === 0 ? (
            <div style={{ textAlign:"center",padding:"clamp(40px, 10vw, 60px) 0" }}>
              <div style={{ fontSize:"clamp(2rem, 8vw, 3rem)",marginBottom:12 }}>📄</div>
              <p style={{ color:"#94a3b8",fontWeight:700, fontSize:"clamp(0.9rem, 3.5vw, 1rem)" }}>No invoices saved yet</p>
              <p style={{ color:"#cbd5e1",fontSize:"clamp(0.75rem, 3vw, 0.82rem)" }}>
                Go to Create Invoice and save your first invoice
              </p>
            </div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table className="invoice-table">
                <thead>
                  <tr style={{ background:"#f8faff" }}>
                    {["#","Client","Service","Total","Payment","Due Date","Status"].map(h=>(
                      <th key={h} style={{ textAlign:"left",fontWeight:800,
                        color:"#64748b",borderBottom:"1px solid #f1f5f9" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv,i)=>(
                    <tr key={i} className="irow" style={{ borderBottom:"1px solid #f8faff",transition:"background .15s" }}>
                      <td style={{ color:"#94a3b8",fontWeight:700 }}>{i+1}</td>
                      <td>
                        <p style={{ fontWeight:700,color:"#1e293b",margin:0, fontSize:"clamp(0.75rem, 2.8vw, 0.84rem)" }}>{getCustomerName(inv)}</p>
                        <p style={{ fontSize:"clamp(0.65rem, 2.5vw, 0.74rem)",color:"#94a3b8",margin:0 }}>{getCustomerEmail(inv)}</p>
                      </td>
                      <td>
                        <span style={{ background:"#eef2ff",color:"#6366f1",
                          borderRadius:6,padding:"3px 9px",fontSize:"clamp(0.65rem, 2.5vw, 0.73rem)",fontWeight:700, whiteSpace:"nowrap" }}>
                          {getService(inv)}
                        </span>
                      </td>
                      <td style={{ fontWeight:800,color:"#4AC5B5", fontSize:"clamp(0.75rem, 2.8vw, 0.84rem)" }}>
                        {getTotal(inv).toLocaleString()} EGP
                      </td>
                      <td style={{ color:"#475569", fontSize:"clamp(0.7rem, 2.5vw, 0.8rem)" }}>{getPayment(inv)}</td>
                      <td style={{ color:"#64748b", fontSize:"clamp(0.7rem, 2.5vw, 0.81rem)" }}>{getDue(inv)}</td>
                      <td>
                        <span style={{
                          background:isOverdue(inv)?"rgba(255,107,107,0.1)":"rgba(74,197,181,0.1)",
                          color:isOverdue(inv)?"#FF6B6B":"#4AC5B5",
                          borderRadius:20,padding:"4px 12px",fontSize:"clamp(0.65rem, 2.5vw, 0.73rem)",fontWeight:800, whiteSpace:"nowrap" }}>
                          {isOverdue(inv)?"⚠ Overdue":"✓ On Time"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;