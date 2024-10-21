import React from 'react'
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ*/
import Buttons from '../../components/Buttons/Buttons';
import Receipt from '../../components/Receipt/Receipt';

function ReceiptPage() {
  
  return (
    <div>
 
         <HandleBack />{/* ปุ่มย้อนกลับ */}
         <div className="layout-wrapper customize">
          <div className='button-container-right' >
          <Buttons  iconClass='fa-solid fa-download' variant='primary'  width='119px' height="51px" label="โหลดใบเสร็จ" fontSize='14px'/>
          </div>
          <Receipt />
         </div>
    </div>
  )
}

export default ReceiptPage