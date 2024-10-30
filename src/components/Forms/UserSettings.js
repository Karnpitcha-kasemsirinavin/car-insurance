
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import FormContainer from "./FormContainer.js";
import ResponsiveStack from "./ResponsiveStack.js";
import Button from "@mui/material/Button";
import line from "../../assets/LINE.png"
import { type } from "@testing-library/user-event/dist/type/index.js";

function UserSettings({ userdata, isEdit }) {
  // const [userData, setUserData]  = useState();

  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const [errors, setErrors] = useState({
    Username: false,
    Password: false,
  });

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const handleChange = (event) => {
    const { DisplayName, value } = event.target;

    setFormData({
      ...formData,
      [DisplayName]: value,
    });

    if (value) {
      setErrors({ ...errors, [DisplayName]: false });
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
        {[
          { label: "Username", errorKey: "Username", type: "text", disabled: false},
          { label: "Password", errorKey: "Password", type: "password", disabled: false },

        ].map((field) => (
          <div key={field.label} style={{ width: "100%" }}>
            <Typography variant="h6" sx={{ fontSize: "16px", marginBottom: "4px" }}>
              {field.label}
            </Typography>
            <TextField
              name={field.errorKey}
              value={userdata[field.errorKey]}
              onChange={handleChange}
              type={field.type}
              disabled={field.disabled === false ? !isEdit: field.disabled}
              error={errors[field.errorKey]}
              fullWidth
              helperText={
                errors[field.errorKey]
                  ? !formData[field.errorKey]
                    ? `กรุณากรอก ${field.label}`
                    : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
                  : ""
              }
              sx={{
                backgroundColor: "#F9F9F9",
                borderRadius: "8px",
                height: "52px",
                "& .MuiInputBase-root": { height: "100%" },
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  "& fieldset": { border: "none" },
                  "&:focus-within fieldset": { border: "2px solid #3FABD9" },
                },
              }}
            />
          </div>
        ))}
      </ResponsiveStack>

      <ResponsiveStack isSmallScreen={isSmallScreen} spacing={2}>
        {[
          { label: "เบอร์โทร", errorKey: "phoneNumber" , type: "tel", disabled: false},
          { label: "วันที่เริ่มเข้าร่วม", errorKey: "CreatedDate", type: "date", disabled: true},
          
        ].map((field) => (
          <div key={field.label} style={{ width: "100%" }}>
            <Typography variant="h6" sx={{ fontSize: "16px", marginBottom: "4px" }}>
              {field.label}
            </Typography>
            <TextField
              name={field.errorKey}
              value={userdata[field.errorKey]}
              type={field.type}
              disabled={field.disabled === false ? !isEdit: field.disabled}
              onChange={handleChange}
              error={errors[field.errorKey]}
              fullWidth
              helperText={
                errors[field.errorKey]
                  ? !formData[field.errorKey]
                    ? `กรุณากรอก ${field.label}`
                    : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
                  : ""
              }
              sx={{
                backgroundColor: "#F9F9F9",
                borderRadius: "8px",
                height: "52px",
                "& .MuiInputBase-root": { height: "100%" },
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  "& fieldset": { border: "none" },
                  "&:focus-within fieldset": { border: "2px solid #3FABD9" },
                },
              }}
            />
          </div>
        ))}
      </ResponsiveStack>

      {/* // * LINE */}
      <div isSmallScreen={isSmallScreen} spacing={2} style={{display: "flex", flexDirection: "row", justifyItems: "center", gap: "10px"}}>
        {[
          { label: "ชื่อจาก LINE", errorKey: "DisplayName" , type: "text", disabled: true},
          
        ].map((field) => (
          <div key={field.label} style={{ width: "100%" }}>
            <Typography variant="h6" sx={{ fontSize: "16px", marginBottom: "4px" }}>
              {field.label}
              <span style={{color: "#82C3DE"}}> *หากต้องการเชื่อมใหม่ โปรดกดทางด้านขวา</span>
            </Typography>
            <TextField
              name={field.errorKey}
              value={userdata[field.errorKey]}
              onChange={handleChange}
              type={field.type}
              disabled={field.disabled}
              error={errors[field.errorKey]}
              fullWidth
              helperText={
                errors[field.errorKey]
                  ? !formData[field.errorKey]
                    ? `กรุณากรอก ${field.label}`
                    : "กรุณากรอก (ในรูปแบบที่ถูกต้อง)"
                  : ""
              }
              sx={{
                backgroundColor: "#F9F9F9",
                borderRadius: "8px",
                height: "52px",
                "& .MuiInputBase-root": { height: "100%" },
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  "& fieldset": { border: "none" },
                  "&:focus-within fieldset": { border: "2px solid #3FABD9" },
                },
              }}
            />
          </div>
        ))}
        <Button>
          <img src={line} alt="Separator line" style={{maxWidth: "50px", marginBottom: "-30px"}}/>
        </Button>

      </div>

    </FormContainer>

  </div>
  );
}

export default UserSettings;
