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

function LogInForms() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const [errors, setErrors] = useState({
    Username: false,
    Password: false,
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

  const handleSubmit = () => {
    const { Username, Password } = formData;

    const newErrors = {
      Username: !Username,
      Password: !Password,
    };

    setErrors(newErrors);

    if (!newErrors.Username && !newErrors.Password) {
      console.log("ข้อมูลที่ส่ง:", formData);
      // ทำการส่งข้อมูลที่นี่

      navigate("/policy-ownerInfo");
    }
  };

  return (
    <div>
    <FormContainer  paddingBottom="40px"  padding="0px" backgroundColor="" boxShadow="none">
  {/* เเถวที่ 1 */}
  <SectionTitle text="Log in with your information" fontSize="16px" fontWeight="500" />
  
  <ResponsiveStack >
    <TextField
      label="Username"
      name="Username"
      value={formData.Username}
      onChange={handleChange}
      error={!!errors.Username} // เปลี่ยนเป็น boolean เพื่อแสดงข้อผิดพลาด
      fullWidth
      InputLabelProps={{
        shrink: true, // ทำให้ label อยู่ด้านบน
      }}
      helperText={
        errors.Username
          ? !formData.Username
            ? "Please enter your username."
            : ""
          : "" // ไม่มีข้อผิดพลาด
      } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
    />
  </ResponsiveStack>
  
  <ResponsiveStack>
    <TextField
      label="Password"
      name="Password"
      value={formData.Password}
      onChange={handleChange}
      error={!!errors.Password} // เปลี่ยนเป็น boolean เพื่อแสดงข้อผิดพลาด
      type="password"
      fullWidth
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
      Forgot Password?
    </Link>
  </Stack>
  <Stack  alignItems="center" >
  <Buttons onClick={handleSubmit} variant="primary" label="Login" fontSize="16px" width="100%!important"   />

  
  </Stack>

 
</FormContainer>

    </div>
  );
}

export default LogInForms;
