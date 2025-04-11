import style from './Feedback.module.scss';

const Feedback = () => {
    const ListLocations = [
        'PNM - BOX 175 Tây Sơn',
        'PNM - BOX 139 Nguyễn Ngọc Vũ',
        'PNM - BOX 7 Thiền Quang',
        'PNM - BOX 19C Hoàng Diệu',
    ];

    const Feedbacks = [
        {
            name: 'Phạm Nhật Minh',
            rate: 4,
            comment: 'Chất lượng dịch vụ tốt',
            date: '2025-04-10T10:30:00.000Z',
        },
        {
            name: 'Phạm Nhật Minh',
            rate: 4,
            comment: 'Chất lượng dịch vụ tốt, nhân viên nhiệt tình',
            date: '2025-04-10T11:00:00.000Z',
        },
        {
            name: 'Phạm Nhật Minh',
            rate: 4,
            comment: 'Chất lượng dịch vụ tốt, nhân viên nhiệt tình',
            date: '2025-04-10T11:30:00.000Z',
        },
        {
            name: 'Nguyễn Văn A',
            rate: 5,
            comment: 'Rất hài lòng với dịch vụ!',
            date: '2025-04-09T14:20:00.000Z',
        },
        {
            name: 'Trần Thị B',
            rate: 3,
            comment: 'Ổn, nhưng có thể cải thiện thêm',
            date: '2025-04-08T09:00:00.000Z',
        },
        {
            name: 'Lê Văn C',
            rate: 4,
            comment: 'Dịch vụ nhanh chóng và tiện lợi',
            date: '2025-04-08T16:15:00.000Z',
        },
        {
            name: 'Mai Thị D',
            rate: 5,
            comment: 'Tuyệt vời!',
            date: '2025-04-07T08:00:00.000Z',
        },
        {
            name: 'Hoàng Minh E',
            rate: 2,
            comment: 'Chưa tốt lắm, nên cải thiện',
            date: '2025-04-06T17:45:00.000Z',
        },
    ];

    const renderStars = (count) => {
        return (
            <>
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < count ? style.filled : style.empty}>
                        ★
                    </span>
                ))}
            </>
        );
    };

    return (
        <div className={style.container}>
            <div className={style.title}>
                <h5>Đánh giá về cơ sở</h5>
                <select className={style.select}>
                    {ListLocations.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.content}>
                <div className={style.feedbackList}>
                    {Feedbacks.map((item, index) => (
                        <div key={index} className={style.feedbackCard}>
                            <div className={style.name}>
                                {item.name}
                                <div className={style.date}>
                                    {new Date(item.date).toLocaleString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>
                            <div className={style.stars}>{renderStars(item.rate)}</div>
                            <div className={style.comment}>{item.comment}</div>
                        </div>
                    ))}
                </div>
                <div className={style.buttons}>
                    <button className={style.viewMore}>Xem thêm đánh giá</button>
                    <button className={style.giveFeedback}>Đánh giá</button>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
