import React from "react";
import "./MemberProfileWelcome.css";
import Profile from "../../assets/profile1.svg";

function MemberProfileWelcome() {
  const getCurrentDate = () => {
    const daysOfWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
    const monthsOfYear = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const now = new Date();
    const day = daysOfWeek[now.getDay()];
    const date = now.getDate();
    const month = monthsOfYear[now.getMonth()];
    const year = now.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="member-profile-container">
      <div className="member-profile-img">
        <img src={Profile} alt="Profile" />
      </div>
      <div className="member-profile-welcome">
        <p className="welcome-message">
          ยินดีต้อนรับ;<span className="member-name">Todsapon</span>
        </p>
        <p className="welcome-date">{getCurrentDate()}</p> {/* แสดงวันที่ */}
      </div>
    </div>
  );
}

export default MemberProfileWelcome;
