/*ของ React */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*material Ui*/
import {
  TextField,
  useMediaQuery,
  Autocomplete,
  Stack,
  Button,
  Link,
  Typography,
} from "@mui/material";

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
  const isSmallScreen = useMediaQuery("(max-width:768px)"); // ตรวจสอบขนาดหน้าจอ

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

      navigate("/");
    }
  };

  return (
    <div>
      <FormContainer
      paddingTop="15px"
        paddingBottom="16px"
        padding="0px"
        spacing={2}
        boxShadow="none"
      >
        <ResponsiveStack isSmallScreen={isSmallScreen} spacing={2}>
          <div
            style={{
              width: "100%", // ให้ div กว้างเต็มพื้นที่
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "16px", marginBottom: "4px" }}
            >
              {" "}
              line id
            </Typography>
            <TextField
              name="name"
              value="Todsaporn"
              onChange={handleChange}
              error={errors.name}
              fullWidth
              helperText={
                errors.name
                  ? !formData.name
                    ? "กรุณากรอก ชื่อ"
                    : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
                  : "" // ไม่มีข้อผิดพลาด
              } // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
              sx={{
                backgroundColor: "#F9F9F9",
                borderRadius: "8px",
                height: "52px", // กำหนดความสูงที่ต้องการ
                "& .MuiInputBase-root": {
                  height: "100%", // ทำให้ InputBase มีความสูงเต็ม
                },
                "& .MuiOutlinedInput-root": {
                  border: "none", // ไม่มีกรอบปกติ
                  "& fieldset": {
                    border: "none", // ไม่มีกรอบปกติ
                  },
                  "&:focus-within fieldset": {
                    border: "2px solid #3FABD9", // กรอบตอนโฟกัส (เปลี่ยนสีตามต้องการ)
                  },
                },
              }}
            ></TextField>
          </div>
        </ResponsiveStack>

        <ResponsiveStack isSmallScreen={isSmallScreen}   spacing={2}>
          <div style={{
              width: "100%", // ให้ div กว้างเต็มพื้นที่
            }} >
    <Typography
            variant="h6"
            sx={{ fontSize: "16px", marginBottom: "4px" }}
          >
          username
          </Typography>
          <TextField
  value="ghostface99"
  onChange={handleChange}
  error={errors.username} // เปลี่ยนจาก errors.email เป็น errors.username
  fullWidth
  helperText={
    errors.username
      ? !formData.username
        ? "กรุณากรอก ชื่อผู้ใช้งาน" // เปลี่ยนข้อความช่วยเหลือสำหรับ username
        : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
      : ""
  }
  sx={{
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
    height: "52px",
    "& .MuiInputBase-root": {
      height: "100%",
    },
    "& .MuiOutlinedInput-root": {
      border: "none",
      "& fieldset": {
        border: "none",
      },
      "&:focus-within fieldset": {
        border: "2px solid #3FABD9",
      },
    },
  }}
></TextField>
          </div>
          <div style={{
              width: "100%", // ให้ div กว้างเต็มพื้นที่
            }} >
        <Typography
            variant="h6"
            sx={{ fontSize: "16px", marginBottom: "4px" }}
          >
            password
          </Typography>
          <TextField
  type="password" // เปลี่ยนเป็นประเภทรหัสผ่าน
  value="0960401443"
  onChange={handleChange}
  error={errors.password} // เปลี่ยนชื่อข้อผิดพลาดตามฟิลด์ที่ใช้
  fullWidth
  helperText={
    errors.password
      ? !formData.password
        ? "กรุณากรอก รหัสผ่าน"
        : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
      : ""
  }
  sx={{
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
    height: "52px",
    "& .MuiInputBase-root": {
      height: "100%",
    },
    "& .MuiOutlinedInput-root": {
      border: "none",
      "& fieldset": {
        border: "none",
      },
      "&:focus-within fieldset": {
        border: "2px solid #3FABD9",
      },
    },
  }}
></TextField>
</div>
        </ResponsiveStack>

       
      </FormContainer>
    </div>
  );
}

export default LogInForms;
