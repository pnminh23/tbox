import style from "./FilmItem.module.scss";

const FilmItem = ({ film }) => {
    return (
        <div className={style.content}>
            <h5>{film.origin_name}</h5>
            <p>{film.category[0].name}</p>
            <div className={style.info}>
                <span>{film.year}</span>
                <span>{film.time}</span>
            </div>
            <p>new</p>
        </div>
    );
};
export default FilmItem;
