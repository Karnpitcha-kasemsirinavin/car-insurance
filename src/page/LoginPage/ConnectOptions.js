import React from "react";
import "./ConnectOptions.css";

import line from "../../assets/LINE.png";
function ConnectOptions() {
  return (
    <div className="connect-options">
      <h1>or connect with:</h1>
      <div className="connect-options__box">
        <div className="connect-options__box--item">
          <img src={line} alt="Separator line" />
        </div>
      </div>
      <p>
        Don't have an account?   <span  onClick={() => {  /* นี่สามารถเป็นฟังก์ชันที่เปิดโมดัลหรือไปยังหน้าลงทะเบียน */  }}
          style={{ cursor: "pointer", color: "#3FABD9" }} // เพิ่มสไตล์ให้ชัดเจนว่าเป็นลิงก์
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default ConnectOptions;
