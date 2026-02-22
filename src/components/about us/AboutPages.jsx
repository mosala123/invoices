import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaRocket, FaLightbulb, FaBullseye, FaUsers,
  FaShieldAlt, FaChartLine, FaStar
} from 'react-icons/fa';
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

import mosalah        from "../../images/1737352714922.jpg";
import kalil          from "../../images/photo_2025-04-19_13-30-23.jpg";
import moahmed        from "../../images/moahmed.jpg";
import kiro           from "../../images/kiro.jpg";
import abdoelsayed    from "../../images/abdoelsayed.jpg";
import abdelaziz      from "../../images/abdelaziz.jpg";
import zakria         from "../../images/zakria.jpg";
import momagdy        from "../../images/moelgamal.jpg";
import mohamedgaber   from "../../images/mohamedgaber.jpg";
import taha           from "../../images/taha.jpg";
import Hiyam          from "../../images/Hiyam.jpg";
import HananMohamed   from "../../images/HananMohamed.jpg";
import YasmineMohamed from "../../images/Yasmine Mohamed.jpg";
import NourhanAhmed   from "../../images/Nourhan Ahmed.jpg";
import NourhanAlSaid  from "../../images/Nourhan Al-Said.jpg";
import AsmaaHassan    from "../../images/Asmaa Hassan.jpg";
import HanaaMohsen    from "../../images/Hanaa Mohsen.jpg";
import HaydiEyhab     from "../../images/Haydi Eyhab.jpg";
import YasmineAli     from "../../images/Yasmine Ali.jpg";
import NourhanHussein from "../../images/Nourhan Hussein.jpg";
import IbrahimElSayed from "../../images/Ibrahim El Sayed.jpg";
import imageabout     from "../../images/istockphoto-1347264285-612x612.webp";

/* ─── role → colour map ─── */
const getRoleStyle = (role = "") => {
  const r = role.toLowerCase();
  if (r.includes("front"))                        return { bg:"#e8f0fe", accent:"#1a73e8", label:"Frontend"  };
  if (r.includes("back"))                         return { bg:"#e6f4ea", accent:"#1e8e3e", label:"Backend"   };
  if (r.includes("ui") || r.includes("ux"))      return { bg:"#fff3e0", accent:"#e37400", label:"UI/UX"     };
  if (r.includes("system") || r.includes("anal"))return { bg:"#fce8e6", accent:"#d93025", label:"Analysis"  };
  return { bg:"#f1f3f4", accent:"#5f6368", label:"Other" };
};

