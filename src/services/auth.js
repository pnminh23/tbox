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
            `${API_URL}/register`,
            { name, phone, email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đăng ký thất bại!';
    }
};

export const verifyAccount = async (email, otp) => {
    try {
        const response = await axios.post(`${API_URL}/verify-account`, { email, otp }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đăng ký thất bại!';
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgotPassword`, { email }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đăng ký thất bại!';
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

export const resendOtp = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/resend-otp`, { email }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Gửi lại OTP thất bại';
    }
};

export const verifyOtpResetPassword = async (email, otp) => {
    try {
        const response = await axios.post(
            `${API_URL}/verify-otp-reset-password`,
            { email, otp },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Xác nhận OTP thất bại';
    }
};

export const resetPassword = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, { email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đổi mật khẩu thất bại';
    }
};
