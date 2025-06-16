import useSWR, { mutate } from 'swr';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/promotion`;

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useAllPromotion = () => {
    const endpoint = `${API_URL}/get-all`;
    const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        allPromotion: data?.data,
        isLoading,
        error,
        mutate,
    };
};

export const usePromotion = (_id) => {
    const endpoint = `${API_URL}/get/${_id}`;
    const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    return {
        promotion: data?.data,
        isLoading,
        error,
        mutate,
    };
};

export const createPromotion = async (data) => {
    try {
        await axios.post(`${API_URL}/create`, data, {
            withCredentials: true,
        });

        await mutate(`${API_URL}/get-all`);

        return {
            success: true,
            message: 'Thêm promotion mới thành công',
        };
    } catch (error) {
        return {
            success: false,
            error: error?.response?.data?.message || 'Something went wrong',
        };
    }
};
export const editPromotionById = async (_id, data) => {
    try {
        await axios.put(`${API_URL}/edit/${_id}`, data, {
            withCredentials: true,
        });

        // Cập nhật lại cache của SWR sau khi edit
        await mutate(`${API_URL}/get-all`);

        return {
            success: true,
            message: 'Cập nhật promotion thành công',
        };
    } catch (error) {
        return {
            success: false,
            error: error?.response?.data?.message || 'Không thể cập nhật Promotion',
        };
    }
};
export const deletePromotionById = async (_id) => {
    try {
        const res = await axios.delete(`${API_URL}/delete/${_id}`, {
            withCredentials: true,
        });
        await mutate(`${API_URL}/get-all`);
        return res.data; // trả về data để frontend xử lý nếu cần
    } catch (err) {
        throw err.response?.data || { success: false, message: 'Đã xảy ra lỗi khi xóa combo' };
    }
};
