import api from "../api/axiosConfig";

export const borrowBook = async (data) => {

    const response = await api.post("/borrow", data);

    return response.data;

};

export const returnBook = async (borrowId) => {

    const response = await api.put(`/borrow/return/${borrowId}`);

    return response.data;

};

export const getBorrowHistory = async (userId) => {

    const response = await api.get(`/borrow/history/${userId}`);

    return response.data;

};