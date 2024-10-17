import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  useMediaQuery,
  MenuItem,
  Stack,
  Link,
  Checkbox,
  Box,
} from "@mui/material"; // ตรวจสอบให้แน่ใจว่านำเข้า Select และ MenuItem
import FormContainer from "./FormContainer.js";
import SectionTitle from "./SectionTitleTypography.js";
import Buttons from "../Buttons/Buttons.js";
import ResponsiveStack from "./ResponsiveStack.js";
import SelectField from "./SelectField";
function RegisterForms() {
  const [formData, setFormData] = useState({
 
    phoneCode: "66+", // กำหนดค่าเริ่มต้นสำหรับ phoneCode
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    phoneCode:false,
    phoneNumber: false, // เพิ่มการจัดการข้อผิดพลาดสำหรับ phoneNumber
  });

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:536px)");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  const handleSubmit = () => {
    const { phoneCode, phoneNumber } = formData;

    const newErrors = {
      phoneNumber: !phoneNumber, // ตรวจสอบหมายเลขโทรศัพท์
      phoneCode:!phoneCode,
    };

    setErrors(newErrors);

    if (!newErrors.phoneCode && !newErrors.phoneNumber) {
      console.log("ข้อมูลที่ส่ง:", formData);
      navigate("/policy-ownerInfo");
    }
  };

  return (
    <div>
      <FormContainer
        paddingBottom="40px"
        padding="0px"
        backgroundColor=""
        boxShadow="none"
      >
        <SectionTitle
          text="Create your account"
          fontSize="16px"
          fontWeight="500"
        />
        <ResponsiveStack isSmallScreen={isSmallScreen}>
          <SelectField
            label=""
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            options={["66+", "55+"]}
            error={errors.phoneCode}
            size="small"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            fullWidth
            InputLabelProps={{ shrink: true }}
            helperText={errors.phoneNumber ? "Please enter number." : ""}
          />
        </ResponsiveStack>
      
        <Stack direction="row" spacing={1} alignItems="center" sx={{}}>
          <Checkbox
            size="small"
            icon={
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: "1px solid #3FABD9",
                }}
              />
            }
            checkedIcon={
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: "1px solid #3FABD9",
                  backgroundColor: "#3FABD9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="fas fa-check"
                  style={{ fontSize: "10px", color: "white" }}
                />
              </Box>
            }
            sx={{ padding: 0 }}
          />
          <Link
            href="/terms-and-services"
            variant="body2"
            color="#3FABD9"
            sx={{
              textAlign: "right",
              fontSize: "10px",
              fontFamily: "Prompt",
              textDecoration: "none",
            }}
          >
          I agree to the Terms
          </Link>
        </Stack>

        <Stack alignItems="center">
          <Buttons
            onClick={handleSubmit}
            variant="primary"
            label="Send OTP"
            fontSize="16px"
            width="100%!important"
          />
        </Stack>
      </FormContainer>
    </div>
  );
}

export default RegisterForms;
