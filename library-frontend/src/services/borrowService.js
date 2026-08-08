import api from "../api/axiosConfig";

import api from "../api/axiosConfig";
export const issueBook = async (data) => {
    const response = await api.post("/issues", data);
    return response.data;
};

export const returnBook = async (issueId) => {
    const response = await api.put(`/issues/${issueId}/return`);
    return response.data;
};

export const getBorrowHistory = async (userId) => {
    const response = await api.get(`/issues/student/${userId}`);
    return response.data;
};

export const getCurrentBorrowedBooks = async (userId) => {
    const response = await api.get(`/issues/student/${userId}/current`);
    return response.data;
};

export const getOverdueBooks = async () => {
    const response = await api.get("/issues/overdue");
    return response.data;
};