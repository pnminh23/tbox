import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import logoSrc from "../../../../public/static/img/logo.webp";
import banerSrc1 from "../../../../public/static/img/slide-img1.webp";
import banerSrc2 from "../../../../public/static/img/slide-img2.webp";
import banerSrc3 from "../../../../public/static/img/slide-img3.webp";
import { AiOutlineSearch, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import style from "./Header.module.scss";
import "swiper/css";
import "swiper/css/navigation";
const Header = () => {
    const router = useRouter(); // Lấy thông tin đường dẫn hiện tại
    const [activePath, setActivePath] = useState("");

    useEffect(() => {
        setActivePath(router.pathname); // Cập nhật đường dẫn mỗi khi trang thay đổi
    }, [router.pathname]);
    // const [activePath, setActivePath] = useState("");

    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.container}>
                    <div className={style.headerLeft}>
                        <Image
                            src={logoSrc}
                            className={style.logo}
                            alt="logo"
                            priority={true}
                        />
                        <ul className={style.menu}>
                            <li
                                className={
                                    activePath === "/" ? style.active : ""
                                }
                            >
                                <Link href="/">Trang chủ</Link>
                            </li>
                            <li
                                className={
                                    activePath === "/danh-sach-phim"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/danh-sach-phim">
                                    Danh sách phim
                                </Link>
                            </li>
                            <li
                                className={
                                    activePath === "/dat-phong"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/dat-phong">Đặt phòng</Link>
                            </li>
                            <li
                                className={
                                    activePath === "/khuyen-mai"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/khuyen-mai">Khuyến mãi</Link>
                            </li>
                            <li
                                className={
                                    activePath === "/combo" ? style.active : ""
                                }
                            >
                                <Link href="/combo">Combo</Link>
                            </li>
                            <li
                                className={
                                    activePath === "/co-so-tbox"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/co-so-tbox">Cơ sở TBOX</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={style.headerRight}>
                        <div className={style.search}>
                            <div className={style.searchButton}>
                                <AiOutlineSearch />
                            </div>

                            <div className={style.searchInputText}>
                                <input
                                    type="text"
                                    placeholder="Bạn muốn tìm gì?"
                                />
                            </div>
                        </div>
                        <div className={style.login}>
                            <Link href="#">Đăng ký</Link>
                            <Link href="#">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.banner}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    speed={1000}
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    // grabCursor={true}s
                    draggable={true}
                    navigation={{
                        prevEl: `.${style.prevButton}`,
                        nextEl: `.${style.nextButton}`,
                    }}
                    // onSwiper={(swiper) => {
                    //     setTimeout(() => {
                    //         swiper.navigation.init();
                    //         swiper.navigation.update();
                    //     });
                    // }}
                >
                    <div className={style.prevButton}>
                        <AiOutlineLeft />
                    </div>
                    <div className={style.nextButton}>
                        <AiOutlineRight />
                    </div>

                    <SwiperSlide>
                        <Image src={banerSrc1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={banerSrc2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={banerSrc3} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
export default Header;
