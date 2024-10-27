import React, { useEffect, useState } from 'react';
import './Table.css';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, styled } from '@mui/material';
import MainTitleTable from './MainTitleTable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons/Buttons';
import { baseURL } from '../../App';
import axios from 'axios';

import correct from "../../assets/check.png"
import incorrect from "../../assets/remove.png"
import { ErrorPopup, Popup , ImagePopup} from '../Popup/Popup';
import { Sledding } from '@mui/icons-material';
import { PaymentEdit } from './Edit/PaymentEdit';
import { CMIResultEdit } from './Edit/CMIResultEdit';

export const popupTextCondition = {
    save: "คุณต้องการแก้ไขใช่หรือไม่",
    cancel: "คุณต้องการยกเลิกการแก้ไขใช่หรือไม่",
    status: "คุณต้องแก้ไขการอนุมัตืใช่หรือไม่"
}


function OrdersTable({ fields, data , reset}) {
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const navigate = useNavigate();
    const initialRow = data;

    const [selectedRow, setSelectedRow] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [editableValues, setEditableValues] = useState(selectedRow);

    // * CMI
    const [selectedCMI, setSelectedCMI] = useState({});
    const [editableCMI, setEditableCMI] = useState(selectedCMI);
    const [isEditCMI, setIsEditCMI] = useState(false);

    // * Tax
    const [selectedTax, setSelectedTax] = useState({});
    const [editableTax, setEditableTax] = useState(selectedTax);
    const [isEditTax, setIsEditTax] = useState(false);

    // * Type
    const [type, setType] = useState("Order");

    // * Popup
    const [openPopup, setOpenPopUp] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [popupType, setPopupType] = useState("")
    const [isCancel, setIsCancel] = useState(false);

    // * Popup Error
    const [openPopupError, setOpenPopUpError] = useState(false);
    const [popupError, setPopupError] = useState("");

    // * Popup Image
    const [openPopupImage, setOpenPopUpImage] = useState(false);
    const [popupImage, setPopupImage] = useState({});

    // Handle changing page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle changing rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

   // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0); // Reset to first page on search
    };

    // Filter rows based on search term
    const filteredRows = initialRow.filter((row) =>
        Object.values(row).some((value) =>
            typeof value !== 'object' && 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    // * Order ======================================================
    // * select order
    const handleSelectOrder = async (id) => {
        const rowWithId = filteredRows.find(row => row.id === id);
        console.log(rowWithId);
        setSelectedRow(rowWithId)
        setEditableValues(rowWithId)
    }

    // * edit order
    const editOrder = () => {
        setIsEdit(true)
    }

    // * update data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditableValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // * save update Order
    const saveUpdateOrder = async (action) => {

        if (action === "save") {
            setPopupText(popupTextCondition.save);
            setIsCancel(false);
        } else if (action === "cancel") {
            setPopupText(popupTextCondition.cancel);
            setIsCancel(true);
        }
        setOpenPopUp(true)
        setPopupType("Order")
    }

    // * update Order
    async function updateOrder(updatedOrder) {
        const renamedOrder = {
            orderId: updatedOrder.id,
            ...updatedOrder,
        };
        // Remove the original `id` key
        delete renamedOrder.id;

        try {
            const response = await axios.post(`${baseURL}/admin/update/order`,
                renamedOrder
            );
            if (response && response.data.status === "success") {
                // sucess and reset data
                await resetData()
            }
        } catch (error) {
            console.log("error: ",    error);
        }
    }

    // * CMI =================================================

    // * edit doc
    const editCMI= () => {
        setIsEditCMI(true)
    }

    // * update data
    const handleChangeCMI = (event) => {
        const { name, value } = event.target;
        setEditableCMI((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // * save N cancel update doc
    const updateCMI = async (action) => {
        // set popup
        if (action === "save") {
            setPopupText(popupTextCondition.save);
            setIsCancel(false);
        } else if (action === "cancel") {
            setPopupText(popupTextCondition.cancel);
            setIsCancel(true);
        }
        setOpenPopUp(true)
        setPopupType("CMI")
    }

    // * change status
    const handleStatusCMI = async () => {
        setPopupText(popupTextCondition.status);
        setOpenPopUp(true)
        setPopupType("CMI-Status")
    }


    // * update Doc
    async function updateDoc(doc) {
        try {
            const response = await axios.post(`${baseURL}/admin/update/doc`,
                doc
            );
            if (response && response.data.status === "success") {
                // sucess and reset data
                await resetData()
            }
        } catch (error) {
            console.log("error: ",    error);
        }
    }

    // * update Doc Status (request result)
    async function saveStatusDoc(doc) {
        try {
            const response = await axios.post(`${baseURL}/admin/update/status/document`,
                doc
            );
            if (response && response.data.status === "success") {
                // sucess and reset data
                await resetData()
            }
        } catch (error) {
            // ! error
            const data = error.response.data;
            setPopupError(data.message);
            setOpenPopUpError(true);
        }
    }

    // * request docuemnt data
    async function requestDocument() {
        if (!selectedRow || !selectedRow.CMIId) {
            return;
        }
        try {
            const response = await axios.post(`${baseURL}/admin/order/CMI/document`,
                {
                    documentId: selectedRow.CMIId
                }
            );
            if (response && response.data.status === "success") {
                setSelectedCMI(response.data.data)
                setEditableCMI(response.data.data)
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }

    // * Tax =================================================
    // * edit Tax
    const editTax= () => {
        setIsEditTax(true)
    }

    // * update data
    const handleChangeTax = (event) => {
        const { name, value } = event.target;
        setEditableTax((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // * save N cancel update tax
    const updateTax = async (action) => {
        // set popup
        if (action === "save") {
            setPopupText(popupTextCondition.save);
            setIsCancel(false);
        } else if (action === "cancel") {
            setPopupText(popupTextCondition.cancel);
            setIsCancel(true);
        }
        setOpenPopUp(true)
        setPopupType("Tax");
    }

    // * change status
    const handleStatusTax = async () => {
        setPopupText(popupTextCondition.status);
        setOpenPopUp(true)
        setPopupType("Tax-Status");
    }

    // * update Tax
    async function saveUpdateTax(tax) {
        const tempTax = {...tax};
        delete tempTax.RegistrationBook;
        delete tempTax.VehicleTax;
        try {
            const response = await axios.post(`${baseURL}/admin/update/tax`,
                tempTax
            );
            if (response && response.data.status === "success") {
                // sucess and reset data
                await resetData()
            }
        } catch (error) {
            console.log("error: ",    error);
        }
    }

    // * update Tax Status
    async function saveStatusTax(doc) {
        console.log(doc);
        try {
            const response = await axios.post(`${baseURL}/admin/update/status/tax`,
                doc
            );
            if (response && response.data.status === "success") {
                // sucess and reset data
                await resetData()
            }
        } catch (error) {
            // ! error
            const data = error.response.data;
            setPopupError(data.message);
            setOpenPopUpError(true);
        }
    }

    // * request tax data
    async function requestTax() {
        if (!selectedRow || !selectedRow.taxResultId) {
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/admin/order/Tax/document`,
                {
                    taxResultId: selectedRow.taxResultId
                }
            );

            if (response && response.data.status === "success") {
                setSelectedTax(response.data.data)
                setEditableTax(response.data.data)
                // set image
                const tempImg = {...popupImage};
                tempImg["RegistrationBook"] =  blobToBase64(response.data.data.RegistrationBook);
                tempImg["VehicleTax"] =  blobToBase64(response.data.data.VehicleTax);
                setPopupImage(tempImg);
            }

        } catch (error) {
            console.log("error: ", error);
        }
    }

    function blobToBase64(data) {
        const imageData = data;
        const binaryString = String.fromCharCode(...new Uint8Array(imageData.data));
        // Encode the binary string to Base64
        const base64Image = btoa(binaryString);
        // Add appropriate MIME type for an image (e.g., PNG or JPEG)
        const base64String = `data:image/png;base64,${base64Image}`;
        return base64String;
    }

    // * select type ==============================
    const handleType = (type) => {
        setType(type);
    }

    // * Popup ====================================
    // close 
    const handleClosePopup = (type) => {
        setOpenPopUp(false);
    }

    // submit
    const handleSubmitPopup = async (type) => {
        if (type === "CMI") {
            setIsEditCMI(false);
            if (isCancel) {
                // cancel edit doc
                setEditableCMI(selectedCMI);
            } else {
                // confirm edit doc
                await updateDoc(editableCMI);
            }
        } else if (type === "CMI-Status") {
            // update status for doc
            const tempCMI = {...editableCMI};
            tempCMI.Status = tempCMI.Status === 0 ? 1: 0;
            setEditableCMI(tempCMI);
            await saveStatusDoc(tempCMI);
        } else if (type === "Order") {
            setIsEdit(false);
            if (isCancel) {
                // cancel edit order
                setEditableValues(selectedRow);
            } else {
                // confirm edit order
                await updateOrder(editableValues);
            }
        } else if (type === "Tax") {
            setIsEditTax(false);
            if (isCancel) {
                // cancel edit tax
                setEditableTax(selectedTax);
            } else {
                // confirm edit tax
                await saveUpdateTax(editableTax);
            }
        } else if (type === "Tax-Status") {
            // update status for tax
            const tempTax = {...editableTax};
            tempTax.Status = tempTax.Status === 0 ? 1: 0;
            setEditableTax(tempTax);
            await saveStatusTax(tempTax);
        }

        setOpenPopUp(false);
    }

    async function resetData() {
        await reset();
        setSelectedRow({});
        setSelectedCMI({});
        setSelectedTax({});
    }

    useEffect(() => {
        requestDocument();
        requestTax();
    }, [selectedRow])

    return (
        <div className='all-container'>
        <div className='table-section'>
        <div className='title-table-conatiner'>
            <MainTitleTable text="ข้อมูลออเดอร์ ( Orders )" className="title-table"/>
        </div>
        <Paper className="users-table-root">

            {/* // * Tools */}
            <div className="pagination-container">
                <TablePagination
                    labelRowsPerPage="Show" 
                    rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
                    component="div"
                    count={filteredRows.length} // Total number of rows
                    rowsPerPage={rowsPerPage} // Current rows per page
                    page={page} // Current page
                    onPageChange={handleChangePage} // Function to change page
                    onRowsPerPageChange={handleChangeRowsPerPage} // Function to change rows per page
                />
                <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className='select-table'
                InputProps={{
                    style: { height: '30px' }, // Set the height here
                }}
                />
            </div>

            <Table className="users-table">
                {/* // * Fields */}
                <TableHead>
                    <TableRow>
                    {fields.map((field) => (
                        <TableCell className="custom-table-head" key={field.field}>
                            {field.headerName}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                
                {/* // * Data */}
                {filteredRows.length > 0 ?
                <TableBody>
                {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                    <TableRow
                        className="custom-table-row"
                        key={row.id}
                        onClick={() => handleSelectOrder(row.id)}
                    >
                        {fields.map((field) => (
                            <TableCell
                                key={row.id + field.field}
                                className="custom-table-body"
                                align="right"
                            >
                                {row[field.field]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
                </TableBody>: 
                <TableBody>
                    There is no data available for this user
                </TableBody>}
                {/* // * No Table Data */}
            </Table>
        </Paper>
        </div>
                
        {/* // * selected Button */}
        {selectedRow &&
        <>
        <div style={{display: "flex", flexDirection: "row", gap: "5px", marginBottom: "-50px"}}>
        <Button variant='contained' className='type-button' 
        onClick={() => handleType("Order")} disabled={Object.keys(selectedRow).length === 0}>Order</Button>
        <Button variant='contained' className='type-button' 
        onClick={() => handleType("CMI")} disabled={Object.keys(selectedCMI).length === 0}>กรมธรรม์</Button>
        <Button variant='contained' className='type-button' 
        onClick={() => handleType("Tax")} disabled={Object.keys(selectedTax).length === 0}>ภาษี</Button>
        </div>
        </>}

        {/* // * selected user */}
        {selectedRow && Object.keys(selectedRow).length !== 0 && type === "Order" && 
        <div className='selected-user'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="title-deco-user">รายละเอียดออเดอร์</h2>
                <Buttons
                    label={!isEdit ? "แก้ไข": "กำลังแก้ไข"}
                    variant="primary"
                    onClick={editOrder}
                    height="50px"
                    width="100px"
                    disabled={isEdit}
                />
            </div>
            <div className='user-details'>
            {
            Object.entries(editableValues)
            .filter(([key]) => key !== 'OrderStatus' && key !== 'TotalOrder')
            .map(([key, value]) => {
                // Find the matching field object based on the key
                const matchedField = fields.find(field => field.field === key);
                const label = matchedField ? matchedField.headerName : key;
        
                return (
                    <div key={key + editableValues.id}>
                        <label>{label}
                        <span style={{ color: "red" }}>{key.includes("Id") ? " แก้ไขไม่ได้*" : ""}</span>
                        </label>
                        <TextField
                            name={key}
                            value={value}
                            disabled={!isEdit || (isEdit && key.includes("Id"))}
                            onChange={handleChange}
                            fullWidth
                            className='user-textfield'
                        />
                    </div>
                );}
            )}
            </div> 
            <div style={{display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "flex-end"}}>
                <Button disabled={!isEdit} variant='contained' className='saveNcancel-button save-button' 
                onClick={() => saveUpdateOrder("save")}
                >save</Button>
                <Button disabled={!isEdit} onClick={() => saveUpdateOrder("cancel")} className='saveNcancel-button cancel-button'>
                Cancel</Button>
            </div>       
        </div>}

        {/* // * CMI */}
        {Object.keys(selectedCMI).length !== 0 && type === "CMI" && 
        <>
        <div className='selected-user'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="title-deco-user">รายละเอียดเอกสารกรมธรรม์</h2>
                <Buttons
                    label={!isEditCMI ? "แก้ไข": "กำลังแก้ไข"}
                    variant="primary"
                    onClick={editCMI}
                    height="50px"
                    width="100px"
                    disabled={isEditCMI}
                />
            </div>
            <div className='user-details'>
            {
            Object.entries(editableCMI)
            .filter(([key]) => key !== 'Status')
            .map(([key, value]) => {
                // Find the matching field object based on the key
                const matchedField = fields.find(field => field.field === key);
                const label = matchedField ? matchedField.headerName : key;
        
                return (
                    <div key={key + editableCMI.id}>
                        <label>{label}
                            <span style={{color: "red"}}>{key.includes("Id") ? " แก้ไขไม่ได้*" : ""}</span>
                        </label>
                        <TextField
                            name={key}
                            value={value === null ? "" : value}
                            disabled={!isEditCMI || (isEditCMI && key.includes("Id"))}
                            onChange={handleChangeCMI}
                            fullWidth
                            className='user-textfield'
                        />
                    </div>
                );
            })
            }
            <div>
                <Button variant='contained' onClick={handleStatusCMI} disabled={isEditCMI}
                className={editableCMI.Status === 0 ? "status-pending-button" : "status-approved-button"}>
                    {editableCMI.Status === 0 ? "รอการอนุมัติ" : "อนุมัติเรียบร้อย"}
                </Button>
            </div>
            
            </div> 
            <div style={{display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "flex-end"}}>
                <Button disabled={!isEditCMI} variant='contained' className='saveNcancel-button save-button' 
                onClick={() => updateCMI("save")}
                >save</Button>
                <Button disabled={!isEditCMI} onClick={() => updateCMI("cancel")} className='saveNcancel-button cancel-button'>
                Cancel</Button>
            </div>   
        </div>

        {/* // * Payment CMI */}
        <PaymentEdit paymentId={selectedRow.CMIPaymentId}/> 
        {/* // * Result CMI */}
        {selectedCMI.ResultId && <CMIResultEdit CMIId={selectedCMI.ResultId}/>}
        </>}

        {/* // * Tax */}
        {Object.keys(selectedTax).length !== 0 && type === "Tax" && 
        <>
        <div className='selected-user'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="title-deco-user">รายละเอียดของภาษี</h2>
                <Buttons
                    label={!isEditTax ? "แก้ไข": "กำลังแก้ไข"}
                    variant="primary"
                    onClick={editTax}
                    height="50px"
                    width="100px"
                    disabled={isEditTax}
                />
            </div>
            <div className='user-details'>
            {
            Object.entries(editableTax)
            .filter(([key]) => key !== 'RegistrationBook' && key !== 'VehicleTax')
            .map(([key, value]) => {
                // Find the matching field object based on the key
                const matchedField = fields.find(field => field.field === key);
                const label = matchedField ? matchedField.headerName : key;
        
                return (
                    <div key={key + editableTax.id}>
                        <label>{label}
                            <span style={{color: "red"}}>{key.includes("Id") ? " แก้ไขไม่ได้*" : ""}</span>
                        </label>
                        <TextField
                            name={key}
                            value={value === null ? "" : value}
                            disabled={!isEditTax || (isEditTax && key.includes("Id"))}
                            onChange={handleChangeTax}
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
                <label style={{marginLeft: '10px'}}>สมุดจดทะเบียนรถ และ ใบภาษีรถยนต์</label>
            </div>

            <div>
                <Button variant='contained' onClick={handleStatusTax} disabled={isEditTax}
                className={editableTax.Status === 0 ? "status-pending-button" : "status-approved-button"}>
                    {editableTax.Status === 0 ? "รอการอนุมัติ" : "อนุมัติเรียบร้อย"}
                </Button>
            </div>

            </div> 
            <div style={{display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "flex-end"}}>
                <Button disabled={!isEditTax} variant='contained' className='saveNcancel-button save-button' 
                onClick={() => updateTax("save")}
                >save</Button>
                <Button disabled={!isEditTax} onClick={() => updateTax("cancel")} className='saveNcancel-button cancel-button'>
                Cancel</Button>
            </div>
            </div>

            {/* // * Payment Tax */}
            <PaymentEdit paymentId={selectedRow.taxPaymentId}/>  
        </>     
        }
        
        {/* // * Popup */}
        <Popup isOpen={openPopup} title="แจ้งเตือน" children={popupText} 
        onClose={handleClosePopup} onSubmit={handleSubmitPopup} type={popupType}></Popup>
        <ErrorPopup isOpen={openPopupError} title="เกิดข้อผิดพลาด" children={popupError} 
        onClose={() => setOpenPopUpError(false)}/>

        <ImagePopup isOpen={openPopupImage} onClose={() => setOpenPopUpImage(false)}
        title={'เอกสารที่ถูกอัปโหลด'} images={popupImage}></ImagePopup>

        </div>
    );
}

export default OrdersTable;
