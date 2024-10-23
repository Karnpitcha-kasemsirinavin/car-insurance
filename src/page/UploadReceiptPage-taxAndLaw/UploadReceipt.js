import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "../../components/layout-wrapper/layout-wrapper.css";
import HandleBack from "../../components/handleBack/handleBack";
import "./UploadReceipt.css";
import Buttons from "../../components/Buttons/Buttons";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../App";

function UploadReceipt() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // สร้างฟังก์ชัน navigate
  const [convertedFile, setConvertedFile] = useState(null)
  // Get a specific parameter
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState();


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
        const reader = new FileReader();

        // Handle the file as a Data URL (for image preview)
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === 'string') {
                // Optionally, you can call an update function if needed
                setConvertedFile(reader.result);
            }
        };


        reader.readAsDataURL(file);
}
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

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file:", file);
      // เพิ่มโค้ดการอัปโหลดที่นี่
      await updateSlipPayment()
      // หลังจากอัปโหลดเสร็จแล้ว นำทางไปยังหน้าเอกสารกรมธรรม์
      // navigate("/document-page");
    } else {
      alert("กรุณาเลือกไฟล์ก่อน");
    }
  };

  const handleDropAreaClick = () => {
    document.getElementById("file-upload").click(); // เปิดกล่องเลือกไฟล์
  };

  // * update payment
  async function updateSlipPayment() {
    try {
        const response = await axios.post(`${baseURL}/transaction/updatePayment/${product}`,
            {
                Slip: convertedFile
            },
            {withCredentials: true,}
        )

        if (response && response.data.status === "success") {
          // * proceed to nect step
          console.log("success");
          // navigate("/document-page");
            // setActiveStep(activeStep + 1);
        }
    } catch (error) {
        console.log("error: ", error);
    }
  }

  useEffect(() => {
    const tempProduct = searchParams.get('product');
    setProduct(tempProduct);
    
  }, []);

  return (
    <div>
      <HandleBack />
      <div className="layout-wrapper customize">
        <ProgressBar type="act" />
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
              accept=".png, .jpg, .jpeg"
            />
          </div>

          {/* Drag-and-Drop Area */}
          {/* <div
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
              accept=".png, .jpg, .jpeg"
            />
          </div> */}

          <Buttons onClick={handleUpload} label="ถัดไป" variant="primary" />
        </div>
      </div>
    </div>
  );
}

export default UploadReceipt;
