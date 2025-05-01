import Input from '@/components/common/Input';
import style from './BookingManger.module.scss';
import Button from '@/components/common/Button';
import Table from '@/components/common/Table';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import React, { useState } from 'react';
import IconCustom from '@/components/common/IconCustom';

const BookingManger = () => {
    const data = [
        { id: 21, index: 1, name: 'BOX J - 203', quantity: 120, price: '180.000' },
        { id: 22, index: 2, name: 'Coca', quantity: 2, price: '180.000' },
        { id: 23, index: 3, name: 'Pepsi', quantity: 2, price: '180.000' },
    ];

    const columns = [
        { key: 'index', label: 'STT' },
        { key: 'name', label: 'Danh mục' },
        { key: 'quantity', label: 'Số lượng' },
        { key: 'price', label: 'Số tiền' },
    ];

    const handleInputChange = (rowIndex, accessor, value) => {
        const updatedData = [...data];
        updatedData[rowIndex][accessor] = value;
        setData(updatedData);
    };

    const handleButtonClick = (rowIndex) => {
        const updatedData = [...data];
        updatedData.splice(rowIndex, 1);
        setData(updatedData);
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 23; hour++) {
            slots.push(`${hour}:00`);
            if (hour !== 23) {
                slots.push(`${hour}:30`);
            }
        }
        return slots;
    };
    const timeSlots = generateTimeSlots();
    return (
        <div className={style.container}>
            <div className={style.searchFoods}>
                <Input rounded_10 grey placeholder="Chọn đồ ăn & đồ uống" />
                <Button w_fit yellowLinear rounded_10 icon={<AiOutlineSearch />}>
                    Tìm kiếm
                </Button>
            </div>
            <div className={style.content}>
                <div className={style.listRoomContainer}>
                    <div className={style.listRoom}></div>

                    <div className={style.listTime}>
                        {timeSlots.map((time, index) => (
                            <div className={style.slot} key={index}>
                                {time}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.bookingContainer}>
                    <Table
                        columns={columns}
                        data={data}
                        renderActions={() => {
                            <>
                                <IconCustom icon={<AiOutlineCloseCircle />} tooltip="Xóa" />
                            </>;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingManger;
