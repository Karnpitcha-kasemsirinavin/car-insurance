import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, TablePagination, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon
import axios from 'axios';
import MainTitleTable from '../MainTitleTable';
import { baseURL } from '../../../App';
import { Popup } from '../../Popup/Popup';
import { ErrorPopup } from '../../Popup/Popup';

const OptionTable = ({ title, table }) => {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedRow, setEditedRow] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    
    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Search state
    const [searchField, setSearchField] = useState('');
    const [searchValue, setSearchValue] = useState('');

    // * request Fields
    const requestServiceSysFields = async () => {
        try {
            const response = await axios.get(`${baseURL}/sys/columns/options/${table}`);
            if (response && response.data.status === "success") {
                setFields(response.data.data);
                // Default to the first field for searching
                if (response.data.data.length > 0) {
                    setSearchField(response.data.data[0].field);
                }
            } else {
                setIsErrorPopupOpen(true);
                setErrorMessage(`ไม่สามารถเรียก fields สำหรับ ${title} ( ${table} ) ได้`);
            }
        } catch (error) {
            setIsErrorPopupOpen(true);
            setErrorMessage(`ไม่สามารถเรียก fields สำหรับ ${title} ( ${table} ) เพราะ ${error}`);
        }
    };

    // * request Data
    const requestServiceSysData = async () => {
        try {
            const response = await axios.get(`${baseURL}/sys/data/options/${table}`);
            if (response && response.data.status === "success") {
                setData(response.data.data);
            } else {
                setIsErrorPopupOpen(true);
                setErrorMessage(`ไม่สามารถเรียกข้อมูลสำหรับ ${title} ( ${table} ) ได้`);
            }
        } catch (error) {
            setIsErrorPopupOpen(true);
            setErrorMessage(`ไม่สามารถเรียกข้อมูลสำหรับ ${title} ( ${table} ) เพราะ ${error}`);
        }
    };

    // * click edit
    const handleEditClick = (index) => {
        setEditingRow(index);
        setEditedRow({ ...data[index] });
        setIsEdit(true);
    };

    // * toggle Status
    const handleStatusToggle = () => {
        if (editedRow) {
            const newStatus = editedRow.Status === 1 ? 0 : 1;
            setEditedRow({ ...editedRow, Status: newStatus });
        }
    };

    // * clcik save
    const handleSaveClick = () => {
        setIsEdit(false);
        setIsPopupOpen(true);
    };

    // * update Edit
    const confirmSave = async () => {
        try {
            const response = await axios.put(`${baseURL}/sys/update/options/${table}`, editedRow);

            if (response && response.data.status === "success") {
                const updatedData = [...data];
                updatedData[editingRow] = editedRow;
                setData(updatedData);
                setIsPopupOpen(false);
                setEditingRow(null);
                setEditedRow(null);
            } else {
                setIsPopupOpen(false);
                setIsErrorPopupOpen(true);
                setErrorMessage("ไม่สามารถอัปเดตข้อมูลได้");
            }
        } catch (error) {
            setIsPopupOpen(false);
            setIsErrorPopupOpen(true);
            setErrorMessage(`ไม่สามารถอัปเดตข้อมูลได้เพราะ ${error}`);
        }
    };

    const handleInputChange = (field, value) => {
        if (editedRow) {
            setEditedRow({ ...editedRow, [field]: value });
        }
    };

    const handleDeleteClick = async (index) => {
        const rowToDelete = data[index];
        try {
            const response = await axios.delete(`${baseURL}/sys/delete/${table}/${rowToDelete.id}`); 
            if (response && response.data.status === "success") {
                const updatedData = data.filter((_, i) => i !== index);
                setData(updatedData);
            } else {
                setIsErrorPopupOpen(true);
                setErrorMessage("ไม่สามารถลบข้อมูลได้");
            }
        } catch (error) {
            setIsErrorPopupOpen(true);
            setErrorMessage(`ไม่สามารถลบข้อมูลได้เพราะ ${error}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            requestServiceSysFields();
            requestServiceSysData();
        };
        fetchData();
    }, []);

    // * change display page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // * row setting
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // * popup close
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setEditingRow(null);
        setEditedRow(null); 
    };

    // * search =========================================================================
    // * search fields
    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };
    // * search value
    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    // * filtered rows
    const filteredData = data.filter((row) => {
        if (!searchValue) return true;
        const fieldValue = row[searchField];
        return fieldValue && fieldValue.toString().toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
        <div className='all-container'>
            <div className='table-section'>
                <div className='title-table-container'>
                    <MainTitleTable text={`${title} ( ${table} )`} className="title-table" />
                </div>
                
                <Paper className="users-table-root">
                {/* Search Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }} className='search-container-table'>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FormControl variant="outlined">
                            <Select
                                value={searchField}
                                onChange={handleSearchFieldChange}
                            >
                                {fields.map((field) => (
                                    <MenuItem key={field.field} value={field.field}>
                                        {field.headerName || field.field}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            placeholder="ค้นหา..."
                            value={searchValue}
                            onChange={handleSearchValueChange}
                        />
                    </div>
                    {/* Pagination Rows per Page */}
                    <FormControl variant="outlined">
                        <InputLabel>จำนวนแถว</InputLabel>
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            label="จำนวนแถว"
                            className='pagination-table-row'
                        >
                            {[5, 10, 15].map(rows => (
                                <MenuItem key={rows} value={rows}>{rows}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                
                {/* Data */}
                    {filteredData.length === 0 ? (
                        <div style={{ padding: '16px', textAlign: 'center' }}>
                            <h4>ไม่มีข้อมูลที่จะแสดง</h4>
                        </div>
                    ) : (
                        <>
                        <Table>
                            <TableHead>
                                <TableRow className='custom-data-row'>
                                    {fields.length !== 0 && fields.map((field) => (
                                        <TableCell key={field.field} className='custom-cell-row'>{field.headerName ? field.headerName : field.field}</TableCell>
                                    ))}
                                    <TableCell className='custom-cell-row'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {fields.length !== 0 && filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        </>
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

export default OptionTable;
