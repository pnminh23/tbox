import Button from '@/components/common/Button';
import styles from './Overview.module.scss';
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineHourglass,
} from 'react-icons/ai';
import iconRoom from '@public/static/img/Group_1000006539.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ListInvoice from '@/components/common/ListInvoice';
import { useAllBookingByEmailCurrent, useBookingStatsByEmail } from '@/services/booking';
import dayjs from 'dayjs';

const OverviewPage = () => {
    const { booking: allBookingCurrent } = useAllBookingByEmailCurrent();
    const { booking: bookingStats } = useBookingStatsByEmail();

    console.log('allBookingCurrent: ', allBookingCurrent);
    console.log('bookingStats: ', bookingStats);

    return (
        <div className={styles.container}>
            <div className={styles.statistics}>
                <h1>Thống kê đơn đặt phòng</h1>
                <div className={styles.groupBoxes}>
                    <div className={styles.boxItem}>
                        <AiOutlineHourglass />
                        <p>Số đơn hôm nay</p>
                        <p className={styles.number}>{bookingStats?.totalBookingsToday}</p>
                    </div>
                    <div className={styles.boxItem}>
                        <AiOutlineCheckCircle />
                        <p>Số đơn đã hoàn thành</p>
                        <p className={styles.number}>{bookingStats?.completedBookingsToday}</p>
                    </div>
                    <div className={styles.boxItem}>
                        <AiOutlineCloseCircle />
                        <p>Số đơn đã hủy </p>
                        <p className={styles.number}>{bookingStats?.cancelledBookingsToday}</p>
                    </div>
                </div>
            </div>

            <div className={styles.listInvoiceContainer}>
                <h1>Đơn đặt phòng hiện tại</h1>
                <div className={styles.listInvoiceContainer}>
                    {allBookingCurrent?.map((booking) => (
                        <ListInvoice
                            key={booking._id}
                            id={booking.id_booking}
                            phone={booking.phone}
                            date={dayjs(booking.date).format('DD/MM/YYYY')}
                            roomName={booking.room.name}
                            roomType={booking.room.type.name.slice(-1)}
                            location={booking.room.branch.name}
                            combo={booking.combo?.name || 'không có'}
                            checkIn={booking.time_slots[0].start_time}
                            checkOut={booking.time_slots.at(-1).end_time}
                            prepayment={booking.isPay}
                            status={booking.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default OverviewPage;
