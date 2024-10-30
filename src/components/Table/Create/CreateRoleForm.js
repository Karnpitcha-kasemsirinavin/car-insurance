import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import "./CreateForm.css"
import { baseURL } from '../../../AuthContext';

const CreateRoleForm = ({ tableName, fields , resetData}) => {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');

    // * edit value
    const handleChange = (fieldName, value) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    // * Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseURL}/sys/create/userRoles/${tableName}`, formData);
            setMessage(response.data.message);
            setFormData({});

            // * update data
            resetData();
        } catch (error) {
            console.error('Error creating entry:', error);
            setMessage('Failed to create new entry. Please try again.');
        }
    };

    // * render fields
    const renderField = (field) => {
        let inputType = 'text';

        // * field types
        // if (field.type === 'number') {
        //     inputType = 'number';
        // } else if (field.type === 'date') {
        //     inputType = 'date';
        // }

        return (
            <div key={"input" + field.headerName} style={{display: "flex", flexDirection: "column"}}>
            <label>{field.headerName}
                <span style={{color: "red"}}>{field.field === "permissions" ? ` (ข้อความแบ่งด้วย "," )`: ""}</span>
            </label>
            <TextField
                key={field.field}
                variant="outlined"
                type={inputType}
                value={formData[field.field] || ''}
                onChange={(e) => handleChange(field.field, e.target.value)}
                required={field.required}
            />
            </div>
        );
    };

    return (
        <Paper className='create-table'>
            {/* <Typography variant="h5" align="center" gutterBottom>
                สร้างข้อมูลสำหรับ {tableName} เพิ่ม
            </Typography> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className="title-deco-user">สร้างข้อมูลสำหรับ {tableName} เพิ่ม</h2>
            {message && <Typography color="secondary" align="center">{message}</Typography>}
            </div>
            <form onSubmit={handleSubmit}>
                <Box className="create-form">
                    {fields.map((field) => renderField(field))}
                </Box>
                <div style={{display: "flex", flexDirection: "row", gap: "16px", 
                    alignItems: "center", justifyContent: "flex-end", marginTop: "15px"}}>
                <Button type="submit" variant="contained" color="primary" className='saveNcancel-button save-button'>
                    Save
                </Button>
                <Button color="primary" className='saveNcancel-button cancel-button'>
                    Cancel
                </Button>
                </div>
            </form>
        </Paper>
    );
};

export default CreateRoleForm;
