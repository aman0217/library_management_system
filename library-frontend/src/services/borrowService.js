import api from "../api/axiosConfig";

export const issueBook = async (data) => {
    const response = await api.post("/borrow", data);
    return response.data;
};

export const returnBook = async (issueId) => {
    const response = await api.put(`/borrow/return/${issueId}`);
    return response.data;
};

export const getBorrowHistory = async (userId) => {
    const response = await api.get(`/borrow/history/${userId}`);
    return response.data;
};

export const getCurrentBorrowedBooks = async (userId) => {
    const response = await api.get(`/borrow/current/${userId}`);
    return response.data;
};

export const getOverdueBooks = async () => {
    const response = await api.get("/borrow/overdue");
    return response.data;
};