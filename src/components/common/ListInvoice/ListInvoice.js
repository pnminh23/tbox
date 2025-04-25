import clsx from 'clsx';
import style from './ListInvoice.module.scss';
import Button from '../Button';
import iconRoom from '@public/static/img/Group_1000006539.svg';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Image from 'next/image';

const ListInvoice = ({ image, phone, id, date, location, checkIn, checkOut, combo, prepayment, status }) => {
    return (
        <div className={style.listInvoiceItem}>
            <div className={clsx(style.image)}>
                <Image src={iconRoom} width={70} height={70} />
            </div>
            <div className={clsx(style.column, style.column1)}>
                {id && (
                    <div className={style.item}>
                        Mã đơn: <p>{id}</p>
                    </div>
                )}
                {phone && (
                    <div className={style.item}>
                        Số điện thoại: <p>{phone}</p>
                    </div>
                )}
                {date && (
                    <div className={style.item}>
                        Ngày: <p>{date}</p>
                    </div>
                )}
            </div>
            <div className={clsx(style.column, style.column2)}>
                {location && (
                    <div className={style.item}>
                        Cơ sở: <p>{location}</p>
                    </div>
                )}
                {checkIn && (
                    <div className={style.item}>
                        Từ: <p>{checkIn}</p> đến: <p>{checkOut}</p>
                    </div>
                )}
                {combo && (
                    <div className={style.item}>
                        Ngày: <p>{combo}</p>
                    </div>
                )}
            </div>
            <div className={clsx(style.column3)}>
                <p>{prepayment}</p>
            </div>
            <div className={clsx(style.column4, style.column, style.item)}>
                Trạng thái <p>{status}</p>
            </div>
            <div className={clsx(style.column5, style.column)}>
                <Button rounded_10 blue icon={<AiOutlineEdit />}>
                    Chỉnh sửa
                </Button>
                <Button rounded_10 red icon={<AiOutlineDelete />}>
                    Hủy đơn
                </Button>
            </div>
        </div>
    );
};
export default ListInvoice;
