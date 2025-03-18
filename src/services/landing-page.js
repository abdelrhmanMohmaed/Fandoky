import axiosInstance from './helpers/axios';

export const places = (queryString = "") => {
    return axiosInstance.get(`places?${queryString}`)
        .then(response => {
            return response;
        });
};