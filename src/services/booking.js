import axios from 'axios';
import useSWR from 'swr';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/booking`;
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const getBookedByDate = async (roomID, dateISO) =>
    axios.get(`${API_URL}/get-book-timeSlots-by-room/${roomID}/${dateISO}`).then((r) => r.data.data);

export const createBooking = async (BookingData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, BookingData, {
            withCredentials: true,
        });

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

export const useBookingByID = (orderCode) => {
    const shouldFetch = orderCode != null && orderCode !== '';
    const endpoint = shouldFetch ? `${API_URL}/get-booking/${orderCode}` : null;
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
