import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row">
        
        <div className="col-6 p-4">
          <img src={imageURL} alt="Left image" />
        </div>

        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p className="mt-4 mb-4">{productDescription}</p>
          <div className="fs-5">
            <a href={tryDemo} style={{textDecoration: "none"}}>Try Demo <i class="fa-solid fa-arrow-right"></i></a>
            <a href={learnMore} style={{marginLeft: "100px", textDecoration: "none"}}>Learn More <i class="fa-solid fa-arrow-right"></i></a>
          </div>

          <div className="mt-3">
            <a href={googlePlay} style={{marginRight: "70px"}}>
              <img src="media/images/googlePlayBadge.svg" alt="Google play" />
            </a>
            <a href={appStore}>
              <img src="media/images/appstoreBadge.svg" alt="App Store" />
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default LeftSection;
