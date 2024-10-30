import React, { useState } from 'react';
import './Popup.css';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import Buttons from '../Buttons/Buttons';
import Receipt from '../Receipt/Receipt';
import OrderDetails from '../OrderDetails/OrderDetails';
import OrderDetailsTax from '../OrderDetailsTax/OrderDetailsTax';
import axios from 'axios';
import { baseURL } from '../../AuthContext';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import html2pdf from 'html2pdf.js';
import { PDFViewerPopup } from '../Viewer/PDFViewer';

export const Popup = ({ isOpen, onSubmit, onClose, title, children, type }) => {
    if (!isOpen) return null;

    return (
    <div className="popup-overlay">
        <div className="popup-content">
        <div className="popup-header">
            <h2>{title}</h2>
        </div>
        <div className="popup-body">
            {children}
        </div>
        <div className='buttons-container'>
        <Button variant="contained" className='saveNcancel-button save-button' onClick={() => onSubmit(type)}>ยืนยัน</Button>
        <Button className='saveNcancel-button cancel-button' onClick={() => onClose(type)}>ยกเลิก</Button>
        </div>
        </div>
    </div>
    );
};

export const ErrorPopup = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
    <div className="popup-overlay">
        <div className="popup-content">
        <div className="popup-header">
            <h2>{title}</h2>
        </div>
        <div className="popup-body">
            {children}
        </div>
        <div className='buttons-container'>
        <Button variant="contained" className='saveNcancel-button save-button' onClick={onClose}>ยืนยัน</Button>
        </div>
        </div>
    </div>
    );
};

const mapImgLabel = {
    RegistrationBook: "สมุดจดทะเบียนรถ",
    VehicleTax: "ใบภาษีรถยนต์",
    Slip: "สลิปที่อัพโหลด",
    default: "เอกสารอื่นๆ"
}

export const ImagePopup = ({ isOpen, onClose, title, images }) => {
    if (!isOpen) return null;

    return (
    <div className="popup-overlay">
        <div className="popup-content">
        <div className="popup-header">
            <h2>{title}</h2>
        </div>
        <div className="popup-body">
            {Object.entries(images).map(([key, value]) => 
            <div className="popup-body-img" key={`${key}-img`}>
            <label>{Object.keys(mapImgLabel).includes(key) ? mapImgLabel[key]: mapImgLabel["default"]}</label>
            <a href={value} download={`${key}.png`} rel="noopener noreferrer">
            <img className="popup-img" alt={`${key}-img`} src={value} 
            onError={() => console.error('Image failed to load:', value)}/>
            </a>
        </div>)}
        </div>
        <div className='buttons-container'>
        <Button variant="contained" className='saveNcancel-button save-button' onClick={onClose}>ปิด</Button>
        </div>
        </div>
    </div>
    );
};


export function ReceiptPopup({orderId, title, onClose, isOpen, Qcode}) {
    const [details, setDetails] = useState({});
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalService, setTotalService] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [pdfFile, setPDFFile] = useState();


    const generatePDF = () => {
        const element = document.getElementById('receipt-content');
        const opt = {
        
            filename:     'ใบเสร็จ.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 }, // การปรับขนาดเพื่อความชัดเจน
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' } // ขนาด A4
        };
        // Make sure the element exists before calling html2pdf
        if (element) {
            html2pdf().from(element).set(opt).save();
        } else {
            console.error("Element not found for PDF generation");
        }
    };

    async function requestDetails() {
        try {
        const response = await axios.post(`${baseURL}/order/receipt`,{
            orderId: orderId
        });

        if (response && response.data.status === "success") {
            console.log(response.data.data)
            setDetails(response.data.data);

            let detailsRes = response.data.data
            let totalPrice = detailsRes.ProductDetails.reduce((total, order) => total + order.ProductPrice, 0);
            setTotalProducts(totalPrice);
            totalPrice = detailsRes.ProductDetails.reduce((total, order) => total + order.ServicePrice, 0);
            setTotalService(totalPrice);
            totalPrice = detailsRes.ProductDetails.reduce((total, order) => total + order.TotalPrice, 0);
            setTotalPrice(totalPrice);
        }
        } catch (error) {
            // ! error
            console.log("error: ", error);
        }
    };

    async function requestPDF(Qcode) {
        if (!Qcode) {
            return;
        }
        try {
            const response = await axios.post(`${baseURL}/member/doc/pdf`,
            {
                Qcode
            })

            if (response && response.data.status === "success") {
                setPDFFile(response.data.data);
            }
        } catch (error) {
            // ! error
            console.log("error: ", error);
        }
    }


    useEffect(() => {
        requestDetails();
        requestPDF(Qcode);
    }, [])

    if (!isOpen) return null;

    return (
    <div className="popup-overlay">
        <div className="popup-content">
        <div className="popup-header">
            <h2>{title}</h2>
            <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 10, top: 10 }}>
                <CloseIcon />
            </IconButton>
        </div>
        <div className="popup-body">


        <div className="layout-wrapper customize">
        <div id="receipt-content">
        <Receipt details={details} totalPrice={totalPrice} totalProducts={totalProducts} totalService={totalService}/>
        {details.DocDetails && <OrderDetails CMIDetails={details.DocDetails}/>}
        {details.TaxDetails && <OrderDetailsTax TaxDetails={details.TaxDetails} UserDetails={details.UserDetails}/>}
        </div>
        </div>

        {pdfFile ? <PDFViewerPopup pdffile={pdfFile}/>: <></>}

        </div>
        <div className='buttons-container'>
        <Buttons  iconClass='fa-solid fa-download' variant='primary'  
        width='119px' height="51px" label="โหลดใบเสร็จ" fontSize='14px'  
        onClick={generatePDF} />
        </div>
        </div>
    </div>
    )
}
