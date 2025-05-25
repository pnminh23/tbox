import useSWR, { mutate } from 'swr';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/room`;

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const useRoomByBranchAndType = (branchId, typeRoomId) => {
    const endpoint = `${API_URL}/get-room/${branchId}/${typeRoomId}`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    return {
        RoomsByBranchAndType: data?.data,
        isLoadingAllRooms: isLoading,
        isErrorAllRooms: error,
    };
};

export const useRoomByBranch = (branchId) => {
    const endpoint = `${API_URL}/get-room-branch/${branchId}`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    return {
        roomsByBranch: data?.data,
        isLoading,
        isError: error,
    };
};

export const createRoom = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/create-room`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data; // trả về response data để frontend xử lý
    } catch (err) {
        throw err.response?.data || { success: false, message: 'Đã xảy ra lỗi khi tạo phòng' };
    }
};

export const useTypeRoom = () => {
    const endpoint = `${API_URL}/get-all-roomType/`;
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        shouldRetryOnError: true,
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    return {
        typeRooms: data?.data,
        isLoading,
        isError: error,
    };
};
