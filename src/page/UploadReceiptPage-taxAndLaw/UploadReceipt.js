import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack";
import "./UploadReceipt.css";
import Buttons from "../../components/Buttons/Buttons";

function UploadReceipt() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // ป้องกันการเปิดไฟล์
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file:", file);
      // เพิ่มโค้ดการอัปโหลดที่นี่

      // หลังจากอัปโหลดเสร็จแล้ว นำทางไปยังหน้าเอกสารกรมธรรม์
      navigate("/document-page");
    } else {
      alert("กรุณาเลือกไฟล์ก่อน");
    }
  };

  const handleDropAreaClick = () => {
    document.getElementById("file-upload").click(); // เปิดกล่องเลือกไฟล์
  };

  return (
    <div>
      <HandleBack />
      <div className="layout-wrapper customize">
        <ProgressBar type="act&tax" />
        <div className="container-uploadReceipt">
          <div className="uploadReceipt__title-box">
            <i className="fa-light fa-file-import"></i>
            <h4>อัปโหลดใบเสร็จ</h4>
          </div>

          {/* Drag-and-Drop Area */}
          <div
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleDropAreaClick} // เพิ่ม handler คลิก
          >
            <div className="file-upload-message">
              <div>
                {file ? (
                  <h6>ไฟล์ที่เลือก: {file.name}</h6>
                ) : (
                  <h6>คลิกไฟล์ที่นี่</h6>
                )}
                <p>ไฟล์ที่รองรับ: jpeg, jpg, png</p>
              </div>
            </div>

            <input
              type="file"
              onChange={handleFileChange}
              className="file-input" // เพิ่ม class
              id="file-upload" // ตั้ง id สำหรับการเข้าถึง
              style={{ display: "none" }} // ซ่อน input file
            />
          </div>

          <Buttons onClick={handleUpload} label="ถัดไป" variant="primary" />
        </div>
      </div>
    </div>
  );
}

export default UploadReceipt;
