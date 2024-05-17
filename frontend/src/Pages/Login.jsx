import React from 'react';
import { Navigate } from 'react-router-dom';
import Form from '../Components/Form';
const Login = () => {
    return (
        <>
            <Form route="/api/token/" method="login" />
        </>
    );
};

export default Login;