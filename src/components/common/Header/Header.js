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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setActivePath(router.pathname);
    }, [router.pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.container}>
                    <div className={style.headerLeft}>
                        <div className={style.menuicon} onClick={toggleMenu}>
                            <AiOutlineMenu />
                        </div>

                        <Image
                            src={logoSrc}
                            className={style.logo}
                            alt="logo"
                            priority={true}
                        />

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
                                <Link href="/" onClick={closeMenu}>
                                    Trang chủ
                                </Link>
                            </li>
                            <li
                                className={
                                    activePath === "/listFilm"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/listFilm" onClick={closeMenu}>
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
                                <Link href="/dat-phong" onClick={closeMenu}>
                                    Đặt phòng
                                </Link>
                            </li>
                            <li
                                className={
                                    activePath === "/khuyen-mai"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/khuyen-mai" onClick={closeMenu}>
                                    Khuyến mãi
                                </Link>
                            </li>
                            <li
                                className={
                                    activePath === "/combo" ? style.active : ""
                                }
                            >
                                <Link href="/combo" onClick={closeMenu}>
                                    Combo
                                </Link>
                            </li>
                            <li
                                className={
                                    activePath === "/co-so-tbox"
                                        ? style.active
                                        : ""
                                }
                            >
                                <Link href="/co-so-tbox" onClick={closeMenu}>
                                    Cơ sở TBOX
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={style.headerRight}>
                        <div className={style.login}>
                            <Link href="/auth/register" onClick={closeMenu}>
                                Đăng ký
                            </Link>
                            <Link href="/auth/login" onClick={closeMenu}>
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
