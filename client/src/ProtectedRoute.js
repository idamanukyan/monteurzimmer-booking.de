// src/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const accessToken = localStorage.getItem('access_token');
    const userRole = "ADMIN";

    if (!accessToken || userRole !== requiredRole) {
        return <Navigate to="/login" />;
    }


    return children;
};

export default ProtectedRoute;
