import React, { useEffect, useState } from "react";
import "./ProfileDetailsPage.css";
import "../../components/layout-wrapper/layout-wrapper.css";
import Profile from "../../assets/profile1.svg";
import UserSettings from "../../components/Forms/UserSettings";
import CustomerMenu from "../../components/CustomerMenu/CustomerMenu";
import HandleBack from "../../components/handleBack/handleBack";
import Buttons from "../../components/Buttons/Buttons.js";
import axios from "axios";
import { baseURL } from "../../AuthContext.js";

function ProfileDetailsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData]  = useState();
  const [isEdit, setIsEdit]  = useState(false);

  const handleClick = () => {
    setShowPopup(true); // แสดง popup เมื่อกดปุ่ม

    // ซ่อน popup หลังจาก 3 วินาที
    setTimeout(() => {
      setShowPopup(false);
    }, 30000);
  };

  // * edit click
  const handleEdit = () => {
    setIsEdit(true)
  };

  // * cancel click
  const handleCancel = () => {
    setIsEdit(false)
  };

  // * request user data
  async function requestUserData() {
    try {
      const response = await axios.get(`${baseURL}/sys/user/setting/data`,
        {withCredentials: true}
      )
      if (response && response.data.status === "success") {
        setUserData(response.data.data);
      }
    } catch (error) {
      // ! error
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    requestUserData();
  }, [])

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
              <i className="fa-solid fa-user"></i>ข้อมูลเจ้าของบัญชี
            </div>

            <div className="profile-details-container">
              <div className="profile-info-container">
                {/* บอกชื่อของuser + รูป + อีเมล*/}
                {/* //TODO: dynamically username */}
                <div className="profile-info">
                  <div className="profile-img-container">
                    <img src={Profile} alt="Profile" />
                    <i className="fa-solid fa-camera change-icon"></i>{" "}
                    {/* ไอคอนเปลี่ยนรูปภาพ */}
                  </div>
                  <div className="profile-text">
                    {/* //TODO: dynamically username */}
                    <p className="profile-name">{userData && (userData.Username ?? "เกิดข้อผิดพลาด")}</p>
                    {/* <p className="profile-email">sampon251095@gmail.com</p> */}
                  </div>
                </div>

                {/* ปุ่มกด บันทึก จะเเสดงผลตอนขนาด จอ คอม 1024px มากขึ้นไป*/}
                <div className="account-info-warning">
                  <div className="account-info-text">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <p>ข้อมูลเจ้าของบัญชีไม่มีผลกระทบกับกรมธรรม์</p>
                  </div>
                  <div className="account-info-actions">
                    {isEdit && <Buttons
                      onClick={handleCancel}
                      label="ยกเลิก"
                      variant="cancel"
                      height="36px"
                      fontSize="14px"
                    />}
                    {isEdit ? <Buttons
                      onClick={handleClick} 
                      label="บันทึก"
                      variant="primary"
                      height="36px"
                      fontSize="14px"
                    />:
                    <Buttons
                      onClick={handleEdit} 
                      label="แก้ไข"
                      variant="primary"
                      height="36px"
                      fontSize="14px"
                    />
                    }
                  </div>
                </div>
              </div>

              {/* // * User Form */}
              {userData && <UserSettings userdata={userData} isEdit={isEdit}/>}

              {/* ปุ่มกด  สําหรับมือถือ จะเเสดง ตอนขนาด หน้าจอ น้อยว่า 1024px */}
              <div className="account-info-warning mobile">
                <div className="account-info-text">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <p>ข้อมูลเจ้าของบัญชีไม่มีผลกระทบกับกรมธรรม์</p>
                </div>
                <div className="account-info-actions">
                  {isEdit && <Buttons
                    onClick={handleCancel}
                    label="ยกเลิก"
                    variant="cancel"
                    height="36px"
                    fontSize="14px"
                  />}
                  {isEdit ? <Buttons
                      onClick={handleClick} 
                      label="บันทึก"
                      variant="primary"
                      height="36px"
                      fontSize="14px"
                    />:
                    <Buttons
                      onClick={handleEdit} 
                      label="แก้ไข"
                      variant="primary"
                      height="36px"
                      fontSize="14px"
                    />
                    }
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
  
      
              <div className="popup-confirm__title">
                <i className="fa-solid fa-circle-check"></i>
                <p>บันทึกข้อมูลแล้ว</p>
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
                  label="ยืนยัน"
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

export default ProfileDetailsPage;
