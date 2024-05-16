import React from 'react';
import Form from '../Components/Form';
const Register = () => {
    return (
        <Form route="api/user/registration" method="register" />
    );
};

export default Register;