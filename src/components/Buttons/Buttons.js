import React from 'react';
import './Buttons.css';

function Buttons({ onClick, label, variant, height = '50px', width = '334px',fontSize='13px'}) {
  return (
    <button className={`button ${variant}`} onClick={onClick} style={{ height, width ,fontSize }}>
      <p className="content">{label}</p>
    </button>
  );
}

export default Buttons;
