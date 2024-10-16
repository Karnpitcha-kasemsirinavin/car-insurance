import React from "react";
import { Typography } from "@mui/material";

const SectionTitleTypography = ({ text, iconClass, fontSize ="19px" , fontWeight="300"}) => {
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: fontSize,
        fontFamily: '"Prompt", sans-serif',
        display: "flex",
        gap: "8px",
        fontWeight:fontWeight        
      }}
    >
      <i
        className={iconClass}
        style={{ fontSize: "23px", color: "#3FABD9" }}
      ></i>
      {text}
    </Typography>
  );
};

export default SectionTitleTypography;
