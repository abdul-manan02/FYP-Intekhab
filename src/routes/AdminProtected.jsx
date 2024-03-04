import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtected = ({ element }) => {
    const admin = localStorage.getItem('admin');

    // Check if the admin token exists
    if (admin) {
        return element; // Render the original component
    } else {
        // Redirect to the login page if the token doesn't exist
        return <Navigate to="/login" />;
    }
};

export default AdminProtected;
