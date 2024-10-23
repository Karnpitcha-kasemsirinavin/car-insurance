import React from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import "./SelectService.css";
import "../../components/layout-wrapper/layout-wrapper.css";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";

function SelectService() {
  const navigate = useNavigate(); // ใช้ useNavigate

  const handleCardClick = (path) => {
    navigate(path); // นำทางไปยังหน้าเฉพาะ
  };

  return (
    <div className="select-service layout-wrapper">
      <h1>เลือกบริการที่ต้องการ</h1>
      <div className="select-service__card-container">
        <div className="select-service__card" onClick={() => handleCardClick("/buy-insurance")}>
          <div className="select-service__content">
            <img src={icon1} alt="" className="select-service__card-image" />
            <p>ออก พรบ</p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div className="select-service__card" onClick={() => handleCardClick("/tax-renewal")}>
          <div className="select-service__content">
            <img src={icon2} alt="" className="select-service__card-image" />
            <p>ต่อภาษี</p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div className="select-service__card" onClick={() => handleCardClick("/insurance-page-taxAndLaw")}>
          <div className="select-service__content">
            <img src={icon3} alt="" className="select-service__card-image" />
            <p>ต่อภาษี เเละออก พรบ</p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}

export default SelectService;
