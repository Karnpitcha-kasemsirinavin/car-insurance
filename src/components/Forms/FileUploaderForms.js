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
import SelectField from "./SelectField.js";

import ResponsiveStack from "./ResponsiveStack.js";

function TaxPaymentForms() {
  const [formData, setFormData] = useState({
    registrationBook: null,
    inspectionCertificate: null,
    vehicleTax: null,
  });

  const [errors, setErrors] = useState({
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
    const { registrationBook, inspectionCertificate, vehicleTax } = formData;

    const newErrors = {
      registrationBook: !registrationBook,
      inspectionCertificate: !inspectionCertificate,
      vehicleTax: !vehicleTax,
    };
    setErrors(newErrors);
    console.log("ข้อมูลปัจจุบันของฟอร์ม:", formData); // ตรวจสอบข้อมูลทุกครั้งที่คลิก
    if (
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
        <SectionTitle
          text="อัปโหลดเอกสาร"
          iconClass="fa-solid fa-folder-arrow-up"
        />
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
