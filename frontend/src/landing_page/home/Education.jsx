import React from 'react'

function Education() {
    return ( 
        <div className="container p-5">
            <div className="row">
                <div className="col">
                    <img src="media/images/education.svg" alt="Index education" />
                </div>
                <div className="col mt-5">
                    <h1 className='fs-3 mb-4'>Free and open market education</h1>
                    <p className='text-muted mb-4'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="" style={{textDecoration: "none"}} >Varsity <i class="fa-solid fa-arrow-right"></i></a>
                    
                    <p className='text-muted mb-4 mt-4' >TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="" style={{textDecoration: "none"}}>TradingQ&A  <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div> 
     );
}

export default Education;