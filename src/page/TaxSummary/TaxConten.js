import React from "react";
import "./TaxConten.css";

function TaxConten({ title, data }) {
  return (
    <div className="tax-conten">
      <div className="tax-conten__title">
        <h1>{title}</h1> {/* ใช้ title จาก props */}
      </div>
      {data.map((item, index) => (
        <div className="tax-conten__conten" key={index}>
          <div className="tax-conten__left">  
            <i className={`fa ${item.iconClass}`}></i> {/* แสดงไอคอนจาก props */}
            <p>{item.label}</p> {/* แสดง label จาก props */}
          </div>
          <div className="tax-conten__right">  
            <p>{item.value}</p> {/* แสดงค่าจาก props */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaxConten;
