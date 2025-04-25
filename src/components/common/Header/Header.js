import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { getdata } from '@/services/user';
import { logout } from '@/services/auth';
import { AiOutlineLogout, AiOutlineIdcard } from 'react-icons/ai';
import logoSrc from '../../../../public/static/img/logoBOX.svg';
import avatar from '@public/static/img/avatar/panda.png';
import { AiOutlineMenu } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import style from './Header.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { PATH } from '@/constants/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const router = useRouter();
    const [activePath, setActivePath] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuAccount, setIsMenuAccount] = useState(false);
    const [user, setUser] = useState(null);
    const menuAccountRef = useRef(null);

    useEffect(() => {
        setActivePath(router.pathname);
    }, [router.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    useEffect(() => {
        // Gọi API để lấy thông tin user nếu đã đăng nhập
        const fetchUser = async () => {
            try {
                const userData = await getdata();
                setUser(userData.data);
            } catch (error) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuAccountRef.current && !menuAccountRef.current.contains(event.target)) {
                setIsMenuAccount(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);

            setTimeout(() => {
                router.push(PATH.Home);
            }, 2000);
        } catch (error) {
            toast.error('Lỗi khi đăng xuất!', { autoClose: 2000 });
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleMenuAccount = () => setIsMenuAccount(!isMenuAccount);
    const closeMenu = () => setIsMenuOpen(false);

    const menuItemPath = [
        { path: PATH.Home, label: 'Trang chủ' },
        { path: PATH.ListFilm, label: 'Danh sách phim' },
        { path: PATH.BookRoom, label: 'Đặt phòng' },
        { path: PATH.Discount, label: 'Khuyến mãi' },
        { path: PATH.Combo, label: 'Combo' },
        { path: PATH.Locations, label: 'Hệ thống PNM - BOX' },
    ];

    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.container}>
                    <div className={style.headerLeft}>
                        <div className={style.menuicon} onClick={toggleMenu}>
                            <AiOutlineMenu />
                        </div>

                        <Image src={logoSrc} className={style.logo} alt="logo" priority />

                        <ul className={`${style.menu} ${isMenuOpen ? style.active : ''}`}>
                            {menuItemPath.map(({ path, label }) => (
                                <li key={path} className={activePath === path ? style.active : ''}>
                                    <Link href={path} onClick={closeMenu}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={style.headerRight}>
                        {user ? (
                            <div className={style.userSection}>
                                <p>Xin chào</p>
                                <p className={style.userName}>{user.name}</p>
                                <div className={style.avatarContainer} ref={menuAccountRef}>
                                    <Image
                                        src={avatar}
                                        alt="avatar"
                                        width={30}
                                        height={30}
                                        onClick={toggleMenuAccount}
                                    />
                                    {isMenuAccount && (
                                        <div className={style.dropdownMenu}>
                                            <Link href={PATH.Profile} className={style.menuItem}>
                                                <AiOutlineIdcard />
                                                Quản lý tài khoản
                                            </Link>
                                            <div className={style.logoutButton} onClick={handleLogout}>
                                                <AiOutlineLogout />
                                                Đăng xuất
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={style.login}>
                                <Link href={PATH.Register}>Đăng ký</Link>
                                <Link href={PATH.Login}>Đăng nhập</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
