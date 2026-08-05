import api from "./api";

export const getReports = async () => {

    const response = await api.get("/dashboard/reports");

    return response.data;

};