import { useState } from "react";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await Api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                console.log(res.data.access); //working
                console.log(res.data.ACCESS_TOKEN);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert("An error occurred during the request.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:container md:mx-auto">
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                <h1>{name}</h1>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Your name" />
                    </div>
                    <TextInput
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="name"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button color="blue" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    );
}

export default Form;
