import axiosInstance from './helpers/axios';
import { setData, removeData } from './helpers/authentication';

export const login = (axiosdata) => {
    return axiosInstance.post('login', axiosdata)
        .then(response => {
            setData(response);// Helper Fun
            return response;
        });
};

export const logout = () => {
    return axiosInstance.post('logout')
        .then(() => {
            removeData()// Helper Fun
        });
};

export const verify = (payload) => {
    const user_id = sessionStorage.getItem('id');
    payload['user_id'] = user_id;
    // payload = { user_id: sessionStorage.getItem('id') };

    return axiosInstance.post('verify', payload)
        .then(response => {
            console.log(response);
            sessionStorage.setItem('verified', "true");
            return response;
        });
};

export const resendOtp = () => {
    const payload = { user_id: sessionStorage.getItem('id') };

    return axiosInstance.post('resend-otp', payload)
        .then(response => {
            console.log(response);

            return response;
        });
};

export const sendResetLinkEmail = (email) => {
    return axiosInstance.post("/password/email", { email });
};

export const resetPassword = (payload) => {
    return axiosInstance.post("/password/reset", payload);
};