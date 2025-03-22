import axiosInstance from './helpers/axios';

export const contact = (payload) => {
    return axiosInstance.post('contact', payload)
        .then(response => {
            
            console.log(response);
            return response;
        });
};