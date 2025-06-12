import useSWR, { mutate } from 'swr';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/review`;

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useFeedbackByBranch = (branchId) => {
    const shouldFetch = branchId != null && branchId !== '';
    const endpoint = shouldFetch ? `${API_URL}/get-by-branch/${branchId}` : null;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        feedbacks: data?.data,
        isLoading,
        error,
    };
};

export const createFeedback = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data, {
            withCredentials: true,
        });

        // Sau khi tạo xong, cập nhật danh sách branch

        return {
            success: true,
            message: response.data.message,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error?.response?.data?.message || 'Something went wrong',
        };
    }
};
