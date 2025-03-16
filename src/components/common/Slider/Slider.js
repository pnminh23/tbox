import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import style from "./Slider.module.scss";
import { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import clsx from "clsx";

const Slider = ({
    apiUrl,
    renderItem,
    title = "Slider",
    slidesPerView,
    autoplay = false,
    slidesPerGroup = 1,
    breakpoints,
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null); // Ref cho Swiper
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
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

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.params.navigation.prevEl =
                prevButtonRef.current;
            swiperRef.current.swiper.params.navigation.nextEl =
                nextButtonRef.current;
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    }, [items]); // Chỉ chạy khi items được tải xong

    return (
        <div className={style.sliderContainer}>
            <div className={style.sliderTop}>
                <div className={style.navLeft}>
                    <h3 className={style.title}>{title}</h3>
                </div>

                <div className={style.navRight}>
                    <div ref={prevButtonRef} className={clsx(style.prevButton)}>
                        <AiOutlineLeft />
                    </div>
                    <div ref={nextButtonRef} className={clsx(style.nextButton)}>
                        <AiOutlineRight />
                    </div>
                </div>
            </div>

            <Swiper
                ref={swiperRef}
                className={style.swiperSlider}
                modules={[Navigation, Autoplay]}
                speed={1000}
                slidesPerView={slidesPerView}
                loop={true}
                slidesPerGroup={slidesPerGroup}
                draggable={true}
                navigation={{
                    prevEl: prevButtonRef.current,
                    nextEl: nextButtonRef.current,
                }}
                autoplay={
                    autoplay
                        ? { delay: 7000, disableOnInteraction: false }
                        : false
                }
                breakpoints={breakpoints}
            >
                {loading
                    ? Array.from({ length: slidesPerView }).map((_, index) => (
                          <SwiperSlide key={index}>
                              <Loading />
                          </SwiperSlide>
                      ))
                    : // <p>loading</p>
                      items.map((item) => (
                          <SwiperSlide key={item._id}>
                              {renderItem(item)}
                          </SwiperSlide>
                      ))}
            </Swiper>
        </div>
    );
};

export default Slider;
