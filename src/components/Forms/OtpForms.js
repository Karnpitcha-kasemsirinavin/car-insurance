/*ของ React */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*material Ui*/
import { TextField, useMediaQuery, Autocomplete ,Stack,Button,Link} from "@mui/material";

/*เเสดงผลฟอร์ม ui*/
import FormContainer from "./FormContainer.js"; /* โครงสร้างฟอร์ม */

import SectionTitle from "./SectionTitleTypography.js"; /* หัวข้อรอง */

/*เเสดงปุ่มกด ui*/
import Buttons from "../Buttons/Buttons.js";
import StickyFooter from "../StickyFooter/StickyFooter.js";

// นำเข้า SelectField คอมโพเนนต์เพื่อใช้ในการแสดงฟิลด์แบบเลือก (dropdown)
// ซึ่งสามารถกำหนดตัวเลือก, จัดการค่า, แสดงข้อผิดพลาด และรองรับสถานะ disabled ได้
import SelectField from "./SelectField.js";

import ResponsiveStack from "./ResponsiveStack.js";

function OtpForms() {
  const [formData, setFormData] = useState({

    Password: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    Password: false,
    phoneNumber: true,
  });

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:536px)"); // ตรวจสอบขนาดหน้าจอ

  // phone number
  const phoneNumberRegex = /^[0-9]{10}$/;
  const [isSendPhone, setIsSendPhone] = useState(false)

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
    const { Username, Password, phoneNumber } = formData;

    const newErrors = {
      phoneNumber: !phoneNumber || phoneNumberRegex.test(phoneNumber),
      Password: !Password,
    };

    setErrors(newErrors);

    if (!newErrors.Username && !newErrors.Password) {
      console.log("ข้อมูลที่ส่ง:", formData);
      // ทำการส่งข้อมูลที่นี่

      navigate("/policy-ownerInfo");
    }
  };

  // * check phonennumber validity then requerst OTP
  const handleRequestOTP = () => {
    const { Username, Password, phoneNumber } = formData

    const newErrors = {
      phoneNumber: !phoneNumber || !phoneNumberRegex.test(phoneNumber)
    };

    if (newErrors.phoneNumber) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSendPhone(true);
    } catch (error) {

    }


  }

  return (
    <div>
    <FormContainer  paddingBottom="40px"  padding="0px" backgroundColor="" boxShadow="none">
  {/* เเถวที่ 1 */}

  {!isSendPhone ?
    <>
    <ResponsiveStack>
    <TextField
      label="Enter Phone Number "
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      error={!!errors.phoneNumber} // เปลี่ยนเป็น boolean เพื่อแสดงข้อผิดพลาด
      fullWidth
      InputLabelProps={{
        shrink: true, // ทำให้ label อยู่ด้านบน
      }}
      helperText={
        errors.phoneNumber
          ? !formData.phoneNumber
            ? "Please enter your PhoneNumber."
            : "Invalid Format"
          : "" // ไม่มีข้อผิดพลาด
      } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
    />
  </ResponsiveStack>

  <Buttons onClick={handleRequestOTP} variant="primary" label="enter" fontSize="16px" width="100%!important"   />
  </>
  : <>
    <ResponsiveStack>
    <TextField
      label="Enter OTP 8-digit "
      name="Password"
      value={formData.Password}
      onChange={handleChange}
      error={!!errors.Password} // เปลี่ยนเป็น boolean เพื่อแสดงข้อผิดพลาด
      type="password"
      fullWidth
      disabled={!formData.phoneNumber}
      InputLabelProps={{
        shrink: true, // ทำให้ label อยู่ด้านบน
      }}
      helperText={
        errors.Password
          ? !formData.Password
            ? "Please enter your password."
            : ""
          : "" // ไม่มีข้อผิดพลาด
      } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
    />
  </ResponsiveStack>
  

  <Stack spacing={1} alignItems="flex-end"  sx={{ marginTop: "15px !important" }}>
    <Link href="/forgot-password" variant="body2" color="#3FABD9" sx={{ textAlign: "right" ,fontSize: "10px" , fontFamily: "Prompt", textDecoration: "none"          }}>
    Resend code? 28s
    </Link>
  </Stack>
  <Stack  alignItems="center" >
  <Buttons onClick={handleSubmit} variant="primary" label="enter" fontSize="16px" width="100%!important"   />
  </Stack>
  </>
  }

</FormContainer>

    </div>
  );
}

export default OtpForms;
