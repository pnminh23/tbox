import axios from 'axios';
import useSWR, { mutate } from 'swr';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/booking`;
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const getBookedByDate = async (roomID, dateISO) =>
    axios.get(`${API_URL}/get-book-timeSlots-by-room/${roomID}/${dateISO}`).then((r) => r.data.data);

export const createBooking = async (BookingData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, BookingData, {
            withCredentials: true,
        });

        await mutate(`${API_URL}/get-booking-by-email-current`);

        return {
            success: true,
            message: response.data.message,
            data: response.data,
        };
    } catch (error) {
        console.error('Error creating Booking:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Something went wrong',
        };
    }
};

export const useBookingByOrderCode = (orderCode) => {
    const shouldFetch = orderCode != null && orderCode !== '';
    const endpoint = shouldFetch ? `${API_URL}/get-booking-by-orderCode/${orderCode}` : null;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        booking: data?.data,
        isLoading,
        isError: error,
    };
};

export const useBookingById = (_id) => {
    const shouldFetch = _id != null && _id !== '';
    const endpoint = shouldFetch ? `${API_URL}/get-booking-by-id/${_id}` : null;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        booking: data?.data,
        isLoading,
        isError: error,
    };
};

export const useAllBookingByEmailCurrent = () => {
    const endpoint = `${API_URL}/get-booking-by-email-current`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        booking: data?.data,
        isLoading,
        isError: error,
    };
};

export const useBookingStatsByEmail = () => {
    const endpoint = `${API_URL}/get-booking-stats-by-email`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        booking: data?.data,
        isLoading,
        isError: error,
    };
};

export const useCurrentActiveRoomsWithBookingId = () => {
    const endpoint = `${API_URL}/get-room-booking-current`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    return {
        roomBooking: data?.data,
        isLoading,
        isError: error,
    };
};

export const editBooking = async (id_booking, data) => {
    try {
        // Kiểm tra nếu data không tồn tại hoặc không có key nào
        if (!data || Object.keys(data).length === 0) {
            throw { success: false, message: 'Dữ liệu chỉnh sửa không được để trống' };
        }

        const res = await axios.put(`${API_URL}/edit-film/${id_booking}`, data, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || err || { success: false, message: 'Đã xảy ra lỗi khi chỉnh sửa film' };
    }
};
