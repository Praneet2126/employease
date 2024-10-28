import React from 'react'

function Hero() {
    return ( 
        <div className="container border-bottom mb-5">
            <div className='text-center mt-5 p-5'>
                <h1>Technology</h1>
                <h4 className='text-muted mt-4'>Sleek, modern, and intuitive trading platforms</h4>
                <p className='text-muted mt-4 mb-5'>Check out our <a href="" style ={{textDecoration: "none"}}>investment offerings</a> <i class="fa-solid fa-arrow-right"></i></p> 
            </div>
        </div>
     );
}

export default Hero;