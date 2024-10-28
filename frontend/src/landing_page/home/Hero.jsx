import React from 'react'
import { Link } from 'react-router-dom';

function Hero() {
    return ( 
        <div className="container p-5">
            <center>
            <div style={{display: 'block'}}>
                <p>Your Job Search Partner</p>
                <h1 className='mb-5'>Welcome to EmployEase</h1> 
                <div className="heroDiv">
                <img className="w-25 h-25" src="media/images/job-search-1.jpg" alt="JS1" />       
                <img className="w-25 h-25" src="media/images/job-search-2.png" alt="JS1" />       
                <img className="w-25 h-25" src="media/images/job-search-3.jpg" alt="JS1" />      
                </div> 
                <button className='p-2 btn btn-primary fs-5 mb-5' style={{width: "20%", margin: "0 auto"}}><Link to="/signup" style={{color: 'white', textDecoration: 'none'}}>Join Now</Link></button>
            </div>
            </center>
        </div>
     );
}

export default Hero;