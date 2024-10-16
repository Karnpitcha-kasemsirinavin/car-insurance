import React from 'react';
import './StickyFooter.css';

function StickyFooter({ children, backgroundColor }) {
  const footerStyle = {
    backgroundColor: backgroundColor || '#f3f9fc', // ใช้ค่าสีที่ส่งเข้ามาหรือใช้สีพื้นฐานถ้าไม่มี
  };

  return (
    <div className='sticky-footer' style={footerStyle}>
      {children} {/* วางเนื้อหาที่นี่ */}
    </div>
  );
}

export default StickyFooter;