/* ─── team data ─── */
const teamMembers = [
  { id:1,  name:"Mohamed Ibrahim Salah",  role:"Front-end Developer",      image:mosalah,
    description:"A passionate front-end developer with expertise in modern frameworks, creating dynamic and user-friendly web applications.",
    social:{ email:"elmosalah74@gmail.com", github:"https://github.com/mosala123", linkedin:"https://www.linkedin.com/in/mohamed-ibrahim-1a6a9131b", facebook:"https://www.facebook.com", instagram:"https://www.instagram.com" }},
  { id:2,  name:"Mohamed Ahmed",          role:"Back-end Developer",       image:moahmed,
    description:"A skilled back-end developer specializing in API development, database optimization, and server-side logic.",
    social:{ email:"moahmedrashad22@gmail.com", facebook:"https://www.facebook.com/share/16L947KYYa", linkedin:"https://www.linkedin.com/in/mohamed-ahmed-027767321" }},
  { id:3,  name:"Khalil Gamal",           role:"Front-end Developer",      image:kalil,
    description:"Skilled in building modern and responsive user interfaces using HTML, CSS, and Bootstrap, ensuring a smooth web experience.",
    social:{ email:"elmosalah74@gmail.com", facebook:"https://www.facebook.com", instagram:"https://www.instagram.com" }},
  { id:4,  name:"Kirollos Emad Samuil",  role:"Back-end Developer",       image:kiro,
    description:"An experienced back-end PHP developer with a strong background in designing scalable and efficient server-side systems.",
    social:{ email:"keroemad612@gmail.com", facebook:"https://www.facebook.com/share/15oSLSBT6C/?mibextid=qi2Omg" }},
  { id:5,  name:"Mohamed Magdy El-Gamal",role:"System Analyst Developer",  image:momagdy,
    description:"A skilled System Analyst with expertise in analyzing business needs and designing effective system solutions.",
    social:{ email:"elmosalah74@gmail.com", facebook:"https://www.facebook.com/share/16cPbhF6fc/" }},
  { id:6,  name:"AbdulRahman Al-Sayed",  role:"Back-end Developer",       image:abdoelsayed,
    description:"A back-end developer with a strong focus on building secure, scalable, and efficient server-side applications.",
    social:{ email:"elmosalah74@gmail.com", facebook:"https://www.facebook.com/share/1C9aYBVanY/" }},
  { id:7,  name:"Zakaria Saad",           role:"Back-end Developer",       image:zakria,
    description:"A back-end developer with expertise in building reliable and high-performance server-side applications.",
    social:{ email:"elmosalah74@gmail.com", facebook:"https://www.facebook.com/share/16T87iaRrn" }},
  { id:8,  name:"Abdel Aziz Taha",        role:"Systems Analysis",         image:abdelaziz,
    description:"A systems analyst with strong skills in evaluating business processes and designing effective technical solutions.",
    social:{}},
  { id:9,  name:"Mohamed Gaber",          role:"Back-end Developer",       image:mohamedgaber,
    description:"A back-end developer specializing in creating scalable and secure server-side applications.",
    social:{ facebook:"https://www.facebook.com/share/1EktcosVsU" }},
  { id:10, name:"Mohamed El Sayed",       role:"Front-end Developer",      image:taha,
    description:"A front-end developer skilled in building interactive and responsive user interfaces using modern web technologies.",
    social:{ facebook:"https://www.facebook.com/share/1BkHLDS8mm" }},
  { id:11, name:"Ibrahim El Sayed",       role:"Front-end Developer",      image:IbrahimElSayed,
    description:"A front-end developer focused on creating modern, responsive, and user-friendly web interfaces.",
    social:{}},
  { id:12, name:"Hanan Mohamed",          role:"Front-end Developer",      image:HananMohamed,
    description:"A front-end developer focused on creating interactive and responsive web interfaces with a great user experience.",
    social:{}},
  { id:13, name:"Hiyam Mohamed",          role:"Front-end Developer",      image:Hiyam,
    description:"A front-end developer dedicated to building responsive and visually appealing user interfaces.",
    social:{}},
  { id:14, name:"Nourhan Hussein",        role:"UI / UX",                  image:NourhanHussein,
    description:"A UI/UX designer passionate about creating intuitive and visually engaging user experiences.",
    social:{}},
  { id:15, name:"Yasmine Ali",            role:"Systems Analysis",         image:YasmineAli,
    description:"A systems analyst skilled in analyzing business requirements and designing efficient system solutions.",
    social:{}},
  { id:16, name:"Haydi Ayhab",            role:"Systems Analysis",         image:HaydiEyhab,
    description:"A systems analyst experienced in evaluating business processes and developing effective technical solutions.",
    social:{}},
  { id:17, name:"Hanaa Mohsen",           role:"Back-end Developer",       image:HanaaMohsen,
    description:"A back-end developer skilled in building reliable and efficient server-side applications.",
    social:{}},
  { id:18, name:"Asmaa Hassan",           role:"UI / UX",                  image:AsmaaHassan,
    description:"A UI/UX designer dedicated to crafting user-friendly and visually appealing digital experiences.",
    social:{}},
  { id:19, name:"Nourhan Al-Said",        role:"Back-end Developer",       image:NourhanAlSaid,
    description:"A back-end developer experienced in designing and implementing scalable server-side solutions.",
    social:{}},
  { id:20, name:"Nourhan Ahmed",          role:"Back-end Developer",       image:NourhanAhmed,
    description:"A back-end developer skilled in creating secure and scalable server-side applications.",
    social:{}},
  { id:21, name:"Yasmine Mohamed",        role:"Back-end Developer",       image:YasmineMohamed,
    description:"A back-end developer specializing in building efficient and scalable server-side applications.",
    social:{}},
];

/* ─── filter tabs ─── */
const TABS = [
  { key:"All",      label:"All",      count: teamMembers.length },
  { key:"Frontend", label:"Frontend", count: teamMembers.filter(m=>getRoleStyle(m.role).label==="Frontend").length  },
  { key:"Backend",  label:"Backend",  count: teamMembers.filter(m=>getRoleStyle(m.role).label==="Backend").length   },
  { key:"UI/UX",    label:"UI / UX",  count: teamMembers.filter(m=>getRoleStyle(m.role).label==="UI/UX").length     },
  { key:"Analysis", label:"Analysis", count: teamMembers.filter(m=>getRoleStyle(m.role).label==="Analysis").length  },
];

