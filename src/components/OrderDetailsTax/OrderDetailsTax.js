import React from 'react'

import IndaraLogo from "../../assets/indara-logo.svg";
import Shield from "../../assets/shield.svg";
import CarIcon from "../../assets/car.svg";
import Vector2 from "../../assets/Vector2.svg";
import Vector3 from "../../assets/Vector3.svg";
import Vector4 from "../../assets/Vector4.svg";
import Vector5 from "../../assets/Vector5.svg";
import Vector6 from "../../assets/Vector6.svg";
import Vector7 from "../../assets/Vector7.svg";
import Vector8 from "../../assets/Vector8.svg";
import Vector9 from "../../assets/Vector9.svg";
import Vector10 from "../../assets/Vector10.svg";
import Vector11 from "../../assets/Vector11.svg";
import Vector12 from "../../assets/Vector12.svg";
import Vector13 from "../../assets/Vector13.svg";
import Vector14 from "../../assets/Vector14.svg";
import Vector15 from "../../assets/Vector15.svg";
import Calendar from "../../assets/Calendar.svg";
import Calendar1 from "../../assets/Calendar1.svg";
import Calendar2 from "../../assets/Calendar2.svg";
import Calendar3 from "../../assets/Calendar3.svg";
function OrderDetailsTax() {
  return (
    <div className="container-order-details">
    <div className="order-details__title">
      <h1>รายละเอียดการสั่งซื้อ</h1>
    </div>
    <div className="order-details__container">
      <div className="order-details__header-section">
        <div className="order-details__header-product-detail">
          <div className="order-details__header-product-box">
            <img src={Calendar} alt="" />
            <div className="order-details__header-product-name">
              <h1>ต่อภาษี</h1>
              <p>
                รหัสสินค้า <span>#Q1002404</span>
              </p>
            </div>
          </div>
          <div className="order-details__header-product-detail-box">
            <p>
              ผู้เอาประกันภัย: <span>นางสาว กานต์พิชชา เกษมศิรินาวิน</span>{" "}
            </p>
            <p>
              เบอร์โทร: <span>0922607795</span>{" "}
            </p>
            <p>
              อีเมล:: <span>test@gamail.com</span>{" "}
            </p>
          </div>
        </div>
   
      </div>
      <div className="order-details__content-section">
        <div className="order-details__content-box">
          <div className="order-details__content-title">
            <h1>ข้อมูลเครื่องยนต์</h1>
          </div>
          <div className="order-details__content-item">
            <img src={Vector2} alt="" />
            <div className="order-details__content-item-text" >
              <p>ปริมาตรกระบอกสูบ (CC)</p>
              <p>ความจุกระบอกสูบ (ซีซี)</p>
            </div>
          </div>
       
        </div>
        <div className="order-details__content-box">
          <div className="order-details__content-title">
            <h1>ปีล่าสุดที่ชำระภาษี</h1>
          </div>
          <div className="order-details__content-item">
            <img src={Calendar1} alt="" />
            <div className="order-details__content-item-text" >
              <p>วันที่จดทะเบียน</p>
              <p>1/02/2567</p>
            </div>
          </div>
          <div className="order-details__content-item">
            <img src={Calendar2} alt="" />
            <div className="order-details__content-item-text" >
              <p>ปีล่าสุดที่จ่าย</p>
              <p>1/02/2567</p>
            </div>
          </div>
          <div className="order-details__content-item">
            <img src={Calendar3} alt="" />
            <div className="order-details__content-item-text" >
              <p>วันที่ต้องการทําการจ่ายภาษี</p>
              <p>1/02/2567</p>
            </div>
          </div>
          <div className="order-details__content-item">
            <img src={Calendar3} alt="" />
            <div className="order-details__content-item-text" >
              <p>วันที่ต้องการทําการจ่ายภาษี</p>
              <p>1/02/2567</p>
            </div>
          </div>
        </div>
     
      </div>
      
    </div>
  </div>
  )
}

export default OrderDetailsTax
