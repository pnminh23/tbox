import { useEffect, useState, useCallback } from 'react';
import { socket } from '../socket';
import { getBookedByDate } from '../services/booking';

export const useBookingsRealtime = (roomID, dateISO) => {
    const [roomData, setRoomData] = useState(null); // Trả về 1 object duy nhất thay vì mảng

    const loadData = useCallback(async () => {
        if (!roomID || !dateISO) return;

        try {
            const data = await getBookedByDate(roomID, dateISO);
            setRoomData(data || null); // Trả về 1 object hoặc null
        } catch (err) {
            console.error('Lỗi khi load dữ liệu:', err);
            setRoomData(null);
        }
    }, [roomID, dateISO]);

    useEffect(() => {
        loadData();

        // ✅ Log khi socket kết nối thành công
        socket.on('connect', () => {
            console.log('✅ Socket connected:', socket.id);
        });

        // ✅ Log mọi sự kiện để kiểm tra có nhận gì không
        socket.onAny((event, ...args) => {
            console.log('📦 Socket event received:', event, args);
        });

        // Khi có booking mới
        socket.on('newBooking', (bk) => {
            console.log('bk.date', bk.date);
            console.log('bk.room', bk.room);
            const bkDate = new Date(bk.date).toISOString().slice(0, 10);
            const cmpDate = new Date(dateISO).toISOString().slice(0, 10);
            if (bkDate !== cmpDate) return console.log('date không giống nhau');

            if (bk.room.toString() !== roomID.toString()) return console.log('room không giống nhau'); // Chỉ nhận đúng roomID

            const newSlots = bk.time_slots;

            console.log('newSlots', newSlots);

            setRoomData((prev) => {
                if (!prev) {
                    return { room: bk.room, bookedTimeSlots: newSlots };
                }
                return {
                    ...prev,
                    bookedTimeSlots: [...prev.bookedTimeSlots, ...newSlots],
                };
            });
        });

        // Khi booking bị chỉnh sửa
        socket.on('editBooking', (bk) => {
            console.log('🛠️ editBooking received, checking for reload:', bk);

            const bkDate = new Date(bk.date).toISOString().slice(0, 10);
            const cmpDate = new Date(dateISO).toISOString().slice(0, 10);

            // 1. Kiểm tra xem booking vừa được sửa có thuộc đúng ngày đang xem không
            if (bkDate !== cmpDate) {
                return; // Không liên quan, không làm gì cả
            }

            // 2. Kiểm tra xem booking có thuộc đúng phòng đang xem không (dùng ?. an toàn)
            if (bk.room?._id.toString() !== roomID.toString()) {
                return; // Không liên quan, không làm gì cả
            }

            // 3. Nếu sự kiện này liên quan đến phòng và ngày hiện tại,
            //    thì gọi lại hàm loadData() để tải dữ liệu mới nhất.
            console.log('🔄 Relevant booking edited. Reloading data...');
            loadData();
        });

        // Khi booking bị xoá
        socket.on('deleteBooking', ({ id, roomId }) => {
            if (roomId !== roomID) return;

            setRoomData((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    bookedTimeSlots: prev.bookedTimeSlots.filter((ts) => ts.bookingId !== id),
                };
            });
        });

        return () => {
            socket.off('newBooking');
            socket.off('deleteBooking');
            socket.off('editBooking');
        };
    }, [roomID, dateISO, loadData]);

    return roomData;
};
