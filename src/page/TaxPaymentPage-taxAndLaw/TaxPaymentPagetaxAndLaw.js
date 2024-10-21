import React from 'react'
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack"; /* ปุ่มย้อนกลับ*/
import TaxPaymentForms from "../../components/Forms/TaxPaymentForms";
function taxPaymentPagetaxAndLaw() {
  return (
    <div>
    <HandleBack />{/* ปุ่มย้อนกลับ */}
    <div className="layout-wrapper customize">
    <ProgressBar  type="act&tax"/> {/* Bar บอกขั้นตอนว่าอยู่ไหน  ประเภท ข้อมูลที่เเสดงคือ พรบ*/}
    <TaxPaymentForms/>
  </div>
</div>
  )
}

export default taxPaymentPagetaxAndLaw
