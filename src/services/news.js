import useSWR, { mutate } from 'swr';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/news`;

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useAllNews = () => {
    const endpoint = `${API_URL}/get-all`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        allNews: data?.data,
        isLoading,
        error,
    };
};

export const useNews = (_id) => {
    const endpoint = `${API_URL}/get/${_id}`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        news: data?.data,
        isLoading,
        error,
    };
};

export const createNews = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data, {
            withCredentials: true,
        });

        await mutate(`${API_URL}/get-all`);

        return {
            success: true,
            message: response.message,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error?.response?.data?.message || 'Something went wrong',
        };
    }
};
export const editNewsById = async (_id, updatedData) => {
    try {
        await axios.put(`${API_URL}/edit/${_id}`, updatedData, {
            withCredentials: true,
        });

        // Cập nhật lại cache của SWR sau khi edit
        await mutate(`${API_URL}/get-all`);

        return {
            success: true,
            message: 'Cập nhật combo thành công',
        };
    } catch (error) {
        return {
            success: false,
            error: error?.response?.data?.message || 'Không thể cập nhật combo',
        };
    }
};
export const deleteNewsById = async (_id) => {
    try {
        const res = await axios.delete(`${API_URL}/delete/${_id}`, {
            withCredentials: true,
        });
        await mutate(`${API_URL}/get-all`);
        return {
            success: true,
            message: res.message,
        };
    } catch (err) {
        throw err.response?.data || { success: false, message: 'Đã xảy ra lỗi khi xóa combo' };
    }
};
