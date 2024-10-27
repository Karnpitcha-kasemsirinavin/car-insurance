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
              ชื่อ
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

          <div
            style={{
              width: "100%", // ให้ div กว้างเต็มพื้นที่
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "16px", marginBottom: "4px" }}
            >
              นามสกุล
            </Typography>
            <TextField
              name="surname"
              value="meepon"
              onChange={handleChange}
              error={errors.surname}
              fullWidth
              helperText={
                errors.surname
                  ? !formData.surname
                    ? "กรุณากรอก นามสกุล"
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

        <ResponsiveStack  isSmallScreen={isSmallScreen} spacing={2}>
          <div   style={{
              width: "100%", // ให้ div กว้างเต็มพื้นที่
            }}>
        <Typography
            variant="h6"
            sx={{ fontSize: "16px", marginBottom: "4px" }}
          >
            คำนำหน้าชื่อ
          </Typography>
          <SelectField
            name="prefix"
            value={["นาง"]}
            onChange={handleChange}
            options={["นาย", "นาง", "นางสาว"]}
            error={errors.prefix}
            fullWidth
            sx={{
              backgroundColor: "#F9F9F9", // เปลี่ยนสีพื้นหลัง
              borderRadius: "8px", // ปรับความโค้งของกรอบ
              "& .MuiInputBase-root": {
                height: "52px", // กำหนดความสูงของ input
              },
              "& .MuiOutlinedInput-root": {
                border: "none", // ไม่มีเส้นกรอบปกติ
                "& fieldset": {
                  border: "none", // ไม่มีกรอบ
                },
                "&:focus-within fieldset": {
                  border: "2px solid #3FABD9", // กรอบตอนโฟกัส
                },
              },
            }}
          />
          </div>
  
  <div   style={{
              width: "100%", // ให้ div กว้างเต็มพื้นที่
            }}>
   <Typography
            variant="h6"
            sx={{ fontSize: "16px", marginBottom: "4px" }}
          >
            วัน/เดือน/ปีเกิด
          </Typography>
          <TextField
            type="date" // กำหนดประเภทเป็นวันที่
            name="expirationDate" // ชื่อฟิลด์
            value={formData.expirationDate} // ค่าปัจจุบันจากฟอร์ม
            onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
            error={errors.expirationDate} // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
            helperText={
              errors.expirationDate ? "กรุณากรอกวันเกิด" : "" // ข้อความช่วยเหลือเมื่อเกิดข้อผิดพลาด
            }
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
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
          />


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
            อีเมล
          </Typography>
          <TextField
            value="sampon251095@gmail.com"
            onChange={handleChange}
            error={errors.email}
            fullWidth
            helperText={
              errors.email
                ? !formData.email
                  ? "กรุณากรอก อีเมล"
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
          <div style={{
              width: "100%", // ให้ div กว้างเต็มพื้นที่
            }} >
        <Typography
            variant="h6"
            sx={{ fontSize: "16px", marginBottom: "4px" }}
          >
            เบอร์โทร
          </Typography>
          <TextField
            value="0960401443"
            onChange={handleChange}
            error={errors.phonenumber}
            fullWidth
            helperText={
              errors.phonenumber
                ? !formData.phonenumber
                  ? "กรุณากรอก อีเมล"
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


{/* <div className="account-info-warning mobile">
          <div class="account-info-text">
            <i class="fa-solid fa-circle-exclamation"></i>{" "}
            <p>ข้อมูลเจ้าของบัญชีไม่มีผลกระทบกับกรมธรรม์</p>
          </div>
          <div class="account-info-actions">
            <Buttons
              onClick
              label="ยกเลิก"
              variant="cancel"
              height="36px"
              fontSize="14px"
            />
            <Buttons
              onClick
              label="บันทึก"
              variant="primary"
              height="36px"
              fontSize="14px"
            />
          </div>
        </div> */}
       
      </FormContainer>
    </div>
  );
}

export default LogInForms;
