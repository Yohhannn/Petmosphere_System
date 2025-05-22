import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminValidation = () => {
    const adminCookie = Cookies.get('adminCredentials');

    if (!adminCookie) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(adminCookie);
        const now = new Date().getTime();

        if (user.expiresAt && now > user.expiresAt) {
            Cookies.remove('adminCredentials');
            return <Navigate to="/login" replace />;
        }

        return <Outlet />; // Render child route here

    } catch  {
        return <Navigate to="/login" replace />;
    }
};

export default AdminValidation;
