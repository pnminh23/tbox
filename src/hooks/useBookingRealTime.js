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
            console.log('🛠️ editBooking received:', bk);

            const bkDate = new Date(bk.date).toISOString().slice(0, 10);
            const cmpDate = new Date(dateISO).toISOString().slice(0, 10);
            if (bkDate !== cmpDate) return console.log('date không giống nhau');

            if (bk.room.toString() !== roomID.toString()) return console.log('room không giống nhau');

            const editedBookingId = bk._id || bk.id;
            const newSlots = bk.time_slots;

            setRoomData((prev) => {
                if (!prev) return prev;

                // Loại bỏ các timeSlot có cùng bookingId, sau đó thêm các timeSlot mới
                const updatedSlots = [
                    ...prev.bookedTimeSlots.filter((ts) => ts.bookingId !== editedBookingId),
                    ...newSlots.map((slot) => ({
                        ...slot,
                        bookingId: editedBookingId,
                    })),
                ];

                return {
                    ...prev,
                    bookedTimeSlots: updatedSlots,
                };
            });
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
