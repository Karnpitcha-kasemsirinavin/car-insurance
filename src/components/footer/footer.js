import React from "react";
import "./footer.css";

import Logo from "../../assets/logo.svg";

function Footer() {
  return (
    <div className="footer-bg">
      <div className="footer-container">
        <div className="footer-container-left">
          <div className="footer-left-box">
            <div className="footer-logo">
              <img src={Logo} alt="Company Logo" />
            </div>
            <div className="footer-contact">
              <div className="footer-number">
                <i className="fas fa-phone"></i>
                <p>096-040-1148</p>
              </div>
              <div className="footer-email">
                <i className="fas fa-envelope"></i>
                <p>sampon@gmail.com</p>
              </div>
              <div className="footer-line">
                <i class="fa-brands fa-line"></i>
                <p>line</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-container-right">
  <div className="footer-category">
    <p className="footer-category-title">ซื้อประกันออนไลน์</p>
    <a href="" className="footer-link-item">ประกันรถยนต์ภาคบังคับ (พ.ร.บ.)</a>
    <a href="" className="footer-link-item">ประกันรถยนต์ภาคสมัครใจ</a>
    <a href="" className="footer-link-item">ประกันเดินทาง</a>
    <a href="" className="footer-link-item">ประกันอุบัติเหตุ</a>
  </div>
  <div className="footer-category">
    <p className="footer-category-title">เกี่ยวกับ Drive Safe</p>
    <a href="" className="footer-link-item">บทความ</a>
    <a href="" className="footer-link-item">รู้จัก Drive Safe</a>
    <a href="" className="footer-link-item">นโยบายคุ้มครองข้อมูลส่วนบุคคล</a>
    <a href="" className="footer-link-item">นโยบายการใช้คุกกี้</a>
    <a href="" className="footer-link-item">เงื่อนไขการซื้อประกัน</a>
  </div>

  
</div>

      </div>

      <p className="footer-copyright">
        © Copyright 2023 บริษัท ไดพเซฟ จำกัด (มหาชน)
      </p>
    </div>
  );
}

export default Footer;
