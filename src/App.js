import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"; 
import Navbar from "./components/navbar/Navbar.js";
import SelectService from "./page/SelectService/SelectService.js";
import BuyInsurance from "./page/BuyInsurance/BuyInsurance";
import CarInfo from "./page/CarInfo/CarInfo.js";
import PolicyOwnerInfo from "./page/PolicyOwnerInfo/PolicyOwnerInfo.js";
import PaymentPage from "./page/PaymentPage/PaymentPage";
import UploadReceipt from "./page/UploadReceipt/UploadReceipt.js";
import DocumentPage from "./page/DocumentPage/DocumentPage.js";
import TaxRenewal from "./page/TaxRenewal/TaxRenewal.js";
import TaxPaymentPage from "./page/TaxPaymentPage/TaxPaymentPage.js";
import TaxSummary from "./page/TaxSummary/TaxSummary.js";
import LoginPage from "./page/LoginPage/LoginPage.js";


function AppContent() {
  const location = useLocation(); // ใช้ useLocation ภายใน Router context

  return (
    <div>
      {/* แสดง Navbar ถ้าเส้นทางไม่ใช่ /login-page */}
      {location.pathname !== "/login-page" && <Navbar />}
      <Routes>
        <Route path="/" element={<SelectService />} />
        <Route path="/buy-insurance" element={<BuyInsurance />} />
        <Route path="/car-info" element={<CarInfo />} />
        <Route path="/policy-ownerInfo" element={<PolicyOwnerInfo />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/upload-receipt" element={<UploadReceipt />} />
        <Route path="/document-page" element={<DocumentPage />} />
        <Route path="/tax-renewal" element={<TaxRenewal />} />
        <Route path="/tax-payment-page" element={<TaxPaymentPage />} />
        <Route path="/tax-summary" element={<TaxSummary />} />
        <Route path="/login-page" element={<LoginPage />} />
      </Routes>
    </div>
  );
}


export const baseURL = "http://localhost:8000";

function App() {
  return (
    <Router>
      <AppContent />  {/* ใช้ AppContent ภายใน Router */}
    </Router>
  );
}

export default App;
