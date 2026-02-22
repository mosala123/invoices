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
import { supabase } from "../../supabaseClient";
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

/* ════════════════════════════════════════════ */
const ReportsPage = () => {
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats,      setStats]      = useState(EMPTY_STATS);
  const [invoices,   setInvoices]   = useState([]);
  const [dbError,    setDbError]    = useState(null); // ✅ نعرض الـ error الحقيقي
  const [chartData,  setChartData]  = useState({
    trends:       { labels: [], datasets: [] },
    distribution: { labels: [], datasets: [] },
    monthly:      { labels: [], datasets: [] },
  });

  /* ── fetch ── */
  const fetchData = async () => {
    setRefreshing(true);
    setDbError(null);
    try {
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) {
        setDbError("Not authenticated. Please login first.");
        return;
      }

      // ✅ أبسط query ممكن أولاً - بس * عشان نشوف إيه الأعمدة الموجودة فعلاً
      const { data: rows, error: fetchErr } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // ✅ لو في error - نعرضه بوضوح عشان نعرف المشكلة
      if (fetchErr) {
        setDbError(`Database error: ${fetchErr.message} (code: ${fetchErr.code})`);
        return;
      }

      const inv = rows || [];
      setInvoices(inv);

      /* ── حساب الـ stats بناءً على الأعمدة الموجودة ── */
      const now    = new Date();
      const msMonth = 30 * 24 * 60 * 60 * 1000;

      // total revenue من عمود total أو price أو amount - أيهم موجود
      const getAmount = (r) => Number(r.total || r.price || r.amount || 0);
      const totalRevenue = inv.reduce((s, r) => s + getAmount(r), 0);

      // unique clients من customer_email أو client_email
      const getEmail = (r) => r.customer_email || r.client_email || r.email || "";
      const uniqueClients = new Set(inv.map(getEmail).filter(Boolean)).size;

      // overdue من due_date
      const getDueDate = (r) => r.due_date || r.dueDate;
      const overdue = inv.filter(r => {
        const d = getDueDate(r);
        return d && new Date(d) < now;
      }).length;

      // growth
      const lastMonthRev = inv
        .filter(r => now - new Date(r.created_at) <= msMonth)
        .reduce((s, r) => s + getAmount(r), 0);
      const prevMonthRev = inv
        .filter(r => { const d = now - new Date(r.created_at); return d > msMonth && d <= 2 * msMonth; })
        .reduce((s, r) => s + getAmount(r), 0);
      const growth = prevMonthRev
        ? +((( lastMonthRev - prevMonthRev) / prevMonthRev) * 100).toFixed(1)
        : 0;

      setStats({
        totalRevenue,
        activeClients: uniqueClients,
        totalInvoices: inv.length,
        overdueInvoices: overdue,
        revenueGrowth: growth,
        paymentEfficiency: inv.length ? +(((inv.length - overdue) / inv.length) * 100).toFixed(1) : 0,
      });

      /* ── charts ── */
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

  const getCustomerName  = r => r.customer_name  || r.client_name  || r.name  || "—";
  const getCustomerEmail = r => r.customer_email || r.client_email || r.email || "—";
  const getService       = r => r.service_title  || r.service      || r.title || "—";
  const getTotal         = r => Number(r.total || r.price || r.amount || 0);
  const getPayment       = r => r.payment_method || r.paymentMethod || "—";
  const getDue           = r => r.due_date || r.dueDate || "—";
  const isOverdue        = r => { const d = getDue(r); return d !== "—" && new Date(d) < new Date(); };

  const cards = [
    { title:"Total Revenue",   value:`${fmt(stats.totalRevenue)} EGP`, icon:<FaMoneyBillWave/>, color:"#4AC5B5", bg:"rgba(74,197,181,0.12)", trend:`${stats.revenueGrowth>0?"+":""}${stats.revenueGrowth}%`, up:stats.revenueGrowth>=0 },
    { title:"Active Clients",  value:stats.activeClients,              icon:<FaUsers/>,          color:"#6366f1", bg:"rgba(99,102,241,0.12)",  trend:`${stats.activeClients} unique`, up:true },
    { title:"Total Invoices",  value:stats.totalInvoices,              icon:<FaFileInvoice/>,    color:"#0d6efd", bg:"rgba(13,110,253,0.12)",  trend:`${stats.paymentEfficiency}% on time`, up:stats.paymentEfficiency>=80 },
    { title:"Overdue",         value:stats.overdueInvoices,            icon:<FaExclamationTriangle/>, color:"#FF6B6B", bg:"rgba(255,107,107,0.12)", trend:stats.overdueInvoices===0?"All clear ✅":"Needs attention", up:stats.overdueInvoices===0 },
  ];

  /* ── loading screen ── */
  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9" }}>
      <div style={{ textAlign:"center" }}>
        <div className="spinner-border" style={{ color:"#4AC5B5", width:48, height:48 }} role="status"/>
        <p style={{ color:"#94a3b8", marginTop:14 }}>Loading reports...</p>
      </div>
    </div>
  );

  /* ── DB error screen ── */
  if (dbError) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"#f1f5f9", fontFamily:"'Nunito','Segoe UI',sans-serif" }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"40px 48px", maxWidth:560, width:"90%",
        boxShadow:"0 4px 30px rgba(0,0,0,0.1)", textAlign:"center" }}>
        <div style={{ fontSize:"3rem", marginBottom:16 }}>⚠️</div>
        <h4 style={{ color:"#1e293b", fontWeight:800, marginBottom:12 }}>Database Error</h4>
        {/* ✅ بيعرض الـ error الحقيقي عشان تعرف المشكلة */}
        <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:12,
          padding:"14px 18px", marginBottom:20, textAlign:"left" }}>
          <code style={{ color:"#dc2626", fontSize:"0.82rem", lineHeight:1.7 }}>{dbError}</code>
        </div>
        <p style={{ color:"#64748b", fontSize:"0.88rem", marginBottom:24 }}>
          {dbError.includes("does not exist") || dbError.includes("schema cache")
            ? "⚡ The 'invoices' table doesn't exist yet. Run the SQL file below in Supabase SQL Editor."
            : "Check the error above and make sure your Supabase table is set up correctly."
          }
        </p>
        {(dbError.includes("does not exist") || dbError.includes("schema cache")) && (
          <div style={{ background:"#f8faff", border:"1px solid #e0e7ff", borderRadius:10,
            padding:"12px 16px", textAlign:"left", marginBottom:20, fontFamily:"monospace",
            fontSize:"0.78rem", color:"#475569", lineHeight:1.8 }}>
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
            cursor:"pointer", fontFamily:"inherit", fontSize:"0.9rem" }}>
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
        *, *::before, *::after { box-sizing:border-box; }
        .scard { transition:transform .22s, box-shadow .22s; }
        .scard:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(0,0,0,0.1) !important; }
        .irow:hover { background:#f8faff !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation:fadeUp .35s ease both; }
        @keyframes spin { to{transform:rotate(360deg)} }
        @media(max-width:900px){
          .four-col{grid-template-columns:1fr 1fr !important}
          .two-col{grid-template-columns:1fr !important}
        }
        @media(max-width:600px){
          .four-col{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a5f 60%,#0e4d3a)",
        padding:"38px 0 68px", position:"relative", overflow:"hidden" }}>
        {[[300,-80,-60,.07],[180,null,-40,null,.06,60]].map(([sz,t,r,o,o2,l],i)=>(
          <div key={i} style={{ position:"absolute",width:sz,height:sz,borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.15)",
            background:`rgba(255,255,255,${o||o2})`,
            top:t,right:r,left:l,pointerEvents:"none" }}/>
        ))}
        <div style={{ padding:"0 36px", position:"relative", zIndex:2,
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <h2 style={{ color:"#fff",fontWeight:900,fontSize:"1.55rem",marginBottom:6 }}>
              📊 Financial Reports
            </h2>
            <p style={{ color:"rgba(255,255,255,0.55)",fontSize:"0.87rem",margin:0 }}>
              Real-time overview · {invoices.length} invoices loaded
            </p>
          </div>
          <button onClick={fetchData} disabled={refreshing}
            style={{ padding:"9px 22px",borderRadius:50,border:"1px solid rgba(255,255,255,0.2)",
              background:"rgba(255,255,255,0.1)",color:"#fff",fontSize:"0.85rem",
              fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",gap:8 }}>
            <FaSync style={{ animation:refreshing?"spin 1s linear infinite":"none" }}/>
            Refresh
          </button>
        </div>
        <div style={{ position:"absolute",bottom:-1,left:0,right:0 }}>
          <svg viewBox="0 0 1440 55" preserveAspectRatio="none" style={{ width:"100%",height:55,display:"block" }}>
            <path d="M0,28 C480,58 960,0 1440,32 L1440,55 L0,55 Z" fill="#f1f5f9"/>
          </svg>
        </div>
      </div>

      <div style={{ padding:"0 36px", marginTop:-16 }}>

        {/* STAT CARDS */}
        <div className="four-col fu" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18,marginBottom:24,animationDelay:".05s" }}>
          {cards.map((c,i)=>(
            <div key={i} className="scard" style={{ background:"#fff",borderRadius:18,
              padding:"20px 22px",boxShadow:"0 2px 14px rgba(0,0,0,0.07)",
              border:"1px solid rgba(0,0,0,0.04)",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-8,right:-8,fontSize:"4.5rem",
                color:c.color,opacity:.07,pointerEvents:"none" }}>{c.icon}</div>
              <div style={{ width:42,height:42,borderRadius:11,background:c.bg,color:c.color,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",marginBottom:12 }}>
                {c.icon}
              </div>
              <p style={{ color:"#94a3b8",fontSize:"0.72rem",fontWeight:700,
                textTransform:"uppercase",letterSpacing:"0.7px",margin:"0 0 5px" }}>{c.title}</p>
              <h3 style={{ color:c.color,fontWeight:900,fontSize:"1.55rem",margin:"0 0 10px",lineHeight:1 }}>
                {c.value}
              </h3>
              <span style={{ display:"inline-flex",alignItems:"center",gap:5,
                background:c.up?"#f0fdf4":"#fff5f5",
                color:c.up?"#16a34a":"#dc2626",
                borderRadius:20,padding:"3px 10px",fontSize:"0.73rem",fontWeight:800 }}>
                {c.up?<FaArrowUp style={{fontSize:9}}/>:<FaArrowDown style={{fontSize:9}}/>}
                {c.trend}
              </span>
            </div>
          ))}
        </div>

        {/* CHARTS ROW 1 */}
        <div className="two-col fu" style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:18,marginBottom:22,animationDelay:".15s" }}>
          <div style={{ background:"#fff",borderRadius:18,padding:"22px 24px",boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",marginBottom:18,
              display:"flex",alignItems:"center",gap:8 }}>
              <FaChartBar style={{color:"#4AC5B5"}}/> Revenue — Last 6 Months
            </h5>
            <div style={{ height:260 }}><Line data={chartData.trends} options={chartOpts()}/></div>
          </div>
          <div style={{ background:"#fff",borderRadius:18,padding:"22px 24px",boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",marginBottom:18 }}>Invoice Status</h5>
            <div style={{ height:200 }}>
              <Doughnut data={chartData.distribution} options={{
                responsive:true,maintainAspectRatio:false,
                plugins:{ legend:{position:"bottom",labels:{padding:14,font:{size:12}}},
                  tooltip:{backgroundColor:"#1e293b",
                    callbacks:{label:ctx=>`${ctx.label}: ${ctx.raw}`}} },
                cutout:"68%",
              }}/>
            </div>
            <div style={{ display:"flex",justifyContent:"center",gap:24,marginTop:14 }}>
              {[{l:"On Time",v:invoices.length-stats.overdueInvoices,c:"#4AC5B5"},
                {l:"Overdue",v:stats.overdueInvoices,c:"#FF6B6B"}].map(s=>(
                <div key={s.l} style={{ textAlign:"center" }}>
                  <p style={{ fontWeight:900,fontSize:"1.25rem",color:s.c,margin:0 }}>{s.v}</p>
                  <p style={{ fontSize:"0.72rem",color:"#94a3b8",margin:0,fontWeight:700 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHARTS ROW 2 */}
        <div className="two-col fu" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:22,animationDelay:".25s" }}>
          <div style={{ background:"#fff",borderRadius:18,padding:"22px 24px",boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",marginBottom:18 }}>Monthly Revenue</h5>
            <div style={{ height:250 }}><Bar data={chartData.monthly} options={chartOpts()}/></div>
          </div>
          <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a5f)",
            borderRadius:18,padding:"26px 28px",boxShadow:"0 2px 14px rgba(0,0,0,0.12)",
            position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",width:180,height:180,borderRadius:"50%",
              background:"rgba(255,255,255,0.05)",top:-50,right:-50,pointerEvents:"none" }}/>
            <div style={{ position:"relative" }}>
              <h5 style={{ color:"#fff",fontWeight:800,marginBottom:22 }}>Performance Summary</h5>
              {[
                {icon:<FaCheckCircle/>,  label:"Revenue Growth",  sub:`${stats.revenueGrowth>0?"+":""}${stats.revenueGrowth}% vs last month`, c:"#4AC5B5"},
                {icon:<FaUsers/>,        label:"Active Clients",  sub:`${stats.activeClients} unique clients`, c:"#6366f1"},
                {icon:<FaClock/>,        label:"On-Time Rate",    sub:`${stats.paymentEfficiency}% of invoices`, c:"#f59e0b"},
                {icon:<FaExclamationTriangle/>, label:"Overdue",  sub:`${stats.overdueInvoices} past due date`, c:"#FF6B6B"},
              ].map((r,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:i<3?18:0 }}>
                  <div style={{ width:38,height:38,borderRadius:10,flexShrink:0,
                    background:"rgba(255,255,255,0.1)",color:r.c,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.95rem" }}>
                    {r.icon}
                  </div>
                  <div>
                    <p style={{ color:"#fff",fontWeight:700,margin:0,fontSize:"0.86rem" }}>{r.label}</p>
                    <p style={{ color:"rgba(255,255,255,0.5)",margin:0,fontSize:"0.76rem" }}>{r.sub}</p>
                  </div>
                </div>
              ))}
              <button onClick={()=>toast.info("Preparing report...")}
                style={{ width:"100%",marginTop:22,padding:"10px 0",borderRadius:11,
                  background:"linear-gradient(135deg,#4AC5B5,#0d6efd)",color:"#fff",
                  border:"none",fontWeight:800,fontSize:"0.87rem",cursor:"pointer",
                  fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
                <FaDownload/> Download Full Report
              </button>
            </div>
          </div>
        </div>

        {/* INVOICES TABLE */}
        <div className="fu" style={{ background:"#fff",borderRadius:18,
          boxShadow:"0 2px 14px rgba(0,0,0,0.07)",overflow:"hidden",animationDelay:".35s" }}>
          <div style={{ padding:"18px 24px",borderBottom:"1px solid #f1f5f9",
            display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
            <h5 style={{ fontWeight:800,color:"#1e293b",margin:0,display:"flex",alignItems:"center",gap:8 }}>
              <FaFileInvoice style={{color:"#4AC5B5"}}/>
              Invoice List
              <span style={{ background:"linear-gradient(135deg,#4AC5B5,#0d6efd)",color:"#fff",
                borderRadius:20,padding:"2px 10px",fontSize:"0.7rem",fontWeight:800 }}>
                {invoices.length}
              </span>
            </h5>
            <div style={{ display:"flex",gap:8 }}>
              {[{l:`${invoices.length-stats.overdueInvoices} On Time`,bg:"rgba(74,197,181,0.1)",c:"#4AC5B5"},
                {l:`${stats.overdueInvoices} Overdue`,bg:"rgba(255,107,107,0.1)",c:"#FF6B6B"}].map(b=>(
                <span key={b.l} style={{ background:b.bg,color:b.c,borderRadius:20,
                  padding:"4px 13px",fontSize:"0.76rem",fontWeight:800 }}>{b.l}</span>
              ))}
            </div>
          </div>

          {invoices.length === 0 ? (
            <div style={{ textAlign:"center",padding:"60px 0" }}>
              <div style={{ fontSize:"3rem",marginBottom:12 }}>📄</div>
              <p style={{ color:"#94a3b8",fontWeight:700 }}>No invoices saved yet</p>
              <p style={{ color:"#cbd5e1",fontSize:"0.82rem" }}>
                Go to Create Invoice and save your first invoice
              </p>
            </div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",fontSize:"0.84rem" }}>
                <thead>
                  <tr style={{ background:"#f8faff" }}>
                    {["#","Client","Service","Total","Payment","Due Date","Status"].map(h=>(
                      <th key={h} style={{ padding:"11px 18px",textAlign:"left",fontWeight:800,
                        color:"#64748b",fontSize:"0.71rem",textTransform:"uppercase",
                        letterSpacing:"0.6px",borderBottom:"1px solid #f1f5f9" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv,i)=>(
                    <tr key={i} className="irow" style={{ borderBottom:"1px solid #f8faff",transition:"background .15s" }}>
                      <td style={{ padding:"12px 18px",color:"#94a3b8",fontWeight:700 }}>{i+1}</td>
                      <td style={{ padding:"12px 18px" }}>
                        <p style={{ fontWeight:700,color:"#1e293b",margin:0 }}>{getCustomerName(inv)}</p>
                        <p style={{ fontSize:"0.74rem",color:"#94a3b8",margin:0 }}>{getCustomerEmail(inv)}</p>
                      </td>
                      <td style={{ padding:"12px 18px" }}>
                        <span style={{ background:"#eef2ff",color:"#6366f1",
                          borderRadius:6,padding:"3px 9px",fontSize:"0.73rem",fontWeight:700 }}>
                          {getService(inv)}
                        </span>
                      </td>
                      <td style={{ padding:"12px 18px",fontWeight:800,color:"#4AC5B5" }}>
                        {getTotal(inv).toLocaleString()} EGP
                      </td>
                      <td style={{ padding:"12px 18px",color:"#475569" }}>{getPayment(inv)}</td>
                      <td style={{ padding:"12px 18px",color:"#64748b",fontSize:"0.81rem" }}>{getDue(inv)}</td>
                      <td style={{ padding:"12px 18px" }}>
                        <span style={{
                          background:isOverdue(inv)?"rgba(255,107,107,0.1)":"rgba(74,197,181,0.1)",
                          color:isOverdue(inv)?"#FF6B6B":"#4AC5B5",
                          borderRadius:20,padding:"4px 12px",fontSize:"0.73rem",fontWeight:800 }}>
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