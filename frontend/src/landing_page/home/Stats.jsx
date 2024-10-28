import React from 'react';

function Stats() {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-6 p-5">
                    <h1 className='fs-2 mb-4'>Build Your Career with Confidence</h1>

                    <h3 className='fs-4'>Your Success, Our Mission</h3>
                    <p className='text-muted'>
                       We connect talent with opportunities every day. So get a job and live a life!
                    </p>

                    <h3 className='fs-4'>Transparent & Reliable Process</h3>
                    <p className='text-muted'>
                        No hidden charges or complex processes. We ensure a simple, efficient, and reliable hiring experience for both employers and job seekers.
                    </p>

                    <h3 className='fs-4'>Empowering Employers</h3>
                    <p className='text-muted'>
                        Our platform provides employers the comfortability they need to find the right candidates.  
                    </p>

                    <h3 className='fs-4'>Helping You Thrive</h3>
                    <p className='text-muted'>
                        We don't just help you get hired — we help you build a successful career. 
                    </p>
                </div>
                
                <div className="col-6 p-5">
                    <img src="media/images/confident-career-2.jpg" alt="Hiring Ecosystem" style={{width: "500px"}}/>
                </div>
            </div>
        </div>
    );
}

export default Stats;
