import React from 'react'

function Pricing() {
    return ( 
        <div className="container p-3">
            <div className="row p-5">
                <div className="col-5 p-5">
                    <h1 className='fs-2'>Unbeatable pricing</h1>
                    <p className='text-muted'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a href="" style={{textDecoration: "none"}}>See Pricing <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="col-1 p-5"></div>
                <div className="col-6 p-5">
                    <div className="row">
                        <div className="col">
                            <img src="media/images/pricing-eq.svg" alt="pricing-eq" style={{maxWidth: "70%"}}/>
                            <p>Free account opening</p>
                        </div>
                        <div className="col">
                            <img src="media/images/pricing-eq.svg" alt="pricing-eq" style={{maxWidth: "70%"}}/>
                            <p>Free account opening</p></div>
                        <div className="col">
                            <img src="media/images/other-trades.svg" alt="Other trades" style={{maxWidth: "70%"}}/>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;