import Banner from '@/components/common/Banner';
import style from './DiscountPage.module.scss';
import NewsItem from '@/components/common/NewsItem';
import ReactPaginate from 'react-paginate';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRef, useState } from 'react';

const ITEMS_PER_PAGE = 6;
const listPromotionNews = [
    {
        id: 1,
        title: 'Khuyến mãi hè – Đồng giá vé xem phim chỉ 45K',
        detail: 'Chào hè 2025, hệ thống đặt phòng xem phim của chúng tôi triển khai chương trình khuyến mãi đồng giá vé chỉ 45.000đ cho tất cả các suất chiếu trước 17h mỗi ngày. Đây là cơ hội tuyệt vời để bạn thư giãn cùng bạn bè, người thân trong không gian rạp chiếu hiện đại, âm thanh sống động. Áp dụng cho tất cả cụm rạp trên toàn quốc, từ ngày 15/04 đến hết 30/04. Số lượng vé khuyến mãi có giới hạn mỗi ngày, vì vậy hãy nhanh tay đặt chỗ để không bỏ lỡ trải nghiệm điện ảnh tuyệt vời với chi phí siêu tiết kiệm.',
        create_at: '2025-04-10T10:30:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 2,
        title: 'Mua 2 vé tặng 1 bắp nước',
        detail: "Dành tặng cho các cặp đôi và nhóm bạn thân yêu thích điện ảnh, chương trình 'Mua 2 vé – Tặng combo bắp nước' sẽ mang đến cho bạn những buổi xem phim trọn vẹn hơn bao giờ hết. Áp dụng cho tất cả các suất chiếu trong tuần, không giới hạn thể loại phim. Chỉ cần mua 2 vé trong cùng một giao dịch là bạn sẽ nhận ngay một phần combo bắp rang và nước uống miễn phí tại quầy. Chương trình diễn ra từ 11/04 đến 25/04 trên hệ thống đặt vé trực tuyến và tại rạp.",
        create_at: '2025-04-11T08:00:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 3,
        title: 'Miễn phí vé cho trẻ em dưới 6 tuổi',
        detail: 'Hãy để cả gia đình cùng tận hưởng thế giới điện ảnh! Trong suốt tháng 4 này, hệ thống rạp chiếu phim của chúng tôi miễn phí vé vào cửa cho trẻ em dưới 6 tuổi khi đi cùng người lớn mua vé. Đây là dịp lý tưởng để cha mẹ đưa các bé trải nghiệm rạp phim đầu đời với nhiều bộ phim hoạt hình đặc sắc và an toàn. Lưu ý, mỗi vé người lớn chỉ áp dụng miễn phí cho 1 trẻ em. Vui lòng mang theo giấy tờ tuỳ thân để xác minh độ tuổi tại quầy vé hoặc khi vào rạp.',
        create_at: '2025-04-09T15:45:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 4,
        title: 'Flash Sale cuối tuần – Vé phim chỉ 39K',
        detail: 'Cứ mỗi cuối tuần là một dịp đặc biệt! Vào thứ Bảy và Chủ Nhật hàng tuần, hệ thống rạp của chúng tôi sẽ mở bán số lượng giới hạn vé xem phim với giá chỉ 39.000đ/suất chiếu. Chương trình áp dụng từ 12h trưa đến 18h tối, bao gồm cả phim bom tấn và phim Việt mới nhất. Vé chỉ được đặt qua hệ thống online để đảm bảo công bằng và nhanh chóng. Hãy theo dõi ứng dụng và website để cập nhật khung giờ mở bán và tranh thủ đặt ngay khi có thông báo.',
        create_at: '2025-04-08T12:00:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 5,
        title: 'Ưu đãi thành viên – Tặng vé sinh nhật',
        detail: "Chào mừng sinh nhật của bạn cùng hệ thống rạp phim! Khách hàng là thành viên của hệ thống sẽ được tặng 1 vé xem phim miễn phí trong tháng sinh nhật. Vé có thể sử dụng bất kỳ ngày nào trong tháng và áp dụng cho tất cả các suất chiếu. Để nhận quà, bạn chỉ cần đăng nhập vào tài khoản thành viên, truy cập mục 'Ưu đãi của tôi' và chọn vé sinh nhật. Chúng tôi luôn mong muốn đồng hành cùng bạn trong những khoảnh khắc đáng nhớ nhất.",
        create_at: '2025-04-07T09:15:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 6,
        title: 'Đặt vé online – Giảm 10% mọi ngày',
        detail: 'Giờ đây, chỉ cần vài cú click trên ứng dụng hoặc website, bạn đã có thể đặt vé xem phim nhanh chóng và nhận ngay ưu đãi giảm 10%. Chương trình này áp dụng cho tất cả khách hàng đặt vé online qua hệ thống chính thức, không phân biệt loại vé hay thời gian chiếu. Thanh toán đơn giản, không cần xếp hàng, lại còn tiết kiệm – quá tuyệt phải không? Hãy thử trải nghiệm đặt vé thông minh và tiện lợi ngay hôm nay.',
        create_at: '2025-04-06T14:20:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 7,
        title: 'Combo gia đình – Siêu tiết kiệm',
        detail: 'Đưa cả gia đình đi xem phim chưa bao giờ dễ dàng và tiết kiệm đến thế! Với combo gia đình dành cho 4 người, bạn sẽ được mua 4 vé với giá ưu đãi đặc biệt kèm theo 2 phần bắp rang lớn và 4 nước ngọt. Đây là chương trình chỉ áp dụng cho các suất chiếu trước 19h từ thứ Hai đến thứ Sáu hàng tuần. Đặt trước qua hệ thống để đảm bảo chỗ ngồi đẹp và hưởng trọn ưu đãi. Một buổi tối giải trí vui vẻ, ý nghĩa đang chờ đón bạn và gia đình.',
        create_at: '2025-04-05T16:45:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 8,
        title: 'Ưu đãi học sinh – sinh viên',
        detail: 'Chỉ cần xuất trình thẻ học sinh, sinh viên khi mua vé tại quầy hoặc khi đăng ký tài khoản online, bạn sẽ được hưởng mức giá ưu đãi đặc biệt chỉ từ 40.000đ/vé. Áp dụng từ thứ Hai đến thứ Sáu hàng tuần và cho tất cả các suất chiếu trước 18h. Đây là chương trình khuyến khích giới trẻ yêu điện ảnh trải nghiệm phim chất lượng cao với mức giá thân thiện. Đừng quên mang theo thẻ sinh viên hợp lệ khi đến rạp nhé!',
        create_at: '2025-04-04T11:00:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 9,
        title: 'Thẻ thành viên VIP – Tích điểm đổi vé',
        detail: 'Gia nhập hội viên VIP để nhận nhiều quyền lợi hấp dẫn như tích điểm đổi vé miễn phí, ưu tiên đặt ghế đẹp, ưu đãi ăn uống tại quầy rạp và tham gia các buổi chiếu đặc biệt chỉ dành cho thành viên. Mỗi giao dịch mua vé hoặc combo đều được cộng điểm vào tài khoản. Khi tích đủ điểm, bạn có thể đổi vé xem phim hoàn toàn miễn phí. Đăng ký miễn phí và nâng cấp tài khoản VIP dễ dàng chỉ với vài bước đơn giản trên hệ thống.',
        create_at: '2025-04-03T13:10:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
    {
        id: 10,
        title: 'Check-in nhận quà mỗi ngày',
        detail: 'Mỗi ngày đến rạp, bạn chỉ cần check-in tại quầy vé hoặc trên ứng dụng là đã có cơ hội nhận ngay những phần quà dễ thương như móc khóa, vé xem phim hoặc coupon giảm giá. Chương trình diễn ra xuyên suốt tháng 4 và quà tặng sẽ được thay đổi theo tuần. Đây là lời tri ân dành cho các khách hàng trung thành luôn đồng hành cùng hệ thống rạp phim của chúng tôi. Đừng quên bật định vị và đăng nhập tài khoản để nhận quà nhé!',
        create_at: '2025-04-02T10:50:00Z',
        image_url: 'https://bizweb.dktcdn.net/thumb/grande/100/064/189/articles/untitled-1.jpg?v=1741365419757',
    },
];

const DiscountPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * ITEMS_PER_PAGE;
    const allFimContainerRef = useRef(null);
    const currentItems = listPromotionNews.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(listPromotionNews.length / ITEMS_PER_PAGE);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);

        if (allFimContainerRef.current) {
            const offset = 70; // Điều chỉnh khoảng cách lùi xuống
            const elementPosition = allFimContainerRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
    };
    return (
        <>
            <Banner />
            <div className="container">
                <div className={style.title}>
                    <h1>Khuyến mãi</h1>
                </div>
                <div className={style.content}>
                    <div className={style.allFilm}>
                        {currentItems.map((news) => (
                            <NewsItem key={news.id} news={news} />
                        ))}
                    </div>

                    {/* Phân trang */}
                    <ReactPaginate
                        previousLabel={<AiOutlineLeft />}
                        nextLabel={<AiOutlineRight />}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={style.pagination}
                        activeClassName={style.active}
                    />
                </div>
            </div>
        </>
    );
};

export default DiscountPage;
