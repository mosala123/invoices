import React from 'react'
import './Stats.css'

function Stats() {
  return (
    <div className="Stats">
        <div className="container">
            <div className="top">
                <b>Our Stats</b>
                <p>You can now value a business in minutes with our powerful all-in-one</p>
            </div>
            <div className="row g-3 mt-4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card_Stats">
                        <b>10,000</b>
                        <p>freelancers & small businessestrust us</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card_Stats">
                        <b>50%</b>
                        <p>time saved</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card_Stats">
                        <b>50,000</b>
                        <p>Private transactions</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card_Stats">
                        <b>50+</b>
                        <p>countries</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Stats
