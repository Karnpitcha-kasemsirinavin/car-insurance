import React from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import PageTitle from "../../components/PageTitle/PageTitle";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import icon1 from "../../assets/car1.svg"; // นำเข้ารูปภาพ
import icon2 from "../../assets/car2.svg";
import icon3 from "../../assets/car3.svg";
import SimpleCarCard from "../../components/CarCard/SimpleCarCard";
import { baseURL } from "../../App";
import axios from "axios";
import { useEffect, useState } from "react";

const mapVehType = {
  Freight: ["รถบรรทุก", icon2],
  Bus: ["รถตู้", icon3],
  Sedan: ["รถเก๋ง", icon1],
}


function TaxRenewal() {
  const navigate = useNavigate(); // สร้างฟังก์ชันนำทาง
  const [vehicleType, setVehicleType] = useState([])

  const handleCardClick = (path, type) => {
    navigate(path,
      {
        state: {
          vehicleCode: type.VehicleCode,
          displayVeh: type.VehicleType
        }
      }
    );
  };

  // * request available vehicle type
  async function requestVehType() {
    try {
        const response = await axios.post(`${baseURL}/option/taxvehicletype`);
        if (response) {
          console.log(response.data.data);
            setVehicleType(response.data.data);
        }
    } catch (error) {
      // ! error cannot fetch 
        console.log("error: ", error);
    }
  }

  useEffect(() => {
    requestVehType();
  },[])

  return (
    <div className="layout-wrapper customize">
      <ProgressBar type="tax" />
      <PageTitle title="ประเภทรถของคุณคือ?" />
      <div className="container-card customize">
      {vehicleType.length !== 0 && vehicleType.map((type, index) => (
        <SimpleCarCard
            key={type.VehicleCode || index}
            image={mapVehType[type.VehicleType][1]}
            title={mapVehType[type.VehicleType][0]} 
            onClick={() => handleCardClick("/tax-payment-page", type)}
        />
      ))}
      {/* <SimpleCarCard 
        image={icon1}
        title="รถเก๋ง"
        onClick={() => handleCardClick("/tax-payment-page")}
      />
      <SimpleCarCard 
        image={icon2}
        title="รถบรรทุก"
        onClick={() => handleCardClick("/tax-payment-page")}
      />
        <SimpleCarCard 
        image={icon3}
        title="รถตู้"
        onClick={() => handleCardClick("/tax-payment-page")}
      /> */}
      {/* เพิ่ม SimpleCarCard อื่น ๆ ตามต้องการ */}
    </div>
    </div>
  );
}

export default TaxRenewal;
