// all routes here need authorization
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../Api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useEffect, useState } from 'react';

//stop someone from accessing a url in the frontend without login, else redirect

const ProtectedRoute = () => {
    const [isAuthorized, setisAuthorized] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth().catch(() => setisAuthorized(false));
    }, []);

    const refresh_token = async () => {
        const newToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: newToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setisAuthorized(true);

            } else {
                setisAuthorized(false);
            }
        } catch (error) {
            setisAuthorized(false);
            console.error(error);
        }

    };
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setisAuthorized(false); //if no token exit this fn
            return;
        } else { //else get the token, validate it
            const decoded = jwtDecode(token);
            const tokenExpiry = decoded.exp;
            const now = Date.now() / 1000; //get it in seconds not ms
            if (tokenExpiry < now) { //if token already expired, refresh it else is valid
                await refresh_token;
            } else {
                setisAuthorized(true);
                setLoading(true);
            }
        }
    };
    if (isAuthorized === null) {
        {
            loading && <div>Loading...</div>;
        }
    } else {
        setLoading(false);
        return isAuthorized ? <div>Good</div> : <Navigate to="/login" />;
    }
};
export default ProtectedRoute;