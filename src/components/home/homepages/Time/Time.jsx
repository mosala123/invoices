import React from 'react'
import './Time.css'
import img1 from '../../../../images/icone1.svg'
import img2 from '../../../../images/icone2.svg'
import img3 from '../../../../images/icone3.svg'
import img4 from '../../../../images/icone4.svg'
import img5 from '../../../../images/Rectangle 44.png'
import img6 from '../../../../images/Rectangle 199.png'
import img7 from '../../../../images/Rectangle 166.png'
import img8 from '../../../../images/Mask group3.png'
import img9 from '../../../../images/Rectangle 200.png'
import img10 from '../../../../images/Ellipse 2.jpg'

<<<<<<< HEAD
const Time = () => {
  return (
    <section className="Time py-5">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12">
            <h2 className="display-6 fw-bold mb-3">
                SAVE TIME, <span className="text-primary">GET PAID</span> FASTER
            </h2>
            <p className="lead mt-5">
                Streamline your finances and focus on growing your business.
            </p>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {[
            { img: img1, title: "Save Time & Effort" },
            { img: img2, title: "Get Paid Faster" },
            { img: img3, title: "Stay Organized" },
            { img: img4, title: "Work from Anywhere" }
          ].map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
              <div className="save p-4 text-center shadow-sm rounded-3 h-100">
                <img src={item.img} alt={item.title} className="mb-3" style={{ width: '64px', height: '64px' }} />
                <h5 className="fw-bold">{item.title}</h5>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-4 col-md-12">
            <div className="d-flex gap-3">
              <div className="img_md flex-grow-1">
                <img src={img5} alt="" className="img-fluid rounded-3 shadow-sm" />
              </div>
              <div className="img_md flex-grow-1">
                <img src={img6} alt="" className="img-fluid rounded-3 shadow-sm" />
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <img src={img7} alt="" className="img-fluid rounded-3 shadow-sm w-100" />
          </div>
        </div>

        <div className="row bg-light rounded-4 p-4 align-items-center">
          <div className="col-lg-8 col-md-7">
            <div className="card_p p-3">
              <p className="lead mb-0">
                This platform has completely transformed the way I manage my finances. I can send invoices in minutes and track every dollar without stress. Highly recommended!
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="card_m text-center p-3">
              <img src={img10} alt="Kate Nguyen" className="rounded-circle mb-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              <h6 className="fw-bold mb-1">Kate Nguyen</h6>
              <p className="text-muted mb-0">UX/UI Web/App Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Time
=======

const  Time=()=> {
  return (
      <div className="Time px-3">
            <div className='container'>
                <div className="row">
                    <div className="col-12 center mb-3">
                        <p>SAVE TIME, <span>GET PAID</span> FASTER</p>
                    </div>
                    <div className="col-12 center mb-3">
                        <b>Streamline your finances and focus on growing your business.</b>
                    </div>

                    <div className="row g-2 mb-4" >
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                            <div className="save">
                                <img src={img1} alt="" />
                                <p>Save Time & Effort</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                            <div className="save">
                                <img src={img2} alt="" />
                                <p>Get Paid Faster</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                            <div className="save">
                                <img src={img3} alt="" />
                                <p>Stay Organized</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                            <div className="save">
                                <img src={img4} alt="" />
                                <p>Work from Anywhere</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4    grid_f d-flex align-items-center">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="flex ">
                            <div className=" img_md"><img src={img5} alt="" /></div>
                            <div className="  img_md"><img src={img6} alt="" /></div>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-12  col-sm-12 img_lg">
                        <img src={img7}  alt=""   />
                    </div>

                   
                </div>
                <div className="   row bg-light rad d-flex  align-items-center px-4">
                    <div className="col-lg-8 col-md-10 col-sm-10 col-xs-10 ">
                        <div className="card_p">
                        <p>This platform has completely transformed the way I manage my finances. I can send invoices in minutes and track every dollar without stress. Highly recommended!</p>
                        </div>
                    </div>
                    <div className="col-lg-4 py-5   col-md-2 col-sm-2 col-xs-2">
                        <div className="card_m">
                            <img src={img10} alt="" />
                            <b>Kate Nguyen</b>
                            <p>UX/UI Web/App Designer</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Time
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
