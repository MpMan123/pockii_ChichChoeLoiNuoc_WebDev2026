import axios from "axios";

// Vite tự động hiểu: 
// Nếu chạy 'npm run dev' -> MODE là 'development'
// Nếu chạy 'npm run build' -> MODE là 'production'
const isProduction = import.meta.env.MODE === 'production';

const API_URL = isProduction 
    ? import.meta.env.VITE_API_URL  // Lấy từ Environment Variables trên Vercel
    : 'http://localhost:5500/api/'; // Chạy local

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Luôn để true để làm việc với Cookie
    headers: {
        'Content-Type': 'application/json',
    }
});

// Response Interceptor để test nhanh lỗi
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!isProduction) {
            console.log("🛠️ Dev Log - API Error:", error.response?.data || error.message);
        }

        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;