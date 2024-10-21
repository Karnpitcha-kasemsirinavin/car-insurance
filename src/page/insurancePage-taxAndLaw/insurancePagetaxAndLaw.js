import React from 'react';
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import icon1 from "../../assets/car1.svg"; // นำเข้ารูปภาพ
import icon2 from "../../assets/car2.svg";
import icon3 from "../../assets/car3.svg";
import icon4 from "../../assets/car4.svg";
import icon5 from "../../assets/car5.svg";
import CarCard from "../../components/CarCard/CarCard";
import PageTitle from "../../components/PageTitle/PageTitle";

function InsurancePageTaxAndLaw() {
  const navigate = useNavigate(); // สร้างฟังก์ชันนำทาง

  const handleCardClick = (path) => {
    navigate(path); // นำทางไปยังเส้นทางที่ถูกส่งเข้ามา
  };

  return (
    <div className="layout-wrapper">
      <ProgressBar type="act&tax" />  
      <PageTitle
        title="ประเภทรถของคุณคือ?"
        description="เฉพาะรถยนต์ส่วนบุคคลเท่านั้น และมีผลในการต่อภาษีประจำปี"
      />

      <div className="container-card">
        <CarCard
          image={icon1}
          title="รถเก๋ง"
          discount="645"
          price="499"
          onClick={() => handleCardClick("/carInfo-page-taxAndLaw")}
        />
        <CarCard
          image={icon2}
          title="รถบรรทุก"
          discount="800"
          price="750"
          onClick={() => handleCardClick("/carInfo-page-taxAndLaw")}
        />
        <CarCard
          image={icon3}
          title="รถตู้"
          discount="900"
          price="888"
          onClick={() => handleCardClick("/carInfo-page-taxAndLaw")}
        />
        <CarCard
          image={icon4}
          title="รถกระบะ 2 ประตู"
          discount="980"
          price="960"
          onClick={() => handleCardClick("/carInfo-page-taxAndLaw")}
        />
        <CarCard
          image={icon5}
          title="รถจักรยานยนต์"
          discount="645"
          price="499"
          onClick={() => handleCardClick("/carInfo-page-taxAndLaw")}
        />
      </div>
    </div>
  );
}

export default InsurancePageTaxAndLaw;
