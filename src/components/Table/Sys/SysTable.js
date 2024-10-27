import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import MainTitleTable from '../MainTitleTable';
import { baseURL } from '../../../App';
import { Popup } from '../../Popup/Popup';
import './SysTable.css';
import { ErrorPopup } from '../../Popup/Popup';

const SysTable = ({ title, table }) => {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedRow, setEditedRow] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    // * request Fields
    const requestServiceSysFields = async () => {
        try {
            const response = await axios.get(`${baseURL}/sys/columns/${table}`);
            if (response && response.data.status === "success") {
                setFields(response.data.data);
            } else {
                setIsErrorPopupOpen(true);
                setErrorMessage(`ไม่สามารถเรียก fields สำหรับ ${title} ( ${table} ) ได้`);
            }
        } catch (error) {
            setIsErrorPopupOpen(true);
            setErrorMessage(`ไม่สามารถเรียก fields สำหรับ ${title} ( ${table} ) เพราะ ${error}`)
        }
    };

    // * request Data
    const requestServiceSysData = async () => {
        try {
            const response = await axios.get(`${baseURL}/sys/data/${table}`);
            if (response && response.data.status === "success") {
                setData(response.data.data);
            } else {
                setIsErrorPopupOpen(true);
                setErrorMessage(`ไม่สามารถเรียกข้อมูลสำหรับ ${title} ( ${table} ) ได้`)
            }
        } catch (error) {
            //! error
            setIsErrorPopupOpen(true);
            setErrorMessage(`ไม่สามารถเรียกข้อมูลสำหรับ ${title} ( ${table} ) เพราะ ${error}`)
        }
    };

    const handleEditClick = (index) => {
        setEditingRow(index);
        setEditedRow({ ...data[index] });
        setIsEdit(true)
    };

    const handleStatusToggle = () => {
        if (editedRow) {
            const newStatus = editedRow.Status === 1 ? 0 : 1;
            setEditedRow({ ...editedRow, Status: newStatus });
        }
    };

    const handleSaveClick = () => {
        setIsEdit(false);
        setIsPopupOpen(true);
    };

    // * update Edit
    const confirmSave = async () => {
        try {
            const response = await axios.put(`${baseURL}/sys/update/${table}`, editedRow);

            if (response && response.data.status === "success") {
                const updatedData = [...data];
                updatedData[editingRow] = editedRow;
                setData(updatedData);
                setIsPopupOpen(false);
                setEditingRow(null);
                setEditedRow(null);
            } else {
                // ! error
                setIsPopupOpen(false);
                setIsErrorPopupOpen(true);
                setErrorMessage("ไม่สามารถอัปเดตข้อมูลได้")
            }
        } catch (error) {
            // ! error
            setIsPopupOpen(false);
            setIsErrorPopupOpen(true);
            setErrorMessage(`ไม่สามารถอัปเดตข้อมูลได้เพราะ ${error}`)
        }
    };

    const handleInputChange = (field, value) => {
        if (editedRow) {
            setEditedRow({ ...editedRow, [field]: value });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            requestServiceSysFields();
            requestServiceSysData();
        };
        fetchData();
    }, []);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setEditingRow(null);
        setEditedRow(null); 
    };
    

    return (
        <div className='all-container'>
            <div className='table-section'>
                <div className='title-table-container'>
                    <MainTitleTable text={`${title} ( ${table} )`} className="title-table" />
                </div>
                <Paper className="users-table-root">
                    {data.length === 0 ? (
                        <div style={{ padding: '16px', textAlign: 'center' }}>
                            <h4>ไม่มีข้อมูลที่จะแสดง</h4>
                        </div>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow className='custom-data-row'>
                                    {fields.length !== 0 && fields.map((field) => (
                                        <TableCell key={field.field} className='custom-cell-row'>{field.headerName ? field.headerName: field.field}</TableCell>
                                    ))}
                                    <TableCell className='custom-cell-row'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {fields.length !== 0 && data.map((row, index) => (
                                <TableRow key={index} className='custom-data-row'>
                                    {fields.map((field) => (
                                        <TableCell key={field.field + index.toString()} className='custom-cell-row'>
                                            {editingRow === index ? (
                                                field.field === 'Status' ? (
                                                    <Button onClick={handleStatusToggle}> {/* Toggle status on button click */}
                                                        {editedRow && editedRow.Status === 1 ? <CheckIcon /> : <CloseIcon />}
                                                    </Button>
                                                ) : (
                                                    <TextField
                                                        variant="standard"
                                                        value={editedRow ? editedRow[field.field] : row[field.field]}
                                                        onChange={(e) => handleInputChange(field.field, e.target.value)}
                                                    />
                                                )
                                            ) : field.field === 'Status' ? (
                                                <Button onClick={() => handleEditClick(index)} disabled={!isEdit}>
                                                    {row.Status === 1 ? <CheckIcon /> : <CloseIcon />}
                                                </Button>
                                            ) : (
                                                row[field.field]
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell className='custom-cell-row'>
                                        {editingRow === index ? (
                                            <>
                                                <IconButton onClick={handleSaveClick}>
                                                    <SaveIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <IconButton onClick={() => handleEditClick(index)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    )}
                </Paper>
                <Popup
                isOpen={isPopupOpen}
                onSubmit={confirmSave}
                onClose={handleClosePopup}
                title="แจ้งเตือน"
                children={"คุณต้องการแก้ไขใช่หรือไม่"}
                />
                <ErrorPopup
                isOpen={isErrorPopupOpen}
                onClose={() => setIsErrorPopupOpen(false)}
                title="เกิดข้อผิดพลาด"
                children={errorMessage}
                />
            </div>
        </div>
    );
};

export default SysTable;
