import { useEffect, useState } from 'react';
import clsx from 'clsx'; // Giả sử bạn dùng clsx cho class names điều kiện
import style from './AllBooking.module.scss';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Calender from '@/components/common/Calender'; // Sửa lại thành Calender theo import của bạn
import ListInvoice from '@/components/common/ListInvoice';
import { useAllBookingByEmail, useAllBookingByEmailAndMonth, useAllBookingByEmailCurrent } from '@/services/booking';
import LoadingItem from '@/components/common/LoadingItem/LoadingItem';

// const listFilter = ['Đơn hiện tại', 'Theo tháng', 'Tất cả các đơn']; // Không cần thiết nữa nếu dùng button riêng

const InvoiceDetailPage = () => {
    const [activeFilter, setActiveFilter] = useState('Tất cả các đơn'); // Mặc định là "Tất cả các đơn"
    const [selectedDateMonth, setSelectedDateMonth] = useState(null); // Date object cho tháng được chọn
    const [apiMonth, setApiMonth] = useState(null); // Tháng (số) để gọi API
    const [apiYear, setApiYear] = useState(null); // Năm (số) để gọi API

    // Lấy dữ liệu
    const { booking: allBookingCurrent, isLoading: loadingBookingCurrent } = useAllBookingByEmailCurrent();
    const { booking: allBooking, isLoading: loadingBooking } = useAllBookingByEmail();
    console.log('allbooking: ', allBooking);
    const { booking: allBookingByMonth, isLoading: loadingBookingByMonth } = useAllBookingByEmailAndMonth(
        apiMonth,
        apiYear
    );

    useEffect(() => {
        if (selectedDateMonth) {
            const monthForApi = selectedDateMonth.getMonth() + 1; // JS month is 0-indexed
            const yearForApi = selectedDateMonth.getFullYear();
            setApiMonth(monthForApi);
            setApiYear(yearForApi);
            // console.log(`useEffect: Selected Date changed. API Month: ${monthForApi}, API Year: ${yearForApi}`);
        } else {
            // Nếu selectedDateMonth bị xóa (ví dụ: có nút clear trong Calendar), reset apiMonth/Year
            setApiMonth(null);
            setApiYear(null);
        }
    }, [selectedDateMonth]);

    console.log('apiMonth: ', apiMonth);
    console.log('apiYear: ', apiYear);

    const handleFilterButtonClick = (filterType) => {
        setActiveFilter(filterType);
        // Nếu người dùng chuyển sang filter khác không phải "Theo tháng"
        // bạn có thể cân nhắc việc reset selectedDateMonth tại đây nếu muốn
        // if (filterType !== 'Theo tháng') {
        // setSelectedDateMonth(null);
        // }
    };

    const renderInvoices = () => {
        switch (activeFilter) {
            case 'Đơn hiện tại':
                if (loadingBookingCurrent)
                    return (
                        <div className={style.loadingItem}>
                            <LoadingItem />
                        </div>
                    );
                if (!allBookingCurrent || allBookingCurrent.length === 0) return <p>Không có đơn hiện tại.</p>;
                return allBookingCurrent.map((booking) => <ListInvoice key={booking._id} booking={booking} />);
            case 'Tất cả các đơn':
                if (loadingBooking)
                    return (
                        <div className={style.loadingItem}>
                            <LoadingItem />
                        </div>
                    );
                if (!allBooking || allBooking.length === 0) return <p>Không có đơn nào.</p>;
                return allBooking?.map((booking) => <ListInvoice key={booking._id} booking={booking} />);
            case 'Theo tháng':
                if (!selectedDateMonth) return <p>Vui lòng chọn tháng để xem hóa đơn.</p>;
                if (loadingBookingByMonth)
                    return (
                        <div className={style.loadingItem}>
                            <LoadingItem />
                        </div>
                    );
                if (!allBookingByMonth || allBookingByMonth.length === 0)
                    return <p>Không có đơn nào cho tháng đã chọn.</p>;
                return allBookingByMonth.map((booking) => <ListInvoice key={booking._id} booking={booking} />);
            default:
                return null;
        }
    };

    return (
        <div className={style.container}>
            <div className={style.filter}>
                <div className={style.flexRow}>
                    <p>Lọc: </p>
                    <div className={style.filterButtonsContainer}>
                        {/* --- SỬA CÁC NÚT BẤM Ở ĐÂY --- */}

                        {/* Nút "Đơn hiện tại" */}
                        <Button
                            h30
                            rounded_6
                            // Áp dụng prop màu có điều kiện
                            yellowLinear={activeFilter === 'Đơn hiện tại'}
                            light={activeFilter !== 'Đơn hiện tại'}
                            onClick={() => handleFilterButtonClick('Đơn hiện tại')}
                            className={style.filterButton} // Giữ lại class chung cho các nút
                        >
                            Đơn hiện tại
                        </Button>

                        {/* Nút "Tất cả các đơn" */}
                        <Button
                            h30
                            rounded_6
                            // Áp dụng prop màu có điều kiện
                            yellowLinear={activeFilter === 'Tất cả các đơn'}
                            light={activeFilter !== 'Tất cả các đơn'}
                            onClick={() => handleFilterButtonClick('Tất cả các đơn')}
                            className={style.filterButton}
                        >
                            Tất cả các đơn
                        </Button>

                        {/* Nút "Theo tháng" */}
                        <Button
                            h30
                            rounded_6
                            // Áp dụng prop màu có điều kiện
                            yellowLinear={activeFilter === 'Theo tháng'}
                            light={activeFilter !== 'Theo tháng'}
                            onClick={() => handleFilterButtonClick('Theo tháng')}
                            className={style.filterButton}
                        >
                            Theo tháng
                        </Button>
                    </div>
                    {activeFilter === 'Theo tháng' && (
                        <div className={style.calendar}>
                            <Calender
                                type="month"
                                selectedDate={selectedDateMonth}
                                onChange={(date) => setSelectedDateMonth(date)}
                            />
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
            <div className={style.listInvoiceContainer}>{renderInvoices()}</div>
        </div>
    );
};
export default InvoiceDetailPage;
