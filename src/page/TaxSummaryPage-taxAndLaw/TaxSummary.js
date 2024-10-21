import React from "react";
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

function TaxSummary() {
  const navigate = useNavigate(); // เรียกใช้ useNavigate
  const carData = [
    { label: "รถยนต์เก๋ง", value: "3 ปี", iconClass: "fa-car" },
    { label: "รถกระบะ", value: "2 ปี", iconClass: "fa-truck" },
  ];

  const productPrice = [
    { label: "ราคาต้น", value: "2,900 บาท", iconClass: "fa-tag" },
    {
      label: "ราคาหลังส่วนลด",
      value: "2,900 บาท",
      iconClass: "fa-dollar-sign",
    },
  ];
  const lateFees = [
    { label: "จำนวนเดือนค่าปรับ", value: "20 เดือน", iconClass: "fa-clock" }, // ตัวอย่างไอคอน
    { label: "ค่าปรับทั้งหมด", value: "580 บาท", iconClass: "fa-money-bill" }, // ตัวอย่างไอคอน
    {
      label: "ราคาค่าปรับเพิ่ม",
      value: "3,480 บาท",
      iconClass: "fa-plus-circle",
    }, // ตัวอย่างไอคอน
  ];

  const ServiceShippingCosts = [
    { label: "ค่าบริการ", value: "30 บาท", iconClass: "fa-cogs" }, // ตัวอย่างไอคอน
    { label: "ค่าจัดส่ง", value: "32 บาท", iconClass: "fa-truck" }, // ตัวอย่างไอคอน
    { label: "ราคาค่าจัดส่ง", value: "3,542 บาท", iconClass: "fa-tag" }, // ตัวอย่างไอคอน
  ];
  const Holiday = [
    { label: "ราคาวันหยุด", value: "3,480 บาท", iconClass: "fa-calendar" }, // ตัวอย่างไอคอน
    { label: "จำนวนวันหยุด", value: "0 วัน", iconClass: "fa-calendar-check" }, // ตัวอย่างไอคอน
  ];
  const TimeBasedPricing = [
    {
      label: "การเพิ่มเวลาในการคิดราคา",
      value: "30 บาท",
      iconClass: "fa-clock",
    }, // ตัวอย่างไอคอน
    { label: "ราคาคิดเวลารวม", value: "3,510 บาท", iconClass: "fa-money-bill" }, // ตัวอย่างไอคอน
    { label: "จำนวนวันในการคิดเวลา", value: "0 วัน", iconClass: "fa-calendar" }, // ตัวอย่างไอคอน
  ];
  const handlePurchaseClick = () => {
    navigate('/payment-page'); // นำผู้ใช้ไปยังหน้าชำระเงิน
  };
  return (
    <div>
      <HandleBack /> {/* ปุ่มย้อนกลับ */}
      <div className="layout-wrapper customize">
        <ProgressBar type="act&tax" />{" "}
        {/* Bar บอกขั้นตอนว่าอยู่ไหน ประเภท ข้อมูลที่แสดงคือ พรบ */}
        <TaxTitle
          iconClass="fas fa-calculator"
          title="สรุปผลลัพธ์การคำนวณภาษี"
        />
        <TaxConten title="ข้อมูลเกี่ยวกับรถ" data={carData} />
        <TaxConten title="ราคาสินค้า" data={productPrice} />
        <TaxConten title="ค่าปรับ" data={lateFees} />
        <TaxConten title="ค่าบริการและค่าจัดส่ง" data={ServiceShippingCosts} />
        <TaxConten title="ข้อมูลวันหยุดและการคิดราคา" data={Holiday} />
        <TaxConten title="การคิดราคาตามเวลา" data={TimeBasedPricing} />
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
            <TaxIncluded totalPrice="3,542 บาท" />

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
