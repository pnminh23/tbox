import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import CSS mặc định của Tippy
import style from './FilmItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { PATH } from '@/constants/config';

const FilmItem = ({ film }) => {
    const currentYear = new Date().getFullYear();

    return (
        <div className={style.item}>
            {film.index !== undefined && <div className={style.rankNumber}>{film.index + 1}</div>}
            <div className={style.image}>
                <Image src={film.image} alt={film.name} fill objectFit="cover" />
            </div>
            <div className={style.overlay}></div>
            <Link href={{ pathname: PATH.BookRoom, query: { f_Id: film._id } }} className={style.orderButton}>
                Đặt phòng xem ngay
            </Link>

            <div className={style.content}>
                <h5 className={style.name}>{film.name}</h5>

                <p className={style.nameEnglish}>{film.nameEnglish}</p>

                <div className={style.info}>
                    <span>{film.release_date}</span>
                    <span>{film.duration}</span>
                    <span>{film.country}</span>
                </div>
                <div className={style.categories}>
                    {film.category.map((cat, index) => (
                        <span key={index} className={style.categoryItem}>
                            {cat}
                        </span>
                    ))}
                </div>
                {film.release_date == currentYear && (
                    <div className={style.status}>
                        <p>new</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilmItem;
