const express = require('express');
const app = express();
const port = 3001;

// สมมติว่ามีข้อมูลใบเสร็จอยู่ในตัวแปร
const receiptData = {
  issueDate: "3 มีนาคม 2577",
  orderId: "#LI7701",
  paymentId: "#sdas105",
  status: "ตรวจสอบเเล้ว",
};

// สร้าง endpoint สำหรับดึงข้อมูลใบเสร็จ
app.get('/api/receipt', (req, res) => {
  res.json(receiptData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
