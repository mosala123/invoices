import React from 'react'
import './Software.css'
import img from "../../../../images/Discover.webp"
import img1 from "../../../../images/Group3.svg"
import img2 from "../../../../images/Group.svg"
import img3 from "../../../../images/Group2.svg"
import img4 from "../../../../images/Vector2.svg"
import img5 from "../../../../images/Intersect.png"
import img6 from "../../../../images/female.png"
import img7 from "../../../../images/Mask group.png"
import { Link } from 'react-router-dom'

const  Software=()=> {
  return (
        <div className='pb-5' style={{minHeight:"100vh"}}>
             <div className="container Soft pt-5 px-3 pb-5" >
            <div className=" row ">
                <div className=" col-12">
                    <p className=" ppp    ">The World's Leading Business Software. Discover.</p>
                </div>
            </div>
            <div className="row  mt-2 gy-3">
                <div className="col-lg-6 col-sm-12 col-md-12 left">
                    <img src={img}  style={{borderRadius:"10px "}} />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12" >
                    <div className="right">
                        <b>Powerful <div>Tools for </div><span> Smart </span> <b className='ms-3'>Finance</b> </b>
                            <p className='mt-3'>Automate invoicing, track payments, and gain financial insights with ease.</p>
                            <div className="card" style={{display:"flex",alignItems:"start",justifyContent:"space-around"}}>
                                <div className='mt-1 mb-3'>
                                    <img src={img1} alt=""/>
                                    <p>Smart Invoicing</p>
                                </div>
                                <div className='mt-1 mb-3'>
                                    <img src={img2} alt=""/>
                                    <p>Financial Reports & Insights</p>
                                </div>
                                <div className='mt-1 mb-3'>
                                    <img src={img3} alt=""/>
                                    <p>Tax Compliance & VAT Support</p>
                                </div>
                                <div className='mt-1 mb-3'>
                                    <img src={img4} alt=""/>
                                    <p>Multi-Currency Support</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="cart2 mb-1">
                <img src={img5} className="img1" alt=""/>
                <img src={img6} className="img2" alt=""/>
                <img src={img7} className="img3" alt=""/>
                <div>
                    <Link className='btn btn-dark   mb-2' to="/report">Go To  Reports</Link>
                    <b>Claim Your Free<br/>
                        Demo Now
                    </b>
                    <button className="Allbtn1">Claim Your Free Demo</button>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Software
