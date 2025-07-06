import style from './BookRoomPage.module.scss';
import dayjs from 'dayjs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import { PATH } from '@/constants/config';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineWarning } from 'react-icons/ai';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Selection from '@/components/common/Selection';
import { useEffect, useState } from 'react';
import Calendar from '@/components/common/Calender';
import clsx from 'clsx';
import Image from 'next/image';
import LoadingFullPage from '@/components/common/LoadingFullPage/loadingFullPage';
import Feedback from '@/components/common/Feedback';
import { useBookingsRealtime } from '@/hooks/useBookingRealTime';
import { useRoomByBranchAndType, useTypeRoom } from '@/services/room';
import loadingAnimation from '@public/animations/loadingItem.json';
import Lottie from 'lottie-react';
import { useAllBranches } from '@/services/branch';
import { useAllCombo } from '@/services/combo';
import { useAllTimeSlots } from '@/services/timeSlots';
import { useUserData } from '@/services/account';
import { createBooking, useBookingByOrderCode } from '@/services/booking';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAllFilms, useFilm } from '@/services/films';
import { FilmIcon } from 'lucide-react';
import FilmItem from '@/components/common/ItemSlider/FilmItem';
import Popup from '@/components/common/Popup/Popup';
import SearchBar from '@/components/common/SearchBar';
import { formatMoney } from '@/function/formatMoney';
import { createPayment } from '@/services/payment';

const BookRoomPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTypeRoom, setSelectedTypeRoom] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPhone, setSelectedPhone] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedCombo, setSelectedCombo] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const bookedRoom = useBookingsRealtime(selectedRoom, selectedDate);
    const { typeRooms } = useTypeRoom();
    const { branches } = useAllBranches();
    const { allCombo } = useAllCombo();
    const { timeSlots } = useAllTimeSlots();
    const { user } = useUserData();
    console.log('email: ', user?.email);
    const router = useRouter();
    const { f_Id } = router.query;

    const [initialFilmId, setInitialFilmId] = useState(null);


    useEffect(() => {
        if (f_Id && !initialFilmId) {
            setInitialFilmId(f_Id);
        }
    }, [f_Id, initialFilmId]);

    // useEffect(() => {
    //     if (bookingByID) {
    //         setBooking(bookingByID);
    //         console.log('bookingByID: ', bookingByID);
    //         if (status) {
    //             setIsPopupPaymentStatus(true);
    //         }
    //     }
    // }, [bookingByID, status]);

    // Ưu tiên selectedFilm, nếu không có thì lấy initialFilmId
    const { film, isLoading: loadingFilm } = useFilm(selectedFilm || initialFilmId);
    const { films, isLoadingAllFimls, isErrorAllFimls } = useAllFilms();
    const FilmOptions = films?.map((film) => ({
        name: `${film.name} - ${film.nameEnglish}`,
        id: film._id,
        image: film.image, // hoặc room.id nếu backend trả id thường
    }));

    const [isPopupConfirm, setIsPopupConfirm] = useState(false);
    const [isPopupDeposit, setIsPopupDeposit] = useState(false);
    const [messageDeposit, setMessageDeposit] = useState('');
    const [halfPay, setHalfPay] = useState(0);
    const [isPopupPaymentStatus, setIsPopupPaymentStatus] = useState(false);
    const [contentConfirm, setContentConfirm] = useState('');
    const [confirmedOverDuration, setConfirmedOverDuration] = useState(false);
    const disabledTimeSlots = bookedRoom?.bookedTimeSlots || [];
    const { RoomsByBranchAndType: rooms } = useRoomByBranchAndType(selectedBranch, selectedTypeRoom);
    const TypeRoomOptions = typeRooms?.map((type) => ({
        name: type.name,
        id: type._id, // hoặc room.id nếu backend trả id thường
    }));
    const BranchOptions = branches?.map((branch) => ({
        name: branch.name,
        id: branch._id, // hoặc room.id nếu backend trả id thường
    }));
    const ComboOptions = allCombo?.map((combo) => ({
        name: combo.name,
        id: combo._id, // hoặc room.id nếu backend trả id thường
    }));

    const handleSelectionBoxChange = (value) => {
        setSelectedTypeRoom(value); // value là ID như 'id1' hoặc 'id2'
    };
    const handleSelectionBranchChange = (value) => {
        setSelectedBranch(value); // value là ID như 'id1' hoặc 'id2'
    };

    const handleSelectionComboChange = (value) => {
        setSelectedCombo(value);
    };
    const handleSelectedRoom = (_id) => {
        setSelectedRoom(_id);
        setSelectedTimeSlots([]);
    };

    const handleTimeSlotClick = (timeSlotId) => {
        // Tìm vị trí của timeSlot trong mảng gốc để kiểm tra tính liền kề
        const clickedIndex = timeSlots.findIndex((slot) => slot._id === timeSlotId);

        if (clickedIndex === -1) return;

        const isSelected = selectedTimeSlots.includes(timeSlotId);

        // Nếu đang được chọn => loại khỏi danh sách
        if (isSelected) {
            const newSelected = selectedTimeSlots.filter((id) => id !== timeSlotId);

            if (newSelected.length <= 1) {
                // 0 hoặc 1 slot thì mặc định liên tục
                setSelectedTimeSlots(newSelected);
                return;
            }

            const selectedIndexes = newSelected
                .map((id) => timeSlots.findIndex((slot) => slot._id === id))
                .sort((a, b) => a - b);

            let isStillContinuous = true;
            for (let i = 0; i < selectedIndexes.length - 1; i++) {
                if (selectedIndexes[i + 1] !== selectedIndexes[i] + 1) {
                    isStillContinuous = false;
                    break;
                }
            }

            if (!isStillContinuous) {
                toast.error('Bạn chỉ được chọn các khung giờ liền nhau');
                return;
            }

            setSelectedTimeSlots(newSelected);
            return;
        }

        // Nếu danh sách rỗng => chọn luôn timeSlot
        if (selectedTimeSlots.length === 0) {
            setSelectedTimeSlots([timeSlotId]);
            return;
        }

        // Nếu đã chọn rồi, kiểm tra tính liền kề
        const selectedIndexes = selectedTimeSlots.map((id) => timeSlots.findIndex((slot) => slot._id === id));

        const minIndex = Math.min(...selectedIndexes);
        const maxIndex = Math.max(...selectedIndexes);

        // Cho phép chọn tiếp nếu là liền kề trước hoặc sau chuỗi đã chọn
        if (clickedIndex === minIndex - 1 || clickedIndex === maxIndex + 1) {
            setSelectedTimeSlots((prev) => [...prev, timeSlotId]);
        } else {
            toast.error('Bạn chỉ được chọn các khung giờ liền nhau.');
        }
    };

    const validate = () => {
        if (!selectedFilm && !initialFilmId) return 'Vui lòng chọn phim';
        if (!selectedBranch) return 'Vui lòng chọn cơ sở';
        if (!selectedTypeRoom) return 'Vui lòng chọn loại phòng';
        if (!selectedRoom) return 'Vui lòng chọn phòng';
        if (!selectedName && !user?.name) return 'Vui lòng cung cấp họ và tên';
        if (!selectedEmail && !user?.email) return 'Vui lòng cung cấp email';
        if (!selectedPhone && !user?.phone) return 'Vui lòng cung cấp số điện thoại';
        if (!selectedTimeSlots || selectedTimeSlots.length === 0) return 'Vui lòng chọn khung giờ';
        return '';
    };
    const errorMessage = validate();

    const handleBooking = async () => {
        const selectedSlotDetails = timeSlots.filter((slot) => selectedTimeSlots.includes(slot._id));
        const totalSlotDuration = selectedSlotDetails.reduce((acc, slot) => acc + (slot.slot_duration || 0), 0);
        if (totalSlotDuration === 30) {
            toast.error('Đặt phòng tối thiểu 60 phút');
            return;
        }
        // console.log('selectedSlotDetails', selectedSlotDetails);
        // console.log('totalSlotDuration', totalSlotDuration);
        if (!confirmedOverDuration && Math.abs(totalSlotDuration - film.duration) > 20) {
            setContentConfirm(
                `Phim bạn chọn có thời lượng ${film.duration} phút nhưng bạn đang đặt phòng với thời gian ${totalSlotDuration} phút. Bạn có chắc muốn tiếp tục đặt?`
            );
            setIsPopupConfirm(true);
            return;
        }

        await handleBookingFinal();
    };
    const handleBookingFinal = async () => {
        setIsPopupConfirm(false);
        setConfirmedOverDuration(false); // reset lại sau khi đặt
        setLoading(true);
        const newBooking = {
            name_client: user?.name || selectedName,
            email: user?.email || selectedEmail,
            film: film?._id,
            phone: user?.phone || selectedPhone,
            room: selectedRoom,
            date: selectedDate,
            combo: selectedCombo,
            time_slots: selectedTimeSlots,
            promotion: selectedDiscount,
        };
        console.log('new booking: ', newBooking);

        try {
            const result = await createBooking(newBooking);
            console.log('result: ', result);
            if (result.success) {
                const newBookingData = result.data.data;
                setBooking(newBookingData);
                if (result.data.paymentRequired) {
                    setIsPopupDeposit(true);
                    setMessageDeposit(result.message);
                    setHalfPay(result.data.money);
                } else {
                    toast.success(result.message);
                    router.push(`/bookRoom/${newBookingData.id_booking}`);
                    setSelectedTimeSlots([]);

                    // console.log('result data:', booking);
                }
                console.log('result booking: ', result);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đặt phòng.');
            // console.error(error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    const handlePayment = async () => {
        console.log('id_booking: ', booking?.id_booking);
        const newPayment = {
            id_booking: booking?.id_booking,
            email: selectedEmail || user.email,
            amount: booking?.payment_amount || 0,
            description: `${booking?._id}`,
            returnUrl: `http://localhost:3000/bookRoom/${booking._id}`,
            cancelUrl: `http://localhost:3000/bookRoom/${booking._id}`,
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
    const handleHalfPayment = async () => {
        const description = `${booking?._id}`;
        const newPayment = {
            id_booking: booking?.id_booking,
            amount: halfPay || 0,
            description: description,
            returnUrl: `http://localhost:3000/bookRoom/${booking._id}`,
            cancelUrl: `http://localhost:3000/bookRoom/${booking._id}`,
        };
        // console.log('newPayment: ', newPayment);
        try {
            const result = await createPayment(newPayment);

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

    // console.log('name_client', user?.name);
    // console.log('email', user?.email);
    // console.log('phone', user?.phone);
    // console.log('room', selectedRoom);
    // console.log('date', selectedDate);
    // console.log('combo', selectedCombo);
    // console.log('timeSlots', selectedTimeSlots);
    // console.log('selectedDiscount', selectedDiscount);
    // console.log('bookedRoom', bookedRoom);

    const isBookingDisabled = !(
        (selectedName || user?.name) &&
        (selectedEmail || user?.email) &&
        (selectedPhone || user?.phone) &&
        selectedBranch &&
        selectedTypeRoom &&
        selectedRoom &&
        selectedDate &&
        (selectedFilm || initialFilmId) &&
        selectedTimeSlots.length > 0
    );

    return (
        <div className="container">
            {loading && <LoadingFullPage />}
            {isPopupConfirm && (
                <Popup
                    handleClose={() => {
                        setIsPopupConfirm(false);
                    }}
                >
                    <div className={style.formConfirm}>
                        <p className={style.titleConfirm}>Xác nhận đặt phòng</p>
                        <p className={style.contentConfirm}>{contentConfirm}</p>
                        <div className={style.row}>
                            <Button type={'button'} rounded_10 red onClick={() => setIsPopupConfirm(false)}>
                                Hủy
                            </Button>
                            <Button
                                type={'button'}
                                rounded_10
                                yellowLinear
                                onClick={() => {
                                    setConfirmedOverDuration(true);
                                    handleBookingFinal();
                                }}
                            >
                                Vẫn tiếp tục
                            </Button>
                        </div>
                    </div>
                </Popup>
            )}
            {isPopupDeposit && (
                <Popup
                    handleClose={() => {
                        setIsPopupDeposit(false);
                    }}
                >
                    <div className={style.formConfirm}>
                        <p className={style.titleConfirm}>Yêu cầu cọc trước</p>
                        <p className={style.contentConfirm}>{messageDeposit}</p>
                        <div className={style.row}>
                            <Button type={'button'} rounded_10 red onClick={handleHalfPayment}>
                                Thanh toán 50%
                            </Button>
                            <Button type={'button'} rounded_10 yellowLinear onClick={handlePayment}>
                                Thanh toán 100%
                            </Button>
                        </div>
                    </div>
                </Popup>
            )}
            {isPopupPaymentStatus && (
                <Popup
                    handleClose={() => {
                        setIsPopupPaymentStatus(false);
                    }}
                >
                    <div className={style.popupPayment}>
                        {status === 'PAID' ? (
                            <>
                                <AiOutlineCheckCircle className={style.success} />
                                <p>Thanh toán thành công</p>
                                <Button rounded_10 yellowLinear href={PATH.Overview}>
                                    Kiểm tra đơn đặt phòng
                                </Button>
                            </>
                        ) : (
                            <>
                                <AiOutlineCloseCircle className={style.cancel} href={PATH.Overview} />
                                <p>Thanh toán thất bại</p>
                                <Button rounded_10 yellowLinear>
                                    Kiểm tra đơn đặt phòng
                                </Button>
                            </>
                        )}
                        {/* <p>{status === 'PAID' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</p> */}
                    </div>
                </Popup>
            )}
            <div className={style.container}>
                <div className={style.fromInfor}>
                    {user ? (
                        <div className={style.welcome}>
                            <p className={style.username}>{`Hi ${user.name}`}</p>
                            <p className={style.title}>Hãy đặt phòng để trải nghiệm dịch vụ của PNM - BOX</p>
                            <p className={style.title}>Chúng tôi sẽ không để bạn thất vọng</p>
                        </div>
                    ) : (
                        <>
                            <div className={style.login}>
                                Bạn đã có tài khoản?
                                <Link href={PATH.Login}>Đăng nhập tại đây</Link>
                            </div>
                            <div className={style.infor}>
                                <Input
                                    rounded_10
                                    color_black
                                    placeholder={'Họ và tên'}
                                    onChange={(e) => setSelectedName(e.target.value)}
                                    value={selectedName}
                                />

                                <Input
                                    rounded_10
                                    color_black
                                    placeholder="Email"
                                    onChange={(e) => setSelectedEmail(e.target.value)}
                                    value={selectedEmail}
                                />

                                <Input
                                    rounded_10
                                    color_black
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setSelectedPhone(e.target.value)}
                                    value={selectedPhone}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className={style.formBookRoom}>
                    <div className={style.form}>
                        <div className={style.groupItems}>
                            <p>Chọn phim</p>
                            <SearchBar
                                data={FilmOptions}
                                onSelect={(item) => {
                                    // console.log('item', item);
                                    setSelectedFilm(item.id);
                                }}
                                heightImage={70}
                                widthImage={50}
                            />
                        </div>
                        <div className={style.groupItems}>
                            {loadingFilm ? (
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop={true}
                                    autoplay={true}
                                    className={style.loading}
                                />
                            ) : (
                                film && (
                                    <div className={style.groupItems}>
                                        <p>Phim bạn chọn</p>
                                        <div className={style.filmItem}>
                                            <div className={style.filmImage}>
                                                <Image
                                                    src={film.image}
                                                    alt="film image"
                                                    width={200}
                                                    height={300}
                                                    style={{ objectFit: 'cover' }} // dùng style thay vì objectFit props
                                                />
                                            </div>
                                            <div className={style.filmContent}>
                                                <p className={style.filmName}>{film.name}</p>
                                                <p className={style.subName}>{film.nameEnglish}</p>
                                                <p className={style.release_date}>
                                                    {`Năm phát hành:\u2003${film.release_date}`}
                                                </p>
                                                <p className={style.duration}>{`Thời lượng:\u2003${film.duration}`}</p>
                                                <p className={style.country}>{`Quốc gia:\u2003${film.country}`}</p>
                                                <div className={style.Listcategory}>
                                                    {`Thể loại:\u2003`}
                                                    {film.category.map((item, index) => (
                                                        <div key={index} className={style.category}>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        {(film || initialFilmId) && (
                            <div className={style.groupItems}>
                                <p>Chọn cơ sở bạn muốn đến</p>
                                <Selection
                                    options={BranchOptions}
                                    optionLabel="name"
                                    defaultValue={selectedBranch}
                                    optionValue="id"
                                    onChange={handleSelectionBranchChange}
                                />
                            </div>
                        )}

                        {selectedBranch && (
                            <div className={clsx(style.groupItems, style.row)}>
                                <div className={style.date}>
                                    <p>Ngày đặt phòng</p>

                                    <Calendar
                                        selectedDate={selectedDate}
                                        onChange={setSelectedDate}
                                        currentDay
                                        disablePastDates
                                    />
                                </div>

                                <div className={style.room}>
                                    <p>Chọn loại phòng</p>
                                    <Selection
                                        options={TypeRoomOptions}
                                        defaultValue={selectedTypeRoom}
                                        optionLabel="name"
                                        optionValue="id"
                                        onChange={handleSelectionBoxChange}
                                    />
                                </div>
                            </div>
                        )}
                        <div className={clsx(style.groupItems, style.time)}>
                            {selectedTypeRoom && (
                                <div className={style.typeRoom}>
                                    {rooms?.map((room) => (
                                        <div
                                            className={clsx(style.room, selectedRoom === room._id ? style.active : '')}
                                            key={room._id}
                                            onClick={() => handleSelectedRoom(room._id)}
                                        >
                                            <Image src={room?.image} alt={room.name} width={100} height={120} />

                                            {room.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {selectedRoom && (
                                <div className={style.timeFrame}>
                                    {timeSlots?.map((time) => {
                                        const now = dayjs().subtract(10, 'minute'); // thời điểm hiện tại
                                        const isToday = dayjs(selectedDate).isSame(now, 'day'); // kiểm tra có phải hôm nay không

                                        const todayStart = dayjs(selectedDate)
                                            .hour(Number(time.start_time.split(':')[0]))
                                            .minute(Number(time.start_time.split(':')[1]));

                                        const isPast = isToday && todayStart.isBefore(now); // chỉ disable nếu là hôm nay và đã qua
                                        const isDisabled = disabledTimeSlots.includes(time._id) || isPast;

                                        const slotContent = (
                                            <div
                                                key={time._id}
                                                className={clsx(
                                                    style.slot,
                                                    selectedTimeSlots.includes(time._id) && style.activeSlot,
                                                    isDisabled && style.disable
                                                )}
                                                onClick={() => {
                                                    if (!isDisabled) handleTimeSlotClick(time._id);
                                                }}
                                            >
                                                {`${time.start_time} - ${time.end_time}`}
                                            </div>
                                        );

                                        return isDisabled ? (
                                            <Tippy
                                                content={isPast ? 'Khung giờ đã qua' : 'Khung giờ này đã được đặt'}
                                                key={time._id}
                                                placement="bottom"
                                                theme="light-border"
                                            >
                                                <span>{slotContent}</span>
                                            </Tippy>
                                        ) : (
                                            slotContent
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {selectedTimeSlots.length > 0 && (
                            <div className={style.row}>
                                <div className={style.groupItems}>
                                    <p>Chọn Combo</p>

                                    <Selection options={ComboOptions} onChange={handleSelectionComboChange} />
                                </div>
                                <div className={style.groupItems}>
                                    <p>Mã giảm giá</p>
                                    <Input
                                        rounded_10
                                        placeholder={'Nhập mã giảm giá'}
                                        onChange={(e) => setSelectedDiscount(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <Tippy content={errorMessage} placement="bottom" theme="light">
                            <div className={style.groupItems}>
                                <Button rounded_10 redLinear onClick={handleBooking} disabled={isBookingDisabled}>
                                    Đặt phòng
                                </Button>
                            </div>
                        </Tippy>
                        <div className={clsx(style.groupItems, style.warning)}>
                            <div className={style.title}>
                                <AiOutlineWarning />
                                <h5>Lưu ý</h5>
                            </div>
                            <p>
                                - Các đơn đặt phòng từ 300.000 VNĐ trở lên và đơn đặt phòng trước 2 ngày vui lòng thanh
                                toán trước 50% giá trị hóa đơn
                            </p>
                            <p>
                                - Những tài khoản đặt phòng nhưng không đến và không báo lại cho PNM - BOX, chúng tôi
                                xin phép khóa tài khoản.
                            </p>
                            <p>
                                - PNM - BOX chỉ nhận đặt phòng qua website và fanpage facebook, chúng tôi không chịu
                                trách nhiệm với những đơn đặt hằng qua nền tảng khác.
                            </p>
                        </div>
                    </div>
                    <Feedback />
                </div>
            </div>
        </div>
    );
};
export default BookRoomPage;
