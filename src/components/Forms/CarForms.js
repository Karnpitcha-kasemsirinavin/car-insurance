/*ของ React */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/*material Ui*/
import { TextField, useMediaQuery, Autocomplete } from "@mui/material";

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
import { IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { baseURL } from "../../App.js";

function CarForms() {
  // * get from previous page
  const location = useLocation();
  const { vehicleCode } = location.state || {};

  const [formData, setFormData] = useState({
    Manufacturer: "", // ฟิลด์สำหรับเก็บยี่ห้อรถยนต์
    Model: "", // ฟิลด์สำหรับเก็บรุ่นรถยนต์
    Colour: "", // ฟิลด์สำหรับเก็บสีรถยนต์
    PlateType: "", // ฟิลด์สำหรับเก็บชนิดทะเบียนรถยนต์
    RegistrationFt: "", // ฟิลด์สำหรับเก็บเลขทะเบียนรถ
    RegistrationSd: "", // เพิ่มฟิลด์เลขทะเบียนรถ (กลุ่มที่ 2)
    RegisteredYear: "", // เพิ่มฟิลด์ปีที่จดทะเบียน
    Displacement: "", // เพิ่มฟิลด์ขนาดรถยนต์
    GrossVehOrCombinedWeight: "", // เพิ่มฟิลด์นํ้าหนักรถ
    SeatingCapacity: "", //เพิ่มฟิลด์จํานวนที่นั่ง
    ChassisSerialNumber: "", // /เพิ่มฟิลด์ หมายเลขตัวถัง
    RegisteredProvCd: "", //เพิ่มฟิลด์ จังหวัดที่ลงทะเบียน
    CMIEffectiveDt: "", // เพิ่มฟิลด์ วันที่ต้องการเริ่มใช้งานเอกสาร
    CMIExpirationDt: ""
  });

  const [errors, setErrors] = useState({
    Manufacturer: false, // แสดงสถานะข้อผิดพลาดสำหรับฟิลด์ยี่ห้อรถยนต์
    Model: false, // แสดงสถานะข้อผิดพลาดสำหรับฟิลด์รุ่นรถยนต์
    Colour: false, // แสดงสถานะข้อผิดพลาดสำหรับฟิลด์สีรถยนต์
    PlateType: false, // แสดงสถานะข้อผิดพลาดสำหรับฟิลด์ชนิดทะเบียนรถยนต์
    RegistrationFt: false, // แสดงสถานะข้อผิดพลาดสำหรับฟิลด์เลขทะเบียนรถ
    RegistrationSd: false, // เพิ่มข้อผิดพลาดสำหรับเลขทะเบียนรถ (กลุ่มที่ 2)
    RegisteredYear: false, // เพิ่มข้อผิดพลาดฟิลด์ปีที่จดทะเบียน
    Displacement: false, //  เพิ่มข้อผิดพลาดฟิลด์ขนาดรถยนต์
    GrossVehOrCombinedWeight: false, // เพิ่มข้อผิดพลาดฟิลด์นํ้าหนักรถ
    SeatingCapacity: false, // เพิ่มข้อผิดพลาดฟิลด์จํานวนที่นั้ง
    ChassisSerialNumber: false, // เพิ่มข้อผิดพลาดฟิลด์หมายเลขตัวถัง
    RegisteredProvCd: false, // เพิ่มข้อผิดพลาดฟิลด์จังหวัดที่ลงทะเบียน
    CMIEffectiveDt: false, // เพิ่มข้อผิดพลาดฟิลด์วันที่ต้องการเริ่มใช้งานเอกสาร
    CMIExpirationDt: false
  });

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:536px)"); // ตรวจสอบขนาดหน้าจอ

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

  // * Hnadle Submit Form
  const handleSubmit = () => {
    const {
      Manufacturer,
      Model,
      Colour,
      PlateType,
      RegistrationFt,
      RegistrationSd,
      RegisteredYear,
      
      Displacement,
      GrossVehOrCombinedWeight,
      SeatingCapacity,
      ChassisSerialNumber,

      RegisteredProvCd,
      CMIEffectiveDt,
      CMIExpirationDt
    } = formData;

     //  * correction and test
    // 4-digit number (Registered Year)
    const yearRegex = /^[0-9]{4}$/;
    // only number allow
    const numberSizeRegex = /^[0-9]+$/;
    // Chassis number pattern
    const chassisNumberRegex = /^[A-Za-z0-9]+$/;
    // RegistrationFt
    const licensePlateRegex =  /^[ก-ฮ]{2}$/;
    // 

    // * requirement of fields
    const newErrors = {
      Manufacturer: !Manufacturer,
      Model: !Model,
      Colour: !Colour,

      PlateType: !PlateType,
      RegistrationFt: !RegistrationFt || !licensePlateRegex.test(RegistrationFt),
      RegistrationSd: !RegistrationSd || !numberSizeRegex.test(RegistrationSd) || RegistrationSd.length !== 4, 
      RegisteredYear: !RegisteredYear || !yearRegex.test(RegisteredYear),
      
      Displacement: !Displacement || !numberSizeRegex.test(Displacement), 
      GrossVehOrCombinedWeight: !GrossVehOrCombinedWeight || !numberSizeRegex.test(GrossVehOrCombinedWeight),
      SeatingCapacity: !SeatingCapacity || !numberSizeRegex.test(SeatingCapacity),
      ChassisSerialNumber: !ChassisSerialNumber || !chassisNumberRegex.test(ChassisSerialNumber),
      RegisteredProvCd: !RegisteredProvCd,

      CMIEffectiveDt: !CMIEffectiveDt || validateDatesStart(CMIEffectiveDt),
      CMIExpirationDt: validateDatesExpired(CMIEffectiveDt, CMIExpirationDt)
    };

    setErrors(newErrors);
    
    // * no Error
    if (Object.values(newErrors).every(value => value === false)) {
      console.log("ข้อมูลที่ส่ง:", formData);
      console.log("pass")
      // * ทำการส่งข้อมูลที่นี่
      navigate("/policy-ownerInfo", {
        state: {
          inputData: {vehiclecode: vehicleCode, ...formData},
        }
      });
    }
  };

  // * check valid date (Start)
  function validateDatesStart(CMIEffectiveDt) {
    if (!CMIEffectiveDt) {
      return true;
    }
    const start = new Date(CMIEffectiveDt);
    const today = new Date();
    // Set the time of 'today' to midnight for accurate comparisons
    today.setHours(0, 0, 0, 0);
    // Check if both dates are valid and not in the past
    const isStartDateValid = start < today;
    
    return isStartDateValid;
  }

  // * check valid date (Expired)
  function validateDatesExpired(CMIEffectiveDt, expiredDate) {
    const start = new Date(CMIEffectiveDt);
    const expired = new Date(expiredDate);
    const today = new Date();
    // Set the time of 'today' to midnight for accurate comparisons
    today.setHours(0, 0, 0, 0);
    // Check if both dates are valid and not in the past
    const isExpiredDateValid = expired < today;
    // Check if ExpiredDate is after CMIEffectiveDt
    const isExpiredDateAfterStartDate = expired < start;
    
    return isExpiredDateValid &&  isExpiredDateAfterStartDate;
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

  // * request Colour
  const [colour, setColour] = useState([])
  async function requestColour() {
    try {
      const response = await axios.post(`${baseURL}/option/colour`);
      if (response) {
        const tempColour = response.data.data.map(colour => colour.value);
        setColour(tempColour)
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  // * request platetype
  const [platetype, setPlatetype] = useState([])
  async function requestPlatetype() {
    try {
      const response = await axios.post(`${baseURL}/option/platetype`);
      if (response) {
        const tempPlatetype = response.data.data.map(type => type.value);
        setPlatetype(tempPlatetype);
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
    requestColour();
    requestPlatetype();
    requestProvince();
  }, [])

  // * Display ===========================================================
  return (
    <div>
      {/* เพิ่มหัวข้อหลัก */}
      <MainTitle text="ข้อมูลรถยนต์" />
      <FormContainer>
        {/* เเถวที่ 1 */}
        <SectionTitle text="ข้อมูลรถยนต์" iconClass="fa-solid fa-car" />
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <SelectField
            label="ยี่ห้อรถยนต์"
            name="Manufacturer"
            value={formData.Manufacturer}
            onChange={handleChange}
            options={manufacturer}
            error={errors.Manufacturer}
          />
          <SelectField
            label="รุ่นรถยนต์"
            name="Model"
            value={formData.Model}
            onChange={handleChange}
            options={Brand[formData.Manufacturer] || []}
            error={errors.Model}
            disabled={!formData.Manufacturer}
          />
        </ResponsiveStack>

        {/* เเถวที่2 */}
        <ResponsiveStack>
          <SelectField
            label="สีรถยนต์"
            name="Colour"
            value={formData.Colour}
            onChange={handleChange}
            options={colour || []}
            error={errors.Colour}
          />
        </ResponsiveStack>

        {/* เพิ่มหัวข้อหมวดหมู่ */}

        <SectionTitle text=" ทะเบียนรถยนต์" iconClass="fa fa-id-card" />

        {/* เเถวที่3 */}
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <SelectField
            label="ชนิดทะเบียนรถยนต์"
            name="PlateType" // ชื่อฟิลด์ที่ต้องการ
            value={formData.PlateType} // ค่าของฟิลด์ที่เก็บใน state
            onChange={handleChange} // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลง
            options={platetype || []} // ตัวเลือกของฟิลด์
            error={errors.PlateType} // ข้อผิดพลาดที่เกิดขึ้น
          />
          <TextField
            label="เลขทะเบียนรถ"
            name="RegistrationFt" // ตั้งชื่อฟิลด์ที่เก็บใน state
            value={formData.RegistrationFt} // ค่าของฟิลด์ที่เก็บใน state
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
        </ResponsiveStack>

        {/* เเถวที่4 */}
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="เลขทะเบียนรถ (กลุ่มที่ 2)"
            name="RegistrationSd" // ตั้งชื่อฟิลด์ที่เก็บใน state
            type="number"
            value={formData.RegistrationSd} // ค่าของฟิลด์ที่เก็บใน state
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
          <TextField
            label="ปีที่จดทะเบียน"
            name="RegisteredYear"
            type="number"
            value={formData.RegisteredYear} // เชื่อมโยงกับ state
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            variant="outlined"
            fullWidth
            error={errors.RegisteredYear} // แสดงข้อผิดพลาด
            helperText={
              errors.RegisteredYear
                ? "กรุณากรอก (ค.ศ เท่านั้น เช่น 2001 )"
                : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
          />
        </ResponsiveStack>
        <ResponsiveStack>
          <SelectField
            label="จัดหวัดที่จดทะเบียน"
            name="RegisteredProvCd"
            value={formData.RegisteredProvCd} 
            onChange={handleChange} 
            options={province || []}
            error={errors.RegisteredProvCd}
          />
          {/* // TODO: fix field province */}
          {/* <Autocomplete
            fullWidth
            options={province || []}
            renderInput={(params) => (
              <TextField
                {...params}
                label="จัดหวัดที่จดทะเบียน"
                name="RegisteredProvCd"
                value={formData.RegisteredProvCd} // เชื่อมโยงกับ state
                onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
                variant="outlined"
                error={errors.RegisteredProvCd} // แสดงข้อผิดพลาด
                helperText={
                  errors.RegisteredProvCd
                    ? !formData.RegisteredProvCd
                      ? "กรุณาเลือก จัดหวัดที่จดทะเบียน"
                      : "กรุณากรอกให้ถูกต้อง ไม่เว้นเพิ่มที่ว่าง"
                    : ""
                } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
              />
            )}
            freeSolo
          /> */}
        </ResponsiveStack>

        <SectionTitle text="ข้อมูลทางเทคนิค" iconClass="fa fa-cogs" />
        {/* เเถวที่5 */}
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="ขนาดเครื่องยนต์ (CC)" // ป้ายฟิลด์
            name="Displacement" // ชื่อฟิลด์ที่เก็บใน state
            type="number"
            value={formData.Displacement} // ค่าของฟิลด์ที่เก็บใน state
            onChange={handleChange} // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลง
            variant="outlined"
            fullWidth
            error={errors.Displacement} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.Displacement
                ? !formData.Displacement
                  ? "กรุณากรอกขนาดเครื่องยนต์ cc"
                  : "กรุณากรอกขนาดเครื่องยนต์เป็นตัวเลข"
                : "" // ข้อความช่วยเหลือ
            }
          />
          <TextField
            label="นํ้าหนักรถ (KG)" // นํ้าหนักรถฟิลด์
            name="GrossVehOrCombinedWeight"
            type="number"
            value={formData.GrossVehOrCombinedWeight}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={errors.GrossVehOrCombinedWeight}
            helperText={
              errors.GrossVehOrCombinedWeight
                ? !formData.GrossVehOrCombinedWeight
                  ? "กรุณากรอก นํ้าหนักรถ"
                  : "กรุณากรอก เป็นตัวเลข"
                : "" // ข้อความช่วยเหลือ
            }
          />
        </ResponsiveStack>

        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <TextField
            label="จํานวนที่นั่ง" // ป้ายฟิลด์
            name="SeatingCapacity" // ชื่อฟิลด์ที่เก็บใน state
            type="number"
            value={formData.SeatingCapacity} // ค่าของฟิลด์ที่เก็บใน state
            onChange={handleChange} // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลง
            variant="outlined"
            fullWidth
            error={errors.SeatingCapacity} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.SeatingCapacity
                ? !formData.SeatingCapacity
                  ? "กรุณากรอก จํานวนที่นั่ง"
                  : "กรุณากรอก เป็นตัวเลข"
                : "" // ข้อความช่วยเหลือ
            }
          />
          <TextField
            label="หมายเลขตัวถัง" // ป้ายฟิลด์
            name="ChassisSerialNumber" // ชื่อฟิลด์ที่เก็บใน state
            value={formData.ChassisSerialNumber} // ค่าของฟิลด์ที่เก็บใน state
            onChange={handleChange} // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลง
            variant="outlined"
            fullWidth
            error={errors.ChassisSerialNumber} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.ChassisSerialNumber
                ? !formData.ChassisSerialNumber
                  ? "กรุณากรอก หมายเลขตัวถัง"
                  : "กรุณากรอก (ต้องเป็นตัวเลขและตัวอักษร)"
                : ""
            }
          />
        </ResponsiveStack>

        <SectionTitle text="ข้อมูลการใช้งาน" iconClass="fa fa-info-circle" />
        <ResponsiveStack>
          <TextField
            label="วันที่ต้องการเริ่มใช้งานเอกสาร"
            type="date"
            name="CMIEffectiveDt"
            value={formData.CMIEffectiveDt}
            onChange={handleChange}
            error={errors.CMIEffectiveDt} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.CMIEffectiveDt ? "กรุณากรอก วันที่ต้องการเริ่มใช้งานเอกสาร" : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="วันที่สิ้นสุดการใช้งานเอกสาร"
            type="date"
            name="CMIExpirationDt"
            value={formData.CMIExpirationDt}
            onChange={handleChange}
            error={errors.CMIExpirationDt} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.CMIExpirationDt ? "กรุณากรอก วันที่หลังจาก วันที่ต้องการเริ่มใช้งานเอกสาร" : ""
            } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                formData.CMIExpirationDt && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleChange({ target: { name: "CMIExpirationDt", value: '' } })
                      }
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              ),
            }}
            fullWidth
          />
        </ResponsiveStack>
      </FormContainer>

      <StickyFooter>
        {/* ปุ่มส่งข้อมูล */}
        <Buttons onClick={handleSubmit} variant="primary" label="บันทึก" />
      </StickyFooter>
    </div>
  );
}

export default CarForms;
