import React, { useState } from "react";
import "./Sidenav.css"; // ไฟล์ CSS แยกสำหรับ Sidenav
import logo from "../../assets/logo.svg"; // รูป logo ของ bard
import { useAuth } from "../../AuthContext";

const Sidenav = ({ isOpen, toggleSidenav }) => {
  const [isListOpen, setIsListOpen] = useState(false); // ควบคุมการเปิด/ปิดของรายการประกัน
  const [isPromoListOpen, setPromoListOpen] = useState(false); // ควบคุมการเปิด/ปิดของรายการโปรโมชั่น
  const [isArticleListOpen, setArticleListOpen] = useState(false); // ควบคุมการเปิด/ปิดของรายการบทความ
  const [isConsultationListOpen, setConsultationListOpen] = useState(false); // ควบคุมการเปิด/ปิดของรายการปรึกษาประกัน

  const [isSystemListOpen, setSystemListOpen] = useState(false);
  const [isSettingListOpen, setSettingListOpen] = useState(false);
  const [isOptionsListOpen, setOptionsListOpen] = useState(false);
  const [isTypesListOpen, setTypesListOpen] = useState(false);

  const { permissions , userRole } = useAuth();

  console.log("user side: ", userRole);

  const hasPermission = (requiredPermission) => {
    return permissions.includes(requiredPermission);
  } 

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const togglePromoList = () => {
    setPromoListOpen(!isPromoListOpen);
  };

  const toggleArticleList = () => {
    setArticleListOpen(!isArticleListOpen);
  };

  const toggleConsultationList = () => {
    setConsultationListOpen(!isConsultationListOpen);
  };

  const toggleSystemList = () => {
    setSystemListOpen(!isSystemListOpen);
  };

  const toggleSettingList = () => {
    setSettingListOpen(!isSettingListOpen);
  };

  const toggleOptionsList = () => {
    setOptionsListOpen(!isOptionsListOpen);
  };

  const toggleTypesList = () => {
    setTypesListOpen(!isTypesListOpen);
  };

  return (
    <>
      {/* Overlay background */}
      {isOpen && <div className="overlay" onClick={toggleSidenav}></div>}

      <div className={`sidenav ${isOpen ? "sidenav--open" : ""}`}>
        {/* ปุ่มปิด */}
        <div className="sidenav__container">
          <i
            className="close-btn fa-solid fa-xmark-large"
            onClick={toggleSidenav}
          ></i>
          <img src={logo} alt="Logo" />
        </div>

        <a href="/" onClick={toggleList} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-shield"></i> บริการออนไลน์
          </span>
          {/* <i
            className={`fa-solid fa-chevron-${isListOpen ? "down" : "up"}`}
          ></i> */}
        </a>

        {/* รายการที่แสดงเมื่อคลิกสำหรับประกัน */}
        {/* <div className={`sidenav__dropdown-list ${isListOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="/buy-insurance">
                  <i className="fa-solid fa-comment-dots"></i> ประกัน พ.ร.บ.
              </a>
            </li>
            <li>
              <i className="fa-solid fa-book"></i> ออกภาษี
            </li>
          </ul>
        </div> */}

        {/* ลิงก์สำหรับโปรโมชั่น */}
        {/* <a href="#" onClick={togglePromoList} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-tags"></i> โปรโมชั่น
          </span>
          <i
            className={`fa-solid fa-chevron-${isPromoListOpen ? "down" : "up"}`}
          ></i>
        </a> */}

        {/* รายการที่แสดงเมื่อคลิกสำหรับโปรโมชั่น */}
        {/* <div className={`sidenav__dropdown-list ${isPromoListOpen ? "open" : ""}`}>
          <ul>
            <li>
              <i className="fa-solid fa-percentage"></i> โปรโมชั่น 1
            </li>
            <li>
              <i className="fa-solid fa-star"></i> โปรโมชั่น 2
            </li>
            <li>
              <i className="fa-solid fa-bell"></i> โปรโมชั่น 3
            </li>
          </ul>
        </div> */}

        {/* ลิงก์สำหรับบทความ */}
        {/* <a href="#" onClick={toggleArticleList} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-newspaper"></i> บทความ
          </span>
          <i
            className={`fa-solid fa-chevron-${isArticleListOpen ? "down" : "up"}`}
          ></i>
        </a> */}

        {/* รายการที่แสดงเมื่อคลิกสำหรับบทความ */}
        {/* <div className={`sidenav__dropdown-list ${isArticleListOpen ? "open" : ""}`}>
          <ul>
            <li>
              <i className="fa-solid fa-file-alt"></i> บทความ 1
            </li>
            <li>
              <i className="fa-solid fa-file-alt"></i> บทความ 2
            </li>
            <li>
              <i className="fa-solid fa-file-alt"></i> บทความ 3
            </li>
          </ul>
        </div> */}

        {/* ลิงก์สำหรับปรึกษาประกันฟรี */}
        {/* <a href="#" onClick={toggleConsultationList} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-comments"></i> ปรึกษาประกันฟรี
          </span>
          <i
            className={`fa-solid fa-chevron-${isConsultationListOpen ? "down" : "up"}`}
          ></i>
        </a> */}

        {/* รายการที่แสดงเมื่อคลิกสำหรับปรึกษาประกัน */}
        {/* <div className={`sidenav__dropdown-list ${isConsultationListOpen ? "open" : ""}`}>
          <ul>
            <li>
              <i className="fa-solid fa-comment-dots"></i> ปรึกษาผ่านโทรศัพท์
            </li>
            <li>
              <i className="fa-solid fa-comment-dots"></i> ปรึกษาผ่านแชท
            </li>
          </ul>
        </div> */}
        {/* // * Admin =================================================================================== */}
        {hasPermission("manage") && 
        <>
        <h2 className="sidenav-topic">ระบบการจัดการ</h2>
        {/* // User */}
        <a href="#" onClick={toggleConsultationList} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-comments"></i> ประเภทและผู้ใช้งาน
          </span>
          <i
            className={`fa-solid fa-chevron-${isConsultationListOpen ? "down" : "up"}`}
          ></i>
        </a>

        {/* รายการที่แสดงเมื่อคลิก */}
        <div className={`sidenav__dropdown-list ${isConsultationListOpen ? "open" : ""}`}>
        <ul>
          <li>
              <a href="/admin/users">
                  <i className="fa-solid fa-comment-dots"></i> ผู้ใช้งาน (Users)
              </a>
          </li>
          <li>
              <a href="/admin/userRoles?table=roles">
                  <i className="fa-solid fa-comment-dots"></i> ประเภทผู้ใช้งาน (Roles)
              </a>
          </li>
        </ul>
        </div>

        {/* // Setting */}
        <a href="#" onClick={(toggleSettingList)} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-comments"></i> การตั้งค่าระบบ
          </span>
          <i
            className={`fa-solid fa-chevron-${isSettingListOpen ? "down" : "up"}`}
          ></i>
        </a>

        {/* รายการที่แสดงเมื่อคลิก */}
        <div className={`sidenav__dropdown-list ${isSettingListOpen ? "open" : ""}`}>
        <ul>
          <li>
              <a href="/admin/setting?table=servicesys">
                  <i className="fa-solid fa-comment-dots"></i> เวลาและบริการ 
              </a>
          </li>
          <li>
              <a href="/admin/setting?table=notifysys">
                  <i className="fa-solid fa-comment-dots"></i> การส่งแจ้งเตือน
              </a>
          </li>
          <li>
              <a href="/admin/setting?table=liffsys">
                  <i className="fa-solid fa-comment-dots"></i> LINE Front-end Framework
              </a>
          </li>
        </ul>
        </div>

        {/* // Veh Type */}
        <a href="#" onClick={toggleTypesList} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-comments"></i> ประเภทรถยนต์และแพ็คเกจ
          </span>
          <i
            className={`fa-solid fa-chevron-${isTypesListOpen ? "down" : "up"}`}
          ></i>
        </a>

        {/* รายการที่แสดงเมื่อคลิก*/}
        <div className={`sidenav__dropdown-list ${isTypesListOpen ? "open" : ""}`}>
        <ul>
          <li>
              <a href="/admin/vehtype?table=vehiclecode">
                  <i className="fa-solid fa-comment-dots"></i> ประเภทรถยนต์
              </a>
          </li>
          <li>
              <a href="/admin/package?table=cmipackage">
                  <i className="fa-solid fa-comment-dots"></i> แพ็คเกจ พรบ
              </a>
          </li>
        </ul>
        </div>

        {/* // Options */}
        <a href="#" onClick={toggleOptionsList} className="sidenav__toggle-link">
          <span>
            <i className="fa-solid fa-comments"></i> ตัวเลือกต่างๆ
          </span>
          <i
            className={`fa-solid fa-chevron-${isOptionsListOpen ? "down" : "up"}`}
          ></i>
        </a>

        {/* รายการที่แสดงเมื่อคลิก*/}
        <div className={`sidenav__dropdown-list ${isOptionsListOpen ? "open" : ""}`}>
        <ul>
          <li>
              <a href="/admin/options?table=addroptions">
                  <i className="fa-solid fa-comment-dots"></i> ที่อยู่
              </a>
          </li>
          <li>
              <a href="/admin/options?table=coloroptions">
                  <i className="fa-solid fa-comment-dots"></i> สีรถยนต์
              </a>
          </li>
          <li>
              <a href="/admin/options?table=platetypeoptions">
                  <i className="fa-solid fa-comment-dots"></i> ประเภทป้ายทะเบียน
              </a>
          </li>
          <li>
              <a href="/admin/options?table=idtypeoptions">
                  <i className="fa-solid fa-comment-dots"></i> ประเภทบัตร
              </a>
          </li>
          <li>
              <a href="/admin/options?table=insuredtypeoptions">
                  <i className="fa-solid fa-comment-dots"></i> ประเภทผู้ขอกรมธรรม์
              </a>
          </li>
          <li>
              <a href="/admin/options?table=titleoptions">
                  <i className="fa-solid fa-comment-dots"></i> คำนำหน้า
              </a>
          </li>
          <li>
              <a href="/admin/options?table=vehicleprovinceoptions">
                  <i className="fa-solid fa-comment-dots"></i> จังหวัดที่จดทะเบียน
              </a>
          </li>
        </ul>
        </div>
      </>}
        
      </div>
    </>
  );
};

export default Sidenav;
