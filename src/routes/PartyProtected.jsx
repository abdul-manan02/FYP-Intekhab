import React from 'react';
import { Navigate } from 'react-router-dom';

const PartyProtected = ({ element }) => {
    const party = localStorage.getItem('partyToken');

    // Check if the admin token exists
    if (party) {
        return element; // Render the original component
    } else {
        // Redirect to the login page if the token doesn't exist
        return <Navigate to="/party/login" />;
    }
};

export default PartyProtected;
