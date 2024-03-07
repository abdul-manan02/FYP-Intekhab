import React from 'react';
import { Navigate } from 'react-router-dom';

const VoterProtected = ({ element }) => {
    const voter = localStorage.getItem('voter-candidate');

    // Check if the admin token exists
    if (voter) {
        return element; // Render the original component
    } else {
        // Redirect to the login page if the token doesn't exist
        return <Navigate to="/voter/login" />;
    }
};

export default VoterProtected;
