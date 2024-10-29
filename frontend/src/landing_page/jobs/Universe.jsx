import React from "react";
import UniverseImage from "./UniverseImage";

function Universe() {
  return (
    <div className="container text-center" style={{ marginTop: "100px" }}>
      <div className="row">
        <h1 className="text-muted">The Zerodha Universe</h1>
        <p className="text-muted mt-3">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <UniverseImage
          imageURL="media/images/smallcaseLogo.png"
          para="Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs."
          width="60%"
        />
        <UniverseImage
          imageURL="media/images/zerodhaFundhouse.png"
          para="Our asset management venture that is creating simple and transparent index funds to help you save for your goals."
          width="60%"
        />
        <UniverseImage
          imageURL="media/images/sensibullLogo.svg"
          para="Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more."
          width="70%"
        />
        
        <UniverseImage
          imageURL="media/images/streakLogo.png"
          para="Systematic trading platform that allows you to create and backtest strategies without coding."
          width="60%"
        />

        <UniverseImage
          imageURL="media/images/dittoLogo.png"
          para="Personalized advice on life and health insurance. No spam and no mis-selling."
          width="50%"
        />

        <UniverseImage
          imageURL="media/images/tijori.svg"
          para="Investment research platform that offers detailed insights on stocks,sectors, supply chains, and more."
          width="50%"
        />

      </div>
      <button className='p-2 btn btn-primary fs-5 mb-5 mt-5' style={{width: "20%", margin: "0 auto"}}>Signup now</button>

    </div>
  );
}

export default Universe;
