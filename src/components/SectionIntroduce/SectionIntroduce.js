import React from "react";
import "./SectionIntroduce.css";
import CarWrapper  from "../../assets/driving-car.svg"
import Buttons from "../Buttons/Buttons";
function SectionIntroduce() {
  const handleScroll = () => {
    // ใช้ querySelector เพื่อเลือก class section-introduce
    const section = document.querySelector('.insurance-container');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className="section-introduce">
      <div className="intro-container">
        <div className="intro-text-box">
          <div className="intro-main-title">มั่นใจในอนาคต</div>
          <div className="intro-sub-title">ด้วยประกันที่ตอบโจทย์คุณ</div>
          <div className="intro-slogan">จากบริษัททิพยประกันภัยอันดับ1
          ครอบคลุมทุกความต้องการ</div>

          {/* icon เพื่อการตกเเต่ง */}
          <i className="fa-sharp fa-regular fa-sparkles" style={{ fontSize: '43px', position: 'absolute', bottom: '0px',  top:'0px' , right: '170px'}}></i>
          <i class="fa-regular fa-circle one"  style={{ fontSize: '10px', position: 'absolute', bottom:'17px',left:"-22px"}}></i>

          <i class="fa-regular fa-circle"  style={{ fontSize: '10px', position: 'absolute', bottom:'6px',left:"283px"}}></i>
          <i class="fa-regular fa-circle"  style={{ fontSize: '10px', position: 'absolute', bottom:'-6px',left:"271px"}}></i>
          <div className="icon-"></div>
          <div className="intro-btn-container">
          <Buttons  onClick={handleScroll}  label="รับแผนที่ใช่ในไม่กี่ขั้นตอน" variant="primary" fontSize='18px' width="260px" height="60px"/>
          </div>
        </div>
        <div className="banner-lottie-wrapper"> <img src={CarWrapper}  alt="Car driving illustration"  /></div>
      
      </div>
    </div>
  );
}

export default SectionIntroduce;
