import React from 'react'

import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ*/
import Buttons from '../../components/Buttons/Buttons';
import Receipt from '../../components/Receipt/Receipt';
import OrderDetails from "../../components/OrderDetails/OrderDetails"
import OrderDetailsTax from "../../components/OrderDetailsTax/OrderDetailsTax"
import html2pdf from 'html2pdf.js'; // นำเข้าไลบรารี html2pdf.js
function ReceiptPage() {
  const generatePDF = () => {
    const element = document.getElementById('receipt-content');
    const opt = {
     
        filename:     'ใบเสร็จ.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // การปรับขนาดเพื่อความชัดเจน
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' } // ขนาด A4
    };
    html2pdf().from(element).set(opt).save();
};

  return (
    <div>
         <HandleBack />{/* ปุ่มย้อนกลับ */}
         <div className="layout-wrapper customize">
          <div className='button-container-right' >
          <Buttons  iconClass='fa-solid fa-download' variant='primary'  width='119px' height="51px" label="โหลดใบเสร็จ" fontSize='14px'  onClick={generatePDF} />
          </div>
          <div id="receipt-content">
          <Receipt />
      < OrderDetails />
      <OrderDetailsTax/>
           </div>
         </div>
    </div>
  )
}

export default ReceiptPage