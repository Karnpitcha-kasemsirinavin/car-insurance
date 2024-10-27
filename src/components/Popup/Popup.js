import React, { useState } from 'react';
import './Popup.css';
import { Button } from '@mui/material';

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
            onError={() => console.error('Image failed to load:', value)} />
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
