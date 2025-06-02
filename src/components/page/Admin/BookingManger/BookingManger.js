import Input from '@/components/common/Input';
import style from './BookingManger.module.scss';
import Button from '@/components/common/Button';
import Table from '@/components/common/Table';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import IconCustom from '@/components/common/IconCustom';
import { useAllBranches } from '@/services/branch';
import Selection from '@/components/common/Selection';
import { useRoomByBranch } from '@/services/room';
import clsx from 'clsx';
import { useAllTimeSlots } from '@/services/timeSlots';
import dayjs from 'dayjs';
import { useBookingsRealtime } from '@/hooks/useBookingRealTime';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import { useBookingById, useCurrentActiveRoomsWithBookingId } from '@/services/booking';
import { formatMoney } from '@/function/formatMoney';
const dateNow = new Date();
const BookingManger = () => {
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { roomBooking, isLoading: loadingRoomBooking } = useCurrentActiveRoomsWithBookingId();
    const { booking, isLoading: loadingBooking } = useBookingById(selectedBooking);
    console.log('booking rom:', roomBooking);
    console.log('booking:', booking);
    const { roomsByBranch, isLoading: loadingRoomByBranch } = useRoomByBranch(selectedBranch);
    const { branches } = useAllBranches();
    const { timeSlots } = useAllTimeSlots();
    const BranchOptions = branches?.map((branch) => ({
        name: branch.name,
        id: branch._id, // hoặc room.id nếu backend trả id thường
    }));
    useEffect(() => {
        console.log('selectedBooking (updated):', selectedBooking);
    }, [selectedBooking]);

    return (
        <div className={style.container}>
            <div className={style.selectionBranch}>
                <Selection
                    options={BranchOptions}
                    optionLabel="name"
                    defaultValue="Chọn cơ sở"
                    optionValue="id"
                    onChange={(value) => setSelectedBranch(value)}
                />
            </div>

            <div className={style.content}>
                <div className={style.listRoomContainer}>
                    <div className={style.listRoom}>
                        {roomsByBranch?.map((room) => {
                            // Kiểm tra room này có đang được đặt không
                            const bookingInfo = roomBooking?.find((item) => item.roomId === room._id);
                            console.log('bookingInfo', bookingInfo);
                            const isBookedNow = !!bookingInfo;

                            return (
                                <div
                                    className={clsx(
                                        style.room,
                                        selectedRoom === room._id && style.active,
                                        isBookedNow && style.booked // Thêm class nếu đang được đặt
                                    )}
                                    key={room._id}
                                    onClick={() => {
                                        setSelectedRoom(room._id);
                                        setSelectedBooking(bookingInfo?.bookingId || null);
                                        console.log('selectedbooking: ', selectedBooking);
                                    }}
                                >
                                    {room.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={style.bookingContainer}>
                    {!booking ? (
                        <p>Phòng đang trống</p>
                    ) : (
                        <div className={style.bookingDetail}>
                            <div className={style.groupItem}>
                                <p className={style.label}>Mã hóa đơn:</p>
                                <Input rounded_10 disabled value={booking.id_booking} />
                            </div>
                            <div className={style.row}>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Tên khách hàng:</p>
                                    <Input disabled rounded_10 value={booking?.name_client} />
                                </div>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Số điện thoại:</p>
                                    <Input rounded_10 disabled value={booking?.phone} />
                                </div>
                            </div>
                            <div className={style.groupItem}>
                                <p className={style.label}>Email:</p>
                                <Input rounded_10 disabled value={booking?.email} />
                            </div>

                            <div className={style.groupItem}>
                                <p className={style.label}>Phim:</p>
                                <Input rounded_10 disabled value={booking?.film.name} />
                            </div>

                            <div className={style.row}>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Cơ sở:</p>
                                    <Input rounded_10 disabled value={booking?.room.branch.name} />
                                </div>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Phòng:</p>
                                    <Input rounded_10 disabled value={booking?.room.name} />
                                </div>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Loại phòng:</p>
                                    <Input rounded_10 disabled value={booking?.room.type.name} />
                                </div>
                            </div>
                            <div className={style.row}>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Giờ bắt đầu:</p>
                                    <Input rounded_10 disabled value={booking?.time_slots[0].start_time} />
                                </div>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Giờ kết thúc:</p>
                                    <Input rounded_10 disabled value={booking?.time_slots.at(-1).end_time} />
                                </div>
                                <div className={style.groupItem}>
                                    <p className={style.label}>Mã khuyến mãi:</p>
                                    <Input rounded_10 disabled value={booking?.promotion?.name || 'Không có'} />
                                </div>
                            </div>
                            <div className={style.action}>
                                <div className={style.row}>
                                    <p className={style.label}>Tổng tiền:</p>
                                    <p className={style.label}>{`${formatMoney(booking?.total_money)} - (${
                                        booking.isPay
                                    })`}</p>
                                </div>

                                <div className={style.row}>
                                    <Button rounded_10 redLinear w_fit>
                                        Hoàn tất
                                    </Button>
                                    <Button rounded_10 yellowLinear w_fit>
                                        Thanh toán
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingManger;
