import { useEffect, useState } from 'react';
import style from './AllBooking.module.scss';
import iconRoom from '@public/static/img/Group_1000006539.svg';

import Selection from '@/components/common/Selection';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import clsx from 'clsx';
import Image from 'next/image';
import Calendar from '@/components/common/Calender';
import ListInvoice from '@/components/common/ListInvoice';

const listFilter = ['Đơn hiện tại', 'Theo tháng', 'Tất cả các đơn'];

const InvoiceDetailPage = () => {
    const [selectedFilter, setSelectedFilter] = useState(listFilter[0]);
    const [selectedMonth, setSelectedMonth] = useState(null);

    useEffect(() => {
        if (selectedMonth) {
            console.log('Tháng đã chọn:', selectedMonth);
        }
    }, [selectedMonth]);
    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };

    return (
        <div className={style.container}>
            <div className={style.filter}>
                <div className={style.flexRow}>
                    <p>Lọc: </p>
                    <Selection
                        options={listFilter}
                        defaultValue={listFilter[0]}
                        className={style.selection}
                        onChange={handleFilterChange}
                    />
                    {selectedFilter === 'Theo tháng' && (
                        <div className={style.calendar}>
                            <Calendar type="month" onChange={(month) => setSelectedMonth(month)} />
                        </div>
                    )}
                </div>
                <div className={style.flexRow}>
                    <p>Tìm kiếm: </p>
                    <Input placeholder="Nhập mã hóa đơn" rounded_10 className={style.input} />
                    <Button rounded_10 yellowLinear className={style.search}>
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            <div className={style.listInvoiceContainer}>
                <div className={style.listInvoiceContainer}>
                    <ListInvoice
                        id="291103"
                        phone="033576548"
                        date="29/11/2003"
                        location="175 Tây Sơn"
                        combo="Combo 1"
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
export default InvoiceDetailPage;
