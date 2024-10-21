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
    } else if (type === "act&tax") {
      return [
        { name: "เริ่ม", path: ["/insurance-page-taxAndLaw","/carInfo-page-taxAndLaw"] },
        { name: "ผู้เอาประกัน", path: ["/policy-page-taxAndLaw"] },
        { name: "ข้อมูลชําระภาษี", path: ["/tax-Summary-page-taxAndLaw","/tax-payment-page-taxAndLaw","/fileUp-loader-page-taxAndLaw"] },
        { name: "ชําระเงิน", path: ["/paymen-page-taxAndLaw"] },
        { name: "เเจ้งชําระเงิน", path: ["/UploadReceipt-taxAndLaw"] },
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

  // คำนวณจำนวนขั้นตอนและกำหนดสไตล์
  const stepWidth = currentSteps.length > 5 ? "16%" : "20%";

  return (
    <div className="container">
      <ul className="progressbar">
        {currentSteps.map((step, index) => (
          <li
            key={index}
            className={getClassName(index)}
            style={{ width: stepWidth }} // ปรับ width ตามจำนวนขั้นตอน
          >
            {step.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressBar;
