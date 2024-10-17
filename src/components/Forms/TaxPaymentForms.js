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
import { useLocation } from "react-router-dom";

function TaxPaymentForms() {
  // * get from previous page
  const location = useLocation();
  const { vehicleCode, displayVeh } = location.state || {};

  const [formData, setFormData] = useState({
    value: "",
    RegisteredYear: "",
    DocumentYear: "",
    IssuedDate: "",
    IssuedTime: "",
    deliveryType: "",
    registrationBook: null,
    inspectionCertificate: null,
    vehicleTax: null,
  });

  const [errors, setErrors] = useState({
    value: false,
    RegisteredYear: false,
    DocumentYear: false,
    IssuedDate: false,
    IssuedTime: false,
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

  // * handle submit form
  const handleSubmit = () => {
    const {
      value,
      RegisteredYear,
      DocumentYear,
      IssuedDate,
      IssuedTime,
    } = formData;

    // phone number
    const numberRegex = /^[0-9]+$/;

    const newErrors = {
      value: !value || !numberRegex.test(value),
      RegisteredYear: !RegisteredYear || !validateDatesStart(RegisteredYear),
      DocumentYear: !DocumentYear || !validateDatesStart(DocumentYear),
      IssuedDate: !IssuedDate || !validateAfterToday(IssuedDate),
      IssuedTime: !IssuedTime,

      checkDate: true,
    };

    // * check date
    if (RegisteredYear && DocumentYear) {
      newErrors.checkDate = !validateDocumentNRegistered(DocumentYear, RegisteredYear);
    }

    setErrors(newErrors);
    console.log("ข้อมูลปัจจุบันของฟอร์ม:", formData);
    if (Object.values(newErrors).every(value => value === false)) {
      console.log("ข้อมูลที่ส่ง:", formData);
      // ทำการส่งข้อมูลที่นี่

      // * send data with it
      navigate("/tax-summary", {
        state: {
          inputData: {...formData, vehiclecode: vehicleCode},
          displayVeh: displayVeh
        }
      });
    }
  };

  // const handleGoTo = () => {
  //   navigate("/fileUploader-Page"); // นำทางไปหน้าอื่น
  // };

  // * check before today
  function validateDatesStart(date) {
    if (!date) {
      return true;
    }
    const start = new Date(date);
    const today = new Date();
    // Set the time of 'today' to midnight for accurate comparisons
    today.setHours(0, 0, 0, 0);

    const isStartDateValid = start < today;
    return isStartDateValid;
  }

  // * check after today
  function validateAfterToday(date) {
    if (!date) {
      return true;
    }
    const start = new Date(date);
    const today = new Date();
    // Set the time of 'today' to midnight for accurate comparisons
    today.setHours(0, 0, 0, 0);

    const isStartDateValid = start >= today;
    return isStartDateValid;
  }

  // * check before last DocumentYear after RegisteredYear
  function validateDocumentNRegistered(documentYear, registeredYear) {
    const start = new Date(registeredYear);
    const lastDate = new Date(documentYear);
    // Set the time of 'today' to midnight for accurate comparisons
    lastDate.setHours(0, 0, 0, 0);

    const isStartDateValid = start <= lastDate;
    console.log(isStartDateValid);
    return isStartDateValid;
  }

  return (
    <div>
      <MainTitle text="ข้อมูลการชำระภาษี" />

      <FormContainer>
        <SectionTitle text="ข้อมูลเครื่องยนต์" iconClass="fa-solid fa-car" />
        <ResponsiveStack>
          <TextField
            label="ความจุกระบอกสูบ (CC)"
            name="value"
            value={formData.value}
            onChange={handleChange}
            error={errors.value}
            fullWidth
            helperText={
              errors.value
                ? !formData.value
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
            name="RegisteredYear" // ชื่อฟิลด์
            value={formData.RegisteredYear} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.RegisteredYear} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.RegisteredYear 
              ? !formData.RegisteredYear
              ? "กรุณากรอกวันที่จดทะเบียน" 
              : "กรุณากรอกวันที่จดทะเบียนในรูปแบบที่ถูกต้อง" 
              : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="ปีล่าสุดที่จ่าย"
            type="date" // กำหนดประเภทเป็นวันที่
            name="DocumentYear" // ชื่อฟิลด์
            value={formData.DocumentYear} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.DocumentYear} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={errors.DocumentYear ? "กรุณากรอกปีล่าสุดที่จ่าย" : ""} // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
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
            name="IssuedDate" // ชื่อฟิลด์
            value={formData.IssuedDate} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.IssuedDate} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.IssuedDate ? "กรุณากรอกวันที่ต้องการทําการจ่ายภาษี" : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            label="เวลาที่ต้องการทําการ"
            type="time" // กำหนดประเภทเป็นเวลา
            name="IssuedTime" // ชื่อฟิลด์ (เปลี่ยนเป็น "IssuedTime" เพื่อชัดเจนว่าเป็นเวลา)
            value={formData.IssuedTime} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.IssuedTime} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.IssuedTime ? "กรุณากรอกเวลาที่ต้องการทําการ" : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </ResponsiveStack>
      </FormContainer>

      <StickyFooter>
        <Buttons onClick={handleSubmit} variant="primary" label="คำนวณ" />
      </StickyFooter>
    </div>
  );
}

export default TaxPaymentForms;
