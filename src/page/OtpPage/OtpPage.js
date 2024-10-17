import React from "react";

import "./Auth.css";
import OtpForms from"../../components/Forms/OtpForms"
function OtpPage() {
  return (
    <div className="auth-page">
      <div className="auth-container customize" style={{ position: "relative" }}>
        <div className="auth__title">
          <h1>Verify your number</h1>
        </div>
        <OtpForms/>
      </div>
      
    </div>
  );
}

export default OtpPage;
