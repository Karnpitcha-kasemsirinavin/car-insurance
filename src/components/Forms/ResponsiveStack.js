import React from "react";
import { Stack } from "@mui/material";

function ResponsiveStack({ isSmallScreen, children, boxShadow, spacing = 2 }) {
  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"}
      spacing={spacing} // ใช้ spacing ที่ส่งเข้ามา
      justifyContent="space-between"
      sx={{
        boxShadow: boxShadow || "none",
      }}
    >
      {children}
    </Stack>
  );
}

export default ResponsiveStack;
