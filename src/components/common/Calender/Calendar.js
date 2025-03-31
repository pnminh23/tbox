import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as CalendarIcon } from 'lucide-react';
import style from './Calendar.module.scss';

const Calendar = ({ selectedDate, onChange, currentDay = false }) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(selectedDate || (currentDay ? new Date() : null));

    useEffect(() => {
        if (currentDay) {
            const today = new Date();
            setDate(today);
            onChange(today);
        }
    }, [currentDay, onChange]);

    return (
        <div className={style.calendarWrapper}>
            <button className={style.calendarButton} onClick={() => setOpen(!open)}>
                {date ? date.toLocaleDateString() : 'Chọn ngày'}
                <CalendarIcon className={style.calendarIcon} />
            </button>
            {open && (
                <div className={style.calendarPopover}>
                    <DatePicker
                        selected={date}
                        onChange={(selectedDate) => {
                            setDate(selectedDate);
                            onChange(selectedDate);
                            setOpen(false);
                        }}
                        inline
                        className={style.customDatepicker}
                    />
                </div>
            )}
        </div>
    );
};

export default Calendar;
