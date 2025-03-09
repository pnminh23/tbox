import style from "./FilmItem.module.scss";
import Image from "next/image";

const FilmItem = ({ film }) => {
    return (
        <div className={style.item}>
            <div className={style.image}>
                <Image
                    src={`https://phimimg.com//${film.poster_url}`}
                    alt={film.origin_name}
                    fill
                    objectFit="cover"
                />
            </div>
            <div className={style.content}>
                <h5>{film.origin_name}</h5>
                <p>{film.category[0].name}</p>
                <div className={style.info}>
                    <span>{film.year}</span>
                    <span>{film.time}</span>
                </div>
                <p>new</p>
            </div>
        </div>
    );
};
export default FilmItem;
