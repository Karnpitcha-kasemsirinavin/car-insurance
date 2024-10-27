import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import "./CustomerMenu.css";
import MemberProfileWelcome from "../MemberProfileWelcome/MemberProfileWelcome";
function CustomerMenu({ additionalClass }) {
  return (
    <div className={`customer-menu-container-main ${additionalClass}`}> {/* ใช้เทมเพลตลิทเทอรัลเพื่อเพิ่ม class */}
      <MemberProfileWelcome />
      <div className="customer-menu-container">
        <div className="customer-menu-box">
          <div className="customer-menu-title">ผลิตภัณฑ์และบริการ</div>
          <div className="customer-menu-name">
            <Link to="/my-policy">
              {" "}
              <i className="fa-regular fa-shield"></i> กรมธรรม์ของฉัน
            </Link>
          </div>
        </div>

        <div className="customer-menu-box">
          <div className="customer-menu-title">ตั้งค่า</div>
          <div className="customer-menu-name">
            <Link to="/profile-details-page">
              {" "}
              <i class="fa-regular fa-user"></i> ข้อมูลเจ้าของบัญชี
            </Link>
          </div>
          <div className="customer-menu-name">
            <Link to="/settings">
              {" "}
              <i class="fa-regular fa-key"></i> ตั้งค่ารหัสใหม่
            </Link>
          </div>
        </div>

        <div className="customer-menu-box">
          <div className="customer-menu-title">ศูนย์ช่วยเหลือ</div>
          <div className="customer-menu-name">
            <Link to="/my-policy">
              {" "}
              <i class="fa-regular fa-envelope"></i> ติดต่อเรา
            </Link>
          </div>
          <div className="customer-menu-name">
            <Link to="/my-policy">
              {" "}
              <i class="fa-regular fa-circle-info"></i> เกี่ยวกับเรา
            </Link>
          </div>
          <div className="customer-menu-name">
            <Link to="/my-policy">
              {" "}
              <i class="fa-light fa-circle-question"></i> คําถามที่พบบ่อย
            </Link>
          </div>
          <div className="customer-menu-name">
            <Link to="/my-policy">
              {" "}
              <i class="fa-regular fa-comment-code"></i> ข้อตกลงเเละเงื่อนไข
            </Link>
          </div>
        </div>
        <div className="customer-menu-footer">
          <Link to="/my-policy">
            <h1>ออกจากระบบ</h1>
          </Link>
          <p>เวอร์ชั่น 1.0</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerMenu;
