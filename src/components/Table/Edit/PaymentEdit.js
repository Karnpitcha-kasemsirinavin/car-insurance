import { TextField } from "@mui/material";
import Buttons from "../../Buttons/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../AuthContext";
import Button from "@mui/material/Button";
import { ImagePopup, Popup, ErrorPopup } from "../../Popup/Popup";
import { popupTextCondition } from "../OrdersTable";

export function PaymentEdit({ paymentId}) {
    // * Data
    const [selectedPayment, setSelectedPayment] = useState({});
    const [editablePayment, setEditablePayment] = useState(selectedPayment);
    const [isEditPayment, setisEditPayment] = useState(false);
    const [fields, setFields] = useState([]);

    // * Popup Image
    const [openPopupImage, setOpenPopUpImage] = useState(false);
    const [popupImage, setPopupImage] = useState({});

    // * Popup
    const [openPopup, setOpenPopUp] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [popupType, setPopupType] = useState("")
    const [isCancel, setIsCancel] = useState(false);

    // * Popup Error
    const [openPopupError, setOpenPopUpError] = useState(false);
    const [popupError, setPopupError] = useState("");

    // * request payment Field
    async function requestPaymentFields() {
        try {
            const response = await axios.get(`${baseURL}/admin/columns/payment`);
            if (response && response.data.status === "success") {
                setFields(response.data.data);
            }
        } catch (error) {
            // ! error
            console.log("error: ", error);
            const data = error.response.data;
            if (data) {
                setPopupError(data.message);
            } else {
                setPopupError("ไม่สามารถอัพเดตการชำระเงินได้");
            }
            setOpenPopUpError(true)
        }
    }

    // * request payment Data
    async function requestPaymentData() {
        if (!paymentId) {
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/admin/order/Payment`,
                {
                    paymentId: paymentId
                }
            );
            console.log(response.data);
            if (response && response.data.status === "success") {
                setSelectedPayment(response.data.data);
                setEditablePayment(response.data.data);
                // set image
                const tempImg = {...popupImage};
                tempImg["Slip"] =  blobToBase64(response.data.data.Slip);
                setPopupImage(tempImg);
            }

        } catch (error) {
            // ! error
            console.log("error: ", error);
            const data = error.response.data;
            if (data) {
                setPopupError(data.message);
            } else {
                setPopupError("ไม่สามารถอัพเดตการชำระเงินได้");
            }
            setOpenPopUpError(true);
        }
    }

    // * update Payment
    async function saveUpdatePayment(payment) {
        const tempPayment = {...payment};
        tempPayment.createdAt = convertToDate(tempPayment.createdAt);
        tempPayment.updatedAt = convertToDate(tempPayment.updatedAt);

        delete tempPayment.Slip;
        try {
            const response = await axios.post(`${baseURL}/admin/update/payment`,
                tempPayment
            );
            console.log(response.data);
            if (response && response.data.status === "success") {
                // sucess and reset data
                // await resetData()
            }
        } catch (error) {
            // ! error
            console.log("error: ", error);
            const data = error.response.data;
            if (data) {
                setPopupError(data.message);
            } else {
                setPopupError("ไม่สามารถอัพเดตการชำระเงินได้");
            }
            setOpenPopUpError(true);
        }
    }

    // * to base64
    function blobToBase64(data) {
        const imageData = data;
        const binaryString = String.fromCharCode(...new Uint8Array(imageData.data));
        // Encode the binary string to Base64
        const base64Image = btoa(binaryString);
        // Add appropriate MIME type for an image (e.g., PNG or JPEG)
        const base64String = `data:image/png;base64,${base64Image}`;
        return base64String;
    }

    // * convert Date
    function convertToDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    

    // * update payment
    const handleChangePayment = (event) => {
        const { name, value } = event.target;
        setEditablePayment((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    // * save update payment
    const saveNCancelPayment = async (action) => {

        if (action === "save") {
            setPopupText(popupTextCondition.save);
            setIsCancel(false);
        } else if (action === "cancel") {
            setPopupText(popupTextCondition.cancel);
            setIsCancel(true);
        }
        setOpenPopUp(true)
        setPopupType("Payment")
    }

    // * Submit Popup
    const handleSubmitPopup = async (type) => {
        if (type === "Payment") {
            setisEditPayment(false);
            if (isCancel) {
                // cancel edit doc
                setEditablePayment(selectedPayment);
            } else {
                // confirm edit doc
                await saveUpdatePayment(editablePayment);
            }
        } 
        setOpenPopUp(false);
    }

    useEffect(() => {
        requestPaymentData();
    }, [paymentId]);

    useEffect(() => {
        requestPaymentFields();
    }, [])
    
    return (
        <div className='selected-user'>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="title-deco-user">รายละเอียดการชำระเงิน</h2>
            <Buttons
                label={!isEditPayment ? "แก้ไข": "กำลังแก้ไข"}
                variant="primary"
                onClick={() => setisEditPayment(true)}
                height="50px"
                width="100px"
                disabled={isEditPayment}
            />
        </div>

        <div className='user-details'>
        {Object.entries(editablePayment).length !== 0 && 
        Object.entries(editablePayment)
        .filter(([key]) => key !== 'Slip')
        .map(([key, value]) => {
            // Find the matching field object based on the key
            const matchedField = fields.find(field => field.field === key);
            const label = matchedField ? matchedField.headerName : key;
    
            return (
                <div key={key + editablePayment.id}>
                    <label>{label}
                        <span style={{color: "red"}}>{key.includes("Id") ? " แก้ไขไม่ได้*" : ""}</span>
                    </label>
                    <TextField
                        name={key}
                        value={value === null ? "" : value}
                        disabled={!isEditPayment || (isEditPayment && key.includes("Id"))}
                        onChange={handleChangePayment}
                        fullWidth
                        className='user-textfield'
                    />
                </div>
            );
        })
    }

    <div>
        <Button variant='contained' className='saveNcancel-button save-button' 
        onClick={() => setOpenPopUpImage(true)}>เปิดดู</Button>
        <label style={{marginLeft: '10px'}}>สลิปที่อัพโหลด</label>
    </div>

    
    {Object.keys(selectedPayment).length%2 === 0 && <span></span>}

    <div style={{display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "flex-end"}}>
        <Button disabled={!isEditPayment} variant='contained' className='saveNcancel-button save-button' 
        onClick={() => saveNCancelPayment("save")}
        >save</Button>
        <Button disabled={!isEditPayment} 
        onClick={() => saveNCancelPayment("cancel")} 
        className='saveNcancel-button cancel-button'>
        Cancel</Button>
    </div>

    {/* // * Popup */}
    <Popup isOpen={openPopup} title="แจ้งเตือน" children={popupText} 
    onClose={() => setOpenPopUp(false)} onSubmit={handleSubmitPopup} type={popupType}></Popup>
    <ErrorPopup isOpen={openPopupError} title="เกิดข้อผิดพลาด" children={popupError} 
    onClose={() => setOpenPopUpError(false)}/>

    <ImagePopup isOpen={openPopupImage} onClose={() => setOpenPopUpImage(false)}
    title={'เอกสารที่ถูกอัปโหลด'} images={popupImage}></ImagePopup>

    </div>
    </div>
    )
}