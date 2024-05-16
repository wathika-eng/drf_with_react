import React from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    return (
        <div>No Account? <Navigate to="/register" /></div>
    );
};

export default Login;