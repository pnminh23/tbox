import Image from 'next/image';
import style from './NewsItem.module.scss';
import Link from 'next/link';

const NewsItem = ({ news }) => {
    return (
        <div className={style.container}>
            <div className={style.img}>
                <Image src={news.image_url} alt="News Image" fill objectFit="cover" />
            </div>
            <div className={style.content}>
                <Link href="/Promotion-new-detail" className={style.title}>
                    {news.title}
                </Link>
                <p className={style.detail}>{news.detail}</p>
                <div className={style.date}>
                    {new Date(news.create_at).toLocaleString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
