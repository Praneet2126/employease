import React from "react";

function Hero({user}) {
  return (
    <>
      <h1 className="mb-5" style={{textAlign:"center"}}>Welcome, {user.username}</h1>
    </>
  );
}

export default Hero;
