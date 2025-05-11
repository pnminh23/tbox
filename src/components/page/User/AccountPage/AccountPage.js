import Button from '@/components/common/Button';
import style from './AccountPage.module.scss';
import { AiOutlineEye, AiOutlineUpload } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import Input from '@/components/common/Input';
import Calendar from '@/components/common/Calender';
import clsx from 'clsx';
import UploadFileImage from '@/components/common/UploadFileImage/UploadFileImage';
import { toast } from 'react-toastify';
import { editAccountByEmail, getAccountByEmail } from '@/services/account';
import Link from 'next/link';
import { PATH } from '@/constants/config';

const AccountPage = () => {
    const [email, setEmail] = useState('');
    const [editFile, setEditFile] = useState(null);
    const [editAccount, setEditAccount] = useState({
        name: '',
        phone: '',
        email: '',
        image: '',
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');

        const fetchAccount = async () => {
            try {
                console.log('email:', storedEmail);

                const response = await getAccountByEmail(storedEmail);

                if (response.success) {
                    toast.success(response.message);
                    setEditAccount({
                        name: response.data.name || '',
                        phone: response.data.phone || '',
                        email: response.data.email || '',
                        image: response.data.image || '',
                    });
                } else {
                    toast.error(response.message);
                }
                console.log('defaultImage:', editAccount.image);
            } catch (err) {
                toast.error(err.message || 'Có lỗi xảy ra');
            }
        };

        fetchAccount();
    }, []);

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('email', editAccount.email); // bắt buộc

            if (editAccount.name) formData.append('name', editAccount.name);
            if (editAccount.phone) formData.append('phone', editAccount.phone);

            if (editFile) formData.append('image', editFile); // nếu có file mới

            const response = await editAccountByEmail(formData);

            if (response.success) {
                toast.success('Cập nhật tài khoản thành công!');
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('Đã xảy ra lỗi khi cập nhật!');
        }
    };

    return (
        <form className={style.container}>
            <div className={style.groupItem}>
                <p className={style.label}>Thông tin tài khoản</p>
                <UploadFileImage
                    avatar
                    defaultImage={editAccount.image}
                    onFileSelected={(file) => {
                        setEditFile(file);
                        // Xử lý thêm nếu cần
                    }}
                />
                <div className={style.groupItem}>
                    <p className={style.label}>Họ và tên</p>
                    <Input
                        rounded_10
                        value={editAccount.name}
                        onChange={(e) => setEditAccount((prev) => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className={style.row}>
                    <div className={style.groupItem}>
                        <p className={style.label}>Email</p>
                        <Input rounded_10 disabled value={editAccount.email} />
                    </div>
                    <div className={style.groupItem}>
                        <p className={style.label}>Số điện thoại</p>
                        <Input
                            rounded_10
                            value={editAccount.phone}
                            onChange={(e) => setEditAccount((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                    </div>
                </div>

                <Link href={PATH.ForgotPassword} className={style.changePassword}>
                    Thay đổi mật khẩu
                </Link>
                <div className={style.groupItem}>
                    <Button yellowLinear type={'button'} rounded_10 w_fit onClick={handleEdit}>
                        Cập nhật thông tin cá nhân
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default AccountPage;
