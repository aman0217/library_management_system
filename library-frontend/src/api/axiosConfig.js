import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        "Content-Type": "application/json"
    },

});

// =====================================================
// REQUEST INTERCEPTOR
// Automatically attach JWT token
// =====================================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;
    },

    (error) => {

        return Promise.reject(error);

    }
);

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        const status = error.response?.status;
        const requestUrl = error.config?.url || "";

        // =================================================
        // LOGIN REQUEST
        // =================================================

        if (requestUrl.includes("/auth/login")) {

            // Login ke wrong credentials wale 401 ko
            // authentication logout ke roop me treat nahi karna.

            return Promise.reject(error);

        }

        // =================================================
        // AUTHENTICATION ERROR
        // =================================================

        if (status === 401) {

            console.warn(
                "Unauthorized API request:",
                requestUrl
            );

            /*
             * IMPORTANT:
             *
             * Abhi automatically token delete/redirect nahi karenge.
             *
             * Isse kisi ek API request ke 401 ki wajah se
             * user randomly Login page par nahi jayega.
             */

            return Promise.reject(error);

        }

        // =================================================
        // OTHER ERRORS
        // =================================================

        return Promise.reject(error);

    }
);

export default api;