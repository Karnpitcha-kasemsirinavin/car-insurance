import React, { useEffect } from 'react';
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

import axios from 'axios';
import { baseURL } from '../../AuthContext';
import { useState } from 'react';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

// * map details for vehicle type display
const mapVehType = {
  Motorcycle: ["รถจักรยานยนต์", icon5],
  Freight: ["รถบรรทุก", icon2],
  Bus: ["รถตู้", icon3],
  Sedan: ["รถเก๋ง", icon1],
}

function InsurancePageTaxAndLaw() {
  const navigate = useNavigate();
  const [vehicletypeCMI, setVehicletypeCMI] = useState([]);
  const [vehicletypeTax, setVehicletypeTax] = useState([]);
  const [validvehType, setValidVehType] = useState([]);
  
  async function requestVehType() {
    let taxVehType = [];
    let CMIVehType = [];

    // * request vehicel type for CMI
    try {
        const response = await axios.post(`${baseURL}/option/cmiNtaxvehicletype`);
        if (response.data.status === "success") {
          const data = response.data.data
          setVehicletypeCMI(data.CMIVehType);
          setVehicletypeTax(data.TaxVehType);
          setValidVehType(data.ValidVehType);
        }
    } catch (error) {
      // ! error
      console.log("error: ", error);
    }
    
}

  const handleCardClick = (path, vehType) => {
    // * map vehicle code for CMI
    const matchingVehicle = vehicletypeTax.find(vehicle => 
      vehicle.VehicleType === vehType.VehicleType );

    navigate(path, {
      state: {
        vehicleCode: vehType.VehicleCode,
        TaxVeh: matchingVehicle
      }
    }); 
  };

  useEffect(() => {
    requestVehType();
  }, [])

  return (
    <div className="layout-wrapper">
      <ProgressBar type="act&tax" />  
      <PageTitle
        title="ประเภทรถของคุณคือ?"
        description="เฉพาะรถยนต์ส่วนบุคคลเท่านั้น และมีผลในการต่อภาษีประจำปี"
      />

      <div className="container-card">
      {validvehType.length !== 0 && validvehType.map((type, index) => (
        <CarCard
            key={type.VehicleCode || index}
            image={mapVehType[type.VehicleType][1]}
            title={mapVehType[type.VehicleType][0] + ` ${type.VehicleCode}`} 
            // discount="645"
            price="499" // original price
            onClick={() => handleCardClick("/carInfo-page-taxAndLaw", type)}
        />
      ))}
        {/* <CarCard
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
        /> */}
      </div>
    </div>
  );
}

export default InsurancePageTaxAndLaw;
