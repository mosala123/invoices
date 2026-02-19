import React from 'react'
import './Successed.css'
import img from "../../../../images/man2.webp"
import img1 from "../../../../images/Group3.svg"
import img2 from "../../../../images/Group.svg"
import img3 from "../../../../images/Group2.svg"
import img4 from "../../../../images/Vector2.svg"
 
const  Successed=()=> {
  return (
        <div className="container Soft pt-2 Successed">
            <div className="row pt-1 gy-3">
                <div className="col-lg-6 col-sm-12 left">
                    <img src={img}  style={{borderRadius:"20px"}} />
                </div>
                <div className="col-lg-6 col-sm-12">
                    <div className="right">
                        <b>Helping Small Businesses <div><span> Succeed </span></div></b>
                            <p className='mt-2'>Automate invoicing, track payments, and gain financial
                            insights with ease.</p>
                            <div class="card">
                                <div className='mb-3'>
                                    <img src={img1} alt=""/>
                                    <p>Hassle-Free Financial Management</p>
                                </div>
                                <div className='mb-3'>
                                    <img src={img2} alt=""/>
                                    <p>Intuitive & Powerful -</p>
                                </div>
                                <div className='mb-3'>
                                    <img src={img3} alt=""/>
                                    <p>Affordable Solution</p>
                                </div>
                                <div className='mb-3'>
                                    <img src={img4} alt=""/>
                                    <p>Business Growth Focused</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Successed
