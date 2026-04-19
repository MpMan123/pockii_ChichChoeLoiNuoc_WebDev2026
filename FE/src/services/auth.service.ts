import api from "./api";

export const login = async (email: string, password: string) => {
    return api.post("/auth/login", { email, password });
}

export const register = async (email: string, password: string, fullName: string, phoneNumber: string) => {
    return api.post("/auth/register", { email, password, fullName, phoneNumber });
}

export const logout = async () => {
    return api.post("/auth/logout");
}