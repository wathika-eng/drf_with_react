// intercept request and fix headers well
// add the tokens if valid
// read on https://vitejs.dev/guide/env-and-mode
import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL, //load from .env
});
api.interceptors.request.use(
	(config) => {
		//if token is valid and available add it to headers and allow login
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			return;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export default api;
