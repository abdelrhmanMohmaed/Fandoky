import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

const getToken = () => sessionStorage.getItem('accessToken');

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: API_URL,
        headers: {
        Accept: 'application/json'
        }
    });

    instance.interceptors.request.use(
        (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );

    return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;