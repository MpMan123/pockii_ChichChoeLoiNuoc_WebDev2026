import api from './api';

export const createDebt = async (debt: any) => {
    try {
        const response = await api.post('/debt', debt);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllDebts = async () => {
    try {
        const response = await api.get('/debt');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}