import api from "../api/axiosConfig";
export const getDashboardSummary = async () => {

    const response = await api.get("/dashboard");

    return response.data;

};

export const getStudentDashboard = async (userId) => {

    const response = await api.get(`/dashboard/student/${userId}`);

    return response.data;

};

export const getMostBorrowedBooks = async () => {

    const response = await api.get("/dashboard/most-borrowed-books");

    return response.data;

};

export const getTopActiveStudents = async () => {

    const response = await api.get("/dashboard/top-active-students");

    return response.data;

};

export const getMonthlyBorrowStatistics = async () => {

    const response = await api.get("/dashboard/monthly-borrow-statistics");

    return response.data;

};

export const getNeverBorrowedBooks = async () => {

    const response = await api.get("/dashboard/never-borrowed-books");

    return response.data;

};
export const getReports = async () => {

    const response = await api.get("/dashboard/reports");

    return response.data;

};
export const getDueSoonBooks = async (userId) => {

    const response = await api.get(
        `/dashboard/student/${userId}/due-soon`
    );

    return response.data;

};
export const getBorrowedBooks = async (userId) => {

    const response = await api.get(
        `/dashboard/student/${userId}/borrowed-books`
    );

    return response.data;

};
export const getBorrowedBookDetails = async (issueId) => {

    const response = await api.get(
        `/dashboard/borrowed-book/${issueId}`
    );

    return response.data;

};
export const getBorrowHistory = async (userId) => {

    const response = await api.get(
        `/dashboard/student/${userId}/history`
    );

    return response.data;

};
export const getBorrowHistoryBookDetails = async (issueId) => {

    const response = await api.get(
        `/dashboard/borrowed-book/${issueId}`
    );

    return response.data;

};
export const getFineHistory = async (userId) => {

    const response = await api.get(

        `/dashboard/student/${userId}/fine-history`

    );

    return response.data;

};