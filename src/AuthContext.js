// AuthContext.js
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();
export const baseURL = "http://localhost:8000";
// export const baseURL = "http://13.213.41.31:8000";


export const fetchUserRoles = async () => {
    const response = await axios.get(`${baseURL}/users/roles/verify`, {
        withCredentials: true
    });
    if (response && response.data.status === "success") {
        return response.data.data;
    } else {
        console.log("error: ", "not valid");
    }
};

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem("userRole") || null;
    });
    const [permissions, setPermissions] = useState([]);
    const location = useLocation();


    useEffect(() => {
        const initializeRoles = async () => {
            try {
                console.log("Fetching user roles...");
                const userRoles = await fetchUserRoles();
                setUserRole(userRoles.role);
                setPermissions(userRoles.permissions);
                localStorage.setItem("userRole", userRoles.role);
            } catch (error) {
                console.error("Error fetching user roles:", error);
            }
        };

        initializeRoles(); // Call immediately on pathname change

    }, [location.pathname]);

    const logout = () => {
        setUserRole(null);
        setPermissions([]);
        localStorage.removeItem("userRole"); // Clear localStorage on logout
    };

    return (
        <AuthContext.Provider value={{ userRole, setUserRole, permissions, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);