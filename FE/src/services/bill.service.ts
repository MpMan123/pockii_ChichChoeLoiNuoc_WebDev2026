import api from "./api";

export const fetchBills = async (params: any) => {
    try {
        const response = await api.get('/bill', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
}