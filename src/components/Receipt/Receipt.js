import React, { useEffect, useState } from "react";
import "./Receipt.css";
import Logo from "../../assets/logo.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../App";

function Receipt({details, totalProducts, totalService, totalPrice}) {


  return (
    <div className="container-receipt" id="receipt-content">
      <div className="receipt__header">
        <div className="receipt__summary-top">
          {/* // * top left order details */}
          {Object.keys(details).length !== 0 && 
          <>
          <h1>ใบเสร็จ</h1>
          <div className="receipt__summary-top__content">
            <p>
              วันที่ออกใบเสร็จ: <span>{`${details.ReceiptDate}`}</span>
            </p>
            <p>
              รหัสออเดอร์: <span>{`${details.OrderDetails.orderId}`}</span>
            </p>
            <p>
              รหัสชําระเงิน:
              {details.PaymentDataCMI && <span>{` ${details.PaymentDataCMI.paymentId}`}</span>}
              <span>{" ,"}</span>
              {details.PaymentDataTax && <span>{` ${details.PaymentDataTax.paymentId}`}</span>}
            </p>
            <p>
              สถานะ: 
              <span>{details.OrderDetails.Status === 0 ? " ยังไม่ได้ตรวจสอบ" :" ตรวจสอบเเล้ว"}</span>
            </p>
          </div>
          </>}
        </div>
        <div className="receipt__header-logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      {/* // * top left user details */}
      {Object.keys(details).length !== 0 && 
      <div className="receipt__details">
        <div className="receipt__customer">
          <p>เรียกเก็บเงินถึง</p>
          <h2>{`Username: ${details.UserDetails.Username}`}</h2>
          <p>{`เบอร์โทร: ${details.UserDetails.phoneNumber}`}</p>
        </div>

        <div className="receipt__company">
          <p>ชำระเงินถึง</p>
          <h2>บมจ.อินทรประกันภัย</h2>
          <p>กรุงเทพมหานคร, ประเทศไทย</p>
        </div>
      </div>}
      
      {/* // * receipt details */}
      {Object.keys(details).length !== 0 && 
      <table className="receipt__table">
        <thead>
          <tr className="receipt__header-row">
          <th>รหัสสินค้า</th>
          <th>รายการ</th>
          <th>ค่าบริการ</th>
          <th>ราคาสินค้า</th>
          <th>ราคาสุทธิ</th>
          </tr>
        </thead>
        <tbody>
        {(details.ProductDetails).map((order) => {
            return (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.Service}</td>
                  <td>{`${order.ServicePrice} บาท`}</td>
                  <td>{`${order.ProductPrice} บาท`}</td>
                  <td>{`${order.TotalPrice} บาท`}</td>
                </tr>
            );
          })}
        </tbody>
      </table>}

      <div className="receipt__footer">
        <div className="receipt__footer-title">
        <p>ข้อมูลเพิ่มเติม</p>
        <p>ผลการคํานวณ</p>
      
        </div>
        <div className="receipt__footer-content">
          <div className="receipt__footer-more">
            {/* <div className="receipt__footer-more-item">
            <p>ชื่อผู้ตรวจสอบ</p>
            <span>นาย ทศพล มีเงิน</span>
            </div>  
            <div className="receipt__footer-more-item">
            <p>ชื่อผู้ตรวจสอบ</p>
            <span>03/07/2577</span>
            </div>  */}
          </div>
          <div className="receipt__footer-calculation-summary">
          {Object.keys(details).length !== 0 &&
          <>
          <div className="receipt__footer-summary-item">
          <p>ราคาสินค้ารวม:</p>
          <span>{`${totalProducts} บาท`}</span>
            </div>  
          <div className="receipt__footer-summary-item">
          <p>ค่าบริการรวม:</p>
          <span>{`${details.OrderDetails.TotalService} บาท`}</span>
          </div>
          <div className="receipt__footer-summary-item">
          <p>ค่าจัดส่งรวม:</p>
          <span>{`${details.OrderDetails.DeliveryPrice} บาท`}</span>
          </div> 
          <div className="receipt__footer-summary-item">
          <p className="">ยอดรวม:</p>
          <span>{`${details.OrderDetails.TotalPrice} บาท`}</span>
          </div>
          </>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
