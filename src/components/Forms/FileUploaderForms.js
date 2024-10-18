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
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../App.js";


function TaxPaymentForms() {
  const navigate = useNavigate();
  // * get from previous page
  const location = useLocation();
  const { inputData } = location.state || {};

  console.log(inputData);

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

  
  const handleFileChange = (e) => {
    const { name, value } = e.target;

    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
        const reader = new FileReader();

        // Handle the file as a Data URL (for image preview)
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === 'string') {
                // Optionally, you can call an update function if needed
                setFormData({
                  ...formData,
                  [name]: reader.result,
                });
            }
        };
    reader.readAsDataURL(file);
    setErrors({ ...errors, [name]: false });    
    }
  };

  // const handleUpload = async () => {
  //   if (file) {
  //     console.log("Uploading file:", file);
  //     // เพิ่มโค้ดการอัปโหลดที่นี่
  //     await updateSlipPayment()
  //     // หลังจากอัปโหลดเสร็จแล้ว นำทางไปยังหน้าเอกสารกรมธรรม์
  //     // navigate("/document-page");
  //   } else {
  //     alert("กรุณาเลือกไฟล์ก่อน");
  //   }
  // };

  const handleSubmit = () => {
    const { registrationBook, inspectionCertificate, vehicleTax } = formData;

    const newErrors = {
      registrationBook: !registrationBook,
      inspectionCertificate: !inspectionCertificate,
      vehicleTax: !vehicleTax,
    };

    setErrors(newErrors);
    console.log("ข้อมูลปัจจุบันของฟอร์ม:", formData);

    if (
      !newErrors.registrationBook &&
      !newErrors.inspectionCertificate &&
      !newErrors.vehicleTax
    ) {
      console.log("ข้อมูลที่ส่ง:", formData);
      // ทำการส่งข้อมูลที่นี่
      requestCreateResult()
      // navigate("/payment-page");
    }
  };

  // * create tax result
  async function requestCreateResult() {
    try {
        const response = await axios.post(`${baseURL}/tax/create`, {
            ...inputData,
            ...formData
        }, { withCredentials: true })

        console.log("pass: ", response);
        if (response.data.status === "success") {
            // * check whether the user is already login
            if (!response.data.validUser) {
                // * go to auth page
                navigate('/login-page');
            } else {
                // * proceed to next step
                navigate("/payment-page")
            }
        }
    } catch (error) {
        console.log("error: ", error )
    }
}

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
            onChange={handleFileChange} // ใช้ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.registrationBook} // ข้อผิดพลาดสำหรับ registrationBook
            fullWidth
            helperText={errors.registrationBook ? "กรุณาอัปโหลดเอกสาร" : ""}
            accept=".png, .jpg, .jpeg"
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
            onChange={handleFileChange} // ใช้ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.inspectionCertificate} // ข้อผิดพลาดสำหรับ inspectionCertificate
            fullWidth
            helperText={
              errors.inspectionCertificate ? "กรุณาอัปโหลดเอกสาร" : ""
            }
            accept=".png, .jpg, .jpeg"
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
            onChange={handleFileChange} // ใช้ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.vehicleTax} // ข้อผิดพลาดสำหรับ vehicleTax
            fullWidth
            helperText={errors.vehicleTax ? "กรุณาอัปโหลดเอกสาร" : ""}
            accept=".png, .jpg, .jpeg"
            InputLabelProps={{
              shrink: true, // ทำให้ label อยู่ด้านบน
            }}
          />
        </ResponsiveStack>
      </FormContainer>

      <StickyFooter>
        <Buttons onClick={handleSubmit} variant="primary" label="บันทึก" />
      </StickyFooter>
    </div>
  );
}

export default TaxPaymentForms;
