import React from "react";
import { useLocation } from "react-router-dom";
import "./ProgressBar.css";

function ProgressBar({ type }) {
  const location = useLocation();

  // สร้างอาร์เรย์ของขั้นตอนและ path ของแต่ละขั้นตอน
  const steps = () => {
    if (type === "act") {
      return [
        { name: "ข้อมูลรถยนต์", path: ["/car-info", "/buy-insurance"] },
        { name: "ผู้เอาประกัน", path: ["/policy-ownerInfo"] },
        { name: "ชำระเงิน", path: ["/payment-page"] },
        { name: "แจ้งชำระเงิน", path: ["/upload-receipt"] },
        { name: "ใบเสร็จ", path: ["/receipt"] },
      ];
    } else if (type === "tax") {
      return [
        { name: "เริ่ม", path: ["/tax-renewal"] },
        { name: "กรอกข้อมูล", path: ["/tax-payment-page","/fileUploader-Page"] },
        { name: "ตรวจสอบ", path: ["/tax-summary"] },
        { name: "แจ้งชำระเงิน", path: ["/payment-notification"] },
        { name: "ใบเสร็จ", path: ["/receipt"] },
      ];
    }
    return [];
  };

  const currentSteps = steps();

  // หา index ของขั้นตอนปัจจุบัน
  const currentIndex = currentSteps.findIndex((step) =>
    step.path.some((p) => location.pathname.startsWith(p))
  );

  // ฟังก์ชันเพื่อกำหนด className ตาม index ของขั้นตอน
  const getClassName = (stepIndex) => {
    return stepIndex <= currentIndex ? "active" : "";
  };

  return (
    <div className="container">
      <ul className="progressbar">
        {currentSteps.map((step, index) => (
          <li key={index} className={getClassName(index)}>
            {step.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressBar;
