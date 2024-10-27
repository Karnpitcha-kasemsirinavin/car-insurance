import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";
import "../layout-wrapper/layout-wrapper.css"; // css ปรับขนาดหน้าจอต่างๆ
import logo from "../../assets/logo.svg"; // รูป logo ของ bard
import Sidenav from '../sidenav/Sidenav'; // เปลี่ยนชื่อให้ตรงกับชื่อไฟล์จริง

function Navbar() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false); // สร้าง state สำหรับจัดการ Sidenav
  const [openDropdown, setOpenDropdown] = useState(null); // สร้าง state สำหรับจัดการ dropdown ที่เปิดอยู่
  const dropdownRef = useRef(null); // สร้าง ref สำหรับ dropdown

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen); // สลับสถานะ Sidenav
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName)); // เปิด dropdown ที่เลือกหรือปิดถ้าเปิดอยู่
  };

  // ใช้ useEffect เพื่อตรวจสอบคลิกนอก dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null); // ปิด dropdown เมื่อคลิกนอก
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // เพิ่ม event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // ลบ event listener เมื่อ unmount
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger-menu" onClick={toggleSidenav}>
          <i className="fa-light fa-bars"></i>
        </button>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="navbar-center" ref={dropdownRef}>
        <div className="navbar-item" onClick={() => toggleDropdown("insurance")}>
          <span>
            ซื้อประกันออนไลน์{" "}
           <i
    className={`fa-solid fa-chevron-down transition-icon ${openDropdown === "insurance" ? "rotate" : ""}`}
  ></i>
          </span>
          <div className={`dropdown ${openDropdown === "insurance" ? "open" : ""}`}>
            <ul>
              <li><i className="fa-solid fa-shield"></i>รายการ 1</li>
              <li><i className="fa-solid fa-shield"></i>รายการ 2</li>
              <li><i className="fa-solid fa-shield"></i>รายการ 3</li>
            </ul>
          </div>
        </div>

        <div className="navbar-item" onClick={() => toggleDropdown("articles")}>
          <span>
            บทความ{" "}
            <i className={`fa-solid fa-chevron-down transition-icon ${openDropdown === "articles" ? "rotate" : ""}`}></i>
          </span>
          <div className={`dropdown ${openDropdown === "articles" ? "open" : ""}`}>
            <ul>
              <li>บทความ 1</li>
              <li>บทความ 2</li>
              <li>บทความ 3</li>
            </ul>
          </div>
        </div>

        <div className="navbar-item" onClick={() => toggleDropdown("promotions")}>
          <span>
            โปรโมชัน{" "}
            <i className={`fa-solid fa-chevron-down transition-icon ${openDropdown === "promotions" ? "rotate" : ""}`}></i>
          </span>
          <div className={`dropdown ${openDropdown === "promotions" ? "open" : ""}`}>
            <ul>
              <li>โปรโมชัน 1</li>
              <li>โปรโมชัน 2</li>
              <li>โปรโมชัน 3</li>
            </ul>
          </div>
        </div>

        <div className="navbar-item" onClick={() => toggleDropdown("consultation")}>
          <span>
            ปรึกษาประกันฟรี{" "}
            <i className={`fa-solid fa-chevron-down transition-icon ${openDropdown === "consultation" ? "rotate" : ""}`}></i>
          </span>
          <div className={`dropdown ${openDropdown === "consultation" ? "open" : ""}`}>
            <ul>
              <li>คำปรึกษา 1</li>
              <li>คำปรึกษา 2</li>
              <li>คำปรึกษา 3</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar__right">
        <div className="navbar__icon">
          <a href="tel:081-234-5678">
            <i className="fa-regular fa-phone-volume"></i>
            <span>081-234-5678</span>
        
          </a>
        </div>
        <div className="navbar__icon">
          <a href="https://line.me" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-line"></i>
          </a>
        </div>
        <div className="navbar__icon">
          <a href="/member-page">
          <i className="fa-solid fa-user"></i>
          <span>Todsapon</span>
          {/*<span>เข้าสู่ระบบ</span> */}
          </a>
         
        </div>
      </div>

      {/* Sidenav Component */}
      <Sidenav isOpen={isSidenavOpen} toggleSidenav={toggleSidenav} />
    </nav>
  );
}

export default Navbar;
