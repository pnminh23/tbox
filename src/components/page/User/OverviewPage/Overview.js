import Button from '@/components/common/Button';
import style from './Overview.module.scss';
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

const OverviewPage = () => {
    return (
        <div className={style.container}>
            <div className={style.statistics}>
                <h1>Thống kê đơn đặt phòng</h1>
                <div className={style.groupBoxes}>
                    <div className={style.boxItem}>
                        <AiOutlineHourglass />
                        <p>Số đơn hiện tại</p>
                        <p className={style.number}>0</p>
                    </div>
                    <div className={style.boxItem}>
                        <AiOutlineCheckCircle />
                        <p>Số đơn hàng thành công</p>
                        <p className={style.number}>0</p>
                    </div>
                    <div className={style.boxItem}>
                        <AiOutlineCloseCircle />
                        <p>Số đơn đã hủy </p>
                        <p className={style.number}>0</p>
                    </div>
                </div>
            </div>

            <div className={style.listInvoiceContainer}>
                <h1>Các đơn đặt phòng của bạn</h1>
                <div className={style.ListInvoice}>
                    <ListInvoice
                        id="291103"
                        checkIn="7:30"
                        checkOut="9:30"
                        prepayment="Chưa thanh toán"
                        status="Hoàn thành"
                    />
                </div>
            </div>
        </div>
    );
};
export default OverviewPage;
