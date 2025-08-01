import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL+"/api/v1",
    withCredentials: true,
});

export const logout = async () => {
    const response = await api.get("authentication/logout");
    return response.data;
};

export const googleSignIn = async (): Promise<void> => {
    return new Promise((resolve) => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
        resolve();
    });
};
