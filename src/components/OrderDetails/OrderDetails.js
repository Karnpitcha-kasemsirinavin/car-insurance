import React from "react";
import "./OrderDetails.css";
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


function OrderDetails() {
  return (
    <div className="container-order-details">
      <div className="order-details__title">
        <h1>รายละเอียดการสั่งซื้อ</h1>
      </div>
      <div className="order-details__container">
        <div className="order-details__header-section">
          <div className="order-details__header-product-detail">
            <div className="order-details__header-product-box">
              <img src={Shield} alt="" />
              <div className="order-details__header-product-name">
                <h1>กรมธรรม์</h1>
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
          <div className="order-details__header-company">
            <img src={IndaraLogo} alt="" />
            <p>บริษัท อินทรประกันภัย</p>
          </div>
        </div>
        <div className="order-details__content-section">
          <div className="order-details__content-box">
            <div className="order-details__content-title">
              <h1>ข้อมูลรถยนต์</h1>
            </div>
            <div className="order-details__content-item">
              <img src={CarIcon} alt="" />
              <div className="order-details__content-item-text" >
                <p>ประเภทรถยนต์</p>
                <p>รถเก๋ง</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector2} alt="" />
              <div className="order-details__content-item-text" >
                <p>ปริมาตรกระบอกสูบ (CC)</p>
                <p>2000</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector3} alt="" />
              <div className="order-details__content-item-text" >
                <p>นํ้าหนักรถ (kg)</p>
                <p>2000</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector4} alt="" />
              <div className="order-details__content-item-text" >
                <p>จํานวนที่นั่ง</p>
                <p>4</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector5} alt="" />
              <div className="order-details__content-item-text" >
                <p>สีรถยนต์</p>
                <p>สีเทา</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector6} alt="" />
              <div className="order-details__content-item-text" >
                <p>ชนิดทะเบียนรถยนต์</p>
                <p>รถยนต์ในประเทศ มีทะเบียน</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector7} alt="" />
              <div className="order-details__content-item-text" >
                <p>เลขทะเบียนรถยนต์ (กลุ่มที่ 1)</p>
                <p>หก</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector7} alt="" />
              <div className="order-details__content-item-text" >
                <p>เลขทะเบียนรถยนต์ (กลุ่มที่ 2)</p>
                <p>3241</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector8} alt="" />
              <div className="order-details__content-item-text" >
                <p>อายุรถยนต์ (ปี)</p>
                <p>4 ปี</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector9} alt="" />
              <div className="order-details__content-item-text" >
                <p>ประเทศรถยนต์</p>
                <p>ไทย</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector10} alt="" />
              <div className="order-details__content-item-text" >
                <p>ลักษณะการซ่อม</p>
                <p>ซ่อมอู่</p>
              </div>
            </div>
          </div>
          <div className="order-details__content-box">
            <div className="order-details__content-title">
              <h1>ข้อมูลรถยนต์</h1>
            </div>
            <div className="order-details__content-item">
              <img src={Vector11} alt="" />
              <div className="order-details__content-item-text" >
                <p>หมายเลขเครื่อง</p>
                <p>Chasis43sdfsdd23fsdef234</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector12} alt="" />
              <div className="order-details__content-item-text" >
                <p>หมายเลขตัวถัง</p>
                <p>Chasis43sdfsdd23fsdef234</p>
              </div>
            </div>
            <div className="order-details__content-title">
              <h1>ข้อมูลผู้ของเอกสาร</h1>
            </div>
            <div className="order-details__content-item">
              <img src={Vector13} alt="" />
              <div className="order-details__content-item-text" >
                <p>ประเภทผู้ขอเอกสาร</p>
                <p>บุคคลธรรมดา</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector14} alt="" />
              <div className="order-details__content-item-text" >
                <p>สาขาผู้ขอเอกสาร:</p>
                <p>-</p>
              </div>
            </div>
            <div className="order-details__content-title">
              <h1>ข้อมูลบัตรประจําตัว</h1>
            </div>
            <div className="order-details__content-item">
              <img src={Vector15} alt="" />
              <div className="order-details__content-item-text" >
                <p>ประเภทบัตร</p>
                <p>IDType</p>
              </div>
            </div>
            <div className="order-details__content-item">
              <img src={Vector15} alt="" />
              <div className="order-details__content-item-text" >
                <p>วันบัตรหมดอายุ</p>
                <p>22 ก.ค. 2024</p>
              </div>
            </div>
            
          </div>
       
        </div>
        
      </div>
    </div>
  );
}

export default OrderDetails;
