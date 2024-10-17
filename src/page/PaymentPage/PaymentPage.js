import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ*/
import "./PaymentPag.css";
import BankLogo from "../../assets/bank-logo.png";
import QrPayment from "../../assets/qr-payment.png";
import Buttons from "../../components/Buttons/Buttons";

import axios from "axios";
import { baseURL } from "../../App.js";
import { useState } from "react";

function PaymentPage() {
  const [price, setPrice] = useState(0.00);

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate("/upload-receipt"); // นำทางไปยังหน้า /upload-receipt
  };

  // * create payment CMI
  async function requestPaymentCMI() {
    try {
        const response = await axios.post(`${baseURL}/transaction/createCMI`, {
        }, {
            withCredentials: true 
        });

        if (response) {
            console.log(response);
            setPrice(response.data.data.TotalPrice)
        }
    } catch (error) {
        console.log("error :", error)
    }
  }

  useEffect(() => {
    requestPaymentCMI();
  })


  return (
    <div>
      <HandleBack />
      {/* ปุ่มย้อนกลับ */}
      <div className="layout-wrapper customize">
        <ProgressBar type="act" />
        {/* Bar บอกขั้นตอนว่าอยู่ไหน  ประเภท ข้อมูลที่เเสดงคือ พรบ*/}
        <div className="container-payment">
          <img src={BankLogo} className="bank-logo" alt="" />
          <h1>QR PAYMENT</h1>
          <div className="payment-time">
            <p>Payment Time Left</p>
            <h5>14:39</h5>
          </div>
          {/* // TODO: According to sys */}
          <img src={QrPayment} className="qr-payment" alt="" />
          {/* // TODO: According to sys */}
          <h6>ชื่อบัญชี : ร้านค้า</h6>
          <h6>ราคาสุทธิ : {price} บาท</h6>

          <Buttons
            label="ถัดไป"
            variant="primary"
            onClick={handleNextClick}
            height="39px"
          />

          <Buttons label="ยกเลิก" variant="cancel" height="39px" />
          {/* <a href="">วิธีที่การจ่าย</a> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
