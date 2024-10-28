import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row">

        <div className="col-6 p-5" style={{marginTop: "10%"}}>
          <h1>{productName}</h1>
          <p className="mt-4 mb-4">{productDescription}</p>
          <div className="fs-5">
            <a href={tryDemo} style={{textDecoration: "none"}}>Try Demo <i class="fa-solid fa-arrow-right"></i></a>
            <a href={learnMore} style={{marginLeft: "100px", textDecoration: "none"}}>Learn More <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
                
        <div className={productName == "Console" ? "col-6": "col-6 mt-5 p-5"}>
          <img src={imageURL} alt="Right image" />
        </div>

      </div>
    </div>
  );
}

export default RightSection;
