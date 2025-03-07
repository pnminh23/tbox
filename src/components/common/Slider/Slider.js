import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import img1 from "../../../../public/static/img/item1.jpg";
import img2 from "../../../../public/static/img/item2.webp";
import img3 from "../../../../public/static/img/item3.jpg";
import style from "./Slider.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import FilmItem from "../ItemSlider/FilmItem";

const Slider = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch(
                    "https://phimapi.com/v1/api/danh-sach/phim-le"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                // Kiểm tra dữ liệu trả về có đúng không
                console.log("API Response:", result);

                if (
                    result.status === "success" &&
                    result.data &&
                    result.data.items
                ) {
                    setFilms(result.data.items);
                } else {
                    console.error("Dữ liệu API không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
            }
        };

        fetchFilms();
    }, []);

    return (
        <div className={style.sliderContainer}>
            <Swiper
                className={style.swiperSlider}
                modules={[Navigation, Autoplay]}
                speed={1000}
                slidesPerView={5}
                autoplay={{ delay: 7000 }}
                loop={true}
                // grabCursor={true}s
                draggable={true}
                navigation={{
                    prevEl: `.${style.prevButton}`,
                    nextEl: `.${style.nextButton}`,
                }}
                breakpoints={{
                    320: { slidesPerView: 1 }, // Màn hình nhỏ (điện thoại)
                    480: { slidesPerView: 2 }, // Màn hình nhỏ hơn (điện thoại ngang)
                    768: { slidesPerView: 3 }, // Tablet
                    1024: { slidesPerView: 4 }, // Laptop nhỏ
                    1280: { slidesPerView: 5 }, // Desktop
                }}
            >
                <div className={style.sliderTop}>
                    <div className={style.navLeft}>
                        <h3 className={style.title}>Phim hot tại TBOX</h3>
                        <AiOutlineDoubleRight />
                    </div>

                    <div className={style.navRight}>
                        <div className={style.prevButton}>
                            <AiOutlineLeft />
                        </div>
                        <div className={style.nextButton}>
                            <AiOutlineRight />
                        </div>
                    </div>
                </div>

                {films.length > 0 ? (
                    films.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className={style.item}>
                                <div className={style.image}>
                                    <Image
                                        src={`https://phimimg.com//${item.poster_url}`}
                                        alt={item.origin_name}
                                        fill
                                        objectFit="cover"
                                    />
                                </div>
                                <FilmItem film={item} />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </Swiper>
        </div>
    );
};
export default Slider;
