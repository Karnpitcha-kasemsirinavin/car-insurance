/*ของ React */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*material Ui*/
import { TextField, useMediaQuery, Autocomplete ,Stack,Button,Link, Typography} from "@mui/material";

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
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../App.js";

function OtpForms() {
  // * get from previous page
  const location = useLocation();
  const { userData, productId } = location.state || {};
  const [refNo, setRefNo] = useState();

  console.log(userData);

  const [formData, setFormData] = useState({
    pin: "",
  });

  const [errors, setErrors] = useState({
    pin: false,
  });

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:536px)");

  // phone number
  const phoneNumberRegex = /^[0-9]{10}$/;
  const [isSendPhone, setIsSendPhone] = useState(false);
  const [OTPCount, setOTPCount] = useState(0);

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

  const handleSubmit = async () => {
    const { pin } = formData;

    const newErrors = {
      pin: !pin,
    };

    setErrors(newErrors);

    if (!newErrors.pin) {
      console.log("ข้อมูลที่ส่ง:", formData);
      // ทำการส่งข้อมูลที่นี่
      await handleRequestVerification();
      // navigate("/policy-ownerInfo");
    }
  };

  // * check phonenumber validity then requerst OTP
  const handleRequestOTP = async () => {

    try {
      // * request OTP
      const response = await axios.post(`${baseURL}/OTP/send`, userData,
        {
          withCredentials: true
        }
      );
      if (response.data && response.data.status === "success") {
        setRefNo(response.data.data);
        setOTPCount(OTPCount+1);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const handleRequestVerification = async() => {
    try {
      const response = await axios.post(`${baseURL}/OTP/verify`, {
        ...formData,
        ...userData
      },
        {
          withCredentials: true
        }
      );
      
      if (response.data && response.data.status === "success") {
        if (productId) {
          navigate(`/payment-page?product=${productId}`);
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div>
    <FormContainer  paddingBottom="40px"  padding="0px" backgroundColor="" boxShadow="none">
  {/* เเถวที่ 1 */}
    <SectionTitle text={`Ref: ${refNo ?? ""}`} fontSize="16px" fontWeight="500" />
    <ResponsiveStack>
    <TextField
      label="PIN"
      name="pin"
      value={formData.pin}
      onChange={handleChange}
      error={!!errors.pin} 
      fullWidth
      InputLabelProps={{
        shrink: true, // ทำให้ label อยู่ด้านบน
      }}
      helperText={
        errors.pin
          ? !formData.pin
            ? "Please enter your pin."
            : "Invalid Format"
          : "" // ไม่มีข้อผิดพลาด
      } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
    />
  </ResponsiveStack>

  <Stack spacing={1} alignItems="flex-end"  sx={{ marginTop: "15px !important" }}>
    <Link onClick={OTPCount < 3 ? handleRequestOTP : undefined}  variant="body2"  color={OTPCount < 3 ? "#3FABD9" : "gray"}
    sx={{ textAlign: "right" ,fontSize: "10px" , fontFamily: "Prompt", textDecoration: "none"}}>
    Resend code? 28s
    </Link>
  </Stack>
  <Stack  alignItems="center" >
  {!refNo ?  <Buttons onClick={handleRequestOTP} variant="primary" label="ขอรหัส OTP" fontSize="16px" width="100%!important"   />
  :<Buttons onClick={handleSubmit} variant="primary" label="enter" fontSize="16px" width="100%!important"   />}
  </Stack>

</FormContainer>

    </div>
  );
}

export default OtpForms;
