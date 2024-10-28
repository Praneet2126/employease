import React from "react";

function Hero() {
  return (
    <div className="container mb-5 text-center">
      <div className="text-center mt-5 p-5 border-bottom">
        <h1 className="p-2">Pricing</h1>
        <h4 className="text-muted mt-4 mb-5">
        Free equity investments and flat ₹20 intraday and F&O trades
        </h4>
      </div>
      <div className="row border-bottom p-3">
        <div className="col">
            <img src="media/images/pricing-eq.svg" alt="0" style={{width: "80%"}}/>
            <h2 className="mb-2">Free equity delivery</h2>
            <p className="fs-5 text-muted p-4">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
        </div>
        <div className="col">   
            <img src="media/images/other-trades.svg" alt="20" style={{width: "80%"}}/>
            <h2 className="mb-2">Intraday and F&O trades</h2>
            <p className="fs-5 text-muted p-4">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
        </div>
        <div className="col">  
            <img src="media/images/pricing-eq.svg" alt="0" style={{width: "80%"}}/>
            <h2 className="mb-2">Free direct MF</h2>
            <p className="fs-5 text-muted p-4">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
        </div>
      </div>
      <div className="row border-top"></div>
    </div>
  );
}

export default Hero;
