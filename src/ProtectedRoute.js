import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const CustomProtectedRoute = ({ element, requiredPermission, ...rest }) => {
    const { permissions } = useAuth();
    const hasPermission = permissions.includes(requiredPermission);

    console.log("pass")
    // Render the Route with the appropriate component or redirect
    return (
        <Route 
            {...rest} 
            element={hasPermission ? element : <Navigate to="/unauthorized" />} 
        />
    );
};

export default CustomProtectedRoute;
