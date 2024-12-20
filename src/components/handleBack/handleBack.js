import React from 'react'
import { useNavigate } from "react-router-dom";
import  "./handleBack.css"
function HandleBack() {
  const navigate = useNavigate(); // ใช้ useNavigate

  const handleBack = () => {
    navigate(-1); // ย้อนกลับหนึ่งหน้าจากประวัติการนำทาง
  };
  return (
  <button className='handle-back' onClick={handleBack}>
    <i class="fa-solid fa-chevron-left"></i> <span>ย้อนกลับ</span>
  </button>
    
  )
}

export default HandleBack
