import axiosInstance from './helpers/axios';

export const places_filter = (queryString = "") => {
    return axiosInstance.get(`place-filters?${queryString}`)
        .then(response => {
            return response;
        });
};