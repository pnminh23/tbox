import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/payos`;

export const createPayment = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data, {
            withCredentials: true,
        });

        return {
            success: true,
            checkoutUrl: response.data.checkoutUrl,
        };
    } catch (error) {
        console.error('Error creating Booking:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Something went wrong',
        };
    }
};
