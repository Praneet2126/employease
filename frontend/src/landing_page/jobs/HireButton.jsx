import React, { useState } from 'react';

const HireButton = () => {
  // State to track if the button has been clicked
  const [hired, setHired] = useState(false);

  // Function to handle button click
  const handleClick = () => {
    setHired(true); // Update state to mark as hired
  };

  return (
    <button
      className={`btn ${hired ? 'btn-success' : 'btn-primary'}`} // Change class based on hired state
      onClick={handleClick}
    >
      {hired ? 'Hired' : 'Hire Now!'} {/* Change text based on hired state */}
    </button>
  );
};

export default HireButton;
