import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stack, useMediaQuery, Autocomplete, TextField, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { baseURL } from "../../AuthContext.js";
import FormContainer from "./FormContainer.js";
import MainTitle from "./MainTitleTypography.js";
import SectionTitle from "./SectionTitleTypography.js";
import Buttons from "../Buttons/Buttons.js";
import StickyFooter from "../StickyFooter/StickyFooter.js";
import SelectField from "./SelectField";
import ResponsiveStack from "./ResponsiveStack.js";

function DeliveryAddrForm() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = location.state || {};

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (value) {
            setErrors({ ...errors, [name]: false });
        }
    };

    const handleSubmit = async () => {
        const { Addr, PostalCode, Province, District, SubDistrict } = formData;
        const newErrors = {
            Addr: !Addr,
            PostalCode: !PostalCode,
            Province: !Province,
            District: !District,
            SubDistrict: !SubDistrict
        };
        setErrors(newErrors);
        if (Object.values(newErrors).every(value => value === false)) {
            console.log("ข้อมูลที่ส่ง:", formData);

            const data = {...formData, orderId};
            await createAddr(data);
            
            // navigate("/receipt-page", {
            //     state: {
            //     orderId: response.data.data.orderId
            // }
            // });
        }
    };

    // * create deliovery addr for order
    async function createAddr(data) {
        if (!data.orderId) {
            // ! error
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/order/addr`, data, {
                withCredentials: true,
            });
            
            console.log("Response data:", response.data);
            
            if (response && response.data.status === "success") {
                navigate("/receipt-page", {
                    state: {
                        orderId: orderId,
                    },
                });
            } else {
                console.error("Unexpected response structure:", response.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Axios error:", error.response?.data || error.message);
            } else {
                console.log("General error:", error);
            }
        }
    }

    const [subDistrict, setSubDistrict] = useState([]);
    const [district, setDistrict] = useState([]);
    const [province, setProvince] = useState([]);
    const [postalCode, setPostalCode] = useState([]);

    // * request addr data
    async function requestAddr() {
        try {
            const response = await axios.post(`${baseURL}/option/addr`, {
                SubDistrict: formData.SubDistrict || null,
                District: formData.District || null,
                Province: formData.Province || null,
                PostalCode: formData.PostalCode || null
            });
            if (response) {
                const tempAddr = response.data.data;
                setSubDistrict(tempAddr.SubDistrict);
                setDistrict(tempAddr.District);
                setProvince(tempAddr.Province);
                setPostalCode(tempAddr.PostalCode);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        requestAddr();
    }, [formData.SubDistrict, formData.District, formData.Province, formData.PostalCode]);

    return (
        <div>
            <MainTitle text="ข้อมูลที่อยู่ที่ทำการจัดส่ง" />
            <FormContainer>
                <ResponsiveStack>
                    <TextField
                        label="ที่อยู่ (ที่ไม่ใช่ เขต/อำเภอ, แขวง/ตำบล, จังหวัด)"
                        name="Addr"
                        value={formData.Addr || ''}
                        onChange={handleChange}
                        error={errors.Addr}
                        helperText={errors.Addr ? "กรุณากรอกที่อยู่ตามบัตร" : ""}
                        multiline
                        rows={2}
                        fullWidth
                    />
                </ResponsiveStack>
                <ResponsiveStack>
                    <SelectField
                        label="เขต/อำเภอ"
                        name="District"
                        value={formData.District || ''}
                        onChange={handleChange}
                        options={district || []}
                        error={errors.District}
                        fullWidth
                        helperText={errors.District ? "กรุณากรอกเขต/อำเภอ" : ""}
                    />
                    <SelectField
                        label="แขวง/ตำบล"
                        name="SubDistrict"
                        value={formData.SubDistrict || ''}
                        onChange={handleChange}
                        options={subDistrict || []}
                        error={errors.SubDistrict}
                        fullWidth
                        helperText={errors.SubDistrict ? "กรุณากรอก แขวง/ตำบล" : ""}
                    />
                </ResponsiveStack>
                <ResponsiveStack>
                    <SelectField
                        label="จังหวัด"
                        name="Province"
                        value={formData.Province || ''}
                        onChange={handleChange}
                        options={province || []}
                        error={errors.Province}
                        fullWidth
                    />
                    <SelectField
                        label="รหัสไปรษณีย์"
                        name="PostalCode"
                        value={formData.PostalCode || ''}
                        onChange={handleChange}
                        options={postalCode || []}
                        error={errors.PostalCode}
                        fullWidth
                        helperText={errors.PostalCode ? "กรุณากรอกให้ถูกต้อง (รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก)" : ""}
                    />
                </ResponsiveStack>
            </FormContainer>
            <StickyFooter>
                <Buttons onClick={handleSubmit} variant="primary" label="บันทึก" />
            </StickyFooter>
        </div>
    );
}

export default DeliveryAddrForm;
