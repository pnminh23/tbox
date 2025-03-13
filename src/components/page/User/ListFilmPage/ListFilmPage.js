import Slider from "@/components/common/Slider";
import style from "./ListFilmPage.module.scss";
import FilmItem from "@/components/common/ItemSlider/FilmItem";
import Banner from "@/components/common/Banner";
import clsx from "clsx";

const ListFilmPage = () => {
    return (
        <>
            <Banner />

            <div className={clsx("container", style.container)}>
                <div className={style.left}>
                    <Slider
                        apiUrl="https://phimapi.com/v1/api/danh-sach/phim-le"
                        title="Phim mới ra mắt"
                        slidesPerView={4}
                        renderItem={(film) => <FilmItem film={film} />}
                    />
                </div>
                <div className={style.right}></div>
            </div>
        </>
    );
};
export default ListFilmPage;
