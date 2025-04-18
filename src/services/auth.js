import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đăng nhập thất bại!';
    }
};

export const register = async (name, phone, email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { name, phone, email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đăng nhập thất bại!';
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đăng xuất thất bại!';
    }
};