/* ─── page stats ─── */
const stats = [
  { value:"21",   label:"Team Members",  icon:<FaUsers />     },
  { value:"500+", label:"Invoices Sent", icon:<FaChartLine /> },
  { value:"200+", label:"Happy Clients", icon:<FaStar />      },
  { value:"24/7", label:"Support",       icon:<FaShieldAlt /> },
];

/* ─── values ─── */
const values = [
  { icon:<FaLightbulb />, title:"Our Vision",  accent:"#1a73e8",
    text:"We envision a future where every freelancer and small business owner manages their finances effortlessly — no more manual invoice headaches." },
  { icon:<FaBullseye />,  title:"Our Mission", accent:"#1e8e3e",
    text:"Deliver an innovative, secure, and efficient invoicing solution that simplifies financial operations with accuracy, transparency, and automation." },
  { icon:<FaRocket />,    title:"Our Goal",    accent:"#e37400",
    text:"Become the leading invoicing and project-management platform for freelancers and small businesses across the Arab world." },
];

/* ─── animation helpers ─── */
const fadeUp  = { hidden:{opacity:0,y:30}, show:{opacity:1,y:0,transition:{duration:0.5,ease:"easeOut"}} };
const stagger = { hidden:{}, show:{transition:{staggerChildren:0.09}} };

/* social icon button */
const SocialBtn = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer"
    style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",
      width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.25)",
      color:"#fff",textDecoration:"none",backdropFilter:"blur(4px)",
      transition:"background .2s,transform .2s" }}
    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.45)";e.currentTarget.style.transform="scale(1.15)"}}
    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.25)";e.currentTarget.style.transform="scale(1)"}}>
    {children}
  </a>
);

