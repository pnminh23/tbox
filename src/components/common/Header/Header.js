import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import logoSrc from "../../../../public/static/img/logoBOX.svg";
import { AiOutlineSearch } from "react-icons/ai";
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
