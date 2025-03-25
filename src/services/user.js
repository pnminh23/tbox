import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

export const getdata = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đăng nhập thất bại!';
    }
};
