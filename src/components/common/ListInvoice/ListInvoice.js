import clsx from 'clsx';
import style from './ListInvoice.module.scss';
import Button from '../Button';
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlinePayCircle,
} from 'react-icons/ai';
import RoomDisplay from '../RoomDisplay/RoomDisplay';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
// import RichText from '../RichText'; // RichText không được sử dụng, có thể bỏ
import Input from '../Input';
// import { Comme } from 'next/font/google'; // Comme không được sử dụng, có thể bỏ
import { toast } from 'react-toastify';
import LoadingFullPage from '../LoadingFullPage/loadingFullPage';
import { createFeedback } from '@/services/feedback';
import { formatMoney } from '@/function/formatMoney';
import { createPayment } from '@/services/payment';
import { useRouter } from 'next/router';
import { editBooking } from '@/services/booking';

const ListInvoice = ({ booking }) => {
    const [loading, setLoading] = useState(false);
    const email = localStorage.getItem('email');
    const [feedback, setFeedback] = useState('');
    const [isPopupFeedback, setIsPopUpFeedback] = useState(false);
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const totalStars = 5;
    const router = useRouter();
    const { status } = router.query; // Chỉ cần 'status' để biết thành công hay thất bại
    useEffect(() => {
        // Nếu URL có tham số 'status', hiển thị popup
        if (status) {
            setIsPopupPaymentStatus(true);

            // Xóa các query params khỏi URL để không hiển thị lại popup khi refresh trang
            // Người dùng sẽ thấy URL gọn gàng hơn
            const newPath = router.pathname;
            router.replace(newPath, newPath, { shallow: true });
        }
    }, [status, router]); // Chạy lại khi 'status' thay đổi

    const [isPopupPaymentStatus, setIsPopupPaymentStatus] = useState(false);

    const handleFeedback = async () => {
        setLoading(true);

        // Kiểm tra booking và các thuộc tính cần thiết trước khi gửi feedback
        if (!booking?.room?.branch?._id || !booking?._id) {
            toast.error('Thông tin booking không đầy đủ để gửi đánh giá.');
            setLoading(false);
            return;
        }

        const newFeedback = {
            email,
            branch: booking.room.branch._id, // Đã kiểm tra ở trên
            bookingId: booking._id, // Đã kiểm tra ở trên
            rating: feedbackRating,
            comment: feedback,
        };

        try {
            const result = await createFeedback(newFeedback);
            // console.log('result: ', result);
            if (result.success) {
                toast.success(result.message);
                // console.log('result feedback: ', result);
                setIsPopUpFeedback(false); // Đóng popup sau khi gửi thành công
                setFeedbackRating(0);
                setHoverRating(0);
                setFeedback('');
                // Cần có cơ chế để cập nhật trạng thái isReviewed của booking này trên UI
                // Ví dụ: gọi lại API lấy danh sách booking hoặc cập nhật state local nếu có
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi gửi đánh giá.');
            // console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStarClick = (starValue) => {
        setFeedbackRating(starValue);
    };

    const handleStarMouseEnter = (starValue) => {
        setHoverRating(starValue);
    };

    const handleStarMouseLeave = () => {
        setHoverRating(0);
    };

    const handleFeedbackTextChange = (event) => {
        setFeedback(event.target.value);
    };

    // Kiểm tra booking tổng thể trước khi render
    if (!booking) {
        return (
            <div className={style.listInvoiceItem}>
                <p>Thông tin đơn đặt chỗ không có sẵn.</p>
            </div>
        );
    }
    const handlePayment = async () => {
        const description = `${booking?.id_booking} đặt phòng`;
        console.log('id_booking: ', booking?.id_booking);
        const expiredAt = dayjs().add(5, 'minute').unix();
        const newPayment = {
            id_booking: booking?.id_booking,
            email,
            amount: booking?.total_money || 0,
            description: description,
            returnUrl: `http://localhost:3000/bookRoom/${booking?._id}`,
            cancelUrl: `http://localhost:3000/bookRoom/${booking?._id}`,
            expiredAt,
        };
        console.log('newPayment: ', newPayment);
        try {
            const result = await createPayment(newPayment); // gọi đến backend
            // console.log('result: ', result);
            if (result?.checkoutUrl) {
                window.location.href = result.checkoutUrl; // chuyển tới trang thanh toán
            } else {
                alert('Không lấy được link thanh toán!');
            }
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            alert('Có lỗi xảy ra khi khởi tạo thanh toán!');
        }
    };
    const handleCancelBooking = async () => {
        if (!booking) return; // Đảm bảo đã có booking được chọn

        // Thêm một bước xác nhận trước khi hủy
        if (!window.confirm(`Bạn có chắc muốn hủy đơn hàng "${booking._id}" không?`)) {
            return;
        }

        try {
            const result = await editBooking(booking._id, {
                status: 'ĐÃ HỦY',
            });
            if (result.success) {
                toast.success('Đã hủy đơn đặt phòng thành công!');
            }
        } catch (error) {
            toast.error(error.message || 'Có lỗi xảy ra khi hủy đơn.');
            console.error(error);
        }
    };

    return (
        <>
            {isPopupPaymentStatus && (
                <Popuppup
                    handleClose={() => {
                        setIsPopupPaymentStatus(false);
                    }}
                >
                    <div className={style.popupPayment}>
                        {status === 'PAID' ? (
                            <>
                                <AiOutlineCheckCircle className={style.success} />
                                <p>Thanh toán thành công</p>
                                <p>Đơn hàng của bạn đã được cập nhật.</p>
                            </>
                        ) : (
                            <>
                                <AiOutlineCloseCircle className={style.cancel} />
                                <p>Thanh toán thất bại</p>
                                <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                            </>
                        )}
                        <Button
                            rounded_10
                            yellowLinear
                            onClick={() => setIsPopupPaymentStatus(false)}
                            style={{ marginTop: '20px' }}
                        >
                            Đóng
                        </Button>
                    </div>
                </Popuppup>
            )}
            {loading && <LoadingFullPage />}
            {isPopupFeedback && (
                <Popup
                    dark
                    handleClose={() => {
                        setIsPopUpFeedback(false);
                        setFeedbackRating(0);
                        setHoverRating(0);
                        setFeedback('');
                    }}
                >
                    <div className={style.formPopup}>
                        <div className={style.title}>Viết đánh giá</div>
                        <div className={style.groupItem}>
                            <label>Cơ sở</label>
                            {/* Áp dụng Optional Chaining ở đây */}
                            <Input
                                rounded_10
                                outLine
                                value={booking?.room?.branch?.name || 'Không xác định'}
                                readOnly
                            />
                        </div>
                        <div className={style.groupItem}>
                            <label>Đánh giá: </label>
                            <div className={style.stars}>
                                {[...Array(totalStars)].map((_, index) => {
                                    const starValue = index + 1;
                                    return (
                                        <span
                                            key={starValue}
                                            className={clsx(style.star, {
                                                [style.filled]: starValue <= (hoverRating || feedbackRating),
                                            })}
                                            onClick={() => handleStarClick(starValue)}
                                            onMouseEnter={() => handleStarMouseEnter(starValue)}
                                            onMouseLeave={handleStarMouseLeave}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    handleStarClick(starValue);
                                                }
                                            }}
                                            aria-label={`Đánh giá ${starValue} sao`}
                                        >
                                            ★
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={style.groupItem}>
                            <textarea
                                className={style.feedbackTextarea}
                                placeholder="Chia sẻ cảm nhận của bạn về dịch vụ..."
                                rows="5"
                                value={feedback}
                                onChange={handleFeedbackTextChange}
                            ></textarea>
                        </div>

                        <Button
                            rounded_10
                            blue
                            w_fit
                            onClick={handleFeedback}
                            disabled={feedbackRating === 0 || feedback.trim() === '' || feedback === '<p></p>'}
                            className={style.btnAdd}
                        >
                            Gửi đánh giá
                        </Button>
                    </div>
                </Popup>
            )}
            <div className={style.listInvoiceItem}>
                <div className={clsx(style.column, style.colRoom)}>
                    {/* Áp dụng Optional Chaining ở đây */}
                    <RoomDisplay roomName={booking?.room?.name} roomType={booking?.room?.type?.name} />
                </div>
                <div className={clsx(style.column, style.colInfor)}>
                    <div className={style.item}>
                        {/* Kiểm tra booking.id_booking nếu nó cũng có thể null/undefined */}
                        Mã đơn: <p>{booking?.id_booking || 'N/A'}</p>
                    </div>
                    <div className={style.item}>
                        Số điện thoại: <p>{booking?.phone || 'N/A'}</p>
                    </div>
                    <div className={style.item}>
                        Ngày: <p>{booking?.date ? dayjs(booking.date).format('DD/MM/YYYY') : 'N/A'}</p>
                    </div>
                </div>
                <div className={clsx(style.column, style.colInfor)}>
                    <div className={style.item}>
                        {/* LỖI XẢY RA Ở ĐÂY - Đã sửa */}
                        Cơ sở: <p>{booking?.room?.branch?.name || 'Không xác định'}</p>
                    </div>
                    <div className={style.item}>
                        {/* Áp dụng Optional Chaining và kiểm tra mảng time_slots */}
                        Từ: <p>{booking?.time_slots?.[0]?.start_time || 'N/A'}</p> đến:{' '}
                        <p>{booking?.time_slots?.at(-1)?.end_time || 'N/A'}</p>
                    </div>
                    <div className={style.item}>
                        Combo: <p>{booking?.combo?.name || 'Không có'}</p>
                    </div>
                </div>
                <div className={clsx(style.column, style.colIspay)}>
                    <p>{formatMoney(booking?.total_money)}</p>
                    <div className={style.item}>
                        Mã giảm giá: <p>{booking?.promotion || 'Không'}</p>
                    </div>
                    <p>{booking?.isPay || 'Chưa rõ'}</p>
                </div>
                <div className={clsx(style.column, style.colStatus)}>
                    Trạng thái <p>{booking?.status || 'Chưa rõ'}</p>
                </div>

                <div className={clsx(style.colAction, style.column)}>
                    {booking?.isPay !== 'ĐÃ THANH TOÁN' &&
                        booking?.status !== 'THẤT BẠI' &&
                        booking?.status !== 'ĐÃ HỦY' && ( // Thêm optional chaining cho booking.isPay
                            <Button rounded_10 blue icon={<AiOutlinePayCircle />} onClick={handlePayment}>
                                Thanh toán
                            </Button>
                        )}
                    {booking?.status === 'HOÀN THÀNH' ? ( // Thêm optional chaining cho booking.status
                        booking?.isReviewed ? ( // Thêm optional chaining cho booking.isReviewed
                            <Button rounded_10 yellowLinear icon={<AiOutlineCheckCircle />} disabled>
                                Bạn đã đánh giá
                            </Button>
                        ) : (
                            <Button
                                rounded_10
                                yellowLinear
                                icon={<AiOutlineEdit />}
                                onClick={() => {
                                    setIsPopUpFeedback(true);
                                }}
                            >
                                Đánh giá
                            </Button>
                        )
                    ) : (
                        booking?.status !== 'ĐÃ HỦY' &&
                        booking?.status !== 'THẤT BẠI' && (
                            <Button rounded_10 red icon={<AiOutlineDelete />} onClick={handleCancelBooking}>
                                Hủy đơn
                            </Button>
                        )
                    )}
                </div>
            </div>
        </>
    );
};
export default ListInvoice;
