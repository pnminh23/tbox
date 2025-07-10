import useSWR, { mutate } from 'swr';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/branch`;

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useAllBranches = () => {
    const endpoint = `${API_URL}/get-all`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    const mutateBranches = () => mutate(endpoint);
    return {
        branches: data?.data,
        isLoadingAllBranches: isLoading,
        isErrorAllBranches: error,
        mutateBranches,
    };
};

export const useBranch = (_id) => {
    const endpoint = `${API_URL}/get/${_id}`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
    });

    const mutateBranch = () => mutate(endpoint);
    return {
        branch: data?.data,
        isLoadingBranch: isLoading,
        isErrorBranch: error,
        mutateBranch,
    };
};

// Thêm hàm createBranch vào cùng file
export const createBranch = async (branchData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, branchData, {
            withCredentials: true,
        });

        // Sau khi tạo xong, cập nhật danh sách branch
        await mutate(`${API_URL}/get-all`);

        return response.data;
    } catch (error) {
        console.error('Error creating branch:', error);
        return {
            success: false,
            error: error?.response?.data?.message || 'Something went wrong',
        };
    }
};

export const editBranchById = async (_id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/edit/${_id}`, updatedData, {
            withCredentials: true,
        });

        // Cập nhật lại danh sách sau khi chỉnh sửa
        await mutate(`${API_URL}/get-all`);
        await mutate(`${API_URL}/get/${_id}`);

        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật cơ sở',
        };
    }
};

export const deleteBranchById = async (_id) => {
    try {
        const res = await axios.delete(`${API_URL}/delete/${_id}`, {
            withCredentials: true,
        });
        return res.data; // trả về data để frontend xử lý nếu cần
    } catch (err) {
        throw err.response?.data || { success: false, message: 'Đã xảy ra lỗi khi xóa film' };
    }
};
