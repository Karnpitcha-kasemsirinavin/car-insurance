import React from 'react'

import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ*/
import Buttons from '../../components/Buttons/Buttons';
import Receipt from '../../components/Receipt/Receipt';
import OrderDetails from "../../components/OrderDetails/OrderDetails"
import OrderDetailsTax from "../../components/OrderDetailsTax/OrderDetailsTax"
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { baseURL } from '../../AuthContext';
import axios from 'axios';
import StickyFooter from '../../components/StickyFooter/StickyFooter';
import { useNavigate } from 'react-router-dom';

function ReceiptPage() {
  const location = useLocation();
  const { orderId } = location.state || {};
  const [details, setDetails] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const generatePDF = () => {
    const element = document.getElementById('receipt-content');
    const opt = {
    
        filename:     'ใบคําสั่งซื้อ.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // การปรับขนาดเพื่อความชัดเจน
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' } // ขนาด A4
    };
    html2pdf().from(element).set(opt).save();
  };

  async function requestDetails() {
    try {
      const response = await axios.post(`${baseURL}/order/receipt`,{
        orderId: orderId
      });

      if (response && response.data.status === "success") {
        console.log(response.data.data)
        setDetails(response.data.data);

        let detailsRes = response.data.data
        let totalPrice = detailsRes.ProductDetails.reduce((total, order) => total + order.ProductPrice, 0);
        setTotalProducts(totalPrice);
        totalPrice = detailsRes.ProductDetails.reduce((total, order) => total + order.ServicePrice, 0);
        setTotalService(totalPrice);
        totalPrice = detailsRes.ProductDetails.reduce((total, order) => total + order.TotalPrice, 0);
        setTotalPrice(totalPrice);
      }
    } catch (error) {
      // ! error
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    requestDetails();
  }, [])

  return (
    <div>
        <div className="layout-wrapper customize">
          <div className='button-container-right' >
          <Buttons  iconClass='fa-solid fa-download' variant='primary'  
          width='119px' height="51px" label="โหลดใบเสร็จ" fontSize='14px'  
          onClick={generatePDF} />
          </div>
          <div id="receipt-content">
      <Receipt details={details} totalPrice={totalPrice} totalProducts={totalProducts} totalService={totalService}/>
      {details.DocDetails && <OrderDetails CMIDetails={details.DocDetails}/>}
      {details.TaxDetails && <OrderDetailsTax TaxDetails={details.TaxDetails} UserDetails={details.UserDetails}/>}
        </div>
        </div>
      <StickyFooter>
        <Buttons onClick={() => navigate("/")}  variant="primary" label="กลับไปยังหน้าหลัก" />
      </StickyFooter>
    </div>
  )
}

export default ReceiptPage