import React, { useEffect, useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ */
import TaxTitle from "./TaxTitle";
import TaxConten from "./TaxConten";
import TaxIncluded from "./TaxIncluded"; // นำเข้า TaxIncluded
import { useNavigate } from 'react-router-dom'; // สำหรับการนำทางใน React Router v6
/*เเสดงปุ่มกด ui*/
import Buttons from "../../components/Buttons/Buttons.js";
import StickyFooter from "../../components/StickyFooter/StickyFooter.js";

import { baseURL } from "../../App.js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const mapVehType = {
  Freight: ["รถบรรทุก"],
  Bus: ["รถตู้"],
  Sedan: ["รถเก๋ง"],
}

function TaxSummary() {
  const navigate = useNavigate();
  // * get from previous page
  const location = useLocation();
  const { inputData, displayVeh } = location.state || {};


  const [result, setResult] = useState({});

  const carData = [
    { label: `${mapVehType[displayVeh] ?? "ไม่ทราบ"} `, value: `${result.VehicleAge?? "ไม่ทราบ"}  ปี`, iconClass: "fa-car" },
  ];

  const productPrice = [
    { label: "ราคาต้น", 
      value: `${result.OriginalPrice ?? "ไม่ทราบ"} บาท`, 
      iconClass: "fa-tag" },
    {
      label: "ส่วนลด %",
      value: `${result.DiscountPercent ?? "ไม่ทราบ"} %`,
      iconClass: "fa-dollar-sign",
    },
    {
      label: "ส่วนลด",
      value: `${result.Discount ?? "ไม่ทราบ"} บาท`,
      iconClass: "fa-dollar-sign",
    },
    {
      label: "ราคาหลังส่วนลด",
      value: `${result.DiscountedPrice ?? "ไม่ทราบ"} บาท`,
      iconClass: "fa-dollar-sign",
    },
  ];
  const lateFees = [
    { label: "จำนวนเดือนค่าปรับ", 
      value: `${result.FineMonths ?? "ไม่ทราบ"} เดือน`, 
      iconClass: "fa-clock" },
    { label: "ค่าปรับทั้งหมด", 
      value: `${result.Fine ?? "ไม่ทราบ"} บาท`, 
      iconClass: "fa-money-bill" },
    {
      label: "ราคาหลังเพิ่มค่าปรับ",
      value: `${(result.DiscountedPrice + result.Fine) ?? "ไม่ทราบ"} บาท`,
      iconClass: "fa-plus-circle",
    }, 
  ];

  const ServiceShippingCosts = [
    { label: "ค่าบริการทั้งหมด", 
      value: `${(result.TotalPrice) ?? "ไม่ทราบ"} บาท`, 
      iconClass: "fa-cogs" 
    },
    { label: "ค่าแพ็คเกจและบริการทั้งหมด", 
      value: `${(result.TotalService) ?? "ไม่ทราบ"} บาท`, 
      iconClass: "fa-cogs" 
    },
    // { label: "ค่าจัดส่ง", value: "32 บาท", iconClass: "fa-truck" },
    // { label: "ราคาค่าจัดส่ง", value: "3,542 บาท", iconClass: "fa-tag" },
  ];
  const Holiday = [
    { label: "ราคาเนื่องจากวันหยุด", 
      value: `${(result.IssuedHolidayAddition) ?? "ไม่ทราบ"} บาท`, 
      iconClass: "fa-calendar" },
    { label: "จำนวนวันหยุด", 
      value: `${(result.IssuedHolidayDays) ?? "ไม่ทราบ"} วัน`, 
      iconClass: "fa-calendar-check" },
  ];
  const TimeBasedPricing = [
    {
      label: "ราคาเนื่องจากเวลาทำการ",
      value: `${(result.IssuedTimeAddition) ?? "ไม่ทราบ"} บาท`, 
      iconClass: "fa-clock",
    }, // ตัวอย่างไอคอน
    { label: "จำนวนวันในที่เกิดจากเวลาทำการ", 
      value: `${(result.IssuedTimeDays) ?? "ไม่ทราบ"} วัน`,
      iconClass: "fa-calendar" },
  ];

  async function requestCalculation(inputData) {
    try {
        const response = await axios.post(`${baseURL}/tax/calc`,
            inputData
        );
        if (response) {
            console.log(response.data);
            setResult(response.data)
        }
    } catch (error) {
        console.log("error: ", error)
    }
  }
  

  useEffect(() => {
    requestCalculation(inputData);
  }, [])

  // * naviagte to upload page
  const handlePurchaseClick = () => {
    navigate("/fileUploader-Page", {
      state: {
        inputData: {...inputData, ...result}
      }
    })
  };


  return (
    <div>
      <HandleBack /> {/* ปุ่มย้อนกลับ */}
      <div className="layout-wrapper customize">
        <ProgressBar type="tax" />{" "}
        {/* Bar บอกขั้นตอนว่าอยู่ไหน ประเภท ข้อมูลที่แสดงคือ พรบ */}
        <TaxTitle
          iconClass="fas fa-calculator"
          title="สรุปผลลัพธ์การคำนวณภาษี"
        />
        <TaxConten title="ข้อมูลเกี่ยวกับรถ" data={carData} />
        <TaxConten title="ราคาสินค้า" data={productPrice} />
        <TaxConten title="ค่าปรับ" data={lateFees} />
        <TaxConten title="ข้อมูลวันหยุดและการคิดราคา" data={Holiday} />
        <TaxConten title="การคิดราคาตามเวลา" data={TimeBasedPricing} />
        <TaxConten title="ค่าบริการ" data={ServiceShippingCosts} />
        <StickyFooter backgroundColor="#3FABD9">
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "720px",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <TaxIncluded totalPrice={`${(result.TotalPrice) ?? "ไม่ทราบ"} บาท`} />

            <Buttons
              label="ซื้อเลย"
              variant="accent"
              height="50px"
              fontSize="23px"
              width="166px"
              onClick={handlePurchaseClick}
            />
          </div>
        </StickyFooter>
      </div>
    </div>
  );
  
}

export default TaxSummary;
