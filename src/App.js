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
import RegisterPage from "./page/RegisterPage/RegisterPage.js";
import OtpPage from "./page/OtpPage/OtpPage.js";
import VerifiedPage from "./page/VerifiedPage/VerifiedPage.js"
import PoliciesPage from "./page/PoliciesPage/PoliciesPage.js"
import TaxPaymentUploadPage from "./page/TaxPaymentUpLoadPage/TaxPaymentPage.js";
import FileUploaderPage from "./page/FileUploaderPage/FileUploaderPage.js"
import ReceiptPage  from "./page/ReceiptPage/ReceiptPage.js";
import UsersBoard from "./page/Admin/Dashboard/UsersBoard.js";
import InsurancePageTaxAndLaw from "./page/insurancePage-taxAndLaw/insurancePagetaxAndLaw.js";
import CarInfoPagetaxAndLaw from "./page/CarInfoPage-taxAndLaw/CarInfoPagetaxAndLaw.js";
import PolicyPagetaxAndLaw from "./page/policyPage-taxAndLaw/policyPagetaxAndLaw"
import PaymenPagetaxAndLaw from "./page/PaymenPage-taxAndLaw/PaymenPagetaxAndLaw.js"
import TaxPaymentPagetaxAndLaw from "./page/TaxPaymentPage-taxAndLaw/TaxPaymentPagetaxAndLaw.js"
import TaxSummaryPagetaxAndLaw from "./page/TaxSummaryPage-taxAndLaw/TaxSummary.js"
import FileUploaderPagetaxAndLaw from "./page/fileUploader-page-taxAndLaw/FileUploaderPage.js";
import UploadReceiptPageTaxAndLaw from "./page/UploadReceiptPage-taxAndLaw/UploadReceipt.js"
import ReceiptPageTaxAndLaw from "./page/ReceiptPage-taxAndLaw/ReceiptPage"

import SettingBoard from "./page/Admin/Dashboard/SettingBoard.js";
import UserOrdersBoard from "./page/Admin/Dashboard/UserOrdersBoard.js";

function AppContent() {
  const location = useLocation(); // ใช้ useLocation ภายใน Router context

  return (
    <div>
      {/* แสดง Navbar ถ้าเส้นทางไม่ใช่ /login-page */}
      {!['/login-page', '/register-page', '/otp-page', '/verified-page'].includes(location.pathname) && <Navbar />}

      
      <Routes>
        <Route path="/" element={<SelectService />} />

        {/* flow 1: CMI */}
        <Route path="/buy-insurance" element={<BuyInsurance />} />
        <Route path="/car-info" element={<CarInfo />} />
        <Route path="/policy-ownerInfo" element={<PolicyOwnerInfo />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/upload-receipt" element={<UploadReceipt />} />
        <Route path="/document-page" element={<DocumentPage />} />

        {/* flow 2: Tax */}
        <Route path="/tax-renewal" element={<TaxRenewal />} />
        <Route path="/tax-payment-page" element={<TaxPaymentPage />} />
        <Route path="/tax-summary" element={<TaxSummary />} />
        <Route path="/fileUploader-Page" element={<FileUploaderPage />} />

        {/* flow 3: CMI N Tax */}
        <Route path="/insurance-page-taxAndLaw" element={<InsurancePageTaxAndLaw />} /> 
        <Route path="/carInfo-page-taxAndLaw" element={<CarInfoPagetaxAndLaw/>} /> 
        <Route path="/policy-page-taxAndLaw" element={<PolicyPagetaxAndLaw/>} /> 
        <Route path="/policy-page-taxAndLaw" element={<PolicyPagetaxAndLaw/>} /> 
        <Route path="/payment-page-taxAndLaw" element={<PaymenPagetaxAndLaw/>} /> 
        <Route path="/tax-payment-page-taxAndLaw" element={<TaxPaymentPagetaxAndLaw/>} /> 
        <Route path="/tax-summary-page-taxAndLaw" element={< TaxSummaryPagetaxAndLaw/>} /> 
        <Route path="/fileUp-loader-page-taxAndLaw" element={<FileUploaderPagetaxAndLaw/>} /> 
        <Route path="/uploadReceipt-page-taxAndLaw" element={<UploadReceiptPageTaxAndLaw/>} /> 
        <Route path="/receipt-page-taxAndLaw" element={<ReceiptPageTaxAndLaw/>} /> 

        {/* Summary N Receipt Page */}
        <Route path="/receipt-page" element={<ReceiptPage />} />

        {/* Login N Register Page */}
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/otp-page" element={<OtpPage />} />
        <Route path="/verified-page" element={<VerifiedPage />} />

        {/* // TODO: Change to popup instead */}
        {/* <Route path="/policies-page" element={<PoliciesPage />} /> */}
        
        {/* admin */}
        <Route path="/admin/users" element={<UsersBoard/>}/>
        <Route path="/orders/user" element={<UserOrdersBoard />} />

        <Route path="/admin/setting" element={<SettingBoard/>}/>
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
