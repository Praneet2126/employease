import React from "react";

function Hero() {
  return (
    <div className="container mt-5">
      <div className="ml-5 text-center">
        <h1>
          Connecting talent with opportunity. <br />
          Empowering businesses with the best hires.
        </h1>
        <img src="media/images/connecting.png" alt="Connecting" className="w-50"/>
      </div>

      <div className="row p-5 mt-5 border-top text-muted" style={{lineHeight: "1.7", fontSize: "1.1em"}}>
        <div className="col-1"></div>
        <div className="col-5 p-5">
          <p>
            Our platform was built with the vision of removing barriers between talented individuals and the companies that need them. 
            We simplify the hiring process by leveraging technology to match the right candidates with the right roles.
          </p>

          <p>
            Today, we are a community of companies and job seekers that trust our platform for efficient and effective hiring solutions.
          </p>

          <p>
            Thousands of users can rely on us daily to find their next big career move or to discover the perfect candidate to join their team.
          </p>
        </div>
        <div className="col-5 p-5">
          <p>
            In addition to job matching, we offer resources and insights to help candidates enhance their skills and employers 
            streamline their recruitment process.
          </p>

          <p>
            <a href="" style={{textDecoration: "none"}}>Explore our solutions</a> to learn more about how we support businesses and job seekers alike.
          </p>

          <p>
            Stay updated with the latest hiring trends and insights by following our blog, or see what our users are saying about us.
          </p>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default Hero;
