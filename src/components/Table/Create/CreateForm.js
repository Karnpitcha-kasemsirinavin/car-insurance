import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import "./CreateForm.css"

const CreateForm = ({ tableName, fields }) => {
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
            const response = await axios.post(`/api/${tableName}/create`, formData);
            setMessage(response.data.message);
            setFormData({});
        } catch (error) {
            console.error('Error creating entry:', error);
            setMessage('Failed to create new entry. Please try again.');
        }
    };

    // * render fields
    const renderField = (field) => {
        let inputType = 'text';

        // * field types
        if (field.type === 'number') {
            inputType = 'number';
        } else if (field.type === 'date') {
            inputType = 'date';
        }

        return (
            <div key={"input" + field.headerName} style={{display: "flex", flexDirection: "column"}}>
            <label>{field.headerName}</label>
            <TextField
                key={field.name}
                label={field.headerName}
                variant="outlined"
                type={inputType}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
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
            <h2 className="title-deco-user">สร้างข้อมูลสำหรับ {tableName} เพิ่ม</h2>
            <form onSubmit={handleSubmit}>
                <Box className="create-form">
                    {fields.map((field) => renderField(field))}
                </Box>
            </form>
            <div style={{display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "flex-end"}}>
            <Button type="submit" variant="contained" color="primary" className='saveNcancel-button save-button'>
                Save
            </Button>
            <Button type="submit" color="primary" className='saveNcancel-button cancel-button'>
                Cancel
            </Button>
            </div>
            {message && <Typography color="secondary" align="center">{message}</Typography>}
        </Paper>
    );
};

export default CreateForm;
