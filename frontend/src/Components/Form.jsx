import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { Button, TextInput, Checkbox, Label, } from "flowbite-react";

const Form = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            } else {
                navigate("login/");
            }
        } catch (error) {
            alert(error);
        } finally {
            console.log("final");
        }
    };

    const name = method === "login" ? "login" : "register";
    return (
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default Form;