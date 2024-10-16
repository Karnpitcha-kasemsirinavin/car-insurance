import React from "react";
import "../../components/layout-wrapper/layout-wrapper.css";
import "./LoginPage.css";
import Logo from "./Logo"; // นำเข้าคอมโพเนนต์โลโก้
import CarIllustration from "./CarIllustration"; // นำเข้าคอมโพเนนต์ภาพประกอบรถ
import LogInForms from "../../components/Forms/LogInForms";
import ConnectOptions from "./ConnectOptions";
function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <Logo /> {/* แสดงโลโก้ */}
          <CarIllustration /> {/* แสดงภาพประกอบรถ */}
        </div>
        <LogInForms />
        <ConnectOptions />
      </div>
    </div>
  );
}

export default LoginPage;
