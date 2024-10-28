import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 border-top">
        <h1 className="text-center ">Team</h1>
      </div>

      <div
        className="row p-3"
        style={{ lineHeight: "1.7", fontSize: "1.1em" }}
      >
        <div className="col-1"></div>
        <div className="col-5 p-3 text-center">
          <img
            src="media/images/praneet.jpg"
            alt="Nithin Kamath"
            style={{ borderRadius: "100%", width: "60%"}}
          />
          <h4 className="mt-4">Praneet Kalyanshetti</h4>
          <h6>Founder</h6>
        </div>
        <div className="col-5 p-3 text-center">
          <img
            src="media/images/kartik.jpeg"
            alt="Kartik"
            style={{ borderRadius: "100%", width: "60%"}}
          />
          <h4 className="mt-4">Kartik Sadanand Naik</h4>
          <h6>Founder</h6>
        </div>
      </div>
    </div>
  );
}

export default Team;
