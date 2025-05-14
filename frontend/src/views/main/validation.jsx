import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const Validation = () => {
    const userCookie = Cookies.get('userCredentials');

    if (!userCookie) {
        return <Navigate to="/login" replace />;
    }
    
    try {
        const user = JSON.parse(userCookie);
        const now = new Date().getTime();

        if (user.expiresAt && now > user.expiresAt) {
            Cookies.remove('userCredentials');
            return <Navigate to="/login" replace />;
        }

        return <Outlet />; // Render child route here

    } catch (e) {
        return <Navigate to="/login" replace />;
    }
};

export default Validation;
