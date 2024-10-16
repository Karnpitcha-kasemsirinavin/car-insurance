import React from "react";
import "./TaxTitle.css";

function TaxTitle({ iconClass, title }) {
  return (
    <div className="tax-title">
      <i className={iconClass}></i>
      <h1>{title}</h1>
    </div>
  );
}

export default TaxTitle;
