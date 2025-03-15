import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import logoSrc from "../../../../public/static/img/logoBOX.svg";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import style from "./Header.module.scss";
import "swiper/css";
import "swiper/css/navigation";

const Header = () => {
    const router = useRouter();
    const [activePath, setActivePath] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State để điều khiển menu

    useEffect(() => {
        setActivePath(router.pathname);
    }, [router.pathname]);

    // Hàm toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.container}>
                    <div className={style.headerLeft}>
                        {/* Icon menu chỉ hiện khi màn hình nhỏ */}
                        <div className={style.menuicon} onClick={toggleMenu}>
                            <AiOutlineMenu />
                        </div>

                        <Image
                            src={logoSrc}
                            className={style.logo}
                            alt="logo"
                            priority={true}
                        />

                        {/* Menu sẽ có class active nếu isMenuOpen = true */}
                        <ul
                            className={`${style.menu} ${
                                isMenuOpen ? style.active : ""
                            }`}
                        >
                            <li
                                className={
                                    activePath === "/" ? style.active : ""
                                }
                            >
                                <Link href="/">Trang chủ</Link>
                            </li>
                            <li
                                className={
                                    activePath === "/listFilm"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/listFilm">Danh sách phim</Link>
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
                        <div className={style.login}>
                            <Link href="/auth/register">Đăng ký</Link>
                            <Link href="/auth/login">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
