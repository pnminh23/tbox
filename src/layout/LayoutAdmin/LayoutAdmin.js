import HeaderAdmin from '@/components/common/HeaderAdmin';
import style from './LayoutAdmin.module.scss';
import MenuTab from '@/components/common/MenuTab';
import { useState } from 'react';
import clsx from 'clsx';

const LayoutAdmin = ({ children, dark, title }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className={style.container}>
            <div className={clsx(style.header, collapsed && style.collapsed)}>
                <HeaderAdmin dark={dark} title={title} onToggleSidebar={toggleSidebar} />
            </div>

            <div className={style.menutab}>
                <MenuTab dark={dark} collapsed={collapsed} />
            </div>

            <main className={clsx(style.main, collapsed && style.collapsed)}>{children}</main>
        </div>
    );
};

export default LayoutAdmin;
