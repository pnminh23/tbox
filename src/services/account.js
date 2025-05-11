import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { AsyncCompiler } from 'sass';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/account`;

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useUserData = () => {
    const { data, error, isLoading } = useSWR(`${API_URL}/data`, fetcher, {
        shouldRetryOnError: false, // tránh retry nếu không cần
        revalidateOnFocus: false, // tránh refetch mỗi lần quay lại tab
        refreshInterval: 5000,
    });

    return {
        user: data?.data, // giống như response.data.data trong axios
        isLoading,
        isError: error,
    };
};

export const useAllAccounts = () => {
    const endpoint = `${API_URL}/all-account-data`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    const mutateAccounts = () => mutate(endpoint);
    return {
        accounts: data?.data,
        isLoading,
        isError: error,
        mutateAccounts,
    };
};

export const toggleLock = async (email) => {
    try {
        const res = await axios.post(`${API_URL}/toggle-lock`, { email }, { withCredentials: true });
        return res.data; // trả về data để frontend xử lý nếu cần
    } catch (err) {
        throw err.response?.data || { success: false, message: 'Đã xảy ra lỗi khi toggle lock' };
    }
};

export const getAccountByEmail = async (email) => {
    try {
        const res = await axios.post(`${API_URL}/account-by-email`, { email }, { withCredentials: true });
        return res.data; // trả về data để frontend xử lý nếu cần
    } catch (err) {
        throw err.response?.data || { success: false, message: 'Đã xảy ra lỗi khi toggle lock' };
    }
};

export const editAccountByEmail = async (email, formData) => {
    try {
        const res = await axios.put(`${API_URL}/edit-account-by-email/${encodeURIComponent(email)}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data; // trả về data để frontend xử lý nếu cần
    } catch (err) {
        throw err.response?.data || { success: false, message: 'Đã xảy ra lỗi khi chỉnh sửa account' };
    }
};
