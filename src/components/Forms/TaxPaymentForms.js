/*ของ React */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/*material Ui*/
import { Stack, useMediaQuery, Autocomplete, TextField } from "@mui/material";

/*เเสดงผลฟอร์ม ui*/
import FormContainer from "./FormContainer.js"; /* โครงสร้างฟอร์ม */
import MainTitle from "./MainTitleTypography.js"; /* หัวข้อหลัก */
import SectionTitle from "./SectionTitleTypography.js"; /* หัวข้อรอง */

/*เเสดงปุ่มกด ui*/
import Buttons from "../Buttons/Buttons.js";
import StickyFooter from "../StickyFooter/StickyFooter.js";

// นำเข้า SelectField คอมโพเนนต์เพื่อใช้ในการแสดงฟิลด์แบบเลือก (dropdown)
// ซึ่งสามารถกำหนดตัวเลือก, จัดการค่า, แสดงข้อผิดพลาด และรองรับสถานะ disabled ได้
import SelectField from "./SelectField";

import ResponsiveStack from "./ResponsiveStack.js";

function TaxPaymentForms() {
  const [formData, setFormData] = useState({
    engineCapacity: "",
    registrationDate: "",
    lastPaidYear: "",
    paymentDate: "",
    paymentTime: "",
    deliveryType: "",
    registrationBook: null,
    inspectionCertificate: null,
    vehicleTax: null,
  });

  const [errors, setErrors] = useState({
    engineCapacity: false,
    registrationDate: false,
    lastPaidYear: false,
    paymentDate: false,
    paymentTime: false,
    deliveryType: false,
    registrationBook: false,
    inspectionCertificate: false,
    vehicleTax: false,
  });

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:536px)");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (value) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = () => {
    const {
      engineCapacity,
      registrationDate,
      lastPaidYear,
      paymentDate,
      paymentTime,
      deliveryType,
      registrationBook,
      inspectionCertificate,
      vehicleTax,
    } = formData;

    const newErrors = {
      engineCapacity: !engineCapacity,
      registrationDate: !registrationDate,
      lastPaidYear: !lastPaidYear,
      paymentDate: !paymentDate,
      paymentTime: !paymentTime,
      deliveryType: !deliveryType,
      registrationBook: !registrationBook,
      inspectionCertificate: !inspectionCertificate,
      vehicleTax: !vehicleTax,
    };
    setErrors(newErrors);
    console.log("ข้อมูลปัจจุบันของฟอร์ม:", formData); // ตรวจสอบข้อมูลทุกครั้งที่คลิก
    if (
      !newErrors.engineCapacity &&
      !newErrors.registrationDate &&
      !newErrors.lastPaidYear &&
      !newErrors.paymentDate &&
      !newErrors.paymentTime &&
      !newErrors.deliveryType &&
      !newErrors.registrationBook &&
      !newErrors.inspectionCertificate &&
      !newErrors.vehicleTax
    ) {
      console.log("ข้อมูลที่ส่ง:", formData);
      // ทำการส่งข้อมูลที่นี่

      navigate("/payment-page");
    }
  };
  const handleGoTo = () => {
    navigate("/tax-summary"); // นำทางไปหน้าอื่น
  };
  
  return (
    <div>
      <MainTitle text="ข้อมูลการชำระภาษี" />

      <FormContainer>
        <SectionTitle text="ข้อมูลเครื่องยนต์" iconClass="fa-solid fa-car" />
        <ResponsiveStack>
          <TextField
            label="ความจุกระบอกสูบ (ซีซี)"
            name="engineCapacity"
            value={formData.engineCapacity}
            onChange={handleChange}
            error={errors.engineCapacity}
            fullWidth
            helperText={
              errors.engineCapacity
                ? !formData.engineCapacity
                  ? "กรุณากรอกความจุกระบอกสูบ"
                  : "กรุณากรอกความจุกระบอกสูบในรูปแบบที่ถูกต้อง"
                : "" // ไม่มีข้อผิดพลาด
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
          ></TextField>
        </ResponsiveStack>
        <SectionTitle
          text="ปีล่าสุดที่ชำระภาษี"
          iconClass="fa-solid fa-calendar-check"
        />
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="วันที่จดทะเบียน"
            type="date" // กำหนดประเภทเป็นวันที่
            name="registrationDate" // ชื่อฟิลด์
            value={formData.registrationDate} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.registrationDate} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.registrationDate ? "กรุณากรอกวันที่จดทะเบียน" : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="ปีล่าสุดที่จ่าย"
            type="date" // กำหนดประเภทเป็นวันที่
            name="lastPaidYear" // ชื่อฟิลด์
            value={formData.lastPaidYear} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.lastPaidYear} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={errors.lastPaidYear ? "กรุณากรอกปีล่าสุดที่จ่าย" : ""} // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </ResponsiveStack>

        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="วันที่ต้องการทําการจ่ายภาษี"
            type="date" // กำหนดประเภทเป็นวันที่
            name="paymentDate" // ชื่อฟิลด์
            value={formData.paymentDate} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.paymentDate} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.paymentDate ? "กรุณากรอกวันที่ต้องการทําการจ่ายภาษี" : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            label="เวลาที่ต้องการทําการ"
            type="time" // กำหนดประเภทเป็นเวลา
            name="paymentTime" // ชื่อฟิลด์ (เปลี่ยนเป็น "paymentTime" เพื่อชัดเจนว่าเป็นเวลา)
            value={formData.paymentTime} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.paymentTime} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.paymentTime ? "กรุณากรอกเวลาที่ต้องการทําการ" : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </ResponsiveStack>
        <SectionTitle text="การจัดส่ง" iconClass="fa-solid fa-truck-fast" />
        <ResponsiveStack>
          <TextField
            label="สมุดคู่มือจดทะเบียนรถ (ฉบับจริง หรือสำเนาก็ได้)"
            type="file"
            name="registrationBook" // เปลี่ยนชื่อฟิลด์เป็น registrationBook
            onChange={handleChange} // ใช้ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.registrationBook} // ข้อผิดพลาดสำหรับ registrationBook
            fullWidth
            helperText={errors.registrationBook ? "กรุณาอัปโหลดเอกสาร" : ""}
            InputLabelProps={{
              shrink: true, // ทำให้ label อยู่ด้านบน
            }}
          />
        </ResponsiveStack>

        <ResponsiveStack>
          <TextField
            label="หนังสือรับรองการตรวจสภาพรถ"
            type="file"
            name="inspectionCertificate" // เปลี่ยนชื่อฟิลด์เป็น inspectionCertificate
            onChange={handleChange} // ใช้ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.inspectionCertificate} // ข้อผิดพลาดสำหรับ inspectionCertificate
            fullWidth
            helperText={
              errors.inspectionCertificate ? "กรุณาอัปโหลดเอกสาร" : ""
            }
            InputLabelProps={{
              shrink: true, // ทำให้ label อยู่ด้านบน
            }}
          />
        </ResponsiveStack>

        <ResponsiveStack>
          <TextField
            label="ใบภาษีรถยนต์"
            type="file"
            name="vehicleTax" // เปลี่ยนชื่อฟิลด์เป็น vehicleTax
            onChange={handleChange} // ใช้ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.vehicleTax} // ข้อผิดพลาดสำหรับ vehicleTax
            fullWidth
            helperText={errors.vehicleTax ? "กรุณาอัปโหลดเอกสาร" : ""}
            InputLabelProps={{
              shrink: true, // ทำให้ label อยู่ด้านบน
            }}
          />
        </ResponsiveStack>
      </FormContainer>

      <StickyFooter>
        <Buttons onClick={handleGoTo} variant="primary" label="บันทึก" />
      </StickyFooter>
    </div>
  );
}

export default TaxPaymentForms;
