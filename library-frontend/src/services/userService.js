import api from "../api/axiosConfig";

export const getCurrentUser = async () => {
    const response = await api.get("/users/me");
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post("/users/register", data);
    return response.data;
};
export const updateUser = async (id, data) => {

    const response = await api.put(`/users/${id}`, data);

    return response.data;

};

export const deleteUser = async (id, adminPassword) => {

    const response = await api.delete(

        `/users/${id}`,

        {

            data: {

                adminPassword

            }

        }

    );

    return response.data;

};
export const updateProfile = async (data) => {

    const response = await api.put(
        "/users/profile",
        data
    );

    return response.data;

};

export const changePassword = async (data) => {

    const response = await api.put(
        "/users/change-password",
        data
    );

    return response.data;

};