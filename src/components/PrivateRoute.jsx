import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = Boolean(localStorage.getItem('authToken'));

    return isAuthenticated ? <Outlet/> : <Navigate to="/sign-in"/>;
};

export default PrivateRoute;