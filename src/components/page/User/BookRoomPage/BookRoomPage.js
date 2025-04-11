import style from './BookRoomPage.module.scss';
import Box_J from '@public/static/icons/Box_J.svg';
import Box_Q from '@public/static/icons/Box_Q.svg';
import Box_K from '@public/static/icons/Box_K.svg';
import { PATH } from '@/constants/config';
import img1 from '@public/static/img/background/background_formInfor.jpg';
import { AiOutlineWarning } from 'react-icons/ai';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Selection from '@/components/common/Selection';
import { useState } from 'react';
import Calendar from '@/components/common/Calender';
import clsx from 'clsx';
import Image from 'next/image';
import ConfirmModal from '@/components/common/ConfirmModal';
import Feedback from '@/components/common/Feedback';

const BookRoomPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedBox, setSelectedBox] = useState('');
    const [selectedCombo, setSelectedCombo] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectionBoxChange = (value) => {
        setSelectedBox(value); // ✅ Lưu giá trị đã chọn
    };
    const handleSelectionComboChange = (value) => {
        setSelectedCombo(value); // ✅ Lưu giá trị đã chọn
    };
    const handleSelectionDiscountChange = (value) => {
        setSelectedDiscount(value); // ✅ Lưu giá trị đã chọn
    };
    const ListLocations = [
        'PNM - BOX 175 Tây Sơn',
        'PNM - BOX 139 Nguyễn Ngọc Vũ',
        'PNM - BOX 7 Thiền Quang',
        'PNM - BOX 19C Hoàng Diệu',
    ];
    const ListRoom = ['Box J', 'Box Q', 'Box K'];
    const ListCombo = ['Combo 1', 'Combo 2', 'Combo 3'];
    const ListDiscount = [];

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
        <div className="container">
            <div className={style.container}>
                <div className={style.fromInfor}>
                    <div className={style.login}>
                        Hãy đăng nhập để nhận thêm ưu đãi từ PNM - BOX
                        <Link href={PATH.Login}>Đăng nhập tại đây</Link>
                    </div>
                    <div className={style.infor}>
                        <Input rounded_10 color_black placeholder={'Họ và tên'} />
                        <Input rounded_10 color_black placeholder={'Email'} />
                        <div className={style.phone}>
                            <Input rounded_10 color_black placeholder={'Số điện thoại'} />
                            <Button yellowLinear rounded_10>
                                Tiếp tục
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={style.formBookRoom}>
                    <div className={style.left}>
                        <h5>Xin chào, ...</h5>
                        <div className={style.form}>
                            <div className={style.groupItems}>
                                <p>Chọn cơ sở bạn muốn đến</p>
                                <Selection options={ListLocations} />
                            </div>
                            <div className={clsx(style.groupItems, style.row)}>
                                <div className={style.date}>
                                    <p>Ngày đặt phòng</p>

                                    <Calendar selectedDate={selectedDate} onChange={setSelectedDate} currentDay />
                                </div>

                                <div className={style.room}>
                                    <p>Chọn loại phòng</p>
                                    <Selection options={ListRoom} onChange={handleSelectionBoxChange} />
                                </div>

                                <div className={style.combo}>
                                    <p>Chọn Combo</p>

                                    <Selection options={ListCombo} onChange={handleSelectionComboChange} />
                                </div>
                            </div>
                            <div className={clsx(style.groupItems, style.time)}>
                                <div className={style.typeRoom}>
                                    {selectedBox === ListRoom[0] && (
                                        <Image src={Box_J} alt="Box - J" width={50} height={50} />
                                    )}
                                    {selectedBox === ListRoom[1] && (
                                        <Image src={Box_Q} alt="Box - Q" width={50} height={50} />
                                    )}
                                    {selectedBox === ListRoom[2] && (
                                        <Image src={Box_K} alt="Box - K" width={50} height={50} />
                                    )}
                                </div>
                                <div className={style.timeFrame}>
                                    {timeSlots.map((time, index) => (
                                        <div className={style.slot} key={index}>
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.groupItems}>
                                <p>Mã giảm giá</p>
                                <Selection options={ListDiscount} onChange={handleSelectionDiscountChange} />
                            </div>
                            <div className={clsx(style.groupItems, style.warning)}>
                                <div className={style.title}>
                                    <AiOutlineWarning />
                                    <h5>Lưu ý</h5>
                                </div>
                                <p>
                                    - Các đơn đặt phòng từ 300.000 VNĐ trở lên và đơn đặt phòng trước 2 ngày vui lòng
                                    thanh toán trước 50% giá trị hóa đơn
                                </p>
                                <p>
                                    - Những tài khoản đặt phòng nhưng không đến và không báo lại cho PNM - BOX, chúng
                                    tôi xin phép khóa tài khoản.
                                </p>
                                <p>
                                    - PNM - BOX chỉ nhận đặt phòng qua website và fanpage facebook, chúng tôi không chịu
                                    trách nhiệm với những đơn đặt hằng qua nền tảng khác.
                                </p>
                            </div>
                        </div>
                        <Feedback />
                    </div>
                    <div className={style.right}>
                        <h5>Hóa Đơn</h5>
                        <div className={style.inforUser}>
                            <p>Mã hóa đơn:</p>
                            <p>Họ và tên:</p>
                            <p>Email:</p>
                            <p>Số điện thoại:</p>
                        </div>
                        <div className={style.inforRoom}>
                            <p>Cơ sở:</p>
                            <p>Ngày đặt phòng</p>
                            <p>Loại phòng:</p>
                            <p>Combo:</p>
                            <p>Số giờ sử dụng:</p>
                            <p>Tổng tiền:</p>
                            <p>Mã giảm giá</p>
                        </div>
                        <div className={style.totalMoney}>
                            <p>Tổng tiền thanh toán:</p>
                        </div>
                        <div className={style.action}>
                            <Button rounded_10 redLinear onClick={() => setIsModalOpen(true)}>
                                Đặt phòng
                            </Button>
                            <ConfirmModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                question="Bạn có chắc chắn muốn đặt phòng?"
                            >
                                <p>Chọn cẩn thận trước khi xác nhận!</p>
                            </ConfirmModal>
                            <Button rounded_10 yellowLinear>
                                Thanh toán ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BookRoomPage;
