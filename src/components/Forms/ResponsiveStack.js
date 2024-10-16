import React from "react";
import { Stack } from "@mui/material"; // นำเข้า Stack จาก MUI

function ResponsiveStack({ isSmallScreen, children ,boxShadow}) {
  // รับ props isSmallScreen และ children
  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"} // ใช้ isSmallScreen เพื่อตั้งค่า direction
      spacing={2}
      justifyContent="space-between"
      sx={{
        boxShadow: boxShadow || "none", // ใช้ค่า boxShadow ที่ส่งเข้ามาหรือไม่มีเงา
      
      }}
    >
      {children} {/* แสดง children ที่ถูกส่งมา */}
    </Stack>
  );
}

export default ResponsiveStack;
