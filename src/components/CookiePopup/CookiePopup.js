// CookiePopup.jsx
import React, { useState, useEffect } from "react";
import "./CookiePopup.css";

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem("cookieAccepted");
    if (!isAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="cookie-popup">
        <div className="cookie-popup-title">
        <p>เว็บไซต์นี้ใช้คุ้กกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ</p>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"><p>อ่านเพิ่มเติม</p></a>
        </div>
 
      <div className="cookie-popup-button">
        <button onClick={handleAccept}>ยอมรับ</button>
        <button onClick={handleDecline}>ปฏิเสธ</button>
      </div>
    </div>
    )
  );
};

export default CookiePopup;
