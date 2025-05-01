import style from './HeaderAdmin.module.scss';
import clsx from 'clsx';
import { AiOutlineMenu } from 'react-icons/ai';
import avatar from '@public/static/img/avatar/panda.png';
import Image from 'next/image';
import Button from '../Button';

const HeaderAdmin = ({ dark, title = 'HeaderAdmin', onToggleSidebar }) => {
    return (
        <div className={clsx(style.container, dark && style.dark)}>
            <div className={style.title}>
                <AiOutlineMenu onClick={onToggleSidebar} />
                <p>{title}</p>
            </div>
            <div className={style.account}>
                <Button rounded_10 w_fit red href="/">
                    Trang chủ
                </Button>
                <p className={style.username}>User name</p>
                <Image src={avatar} alt="avatar" className={style.avatar} />
            </div>
        </div>
    );
};

export default HeaderAdmin;
