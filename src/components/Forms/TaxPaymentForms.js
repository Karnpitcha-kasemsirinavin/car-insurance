/*ของ React */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/*material Ui*/
import { Stack, useMediaQuery, Autocomplete, TextField, Card } from "@mui/material";

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
import axios from "axios";
import { baseURL } from "../../AuthContext.js";
import { useEffect } from "react";

function TaxPaymentForms() {
  // * get from previous page
  const location = useLocation();
  const { vehicleCode, displayVeh, CMINTax, CarData } = location.state || {};

  const [formData, setFormData] = useState({
    Manufacturer: "",
    Model: "",

    RegistrationFt: "",
    RegistrationSd: "", 

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
      Manufacturer,
      Model,

      PlateType,
      RegistrationFt,
      RegistrationSd, 
      
      value,
      RegisteredYear,
      DocumentYear,
      IssuedDate,
      IssuedTime,
    } = formData;

    // phone number
    const numberRegex = /^[0-9]+$/;

    const newErrors = {
      Manufacturer: !Manufacturer,
      Model: !Model,

      RegistrationFt: !RegistrationFt,
      RegistrationSd: !RegistrationSd, 
      
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

      if (!CMINTax) {
        // * flow 2: Tax
        // * send data with it
        navigate("/tax-summary", {
        state: {
          inputData: {...formData, vehiclecode: vehicleCode},
          displayVeh: displayVeh
        }
        });
      } else {
        // * flow 3: CMINTax
        navigate("/tax-Summary-page-taxAndLaw", {
          state: {
            inputData: {...formData, vehiclecode: vehicleCode},
            displayVeh: displayVeh,
            CMINTax: CMINTax
          }
          });
      }
      
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

  // * request options ===================================================================
  
  // * request vehicle manufacturer and model
  const [Brand, setBrand] = useState({})
  const [manufacturer, setManufacturer] = useState([])
  async function requestVehBrand() {
    // vehiclebrand
    try {
      const response = await axios.post(`${baseURL}/option/vehiclebrand`, {
        Manufacturer: null,
        Model: null
      });
      if (response) {
        setBrand(response.data)
        setManufacturer(Object.keys(response.data).map(manu => manu))
        // console.log(response.data)
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  // * request province
  const [province, setProvince] = useState([])
  async function requestProvince() {
    try {
      const response = await axios.post(`${baseURL}/option/vehprovince`);
      if (response) {
        const tempProvince = response.data.data.map(province => province.value);
        setProvince(tempProvince);
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    requestVehBrand();
    requestProvince();

    // Check valid value
    if (CarData) {
      formData.Manufacturer = CarData.Manufacturer;
      formData.Model = CarData.Model;
      formData.RegistrationFt = CarData.RegistrationFt;
      formData.RegistrationSd = CarData.RegistrationSd;
    }
  }, [])

  console.log("CarData: ", CarData)

  return (
    <div>
      <MainTitle text="ข้อมูลการชำระภาษี" />

      <FormContainer>
        <SectionTitle text="ข้อมูลรถยนต์" iconClass="fa-solid fa-car" />
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <SelectField
            label="ยี่ห้อรถยนต์"
            name="Manufacturer"
            value={CarData ? CarData.Manufacturer : formData.Manufacturer}
            disabled={Boolean(CarData)}
            onChange={handleChange}
            options={manufacturer}
            error={errors.Manufacturer}
          />
          <SelectField
            label="รุ่นรถยนต์"
            name="Model"
            value={CarData ? CarData.Model : formData.Model}
            disabled={CarData ? true : !formData.Manufacturer}
            onChange={handleChange}
            options={Brand[formData.Manufacturer] || []}
            error={errors.Model}
          />
        </ResponsiveStack>

        <SectionTitle text=" ทะเบียนรถยนต์" iconClass="fa fa-id-card" />

        {/* เเถวที่3 */}
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="เลขทะเบียนรถ"
            name="RegistrationFt" // ตั้งชื่อฟิลด์ที่เก็บใน state
            value={CarData ? CarData.RegistrationFt : formData.RegistrationFt} // ค่าของฟิลด์ที่เก็บใน state
            disabled={Boolean(CarData)}
            onChange={handleChange} // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลง
            variant="outlined"
            fullWidth
            inputProps={{
              maxLength: 2
            }}
            error={errors.RegistrationFt} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.RegistrationFt
                ? !formData.RegistrationFt
                  ? "กรุณากรอก เลขทะเบียนรถ"
                  : "กรุณากรอกเลขทะเบียนรถ (ในรูปแบบที่ถูกต้อง)"
                : "" // ไม่มีข้อผิดพลาด
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
          />
          <TextField
            label="เลขทะเบียนรถ (กลุ่มที่ 2)"
            name="RegistrationSd" // ตั้งชื่อฟิลด์ที่เก็บใน state
            value={CarData ? CarData.RegistrationSd : formData.RegistrationSd} // ค่าของฟิลด์ที่เก็บใน state
            disabled={Boolean(CarData)}
            onChange={handleChange} // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลง
            variant="outlined"
            fullWidth
            error={errors.RegistrationSd} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.RegistrationSd
                ? !formData.RegistrationSd
                  ? "กรุณากรอกเลขทะเบียนรถ (กลุ่มที่ 2)"
                  : "กรุณากรอกเลขทะเบียนรถ (ในรูปแบบที่ถูกต้อง)"
                : "" // ไม่มีข้อผิดพลาด
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            inputProps={{
              maxLength: 4
            }}
          />
        </ResponsiveStack>
        <ResponsiveStack>
          <SelectField
            label="จัดหวัดที่จดทะเบียน"
            name="RegisteredProvCd"
            value={CarData ? CarData.RegisteredProvCd : formData.RegisteredProvCd} 
            disabled={Boolean(CarData)}
            onChange={handleChange}
            options={province || []} 
            error={errors.RegisteredProvCd} 
          />
        </ResponsiveStack>

        <SectionTitle text="ข้อมูลเครื่องยนต์" iconClass="fa-solid fa-car" />
        <ResponsiveStack>
          <TextField
            label={(vehicleCode === '610' || vehicleCode === '110') 
              ? "ความจุกระบอกสูบ (CC)": "น้ำหนักรถยนต์ (KG)"}
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
