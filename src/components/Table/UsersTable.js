import React, { useState } from 'react';
import './Table.css';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import MainTitleTable from './MainTitleTable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons/Buttons';

import { Popup, ErrorPopup } from '../Popup/Popup';
import axios from 'axios';
import { baseURL } from '../../App';

const popupTextCondition = {
    save: "คุณต้องการแก้ไขใช่หรือไม่",
    cancel: "คุณต้องการยกเลิกการแก้ไขใช่หรือไม่"
}


function UsersTable({ fields, data, reset }) {
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const navigate = useNavigate();
    const initialRow = data;


    const [selectedRow, setSelectedRow] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [editableValues, setEditableValues] = useState(selectedRow);

    // * Popup
    const [openPopup, setOpenPopUp] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [popupType, setPopupType] = useState("")
    const [isCancel, setIsCancel] = useState(false);

    // * Popup Error
    const [openPopupError, setOpenPopUpError] = useState(false);
    const [popupError, setPopupError] = useState("");

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

    // * selected user
    const handleSelectUser = (id) => {
        const rowWithId = filteredRows.find(row => row.id === id);
        console.log(rowWithId);
        setSelectedRow(rowWithId)
        setEditableValues(rowWithId)
    }

    // * edit user
    const editUser = () => {
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

    // * save N cancel update user
    const saveNCancelUpdate = async (action) => {
        // set popup
        if (action === "save") {
            setPopupText(popupTextCondition.save);
            setIsCancel(false);
        } else if (action === "cancel") {
            setPopupText(popupTextCondition.cancel);
            setIsCancel(true);
        }
        setOpenPopUp(true)
        setPopupType("User");
    }

    // * update User
    async function updateUser(userData) {
        const tempData = userData;
        delete tempData.OrderStatus;
        delete tempData.TotalOrder;
        try {
            const response = await axios.post(`${baseURL}/admin/update/user`,
                tempData
            );
            
            if (response && response.data.status === "success") {
                // success then reset data
                await reset();
                setSelectedRow({});
            }
        } catch (error) {
            // ! error
            const data = error.response.data;
            setPopupError(data.message);
            setOpenPopUpError(true);
        }
    }

    // * popup ===================================
    // close 
    const handleClosePopup = (type) => {
        setOpenPopUp(false);
    }

    // submit
    const handleSubmitPopup = async (type) => {
        if (type === "User") {
            setIsEdit(false);
            if (isCancel) {
                // cancel edit
                setEditableValues(selectedRow);
            } else {
                // confirm edit
                await updateUser(editableValues);
            }
        }
        setOpenPopUp(false);
    }

    return (
        <div className='all-container'>
        
        <div className='table-section'>
        <div className='title-table-conatiner'>
                <MainTitleTable text="ข้อมูลผู้ใช้ในระบบ ( Users )" className="title-table"/>
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
                        <TableCell className="custom-table-head" align="right">ออเดอร์ทั้งหมด</TableCell>
                        <TableCell className="custom-table-head" align="right">ออเดอร์ที่ยังไม่ตรวจสอบ</TableCell>
                        <TableCell className="custom-table-head" align="right">Go to Orders</TableCell>
                    </TableRow>
                </TableHead>
                
                {/* // * Data */}
                <TableBody>
                {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow className="custom-table-row" key={row.id} onClick={() => handleSelectUser(row.id)}>
                        {/* Use fields to match data properly */}
                        {fields.map((field) => (
                            <TableCell key={row.id + field.field} className="custom-table-body" align="right">
                                {field.field !== 'OrderStatus' ? row[field.field] : 'Custom Text'}
                            </TableCell>
                        ))}

                        {/* extra columns */}
                        <TableCell className="custom-table-body" align="right">
                            {row.TotalOrder}
                        </TableCell>

                        <TableCell className="custom-table-body" align="right">
                            {row.OrderStatus[0]}
                        </TableCell>

                        <TableCell className="custom-table-body" align="right">
                        <Button 
                            variant="contained" 
                            onClick={() => navigate(`/orders/user?id=${row.id}`)} // Navigate based on row ID
                            className='button-table-row'
                        >
                        Orders
                        </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            </Table>
        </Paper>
        </div>
        
        {/* // * selected user */}
        {Object.keys(selectedRow).length !== 0 &&
        <div className='selected-user'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="title-deco-user">รายละเอียด User</h2>
                <Buttons
                    label={!isEdit ? "แก้ไข": "กำลังแก้ไข"}
                    variant="primary"
                    onClick={editUser}
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
                            {/* <span style={{color: "red"}}>{key.includes("Id") ? " แก้ไขไม่ได้*" : ""}</span> */}
                        </label>
                        <TextField
                            name={key}
                            value={value}
                            disabled={!isEdit}
                            onChange={handleChange}
                            fullWidth
                            className='user-textfield'
                        />
                    </div>
                );
            })
            }
            </div> 
            <div style={{display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "flex-end"}}>
                <Button disabled={!isEdit} variant='contained' className='saveNcancel-button save-button' 
                onClick={() => saveNCancelUpdate("save")}
                >save</Button>
                <Button disabled={!isEdit} onClick={() => saveNCancelUpdate("cancel")} className='saveNcancel-button cancel-button'>
                Cancel</Button>
            </div>       
        </div>}

        {/* // * Popup */}
        <Popup isOpen={openPopup} title="แจ้งเตือน" children={popupText} 
        onClose={handleClosePopup} onSubmit={handleSubmitPopup} type={popupType}></Popup>
        <ErrorPopup isOpen={openPopupError} title="เกิดข้อผิดพลาด" children={popupError} 
        onClose={() => setOpenPopUpError(false)}/>

        </div>
    );
}

export default UsersTable;
