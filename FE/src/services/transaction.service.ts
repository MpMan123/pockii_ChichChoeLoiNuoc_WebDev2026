import api from "./api";

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export const fetchAllTransaction = async () => {
    try {
        const res = await api.get(`${API_URL}/transaction`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}