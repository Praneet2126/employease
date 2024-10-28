import React from 'react'

function UniverseImage({imageURL, para, width}) {
    return ( 
        <div className="col-4 p-3 mt-5">
            <img src={imageURL} alt="Smallcase" style={{width: width}}/>
            <p className='text-small text-muted mt-4 mx-5' style={{width: "70%"}}>{para}</p>
        </div>
     );
}

export default UniverseImage;