/* ================================================================ */
const AboutPages = () => {
  const [activeTab, setActiveTab]   = useState("All");
  const [hoveredId, setHoveredId]   = useState(null);

  const filtered = activeTab === "All"
    ? teamMembers
    : teamMembers.filter(m => getRoleStyle(m.role).label === activeTab);

  return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", overflowX:"hidden" }}>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="position-relative overflow-hidden"
        style={{ background:"linear-gradient(135deg,#1a73e8 0%,#0d47a1 100%)",
          minHeight:"50vh", display:"flex", alignItems:"center",
          paddingTop:80, paddingBottom:100 }}>

        {/* blobs */}
        <div style={{ position:"absolute",top:-120,right:-80,width:420,height:420,
          borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",bottom:-100,left:-60,width:300,height:300,
          borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none" }}/>

        <div className="container text-center text-white position-relative" style={{zIndex:2}}>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="badge rounded-pill px-4 py-2 mb-3 d-inline-block"
                style={{background:"rgba(255,255,255,0.18)",fontSize:"0.85rem",letterSpacing:1}}>
                ✦ About Us
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="display-4 fw-bold mb-3">
              Automatic Invoice Generator
            </motion.h1>
            <motion.p variants={fadeUp} className="lead mx-auto" style={{maxWidth:640,opacity:0.85}}>
              A smart platform empowering freelancers and small businesses to manage invoices and projects professionally and effortlessly.
            </motion.p>
          </motion.div>
        </div>

        {/* wave */}
        <div style={{position:"absolute",bottom:-2,left:0,right:0}}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{width:"100%",height:55}}>
            <path d="M0,40 C480,80 960,0 1440,40 L1440,70 L0,70 Z" fill="#f8f9fa"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════ */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.div className="row g-3 justify-content-center"
            initial="hidden" whileInView="show" viewport={{once:true}} variants={stagger}>
            {stats.map((s,i)=>(
              <motion.div key={i} variants={fadeUp} className="col-6 col-md-3">
                <motion.div whileHover={{y:-6}} className="text-center p-4 rounded-4 h-100"
                  style={{background:"#fff",boxShadow:"0 4px 20px rgba(26,115,232,0.1)",
                    border:"1px solid rgba(26,115,232,0.08)"}}>
                  <div style={{fontSize:"1.8rem",color:"#1a73e8",marginBottom:8}}>{s.icon}</div>
                  <h3 className="fw-bold mb-1" style={{color:"#1a73e8"}}>{s.value}</h3>
                  <p className="text-muted small mb-0">{s.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ INTRO ══════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container">
          <motion.div className="row align-items-center gy-5"
            initial="hidden" whileInView="show" viewport={{once:true}} variants={stagger}>

            <motion.div variants={fadeUp} className="col-lg-6">
              <div className="p-4 p-lg-5 rounded-4"
                style={{background:"#f8fbff",borderLeft:"5px solid #1a73e8"}}>
                <h2 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{color:"#1a73e8"}}>
                  <FaRocket /> About the Project
                </h2>
                <p className="text-dark mb-3" style={{lineHeight:1.9}}>
                  In today's fast-evolving digital landscape, freelancers and small business owners face significant challenges managing their financial operations and issuing invoices.
                </p>
                <p className="text-muted mb-0" style={{lineHeight:1.9}}>
                  Our system is an innovative solution that simplifies invoice creation, payment management, and financial efficiency — letting you focus on growing your business.
                </p>
                <div className="d-flex gap-2 mt-4 flex-wrap">
                  {[["Fast","#e8f0fe","#1a73e8"],["Secure","#e6f4ea","#1e8e3e"],
                    ["Easy to Use","#fff3e0","#e37400"],["Professional","#fce8e6","#d93025"]].map(([tag,bg,cl],i)=>(
                    <span key={i} className="badge rounded-pill px-3 py-2"
                      style={{background:bg,color:cl,fontSize:"0.8rem"}}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="col-lg-6 text-center">
              <img src={imageabout} alt="About" className="img-fluid rounded-5 shadow-lg"
                style={{maxWidth:"88%",objectFit:"cover"}}/>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ VALUES ══════════════════════ */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.div className="text-center mb-5"
            initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
            <h2 className="fw-bold">Our Values</h2>
            <p className="text-muted">What drives us forward every single day</p>
          </motion.div>
          <motion.div className="row g-4"
            initial="hidden" whileInView="show" viewport={{once:true}} variants={stagger}>
            {values.map((v,i)=>(
              <motion.div key={i} variants={fadeUp} className="col-md-4">
                <motion.div whileHover={{y:-8}} className="p-4 rounded-4 h-100"
                  style={{background:"#fff",boxShadow:"0 4px 20px rgba(0,0,0,0.07)",
                    border:`1px solid ${v.accent}22`}}>
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{width:56,height:56,background:`${v.accent}15`,fontSize:"1.4rem",color:v.accent}}>
                    {v.icon}
                  </div>
                  <h5 className="fw-bold mb-2">{v.title}</h5>
                  <p className="text-muted mb-0" style={{lineHeight:1.8,fontSize:"0.95rem"}}>{v.text}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TEAM ══════════════════════ */}
      <section className="py-5 bg-white">
        <div className="container">

          {/* heading */}
          <motion.div className="text-center mb-4"
            initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
            <h2 className="fw-bold d-flex align-items-center justify-content-center gap-2">
              <FaUsers style={{color:"#1a73e8"}}/> Meet the Team
            </h2>
            <p className="text-muted">21 talented people who make it all happen</p>
          </motion.div>

          {/* filter tabs */}
          <motion.div className="d-flex justify-content-center flex-wrap gap-2 mb-5"
            initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
            {TABS.map(tab=>(
              <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
                className="btn rounded-pill px-4 py-2 fw-semibold"
                style={{
                  fontSize:"0.85rem", border:"none", transition:"all .25s",
                  background: activeTab===tab.key ? "#1a73e8" : "#f1f3f4",
                  color:       activeTab===tab.key ? "#fff"    : "#5f6368",
                  boxShadow:   activeTab===tab.key ? "0 4px 14px rgba(26,115,232,.35)" : "none",
                  transform:   activeTab===tab.key ? "scale(1.05)" : "scale(1)",
                }}>
                {tab.label}
                <span className="ms-2 badge rounded-pill"
                  style={{ background: activeTab===tab.key ? "rgba(255,255,255,0.28)" : "#e0e0e0",
                    color: activeTab===tab.key ? "#fff" : "#555", fontSize:"0.7rem" }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* cards */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
              transition={{duration:0.3}}
              className="row g-4">
              {filtered.map((member,i)=>{
                const rc  = getRoleStyle(member.role);
                const hov = hoveredId === member.id;
                const hasSocial = Object.entries(member.social)
                  .filter(([,v])=>v && v !== "/").length > 0;

                return (
                  <motion.div key={member.id}
                    initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
                    transition={{duration:0.4,delay:i*0.045}}
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6">

                    <div
                      onMouseEnter={()=>setHoveredId(member.id)}
                      onMouseLeave={()=>setHoveredId(null)}
                      style={{
                        background:"#fff", borderRadius:20, overflow:"hidden", 
                        boxShadow: hov ? `0 20px 50px ${rc.accent}28` : "0 4px 18px rgba(0,0,0,0.08)",
                        border:`1px solid ${hov ? rc.accent+"44" : "#f0f0f0"}`,
                        transform: hov ? "translateY(-8px)" : "translateY(0)",
                        transition:"all .35s cubic-bezier(.25,.8,.25,1)",
                      }}>

                      {/* ── image ── */}
                     <div style={{position:"relative",height:220,overflow:"hidden",background:rc.bg}}>
  <img src={member.image} alt={member.name}
    style={{ 
      width:"100%",
      height:"100%",
      objectFit:"cover", 
      objectPosition: "center 30%",  // 30% = حرك الصورة لتحت شوية (جرب 20% أو 40% حسب احتياجك)
      transform: hov ? "scale(1.07)" : "scale(1)",
      transition:"transform .4s ease" 
    }}/>

  {/* dark overlay + social on hover */}
  <div style={{
    position:"absolute",inset:0,
    background:`linear-gradient(to top,${rc.accent}dd 0%,transparent 55%)`,
    opacity: hov && hasSocial ? 1 : 0,
    transition:"opacity .35s",
    display:"flex",alignItems:"flex-end",padding:14,gap:8,
  }}>
    {member.social.email && member.social.email !== "/" &&
      <SocialBtn href={`mailto:${member.social.email}`}><FaEnvelope size={13}/></SocialBtn>}
    {member.social.github &&
      <SocialBtn href={member.social.github}><FaGithub size={13}/></SocialBtn>}
    {member.social.linkedin &&
      <SocialBtn href={member.social.linkedin}><FaLinkedin size={13}/></SocialBtn>}
    {member.social.facebook && member.social.facebook !== "/" &&
      <SocialBtn href={member.social.facebook}><FaFacebook size={13}/></SocialBtn>}
    {member.social.instagram &&
      <SocialBtn href={member.social.instagram}><FaInstagram size={13}/></SocialBtn>}
  </div>

  {/* role badge */}
  <span style={{
    position:"absolute",top:12,right:12,
    background:rc.accent,color:"#fff",
    fontSize:"0.68rem",fontWeight:700,
    padding:"3px 10px",borderRadius:50,letterSpacing:"0.5px",
    boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
  }}>
    {rc.label}
  </span>
</div>

                      {/* ── body ── */}
                      <div style={{padding:"16px 18px 18px"}}>
                        <h6 className="fw-bold mb-1" style={{fontSize:"0.95rem",color:"#202124"}}>
                          {member.name}
                        </h6>
                        <p style={{fontSize:"0.78rem",color:rc.accent,fontWeight:600,marginBottom:8}}>
                          {member.role.trim()}
                        </p>
                        <p style={{fontSize:"0.8rem",color:"#5f6368",lineHeight:1.7,marginBottom:0}}>
                          {member.description}
                        </p>
                      </div>

                      {/* ── bottom accent bar ── */}
                      <div style={{
                        height:3,
                        background:`linear-gradient(90deg,${rc.accent},${rc.accent}55)`,
                        transform: hov ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin:"left",
                        transition:"transform .4s ease",
                      }}/>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════ CTA ══════════════════════ */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}
            className="text-white text-center p-5 rounded-5 shadow-lg position-relative overflow-hidden"
            style={{background:"linear-gradient(135deg,#1a73e8,#0d47a1)"}}>

            <div style={{position:"absolute",top:-60,right:-60,width:240,height:240,
              borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-40,left:-40,width:180,height:180,
              borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}/>

            <div className="position-relative" style={{zIndex:2}}>
              <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
              <p className="mb-4 mx-auto" style={{opacity:0.82,maxWidth:480}}>
                Join hundreds of freelancers managing their invoices professionally right now.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/registerclient"
                  className="btn btn-light btn-lg rounded-pill px-5 fw-bold shadow-sm"
                  style={{color:"#1a73e8",transition:"transform .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}>
                  Register as Client
                </Link>
                <Link to="/registerfreelancer"
                  className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold"
                  style={{transition:"transform .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}>
                  Register as Freelancer
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutPages;