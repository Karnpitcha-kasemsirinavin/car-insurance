import React from "react";
import  "./MemberPage.css"
import CustomerMenu from "../../components/CustomerMenu/CustomerMenu";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack";
import Car from "../../assets/driving-car.svg"
function memberPage() {
  return (
    <>
      <HandleBack />
      <div className="layout-wrapper desktop">
        <div className="member-page-container">
        <CustomerMenu additionalClass="mobile" />
        <div className="member-page__welcome">
    <img src={Car} alt="" />
        </div>
        </div>
       

      </div>
    </>
  );
}

export default memberPage;
