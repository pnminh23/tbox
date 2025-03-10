import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import style from "./Slider.module.scss";
import { useState, useEffect } from "react";
import clsx from "clsx";

const Slider = ({
    apiUrl,
    renderItem,
    title = "Slider",
    slidesPerView,
    autoplay = false,
    slidesPerGroup = 1,
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
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
                    setItems(result.data.items);
                } else {
                    console.error("Dữ liệu API không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    return (
        <div className={style.sliderContainer}>
            <div className={style.sliderTop}>
                <div className={style.navLeft}>
                    <h3 className={style.title}>{title}</h3>
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
            <Swiper
                className={style.swiperSlider}
                modules={[Navigation, Autoplay]}
                speed={1000}
                slidesPerView={slidesPerView}
                loop={true}
                slidesPerGroup={slidesPerGroup}
                // grabCursor={true}s
                draggable={true}
                navigation={{
                    prevEl: `.${style.prevButton}`,
                    nextEl: `.${style.nextButton}`,
                }}
                autoplay={
                    autoplay
                        ? { delay: 7000, disableOnInteraction: false }
                        : false
                }
                // breakpoints={{
                //     320: { slidesPerView: 1 }, // Màn hình nhỏ (điện thoại)
                //     480: { slidesPerView: 2 }, // Màn hình nhỏ hơn (điện thoại ngang)
                //     768: { slidesPerView: 3 }, // Tablet
                //     1024: { slidesPerView: 4 }, // Laptop nhỏ
                //     1280: { slidesPerView: 5 }, // Desktop
                // }}
            >
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : (
                    items.map((item) => (
                        <SwiperSlide key={item._id}>
                            {renderItem(item)}
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};
export default Slider;
