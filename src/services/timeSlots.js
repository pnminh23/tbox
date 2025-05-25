import useSWR, { mutate } from 'swr';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/timeSlots`;

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useAllTimeSlots = () => {
    const endpoint = `${API_URL}/get-all`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    return {
        timeSlots: data?.data,
        isLoadingAllTimeSlots: isLoading,
        isErrorAllTimeSlots: error,
    };
};
