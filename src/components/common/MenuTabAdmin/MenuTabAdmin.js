import Link from 'next/link';
import style from './MenuTab.module.scss';
import clsx from 'clsx';
import { AiOutlinePieChart, AiOutlineUser, AiOutlineReconciliation } from 'react-icons/ai';
import logo from '@public/favicon.ico';
import Image from 'next/image';
import { PATH } from '@/constants/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const MenuTab = ({ dark, collapsed }) => {
    const router = useRouter();
    const activePath = router.pathname; // Không cần useState/useEffect

    const menuItemPath = [
        { path: PATH.Overview, label: 'Tổng quan', icon: <AiOutlinePieChart /> },
        { path: PATH.Account, label: 'Tài khoản', icon: <AiOutlineUser /> },
        { path: PATH.InvoiceDetail, label: 'Lịch sử đặt phòng', icon: <AiOutlineReconciliation /> },
    ];

    return (
        <div className={clsx(style.container, dark && style.dark, collapsed && style.collapsed)}>
            <Image src={logo} width={50} height={50} />
            <ul className={style.menu}>
                {menuItemPath.map(({ path, label, icon }) => (
                    <li key={path} className={clsx(activePath === path && style.active)}>
                        <Link href={path}>
                            {icon}
                            <p className={clsx(collapsed && style.none)}>{label}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuTab;
