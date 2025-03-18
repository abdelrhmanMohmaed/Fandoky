import axios from 'axios';
import { setData, removeData } from './helpers/authentication';

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

// export const login = async (email, password) => {
//     try {
//         const response = await fetch(`${API_URL}login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || "Login failed");
//         }

//         const data = await response.json();

//         if (data.token) {
//             sessionStorage.setItem('user-name', data.user.name)
//             const modal = document.getElementById("loginModal");
//             if (modal) {
//                 modal.classList.remove("show");
//                 document.body.classList.remove("modal-open");
//             } else {
//                 console.warn("loginModal not found in the DOM.");
//             }

//             return data;
//         } else {
//             throw new Error(data.message || "Login failed");
//         }
//     } catch (error) {
//         console.error("Error during login:", error);
//         throw error;
//     }
// };


// export const logout = async (token) => {
//     if (!token) {
//         console.error("No token found. User may not be logged in.");
//         return false;
//     }

//     try {
//         const response = await fetch(`${API_URL}logout`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         if (response.ok) {
//             sessionStorage.removeItem("token");

//             console.log("Done");
//             return true;
//         } else {
//             console.error("Failed to log out:", response.statusText);
//             return false;
//         }
//     } catch (error) {
//         console.error("Error during logout:", error);
//         return false;
//     }
// };

// export const logout = () => {
//     document.cookie = "token=; max-age=0; path=/";
// };

// export const getToken = () => {
//     const name = "token=";
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const ca = decodedCookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === " ") {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) === 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// };

// export const isLoggedIn = () => {
//     return !!getToken();
// };