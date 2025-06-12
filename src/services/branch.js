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

        return {
            success: true,
            message: 'Thêm cơ sở thành công',
            data: response.data,
        };
    } catch (error) {
        console.error('Error creating branch:', error);
        return {
            success: false,
            error: error?.response?.data?.message || 'Something went wrong',
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
