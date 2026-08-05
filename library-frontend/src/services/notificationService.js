import api from "../api/axiosConfig";

export const getNotifications = async (userId) => {

    const response = await api.get(`/notifications/${userId}`);

    return response.data;

};

export const getUnreadNotifications = async (userId) => {

    const response = await api.get(`/notifications/unread/${userId}`);

    return response.data;

};

export const getUnreadCount = async (userId) => {

    const response = await api.get(`/notifications/count/${userId}`);

    return response.data;

};

export const markAsRead = async (notificationId) => {

    await api.put(`/notifications/${notificationId}/read`);

};

export const deleteNotification = async (notificationId) => {

    await api.delete(`/notifications/${notificationId}`);

};
export const markAllAsRead = async (userId) => {

    await api.put(`/notifications/read-all/${userId}`);

};

export const deleteAllRead = async (userId) => {

    await api.delete(`/notifications/read/${userId}`);

};