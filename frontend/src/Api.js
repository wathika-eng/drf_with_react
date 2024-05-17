// intercept request and fix headers well
// add the tokens if valid
// read on https://vitejs.dev/guide/env-and-mode
import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

//fixed from api to Api
const Api = axios.create({
	baseURL: import.meta.env.VITE_API_URL, //load from .env
});
Api.interceptors.request.use(
	async (config) => {
		try {
			//if token is valid and available add it to headers and allow login
			const token = localStorage.getItem(ACCESS_TOKEN);
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		} catch (error) {
			console.error('Error intercepting request:', error);
			return Promise.reject(error);
		}
	},
	(error) => {
		console.error('Error in request interceptor:', error);
		return Promise.reject(error);
	}
);
export default Api;
