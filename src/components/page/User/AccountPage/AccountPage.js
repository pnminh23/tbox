import Button from '@/components/common/Button';
import style from './AccountPage.module.scss';
import { AiOutlineEye, AiOutlineUpload } from 'react-icons/ai';
import { useRef, useState } from 'react';
import Input from '@/components/common/Input';
import Calendar from '@/components/common/Calender';
import clsx from 'clsx';

const AccountPage = () => {
    const [changePassword, setChangePassword] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const fileName = event.target.files[0]?.name || '';
        console.log('Tệp đã chọn:', fileName);
    };
    return (
        <form className={style.container}>
            <div className={style.groupItem}>
                <p className={style.label}>Thông tin tài khoản</p>
                <div className={style.row}>
                    <div className={style.avatar}></div>
                    <div className={style.uploadImage}>
                        <p>Hình ảnh tải lên đạt kích thước tối thiểu 300 x 300 pixel</p>
                        <p className={style.subText}>Định dạng hỗ trợL JPG, JPEG, PNG</p>
                        <input type="file" className={style.fileInput} ref={fileInputRef} onChange={handleFileChange} />
                        <Button light w_fit rounded_10 icon={<AiOutlineUpload />} onClick={handleFileInputClick}>
                            Chọn ảnh
                        </Button>
                    </div>
                </div>
                <div className={style.groupItem}>
                    <p className={style.label}>Họ và tên</p>
                    <Input rounded_10 />
                </div>
                <div className={style.row}>
                    <div className={style.groupItem}>
                        <p className={style.label}>Email</p>
                        <Input rounded_10 />
                    </div>
                    <div className={style.groupItem}>
                        <p className={style.label}>Số điện thoại</p>
                        <Input rounded_10 />
                    </div>
                    <div className={style.groupItem}>
                        <p className={style.label}>Ngày sinh</p>
                        <Calendar rounded_10 />
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.groupItem}>
                        <p className={style.label}>Mật khẩu</p>
                        <Input type="password" value={'hello'} disabled rounded_10 password />
                    </div>

                    <div className={clsx(style.groupItem, style.hide, changePassword && style.unhide)}>
                        <p className={style.label}>Nhập mật khẩu mới</p>
                        <Input type="password" rounded_10 password />
                    </div>
                    <div className={clsx(style.groupItem, style.hide, changePassword && style.unhide)}>
                        <p className={style.label}>Nhập lại mật khẩu mới</p>
                        <Input type="password" rounded_10 password />
                    </div>
                </div>
                <p className={style.changePassword} onClick={() => setChangePassword((prev) => !prev)}>
                    Thay đổi mật khẩu
                </p>
                <div className={style.groupItem}>
                    <Button yellowLinear rounded_10 w_fit>
                        Cập nhật thông tin cá nhân
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default AccountPage;
