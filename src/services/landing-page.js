import axiosInstance from './helpers/axios';

export const places = (queryString = "") => {
    return axiosInstance.get(`places?${queryString}`)
        .then(response => {
            return response;
        });
};

export const getPlaceById = (id) => {
    return axiosInstance.get(`places/${id}`)
        .then(response => {
            // console.log(response);
            
            return response;
        });
};