import React from 'react';
import './TaxIncluded.css'; // สร้างไฟล์ CSS สำหรับสไตล์

function TaxIncluded({ totalPrice }) {
  return (
    <div className='tax-included'>
      <p>ราคารวมทั้งหมด</p>
      <h1>{totalPrice}</h1>
    </div>
  );
}

export default TaxIncluded;
