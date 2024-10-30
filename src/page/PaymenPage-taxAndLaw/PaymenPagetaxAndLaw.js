import React from 'react';
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ */
import "./PaymenPagetaxAndLaw.css"; // ชื่อไฟล์ CSS อาจมีการปรับเปลี่ยน
import BankLogo from "../../assets/bank-logo.png";
import QrPayment from "../../assets/qr-payment.png";
import Buttons from "../../components/Buttons/Buttons";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../AuthContext';

function PaymentPageTaxAndLaw() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Get a specific parameter
  const [product, setProduct] = useState();


  const [price, setPrice] = useState(0.00);

  const handleNextClick = () => {
    navigate(`/uploadReceipt-page-taxAndLaw?product=${product}`);
  };

  const [isCookieSet, setIsCookieSet] = useState(false);

  // * create payment
  async function requestPayment() {
    console.log("pass")
    try {
        const response = await axios.post(`${baseURL}/transaction/createPayment/${product}`, {
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

  // * check productId
  async function requestProduct() {
    try {
        const response = await axios.post(`${baseURL}/order/product`, {
        }, {
            withCredentials: true 
        });

        if (response && response.data.status === "success") {
          setProduct(response.data.data)
        }
    } catch (error) {
        console.log("error :", error)
    }
  }

  useEffect(() => {
    const tempProduct = searchParams.get('product');

    if (tempProduct) {
      setProduct(tempProduct);
    } else {
      // * request product Id
      requestProduct();
    }
    
  }, []);

  useEffect(() => {
    if (product) {
      requestPayment(); 
    }
    
  }, [product]);


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
          {/* <div className="payment-time">
            <p>Payment Time Left</p>
            <h5>14:39</h5>
          </div> */}
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

export default PaymentPageTaxAndLaw;
