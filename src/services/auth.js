const API_URL = "http://meegypt/Milk-Run/public/api/milk-run/auth/";

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.status === 1) {
            sessionStorage.setItem("token", data.data.token);

            const modal = document.getElementById("loginModal");
            if (modal) {
                modal.classList.remove("show");
                document.body.classList.remove("modal-open");
            } else {
                console.warn("loginModal not found in the DOM.");
            }

            return data;
        } else {
            throw new Error(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const logout = async (token) => {
    if (!token) {
        console.error("No token found. User may not be logged in.");
        return false;
    }

    try {
        const response = await fetch(`${API_URL}logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            sessionStorage.removeItem("token");
            
            console.log("Done");
            return true;
        } else {
            console.error("Failed to log out:", response.statusText);
            return false;
        }
    } catch (error) {
        console.error("Error during logout:", error);
        return false;
    }
};

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