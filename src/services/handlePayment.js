import { createPayment } from './payment';

export const handlePayment = async ({ booking }) => {
    const description = `${booking?.id_booking} đặt phòng`;
    console.log('id_booking: ', booking?.id_booking);

    const newPayment = {
        id_booking: booking?.id_booking,
        email: booking?.email,
        amount: booking?.total_money || 0,
        description: description,
        returnUrl: `http://localhost:3000/bookRoom/${booking?._id}`,
        cancelUrl: `http://localhost:3000/bookRoom/${booking?._id}`,
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
