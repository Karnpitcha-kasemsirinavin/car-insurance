/*ของ React */
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { baseURL } from "../../App.js";
import { type } from "@testing-library/user-event/dist/type/index.js";
import { IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function PolicyOwnerForms() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:536px)"); // ตรวจสอบขนาดหน้าจอ

  // * get from previous page
  const location = useLocation();
  const { inputData, TaxVeh } = location.state || {};
  // * nedd to be request according to each other
  const requestFields = ["SubDistrict", "District", "Province", "PostalCode"]
  // * assign value from input fields
  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (value) {
      setErrors({ ...errors, [name]: false });
    }

  };

  // * handle Submit form
  const handleSubmit = async () => {
    const {
      InsuredTitle,
      InsuredName,
      InsuredSurname,
      BirthDt,
      PhoneNumber,

      InsuredType,
      IDType,
      InsuredUniqueID,
      InsuredUniqueIDExpDt,

      Addr,
      PostalCode,
      Province,
      District,
      SubDistrict,
    } = formData;

    //  * correction and test
    // name and surname
    const nameRegex = /^[ก-ฮA-Za-z]+$/;
    // 13-digit id card
    const idCardNumberRegex = /^\d{13}$/;
    // phone number
    const phoneNumberRegex = /^[0-9]{10}$/;

    // * requirement of fields
    const newErrors = {
      InsuredTitle: !InsuredTitle,
      InsuredName: !InsuredName || !nameRegex.test(InsuredName),
      InsuredSurname: !InsuredSurname || !nameRegex.test(InsuredSurname),
      BirthDt: !BirthDt || validateBeforeToday(BirthDt),
      PhoneNumber: !PhoneNumber || !phoneNumberRegex.test(PhoneNumber),

      InsuredType: !InsuredType,
      IDType: !IDType,
      InsuredUniqueID: !InsuredUniqueID || !idCardNumberRegex.test(InsuredUniqueID),
      InsuredUniqueIDExpDt: !InsuredUniqueIDExpDt || validateAfterOrToday(InsuredUniqueIDExpDt),

      Addr: !Addr,
      PostalCode: !PostalCode,
      Province: !Province,
      District: !District,
      SubDistrict:!SubDistrict
    };

    setErrors(newErrors);
    console.log(newErrors)
    
    // * no Error
    if (Object.values(newErrors).every(value => value === false)) {
      console.log("ข้อมูลที่ส่ง:", formData);
      // * ทำการส่งข้อมูลที่นี่

      if (!TaxVeh) {
        // * flow 1: CMI
        // check user
        const isUserValid = await requestDocument();
        console.log(isUserValid);
        if (!isUserValid) {
          navigate("/login-page");
        }
        navigate("/payment-page");
      } else {
        // * flow 3: CMI N Tax
        // check user
        const isUserValid = await requestDocument();
        navigate("/tax-payment-page-taxAndLaw", {
          state: {
            vehicleCode: TaxVeh.VehicleCode,
            displayVeh: TaxVeh.VehicleType,
            CMINTax: true
          }
        });
      }
      
    }
  };

  // * check valid date (Birth Date)
  function validateBeforeToday(date) {
    if (!date) {
      return true;
    }
    const inputDate = new Date(date);
    const today = new Date();
    // Set the time of 'today' to midnight for accurate comparisons
    today.setHours(0, 0, 0, 0);
    // Check if both dates are valid and not in the past
    const isStartDateValid = inputDate >= today;
    
    return isStartDateValid;
  }

  // * check valid date (Expiratiuon Date)
  function validateAfterOrToday(date) {
    if (!date) {
      return true;
    }
    const inputDate = new Date(date);
    const today = new Date();
    // Set the time of 'today' to midnight for accurate comparisons
    today.setHours(0, 0, 0, 0);
    // Check if both dates are valid and not in the past
    const isStartDateValid = inputDate < today;
    
    return isStartDateValid;
  }

  // * request Document (create order)
  async function requestDocument() {
    console.log(formData)
    const CMINTax = TaxVeh ? true : false;
    try {
        const response = await axios.post(`${baseURL}/createDoc`, {
            ...inputData,
            ...formData,
            IDType: IDType[formData.IDType],
            Company: "ind",
            PackageCode: inputData.vehiclecode,
            VehicleCode: inputData.vehiclecode,
            CMINTax: CMINTax,
            // Product: "test2", //TODO: fix change product Id
            },
            { withCredentials: true},
        );
        console.log(response)
        if (response.status === 200) {
          return response.data.validUser

        } else {
          // ! error
          console.log("error cannot document" );
        }
    } catch (error) {
      // ! error
        console.log("error: ", error);
    }
}

  // * request options ===================================================================

  // * request title
  const [titleNType, setTitleNType] = useState({});
  const [title, setTitle] = useState([])
  async function requestTitle() {
    try {
      const response = await axios.post(`${baseURL}/option/title`);
      if (response) {
        setTitleNType(response.data.data);
        const tempTitle = response.data.data.map(title => Object.keys(title)[0]);
        setTitle(tempTitle)
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  // * request insured type
  const [insuredType, setInsuredType] = useState([])
  async function requestInsuredType() {
    try {
      const response = await axios.post(`${baseURL}/option/insuredtype`);
      if (response) {
        setInsuredType(response.data.data)
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  // * request id type
  const [IDType, setIDType] = useState({});
  const [IDTypeOptions, setIDTypeOptions] = useState([]);
  async function requestIDType() {
    try {
      const response = await axios.post(`${baseURL}/option/idtype`);
      if (response) {
        setIDType(response.data.data)
        const tempType = response.data.data.map(title => title.description);
        setIDTypeOptions(tempType);
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  // * request Addr
  // const [IDType, setIDType] = useState({});
  // const [IDTypeOptions, setIDTypeOptions] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [district, setDistrict] = useState([]);
  const [province, setProvince] = useState([]);
  const [postalCode, setPostalCode] = useState([]);

  async function requestAddr() {
    try {
      const response = await axios.post(`${baseURL}/option/addr`, {
        SubDistrict: formData.SubDistrict !== "" ? formData.SubDistrict : null,
        District: formData.District !== "" ? formData.District : null,
        Province: formData.Province !== "" ? formData.Province : null,
        PostalCode: formData.PostalCode !== "" ? formData.PostalCode : null
      });
      if (response) {
        const tempAddr = response.data.data;
        setSubDistrict(tempAddr.SubDistrict);
        setDistrict(tempAddr.District);
        setProvince(tempAddr.Province);
        setPostalCode(tempAddr.PostalCode);
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    // * request options
    requestTitle();
    requestInsuredType();
    requestIDType();
  }, [])

  // * request addr every time input change
  useEffect(() => {
    requestAddr();
  }, [formData.SubDistrict, formData.District, formData.Province, formData.PostalCode])

  return (
    <div>
      <MainTitle text="ข้อมูลเจ้าของกรมธรรม์" />

      <FormContainer>
        <SectionTitle text="ข้อมูลส่วนตัว" iconClass="fa-solid fa-user" />
        <ResponsiveStack>
          <SelectField
            label="คำนำหน้าชื่อ"
            name="InsuredTitle"
            value={formData.InsuredTitle}
            onChange={handleChange}
            options={title || []}
            error={errors.InsuredTitle}
            fullWidth
          />
        </ResponsiveStack>
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="ชื่อ"
            name="InsuredName"
            value={formData.InsuredName}
            onChange={handleChange}
            error={errors.InsuredName}
            fullWidth
            helperText={
              errors.InsuredName
                ? !formData.InsuredName
                  ? "กรุณากรอก ชื่อ"
                  : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
                : "" // ไม่มีข้อผิดพลาด
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
          ></TextField>
          <TextField
            label="นามสกุล"
            name="InsuredSurname"
            value={formData.InsuredSurname}
            onChange={handleChange}
            error={errors.InsuredSurname}
            fullWidth
            helperText={
              errors.InsuredSurname
                ? !formData.InsuredSurname
                  ? "กรุณากรอก นามสกุล"
                  : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
                : "" // ไม่มีข้อผิดพลาด
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
          ></TextField>
        </ResponsiveStack>
        <ResponsiveStack>
          <TextField
            label="วันเกิด"
            type="date" // กำหนดประเภทเป็นวันที่
            name="BirthDt" // ชื่อฟิลด์
            value={formData.BirthDt} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.BirthDt} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.BirthDt ? "กรุณากรอกวันเกิดให้ถูกต้อง" : "" // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            }
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="เบอร์โทร"
            type="tel" // กำหนดประเภทเป็นวันที่
            name="PhoneNumber" // ชื่อฟิลด์
            value={formData.PhoneNumber} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.PhoneNumber} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.PhoneNumber ? "กรุณากรอกเบอร์โทรให้ถูกต้อง" : "" // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            }
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </ResponsiveStack>

        <SectionTitle
          text="ข้อมูลผู้เอาประกัน"
          iconClass="fa-solid fa-user-shield"
        />
        <ResponsiveStack>
          <SelectField
            label="ประเภทของผู้เอาประกัน"
            name="InsuredType" // ชื่อฟิลด์
            value={formData.InsuredType} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            options={insuredType || []} // ตัวเลือกที่ให้ผู้ใช้เลือก
            error={errors.InsuredType} // ข้อผิดพลาด (ถ้ามี)
            fullWidth // ทำให้ฟิลด์มีความกว้างเต็ม
          />
          <SelectField
            label="ประเภทของเอกสารประจำตัว"
            name="IDType" // ชื่อฟิลด์
            value={formData.IDType} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            options={IDTypeOptions || []} // ตัวเลือกที่ให้ผู้ใช้เลือก
            error={errors.IDType} // ข้อผิดพลาด (ถ้ามี)
            fullWidth // ทำให้ฟิลด์มีความกว้างเต็ม
          />
        </ResponsiveStack>
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="หมายเลขบัตรประชาชน"
            name="InsuredUniqueID" // ชื่อฟิลด์
            value={formData.InsuredUniqueID} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.InsuredUniqueID} // ข้อผิดพลาด (ถ้ามี)
            fullWidth // ทำให้ฟิลด์มีความกว้างเต็ม
            helperText={
              errors.InsuredUniqueID // ตรวจสอบข้อผิดพลาดสำหรับหมายเลขบัตรประชาชน
                ? !formData.InsuredUniqueID // ถ้าไม่มีการกรอกหมายเลข
                  ? "กรุณากรอก หมายเลขบัตรประชาชน" // ข้อความช่วยเหลือเมื่อไม่มีการกรอก
                  : "กรุณากรอก ให้ถูกต้อง 13หลัก" // ข้อความช่วยเหลือเมื่อกรอกไม่ถูกต้อง
                : "" // ไม่มีข้อผิดพลาด
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
          />

          <TextField
            label="วันหมดอายุ"
            type="date" // กำหนดประเภทเป็นวันที่
            name="InsuredUniqueIDExpDt" // ชื่อฟิลด์
            value={formData.InsuredUniqueIDExpDt} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.InsuredUniqueIDExpDt} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.InsuredUniqueIDExpDt ? "กรุณากรอกวันหมดอายุให้ถูกต้อง" : "" // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            }
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </ResponsiveStack>
        <SectionTitle
          text="ข้อมูลที่อยู่"
          iconClass="fa-solid fa-location-dot"
        />
        <ResponsiveStack>
          <TextField
            label="ที่อยู่ตามบัตรประชาชน"
            name="Addr"
            value={formData.Addr}
            onChange={handleChange}
            error={errors.Addr}
            helperText={errors.Addr ? "กรุณากรอกที่อยู่ตามบัตร" : ""} // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            multiline // ทำให้สามารถกรอกข้อความหลายบรรทัดได้
            rows={2} // จำนวนบรรทัดเริ่มต้นที่แสดง
            fullWidth
          />
        </ResponsiveStack>
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <SelectField
            label="เขต/อำเภอ" // ชื่อฟิลด์ที่จะแสดงให้ผู้ใช้เห็น
            name="District" // ชื่อฟิลด์สำหรับการจัดการค่าของจังหวัด
            value={formData.District} // ค่าปัจจุบันจากฟอร์มที่เก็บจังหวัด
            onChange={handleChange} // ฟังก์ชันที่ใช้ในการจัดการการเปลี่ยนแปลงเมื่อผู้ใช้เลือกจังหวัด
            options={district || []} // ตัวเลือกที่ให้ผู้ใช้เลือก
            error={errors.District} // ข้อผิดพลาด (ถ้ามี) สำหรับฟิลด์จังหวัด
            fullWidth // ทำให้ฟิลด์มีความกว้างเต็ม
            helperText={
              // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
              errors.District // ตรวจสอบข้อผิดพลาดสำหรับเขต/อำเภอ
                ? !formData.District // ถ้าไม่มีการกรอก
                  ? "กรุณากรอกเขต/อำเภอ" // ข้อความช่วยเหลือเมื่อไม่มีการกรอก
                  : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)" // ข้อความช่วยเหลือเมื่อกรอกไม่ถูกต้อง
                : "" // ไม่มีข้อผิดพลาด
            }
          />
          <SelectField
            label="แขวง/ตำบล" // ชื่อฟิลด์ที่จะแสดงให้ผู้ใช้เห็น
            name="SubDistrict" // ชื่อฟิลด์สำหรับการจัดการค่าของจังหวัด
            value={formData.SubDistrict} // ค่าปัจจุบันจากฟอร์มที่เก็บจังหวัด
            onChange={handleChange} // ฟังก์ชันที่ใช้ในการจัดการการเปลี่ยนแปลงเมื่อผู้ใช้เลือกจังหวัด
            options={subDistrict || []} // ตัวเลือกที่ให้ผู้ใช้เลือก
            error={errors.SubDistrict} // ข้อผิดพลาด (ถ้ามี) สำหรับฟิลด์จังหวัด
            fullWidth // ทำให้ฟิลด์มีความกว้างเต็ม
            helperText={
              // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
              errors.SubDistrict // ตรวจสอบข้อผิดพลาดสำหรับแขวง/ตำบล
                ? !formData.SubDistrict // ถ้าไม่มีการกรอก
                  ? "กรุณากรอก แขวง/ตำบล" // ข้อความช่วยเหลือเมื่อไม่มีการกรอก
                  : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)" // ข้อความช่วยเหลือเมื่อกรอกไม่ถูกต้อง
                : "" // ไม่มีข้อผิดพลาด
            }
          />
        </ResponsiveStack>
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <SelectField
            label="จังหวัด" // ชื่อฟิลด์ที่จะแสดงให้ผู้ใช้เห็น
            name="Province" // ชื่อฟิลด์สำหรับการจัดการค่าของจังหวัด
            value={formData.Province} // ค่าปัจจุบันจากฟอร์มที่เก็บจังหวัด
            onChange={handleChange} // ฟังก์ชันที่ใช้ในการจัดการการเปลี่ยนแปลงเมื่อผู้ใช้เลือกจังหวัด
            options={province || []} // ตัวเลือกที่ให้ผู้ใช้เลือก
            error={errors.Province} // ข้อผิดพลาด (ถ้ามี) สำหรับฟิลด์จังหวัด
            fullWidth // ทำให้ฟิลด์มีความกว้างเต็ม
          />
          <SelectField
            label="รหัสไปรษณีย์" // ชื่อฟิลด์ที่จะแสดงให้ผู้ใช้เห็น
            name="PostalCode" // ชื่อฟิลด์สำหรับการจัดการค่าของจังหวัด
            value={formData.PostalCode} // ค่าปัจจุบันจากฟอร์มที่เก็บจังหวัด
            onChange={handleChange} // ฟังก์ชันที่ใช้ในการจัดการการเปลี่ยนแปลงเมื่อผู้ใช้เลือกจังหวัด
            options={postalCode || []} // ตัวเลือกที่ให้ผู้ใช้เลือก
            error={errors.PostalCode} // ข้อผิดพลาด (ถ้ามี) สำหรับฟิลด์จังหวัด
            fullWidth // ทำให้ฟิลด์มีความกว้างเต็ม
            helperText={
              errors.PostalCode // ตรวจสอบข้อผิดพลาดสำหรับรหัสไปรษณีย์
                ? !formData.PostalCode // ถ้าไม่มีการกรอกหมายเลข
                  ? "กรุณากรอกรหัสไปรษณีย์" // ข้อความช่วยเหลือเมื่อไม่มีการกรอก
                  : "กรุณากรอกให้ถูกต้อง (รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก)" // ข้อความช่วยเหลือเมื่อกรอกไม่ถูกต้อง
                : "" // ไม่มีข้อผิดพลาด
            }
          />
        </ResponsiveStack>
        
      </FormContainer>

      <StickyFooter>
        <Buttons onClick={handleSubmit}  variant="primary" label="บันทึก" />
      </StickyFooter>
    </div>
  );
}

export default PolicyOwnerForms;
