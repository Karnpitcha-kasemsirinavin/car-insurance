import React, { useEffect, useState } from "react";
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
import { baseURL } from "../../AuthContext";
import axios from "axios";

// * map details for vehicle type display
const mapVehType = {
  Motorcycle: ["รถจักรยานยนต์", icon5],
  Freight: ["รถบรรทุก", icon2],
  Bus: ["รถตู้", icon3],
  Sedan: ["รถเก๋ง", icon1],
}

function BuyInsurance() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState([])

  const handleCardClick = (path, vehCode) => {
    // /car-info
    navigate(path,
      {
        state: {
          vehicleCode: vehCode}
      }
    );
  };

  // * request available vehicle type
  async function requestVehType() {
    try {
        const response = await axios.post(`${baseURL}/option/cmivehicletype`);
        if (response) {
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
    <div className="layout-wrapper">
      <ProgressBar type="act" />  
      <PageTitle
        title="ประเภทรถของคุณคือ?"
        description="เฉพาะรถยนต์ส่วนบุคคลเท่านั้น และมีผลในการต่อภาษีประจำปี"
      />

      {/* // * map vehicle type */}
      <div className="container-card">
      {vehicleType.length !== 0 && vehicleType.map((type, index) => (
        <CarCard
            key={type.VehicleCode || index}
            image={mapVehType[type.VehicleType][1]}
            title={mapVehType[type.VehicleType][0]} 
            // discount="645"
            price="499" // original price
            onClick={() => handleCardClick("/car-info", type.VehicleCode)}
        />
      ))}
      </div>

      {/* <div className="container-card">
        <CarCard
          image={icon1}
          title="รถเก๋ง"
          discount="645"
          price="499"
          onClick={() => handleCardClick("/car-info")}
        />
        <CarCard
          image={icon2}
          title="รถบรรทุก"
          discount="800"
          price="750"
          onClick={() => handleCardClick("/truck-info")}
        />
        <CarCard
          image={icon3}
          title="รถตู้"
          discount="900"
          price="888"
          onClick={() => handleCardClick("/van-info")}
        />
        <CarCard
          image={icon4}
          title="รถกระบะ 2 ประตู"
          discount="980"
          price="960"
          onClick={() => handleCardClick("/pickup-info")}
        />
        <CarCard
          image={icon5}
          title="รถจักรยานยนต์"
          discount="645"
          price="499"
          onClick={() => handleCardClick("/motorbike-info")}
        />
      </div> */}
    </div>
  );
}

export default BuyInsurance;
