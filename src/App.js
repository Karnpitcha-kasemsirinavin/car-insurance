import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // นำเข้า React Router
import Navbar from "./components/navbar/Navbar.js";
import SelectService from "./page/SelectService/SelectService.js";
import BuyInsurance from "./page/BuyInsurance/BuyInsurance"; // นำเข้า BuyInsurance
import CarInfo from "./page/CarInfo/CarInfo.js" // นำเข้า CarInfoPage
import PolicyOwnerInfo from "./page/PolicyOwnerInfo/PolicyOwnerInfo.js"
import PaymentPage from "./page/PaymentPage/PaymentPage"
import UploadReceipt from "./page/UploadReceipt/UploadReceipt.js"
import  DocumentPage from "./page/DocumentPage/DocumentPage.js"
import TaxRenewal from "./page/TaxRenewal/TaxRenewal.js";
import TaxPaymentPage from "./page/TaxPaymentPage/TaxPaymentPage.js"

export const baseURL = "http://localhost:8000";

import TaxSummary from "./page/TaxSummary/TaxSummary.js"
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<SelectService />} />
          <Route path="/buy-insurance" element={<BuyInsurance />} />   {/* เลือกประเภทรถ พรบ */}
          <Route path="/car-info" element={<CarInfo />} />    {/* หน้ากรอกข้อมูลรถ พรบ*/}
          <Route path="/policy-ownerInfo" element={<PolicyOwnerInfo />} />    {/* หน้ากรอกข้อมูลเจ้าของ พรบ*/}
          <Route path="/payment-page" element={<PaymentPage/>} />  {/* หน้าชําระเงิน QR */}
          <Route path="/upload-receipt" element={<UploadReceipt/>} />  {/* หน้าส่งใบเสร็จ*/}
          <Route path="/document-page" element={<DocumentPage/>} /> {/* หน้าออกเอกสารกรมธรรม์*/}
          <Route path="/tax-renewal" element={<TaxRenewal/>} />    {/* เลือกประเภทรถ ต่อภาษี */}
          <Route path="/tax-payment-page" element={<TaxPaymentPage/>} />    {/* หน้ากรอก ข้อมูลการชำระภาษี  ต่อภาษี */}


          <Route path="/tax-summary" element={<TaxSummary/>} />    {/*สรุปผลลัพธ์การคำนวณภาษี */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
