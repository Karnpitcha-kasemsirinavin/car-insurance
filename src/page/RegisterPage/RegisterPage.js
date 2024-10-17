import React from "react";
import Logo from "../../components/Logos/Logo"; // นำเข้าคอมโพเนนต์โลโก้
import CarIllustration from "../../components/Illustrations/CarIllustration"; // นำเข้าคอมโพเนนต์ภาพประกอบรถ
import "./RegisterPage.css";
import RegisterForms from "../../components/Forms/RegisterForms";
import ConnectOptions from "../../components/ConnectOptions/ConnectOptions";
import CityDriver from "../../assets/City driver-rafiki.svg"
function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-container" style={{ position: "relative" }}>
        <div className="auth-image">
          <Logo /> {/* แสดงโลโก้ */}
          <CarIllustration  src={CityDriver} width="234px"/> {/* แสดงภาพประกอบรถ */}
        </div>
        <RegisterForms />
        <ConnectOptions />
      </div>
    </div>
  );
}

export default RegisterPage;
