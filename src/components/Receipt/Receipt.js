import React from "react";
import "./Receipt.css";
import Logo from "../../assets/logo.svg";

function Receipt() {
  return (
    
    <div className="container-receipt">
      <div className="receipt__header">
        <div className="receipt__summary-top">
          <h1>ใบเสร็จ</h1>
          <div className="receipt__summary-top__content">
            <p>
              วันที่ออกใบเสร็จ: <span>3 มีนาคม 2577</span>
            </p>
            <p>
              รหัสออเดอร์: <span>#LI7701</span>
            </p>
            <p>
              รหัสชําระเงิน: <span>#sdas105</span>
            </p>
            <p>
              สถานะ: <span>ตรวจสอบเเล้ว</span>
            </p>
          </div>
        </div>
        <div className="receipt__header-logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="receipt__details">
        <div className="receipt__customer">
          <p>เรียกเก็บเงินถึง</p>
          <h2>นาย ทศพร มีพร</h2>
          <p>สมุทรสาคร, ประเทศไทย</p>
        </div>
        <div className="receipt__company">
          <p>ชำระเงินถึง</p>
          <h2>บมจ.อินทรประกันภัย</h2>
          <p>กรุงเทพมหานคร, ประเทศไทย</p>
          <p>เลขประจำตัวผู้เสียภาษี: <span>0994000161450</span></p>
        </div>
      </div>
      <table className="receipt__table">
        <thead>
          <tr className="receipt__header-row">
            <th>รหัสสินค้า</th>
            <th>รายการ</th>
            <th>บริการที่ใช้</th>
            <th>ค่าบริการ</th>
            <th>ราคาสินค้า</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>รถเก๋ง</td>
            <td>ต่อกรมธรรม์</td>
            <td>2,000 บาท</td>
            <td>20,000 บาท</td>
          </tr>
          <tr>
            <td>002</td>
            <td>ต่อภาษี</td>
            <td>ภาษี</td>
            <td>1,500 บาท</td>
            <td>15,000 บาท</td>
          </tr>
          {/* เพิ่มแถวเพิ่มเติมตามต้องการ */}
        </tbody>
      </table>
      <div className="receipt__footer">
        <div className="receipt__footer-title">
        <p>ข้อมูลเพิ่มเติม</p>
        <p>ผลการคํานวณ</p>
      
        </div>
        <div className="receipt__footer-content">
          <div className="receipt__footer-more">
          <div className="receipt__footer-more-item">
          <p>ชื่อผู้ตรวจสอบ</p>
          <span>นาย ทศพล มีเงิน</span>
            </div>  
            <div className="receipt__footer-more-item">
          <p>ชื่อผู้ตรวจสอบ</p>
          <span>03/07/2577</span>
            </div> 
          </div>
          <div className="receipt__footer-calculation-summary">
          <div className="receipt__footer-summary-item">
          <p>ราคาสินค้ารวม:</p>
          <span>599.00 บาท</span>
            </div>  
            <div className="receipt__footer-summary-item">
          <p>ค่าบริการรวม:</p>
          <span>150.00 บาท</span>
            </div>  
            <div className="receipt__footer-summary-item">
          <p className="">ยอดรวม:</p>
          <span>150.00 บาท</span>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
