import React from "react";
import "./Receipt.css";
import Logo from "../../assets/logo.svg";

function Receipt({ issueDate, orderId, paymentId, status }) {
  return (
    <div className="container-receipt">
      <div className="receipt__header">
        <div className="receipt__summary-top">
          <h1>ใบเสร็จ</h1>
          <div className="receipt__summary-details">
            <p>
              วันที่ออกใบเสร็จ: <span>{issueDate}</span>
            </p>
            <p>
              รหัสออเดอร์: <span>{orderId}</span>
            </p>
            <p>
              รหัสชําระเงิน: <span>{paymentId}</span>
            </p>
            <p>
              สถานะ: <span>{status}</span>
            </p>
          </div>
        </div>
        <div className="receipt__header-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default Receipt;
