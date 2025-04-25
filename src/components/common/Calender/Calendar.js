import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as CalendarIcon } from 'lucide-react';
import style from './Calendar.module.scss';

const Calendar = ({ selectedDate, onChange, currentDay = false, type = 'day' }) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(selectedDate || (currentDay ? new Date() : null));
    const wrapperRef = useRef(null); // ref cho calendar wrapper

    useEffect(() => {
        if (currentDay && !selectedDate) {
            const today = new Date();
            setDate(today);
            onChange(today);
        }
    }, [currentDay, selectedDate, onChange]);

    useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);

    // Đóng popover khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className={style.calendarWrapper} ref={wrapperRef}>
            <button className={style.calendarButton} onClick={() => setOpen(!open)}>
                {date
                    ? type === 'month'
                        ? `${date.getMonth() + 1}/${date.getFullYear()}`
                        : date.toLocaleDateString()
                    : type === 'month'
                    ? 'Chọn tháng'
                    : 'Chọn ngày'}
                <CalendarIcon className={style.calendarIcon} />
            </button>
            {open && (
                <div className={style.calendarPopover}>
                    <DatePicker
                        key={type}
                        selected={date}
                        onChange={(selectedDate) => {
                            setDate(selectedDate);
                            onChange(selectedDate);
                            setOpen(false);
                        }}
                        inline
                        showMonthYearPicker={type === 'month'}
                        dateFormat={type === 'month' ? 'MM/yyyy' : 'dd/MM/yyyy'}
                        className={style.customDatepicker}
                    />
                </div>
            )}
        </div>
    );
};

export default Calendar;
