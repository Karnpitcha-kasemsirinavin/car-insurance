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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function RegisterForms() {
  // * get from previous page
  const location = useLocation();
  const { productId } = location.state || {};
  const [isOpenTerm, setIsOpenTerm] = useState(false);

  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    ConfirmPassword: "",
    phoneCode: "66+",
    phoneNumber: "",
    termAgree: false,
  });

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^.{10,20}$/;
  const tenDigitPhoneRegex = /^\d{9}$/;

  const [errors, setErrors] = useState({
    Username: false,
    Password: false,
    ConfirmPassword: false,
    phoneCode:false,
    phoneNumber: false,
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
    const { phoneCode, phoneNumber, Username,
      Password, ConfirmPassword } = formData;

    const newErrors = {
      Username: !Username || !usernameRegex.test(Username),
      Password: !Password || !passwordRegex.test(Password),
      ConfirmPassword: !ConfirmPassword,
      phoneNumber: !phoneNumber || !tenDigitPhoneRegex.test(phoneNumber),
      phoneCode:!phoneCode,
    };

    setErrors(newErrors);
    // console.log("current error:", newErrors);
    // console.log("current data:", formData);

    if (ConfirmPassword) {
      newErrors.ConfirmPassword = checkConfirmPassword();
    }

    if (Object.values(newErrors).every(value => value === false)) {
      console.log("ข้อมูลที่ส่ง:", formData);
      if (formData.termAgree === false) {
        setIsOpenTerm(true);
      } else {
        // * navigate and send data
        navigate("/otp-page", {
          state: {
          userData: {...formData, phoneNumber: "0" + formData.phoneNumber},
          productId: productId
          }
        })
      }
      // navigate("/policy-ownerInfo");
    }
  }; 

  const handleTermAgreement = () => {
    const tempFormData = {...formData};
    tempFormData.termAgree = !tempFormData.termAgree;
    setFormData(tempFormData);
  }

  const checkConfirmPassword = () => {
    if (formData.Password === formData.ConfirmPassword) {
      return false;
    } else {
      return true;
    }
  }

  // * close pop up
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      if (formData.termAgree === false) {
        handleTermAgreement();
        setIsOpenTerm(false);
      } else {

      }
    }
  }

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

        <ResponsiveStack>
        <TextField
            label="Username"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            error={!!errors.Username}
            fullWidth
            InputLabelProps={{ shrink: true }}
            helperText={errors.Username ? 
              formData.Username ?
              "โปรดกรอก Username ให้ถูกต้อง"
              : "โปรดกรอก Username"
              : ""}
            inputProps={{ maxLength: 10 }}
            type="username"
          />
        </ResponsiveStack>
        
        <ResponsiveStack>
        <TextField
            label="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            error={!!errors.Password}
            fullWidth
            InputLabelProps={{ shrink: true }}
            helperText={errors.Password ? 
              formData.Password ?
              "โปรดกรอกรหัสอย่างน้อย 10 ตัวอักษรถึง 20 ตัวอักษร"
              : "โปรดกรอกรหัส"
              : ""}
            inputProps={{ minLength: 10,  maxLength: 20 }}
            type="password"
          />
        </ResponsiveStack>

        <ResponsiveStack>
          <TextField
            label="ConfirmPassword"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            error={!!errors.ConfirmPassword}
            fullWidth
            InputLabelProps={{ shrink: true }}
            helperText={errors.ConfirmPassword ? 
              formData.ConfirmPassword ?
              "โปรดกรอกรหัสให้ตรงหับรหัสข้างบน"
              : "โปรดกรอกรหัสอีกครั้ง"
              : ""}
            inputProps={{ minLength: 10,  maxLength: 20 }}
            type="password"
          />
        </ResponsiveStack>

        <ResponsiveStack isSmallScreen={isSmallScreen}>
          {/* <SelectField
            label=""
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            options={["66+", "55+"]}
            error={errors.phoneCode}
            size="small"
          /> */}
          <TextField
            label=""
            name="phoneCode"
            value={formData.phoneCode}
            error={!!errors.phoneNumber}
            // fullWidth
            InputLabelProps={{ shrink: true }}
            disabled
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            fullWidth
            InputLabelProps={{ shrink: true }}
            helperText={errors.phoneNumber ? 
              "โปรดใส่เบอร์โทร" 
              : ""}
            type="tel"
          />
        </ResponsiveStack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{}}
        // onClick={handleTermAgreement}
        >
          <Checkbox
            checked={formData.termAgree}
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
            // href="/terms-and-services"
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
{/* 
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Popup
      </Button> */}
      
      <Dialog open={isOpenTerm} onClose={handleClose}>
        <DialogTitle>Popup Title</DialogTitle>
        <DialogContent>
          <Typography>
            Here's an example of a comprehensive Terms of Service (TOS) document. This is a general template that covers various aspects, such as usage rights, user responsibilities, privacy, limitations of liability, and more. You can customize it according to the specifics of your service or application.

            Terms of Service
            Effective Date: [Date]

            Welcome to [Your Company Name]!

            These Terms of Service ("Terms") govern your access to and use of the services provided by [Your Company Name] (referred to as "we," "us," or "our"). By accessing or using our website, application, or any related services, you agree to be bound by these Terms. If you do not agree to these Terms, you should not use our services.

            1. Acceptance of Terms
            By using our services, you agree to these Terms, our Privacy Policy, and any other guidelines or rules posted on our website or application. If you do not agree, please refrain from using our services.

            2. Changes to the Terms
            We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our website. It is your responsibility to review the Terms periodically. Continued use of our services after changes constitute acceptance of the modified Terms.

            3. Eligibility
            Our services are intended for users who are at least 18 years old. By using our services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into this agreement.

            4. Account Registration
            To access certain features of our services, you may be required to register for an account. You agree to:

            Provide accurate, current, and complete information during the registration process.
            Maintain the security of your account by not sharing your password with others.
            Notify us immediately of any unauthorized use of your account.
            You are responsible for all activities that occur under your account.

            5. User Conduct
            You agree to use our services only for lawful purposes and in a way that does not infringe on the rights of, restrict, or inhibit anyone else's use of the services. Prohibited behavior includes but is not limited to:

            Violating any applicable laws or regulations.
            Posting or transmitting content that is defamatory, offensive, or obscene.
            Attempting to gain unauthorized access to our systems or networks.
            Engaging in any activity that interferes with or disrupts our services.
            6. Intellectual Property
            All content, trademarks, logos, and other intellectual property on our services are owned by or licensed to [Your Company Name]. You are granted a limited, non-exclusive, and non-transferable license to use our services for personal, non-commercial purposes. You may not:

            Modify, distribute, or reproduce any part of the content without our express written consent.
            Use our trademarks or logos without permission.
            7. Privacy Policy
            Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and disclose your personal information. By using our services, you consent to our collection and use of personal data as described in our Privacy Policy.

            8. Third-Party Services and Links
            Our services may contain links to third-party websites or services that are not owned or controlled by [Your Company Name]. We do not endorse or assume responsibility for any third-party content, products, or services. You acknowledge and agree that we are not responsible for the availability or accuracy of any third-party services.

            9. Termination
            We reserve the right to terminate or suspend your account and access to our services, at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. Upon termination, your right to use our services will immediately cease.

            10. Limitation of Liability
            To the fullest extent permitted by law, [Your Company Name] and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:

            Your access to or use of or inability to access or use our services.
            Any conduct or content of any third party on our services.
            Any content obtained from our services.
            Unauthorized access, use, or alteration of your transmissions or content.
            11. Disclaimer of Warranties
            Our services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the availability, accuracy, or reliability of the services. To the extent permitted by law, we disclaim all warranties, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.

            12. Indemnification
            You agree to indemnify, defend, and hold harmless [Your Company Name], its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the services, your violation of these Terms, or your violation of any rights of another.

            13. Governing Law and Jurisdiction
            These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in [Your City, Country/State] to resolve any legal matter arising from these Terms or your use of our services.

            14. Miscellaneous
            Severability: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
            Entire Agreement: These Terms constitute the entire agreement between you and [Your Company Name] concerning our services and supersede all prior agreements.
            Waiver: Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            15. Contact Information
            If you have any questions or concerns about these Terms, please contact us at:
          </Typography>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default RegisterForms;
