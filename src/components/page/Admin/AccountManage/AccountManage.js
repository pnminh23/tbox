import Input from '@/components/common/Input';
import styles from './AccountManage.module.scss';
import Button from '@/components/common/Button';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Đừng quên import CSS của Tippy
import {
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineInteraction,
    AiOutlineLock,
    AiOutlineSearch,
    AiOutlineUnlock,
    AiOutlineUserAdd,
} from 'react-icons/ai';
import Table from '@/components/common/Table';
import { editAccountByEmail, getAccountByEmail, toggleLock, useAllAccounts } from '@/services/account';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Popup from '@/components/common/Popup/Popup';
import clsx from 'clsx';
import Selection from '@/components/common/Selection';
import Calendar from '@/components/common/Calender';
import UploadFileImage from '@/components/common/UploadFileImage/UploadFileImage';

const AccountManage = () => {
    const { accounts, isLoading, isError, mutateAccounts } = useAllAccounts();
    const [editFile, setEditFile] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    const [editAccount, setEditAccount] = useState({
        name: '',
        phone: '',
        email: '',
        role: '',
        image: '',
        isLock: false,
        createdAt: '',
    });
    const [isPopupEdit, setIsPopupEdit] = useState(false);

    const handleToggleLock = async (email) => {
        try {
            const response = await toggleLock(email);

            if (response.success) {
                toast.success(response.message);
                mutateAccounts();
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error(err);
        } finally {
        }
    };

    const handleGetAccountByEmail = async (email) => {
        try {
            const response = await getAccountByEmail(email);

            if (response.success) {
                toast.success(response.message);
                setEditAccount({
                    name: response.data.name || '',
                    phone: response.data.phone || '',
                    email: response.data.email || '',
                    image: response.data.image || '',
                    role: response.data.role || '',
                    isLock: response.data.isLock || false,
                    createdAt: response.data.createdAt || '',
                });
                setIsPopupEdit(true);
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error(err);
        } finally {
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            if (editAccount.name) formData.append('name', editAccount.name);
            if (editAccount.phone) formData.append('phone', editAccount.phone);
            if (editAccount.role) formData.append('role', editAccount.role);
            formData.append('isLock', editAccount.isLock); // gửi boolean

            if (editFile) formData.append('image', editFile); // nếu có file mới

            if (newPassword) {
                formData.append('password', newPassword);
            }

            // gọi API: TRUYỀN EMAIL qua param + formData
            const response = await editAccountByEmail(editAccount.email, formData);

            if (response.success) {
                toast.success('Cập nhật tài khoản thành công!');
                setIsPopupEdit(false); // đóng popup
                mutateAccounts(); // reload data
                setNewPassword(''); // clear password sau khi cập nhật
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('Đã xảy ra lỗi khi cập nhật!');
        }
    };

    const handleChangeRole = async (email, currentRole) => {
        try {
            const newRole = currentRole === 'admin' ? 'user' : 'admin';
            const formData = new FormData();
            formData.append('role', newRole);

            const response = await editAccountByEmail(email, formData);
            if (response.success) {
                toast.success(`Đã đổi quyền sang ${newRole}`);
                mutateAccounts();
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error('Đã xảy ra lỗi khi đổi quyền!');
        }
    };

    const tableData =
        accounts?.map((acc, index) => ({
            id: acc._id, // để làm key cho row
            index: index + 1,
            name: acc.name,
            phone: acc.phone,
            email: acc.email,
            role: acc.role,
            status: acc.isLock ? 'Đã khóa' : 'Hoạt động',
        })) || [];
    return (
        <div className={styles.container}>
            {isPopupEdit && (
                <Popup handleClose={() => setIsPopupEdit(false)}>
                    <form className={styles.formEdit}>
                        <p className={styles.title}>Chỉnh sửa tài khoản</p>
                        <div className={styles.groupItem}>
                            <label>Ảnh đại diện</label>
                            <UploadFileImage
                                avatar
                                defaultImage={editAccount.image}
                                onFileSelected={(file) => {
                                    setEditFile(file);
                                    // Xử lý thêm nếu cần
                                }}
                            />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.groupItem}>
                                <label>Họ và tên:</label>
                                <Input
                                    rounded_10
                                    outLine
                                    value={editAccount.name}
                                    onChange={(e) => setEditAccount((prev) => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className={styles.groupItem}>
                                <label>Số điện thoại:</label>
                                <Input
                                    rounded_10
                                    outLine
                                    value={editAccount.phone}
                                    onChange={(e) => setEditAccount((prev) => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={clsx(styles.groupItem, styles.inputEmail)}>
                                <label>Email:</label>
                                <Input rounded_10 value={editAccount.email} disabled></Input>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={clsx(styles.groupItem, styles.role)}>
                                <label>Quyền:</label>
                                <Selection
                                    options={['user', 'admin']}
                                    defaultValue={editAccount.role}
                                    rounded_10
                                    onChange={(value) =>
                                        setEditAccount((prev) => ({
                                            ...prev,
                                            role: value,
                                        }))
                                    }
                                />
                            </div>
                            <div className={clsx(styles.groupItem, styles.status)}>
                                <label>Trạng thái:</label>
                                <Selection
                                    options={['Hoạt Động', 'Đã khóa']}
                                    defaultValue={editAccount.isLock ? 'Đã khóa' : 'Hoạt Động'}
                                    onChange={(value) =>
                                        setEditAccount((prev) => ({
                                            ...prev,
                                            isLock: value === 'Đã khóa',
                                        }))
                                    }
                                    rounded_10
                                />
                            </div>
                            <div className={clsx(styles.groupItem, styles.date)}>
                                <label>Ngày tạo:</label>
                                <Calendar selectedDate={new Date(editAccount.createdAt)} disabled={true} rounded_10 />
                            </div>
                        </div>
                        <div className={styles.groupItem}>
                            <label>Thay đổi mật khẩu mới:</label>
                            <Input
                                rounded_10
                                outLine
                                placeholder={'Nhập mật khẩu mới'}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className={clsx(styles.row, styles.buttons)}>
                            <Button rounded_10 w_fit blue onClick={handleEdit}>
                                Cập nhật tài khoản
                            </Button>
                            <Button rounded_10 w_fit red>
                                Xóa tài khoản
                            </Button>
                        </div>
                    </form>
                </Popup>
            )}
            <div className={styles.header}>
                <div className={styles.search}>
                    <Input rounded_10 outLine placeholder="Tìm kiếm theo tên hoặc số điện thoại" />
                    <Button w_fit rounded_10 yellowLinear icon={<AiOutlineSearch />}>
                        Tìm kiếm
                    </Button>
                </div>
                <Button w_fit rounded_10 blue icon={<AiOutlineUserAdd />}>
                    Thêm người dùng
                </Button>
            </div>
            <div className={styles.content}>
                {isLoading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : isError ? (
                    <p>Đã xảy ra lỗi khi tải dữ liệu!</p>
                ) : (
                    <Table
                        data={tableData}
                        columns={[
                            { key: 'index', label: 'STT' },
                            { key: 'name', label: 'Họ và tên' },
                            { key: 'phone', label: 'Số điện thoại' },
                            { key: 'email', label: 'Email' },
                            { key: 'role', label: 'Quyền' },
                            { key: 'status', label: 'Trạng thái' },
                        ]}
                        renderActions={(item) => (
                            <>
                                <Tippy content="Chỉnh sửa" placement="bottom">
                                    <div>
                                        <Button
                                            w_fit
                                            rounded_10
                                            p_10_14
                                            blueIcon
                                            icon={<AiOutlineEdit />}
                                            onClick={() => handleGetAccountByEmail(item.email)}
                                        ></Button>
                                    </div>
                                </Tippy>
                                <Tippy content={item.status === 'Đã khóa' ? 'Mở khóa' : 'Khóa'} placement="bottom">
                                    <div>
                                        <Button
                                            w_fit
                                            rounded_10
                                            p_10_14
                                            redIcon
                                            icon={item.status === 'Đã khóa' ? <AiOutlineUnlock /> : <AiOutlineLock />}
                                            onClick={() => handleToggleLock(item.email)}
                                        />
                                    </div>
                                </Tippy>
                                <Tippy content="Thay đổi quyền" placement="bottom">
                                    <div>
                                        <Button
                                            w_fit
                                            rounded_10
                                            p_10_14
                                            greenIcon
                                            icon={<AiOutlineInteraction />}
                                            onClick={() => handleChangeRole(item.email, item.role)}
                                        ></Button>
                                    </div>
                                </Tippy>
                            </>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default AccountManage;
