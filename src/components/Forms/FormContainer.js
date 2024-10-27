import React from 'react';
import { Stack } from '@mui/material';

const FormContainer = ({spacing= 3, paddingTop="30px",  paddingBottom="90px",children, padding = "20px", backgroundColor = "#ffffff", boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)" }) => {
  return (
    <Stack
      spacing={spacing}
      sx={{
        backgroundColor: backgroundColor,
        padding: padding,
        paddingBottom: paddingBottom,
        paddingTop: paddingTop,
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        boxShadow: boxShadow, // เพิ่มเงา
      }}
    >
      {children}
    </Stack>
  );
};

export default FormContainer;
