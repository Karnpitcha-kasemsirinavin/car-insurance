import React from 'react';
import './Buttons.css';

function Buttons({ onClick, label, variant, height = '50px', width, fontSize , iconClass }) {
  return (
    <button className={`button ${variant}`} onClick={onClick} style={{ height, width, fontSize }}>
      {iconClass && <i className={`button-icon ${iconClass}`}></i>} {/* แสดงไอคอนถ้ามี */}
      <p className="content">{label}</p>
    </button>
  );
}

export default Buttons;
