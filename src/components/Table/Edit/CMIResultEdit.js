import { TextField } from "@mui/material";
import Buttons from "../../Buttons/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../App";
import Button from "@mui/material/Button";
import { ImagePopup, Popup, ErrorPopup } from "../../Popup/Popup";
import { popupTextCondition } from "../OrdersTable";
import { PDFViewer } from "../../Viewer/PDFViewer";
import "../Table.css"

export function CMIResultEdit({CMIId}) {
    // * Data
    const [selectedResult, setSelectedResult] = useState({});
    const [editableResult, setEditableResult] = useState(selectedResult);
    const [isEditResult, setisEditResult] = useState(false);
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

    // * PDF
    const [selectedPDF, setSelectedPDF] = useState();

    // * request Result Field
    async function requestResultFields() {
        try {
            const response = await axios.get(`${baseURL}/admin/columns/result`);
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

    // * request Result Data
    async function requestResultData() {
        if (!CMIId) {
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/admin/order/Result`,
                {
                    iddocumentresults: CMIId
                }
            );
            console.log(response.data);
            if (response && response.data.status === "success") {
                setSelectedResult(response.data.data);
                setEditableResult(response.data.data);
                await requestPDFData(response.data.data);
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

    // * update Result
    async function saveUpdateResult(Result) {
        const tempResult = {...Result};
        delete tempResult.pdf;
        try {
            const response = await axios.post(`${baseURL}/admin/update/result`,
                tempResult
            );
            console.log(response.data);
            if (response && response.data.status === "success") {
                // sucess and reset data
                await requestResultData()
            }
        } catch (error) {
            // ! error
            console.log("error: ", error);
            const data = error.response.data;
            if (data) {
                setPopupError(data.message);
            } else {
                setPopupError("ไม่สามารถอัพเดตผลลัพธ์กรมธรม์ได้");
            }
            setOpenPopUpError(true);
        }
    }

    // * request PDF Data
    async function requestPDFData(result) {
        if (!result || !result.iddocumentresults) {
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/doc/pdf`,
                {
                    iddocumentresults: result.iddocumentresults
                }
            );
            if (response && response.data.status === "success") {
                console.log(response.data.data);
                setSelectedPDF(response.data.data)
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
    

    // * update Result
    const handleChangeResult = (event) => {
        const { name, value } = event.target;
        setEditableResult((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    // * save update Result
    const saveNCancelResult = async (action) => {

        if (action === "save") {
            setPopupText(popupTextCondition.save);
            setIsCancel(false);
        } else if (action === "cancel") {
            setPopupText(popupTextCondition.cancel);
            setIsCancel(true);
        }
        setOpenPopUp(true)
        setPopupType("Result")
    }

    // * Submit Popup
    const handleSubmitPopup = async (type) => {
        if (type === "Result") {
            setisEditResult(false);
            if (isCancel) {
                // cancel edit doc
                setEditableResult(selectedResult);
            } else {
                // confirm edit doc
                await saveUpdateResult(editableResult);
            }
        } 
        setOpenPopUp(false);
    }

    useEffect(() => {
        requestResultData();
    }, [CMIId]);

    useEffect(() => {
        requestResultFields();
    }, [])

    
    return (
        <div className='selected-user'>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="title-deco-user">รายละเอียดการผลลัพธ์กรมธรรม์ที่ออก</h2>
            <Buttons
                label={!isEditResult ? "แก้ไข": "กำลังแก้ไข"}
                variant="primary"
                onClick={() => setisEditResult(true)}
                height="50px"
                width="100px"
                disabled={isEditResult}
            />
        </div>

        <div className='user-details'>
        {
        Object.entries(editableResult)
        .filter(([key]) => key !== 'pdf')
        .map(([key, value]) => {
            // Find the matching field object based on the key
            const matchedField = fields.find(field => field.field === key);
            const label = matchedField ? matchedField.headerName : key;
    
            return (
                <div key={key + editableResult.id}>
                    <label>{label}
                        <span style={{color: "red"}}>{key.includes("Id") ? " แก้ไขไม่ได้*" : ""}</span>
                    </label>
                    <TextField
                        name={key}
                        value={value === null ? "" : value}
                        disabled={!isEditResult || (isEditResult && key.includes("Id"))}
                        onChange={handleChangeResult}
                        fullWidth
                        className='user-textfield'
                    />
                </div>
            );
        })
    }
    

    <div style={{display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "flex-end"}}>
        <Button disabled={!isEditResult} variant='contained' className='saveNcancel-button save-button' 
        onClick={() => saveNCancelResult("save")}
        >save</Button>
        <Button disabled={!isEditResult} 
        onClick={() => saveNCancelResult("cancel")} 
        className='saveNcancel-button cancel-button'>
        Cancel</Button>
    </div>

    {selectedPDF && <PDFViewer pdffile={selectedPDF}/>}

    {/* // * Popup */}
    <Popup isOpen={openPopup} title="แจ้งเตือน" children={popupText} 
    onClose={() => setOpenPopUp(false)} onSubmit={handleSubmitPopup} type={popupType}></Popup>
    <ErrorPopup isOpen={openPopupError} title="เกิดข้อผิดพลาด" children={popupError} 
    onClose={() => setOpenPopUpError(false)}/>

    </div>
    </div>
    )
}