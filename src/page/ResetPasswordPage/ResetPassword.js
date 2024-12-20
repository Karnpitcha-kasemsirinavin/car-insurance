import React, { useState } from "react";
import "./ResetPassword.css";
import "../../components/layout-wrapper/layout-wrapper.css";
import Profile from "../../assets/profile1.svg";

import CustomerMenu from "../../components/CustomerMenu/CustomerMenu.js";
import HandleBack from "../../components/handleBack/handleBack.js";
import Buttons from "../../components/Buttons/Buttons.js";

import ResetPasswordForms from "../../components/Forms/ResetPasswordForms.js";

import { Typography, TextField } from "@mui/material";
function ResetPassword() {
  const [showPopup, setShowPopup] = useState(false); // สร้าง state เพื่อควบคุมการแสดง popup

  const handleClick = () => {
    setShowPopup(true); // แสดง popup เมื่อกดปุ่ม

    // ซ่อน popup หลังจาก 3 วินาที
    setTimeout(() => {
      setShowPopup(false);
    }, 30000);
  };

  return (
    <>
      {/* ปุ่มย้อนกลับ*/}
      <HandleBack />
      <div className="layout-wrapper desktop">
        <div className="profile-field-container">
          {/* เมนูของ user */}
          <CustomerMenu />

          <div className="profile-details">
            {/* หัวข้อหลัก*/}
            <div className="profile-details-title">
              <i class="fa-solid fa-lock"></i>ตั้งค่ารหัสใหม่
            </div>

            <div className="profile-details-container">
              <div className="profile-info-container">
                {/* บอกชื่อของuser + รูป + อีเมล*/}
                <div className="profile-info">
                  <div className="profile-img-container">
                    <img src={Profile} alt="Profile" />

                    {/* ไอคอนเปลี่ยนรูปภาพ */}
                  </div>
                  <div className="profile-text">
                    <p className="profile-name">Todsapon Meepon</p>
                    <p className="profile-email">sampon251095@gmail.com</p>
                  </div>
                </div>

                {/* ปุ่มกด บันทึก จะเเสดงผลตอนขนาด จอ คอม 1024px มากขึ้นไป*/}
                <div className="account-info-warning">
                  <div className="account-info-text">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <p>ข้อมูลเจ้าของบัญชีไม่มีผลกระทบกับกรมธรรม์</p>
                  </div>
                  <div className="account-info-actions">
                    <Buttons
                      onClick={() => console.log("ยกเลิก")}
                      label="ยกเลิก"
                      variant="cancel"
                      height="36px"
                      fontSize="14px"
                    />
                    <Buttons
                      onClick={handleClick} // ใช้ handleClick สำหรับปุ่มบันทึก
                      label="เเก้ไข"
                      variant="primary"
                      height="36px"
                      fontSize="14px"
                    />
                  </div>
                </div>
              </div>
              {/* ฟอร์ม ฟิว ที่ใช้ */}
              <ResetPasswordForms />
              {/* ปุ่มกด  สําหรับมือถือ จะเเสดง ตอนขนาด หน้าจอ น้อยว่า 1024px */}
              <div className="account-info-warning mobile">
                <div className="account-info-text">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <p>ข้อมูลเจ้าของบัญชีไม่มีผลกระทบกับกรมธรรม์</p>
                </div>
                <div className="account-info-actions">
                  <Buttons
                    onClick={() => console.log("ยกเลิก")}
                    label="ยกเลิก"
                    variant="cancel"
                    height="36px"
                    fontSize="14px"
                  />
                  <Buttons
                    onClick={handleClick} // ใช้ handleClick สำหรับปุ่มบันทึก
                    label="บันทึก"
                    variant="primary"
                    height="36px"
                    fontSize="14px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPopup && (
          <>
            {/* เพิ่ม overlay */}
            <div className="overlay" onClick={() => setShowPopup(false)}></div>

            <div className="popup-confirm">
              <div className="popup-confirm__title opt">
                <div className="otp-container">
                  <p className="otp-title">กรุณากรอก OTP</p>
                  <p className="otp-subtitle">
                    รหัสผ่าน OTP (ครั้งเดียว)ได้ถูกส่งไปยัง 98531212**32
                  </p>
                </div>
              </div>

              <div className="popup-confirm__input">
                <TextField
                  variant="outlined"
                  placeholder="กรอก OTP ที่นี่"
                  inputProps={{ maxLength: 6 }}
                  disabled // ทำให้ฟิลด์ไม่รับค่า
                  fullWidth
                  sx={{
                    textAlign: "center",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "&.Mui-focused fieldset": {
                        borderColor: "#3FABD9", // สีของกรอบตอนโฟกัส
                      },
                    },
                  }}
                />
                <a
                  href="#"
                  style={{
                    display: "block",
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "#3FABD9",
                    textAlign: "center",
                    textDecoration: "underline",
                    cursor: "pointer",
                    textAlign: "right",
                  }}
                >
                  ส่งรหัสอีกครั้ง
                </a>
              </div>

              <div className="popup-confirm__buttons">
                <Buttons
                  onClick={() => setShowPopup(false)}
                  label="ยกเลิก"
                  variant="cancel"
                  height="36px"
                  fontSize="14px"
                  width="100px"
                />
                <Buttons
                  onClick={() => setShowPopup(false)}
                  label="ส่ง"
                  variant="primary"
                  height="36px"
                  fontSize="14px"
                  width="100px"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ResetPassword;
