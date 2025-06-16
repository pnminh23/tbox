import { useEffect, useMemo, useState } from 'react';
import styles from './AccountManage.module.scss';
import { toast } from 'react-toastify';
import clsx from 'clsx';

// Services & Hooks
import {
    useAllAccounts,
    useAccountByEmail,
    toggleLock,
    editAccountByEmail,
    deleteAccountByEmail,
} from '@/services/account';

// Components
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagonation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Popup from '@/components/common/Popup/Popup';
import Tippy from '@tippyjs/react';
import Selection from '@/components/common/Selection';
import Calendar from '@/components/common/Calender';
import UploadFileImage from '@/components/common/UploadFileImage/UploadFileImage';
import {
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineInteraction,
    AiOutlineLock,
    AiOutlineSearch,
    AiOutlineUnlock,
} from 'react-icons/ai';
import LoadingFullPage from '@/components/common/LoadingFullPage/loadingFullPage';

const AccountManage = () => {
    // === State Management ===
    const [searchInput, setSearchInput] = useState('');
    const [activeSearchQuery, setActiveSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [selectedEmail, setSelectedEmail] = useState(null); // Dùng để fetch data cho popup
    const [isProcessing, setIsProcessing] = useState(false);

    // State cho các popup
    const [isPopupEdit, setIsPopupEdit] = useState(false);
    const [isPopupDelete, setIsPopupDelete] = useState(false);

    // State cho form chỉnh sửa
    const initialEditState = { name: '', phone: '', email: '', role: '', image: '', isLock: false, createdAt: '' };
    const [editAccount, setEditAccount] = useState(initialEditState);
    const [editFile, setEditFile] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    // === Data Fetching ===
    const { accounts, isLoading, isError, mutateAccounts } = useAllAccounts();
    const { account: selectedAccount } = useAccountByEmail(selectedEmail);

    // === Derived Data & Filtering ===
    const filteredAccounts = useMemo(() => {
        if (!accounts) return [];
        if (!activeSearchQuery) {
            return accounts;
        }
        const query = activeSearchQuery.toLowerCase();
        return accounts.filter(
            (acc) =>
                acc.name?.toLowerCase().includes(query) ||
                acc.phone?.toLowerCase().includes(query) ||
                acc.email?.toLowerCase().includes(query)
        );
    }, [accounts, activeSearchQuery]);

    const totalItems = filteredAccounts.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const paginatedAccounts = useMemo(() => {
        return filteredAccounts.slice((currentPage - 1) * limit, currentPage * limit);
    }, [filteredAccounts, currentPage, limit]);

    const tableData = paginatedAccounts.map((acc, index) => ({
        id: acc._id,
        index: (currentPage - 1) * limit + index + 1,
        name: acc.name,
        phone: acc.phone,
        email: acc.email,
        role: acc.role,
        status: acc.isLock ? 'Đã khóa' : 'Hoạt động',
    }));

    // === Event Handlers & Effects ===
    useEffect(() => {
        if (selectedAccount) {
            setEditAccount({
                name: selectedAccount.name || '',
                phone: selectedAccount.phone || '',
                email: selectedAccount.email || '',
                image: selectedAccount.image || '',
                role: selectedAccount.role || '',
                isLock: selectedAccount.isLock || false,
                createdAt: selectedAccount.createdAt || '',
            });
        }
    }, [selectedAccount]);

    const handlePerformSearch = () => {
        setActiveSearchQuery(searchInput);
        setCurrentPage(1);
    };

    const handleGetAccount = (email) => {
        setSelectedEmail(email);
        setIsPopupEdit(true);
    };

    const handleOpenDeletePopup = (email) => {
        setSelectedEmail(email);
        setIsPopupDelete(true);
    };

    const handleToggleLock = async (email) => {
        const response = await toggleLock(email);
        if (response.success) {
            toast.success(response.message);
            mutateAccounts();
        } else {
            toast.error(response.message);
        }
    };

    const handleChangeRole = async (email, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const formData = new FormData();
        formData.append('role', newRole);
        const response = await editAccountByEmail(email, formData);
        if (response.success) {
            toast.success(`Đã đổi quyền của ${email} thành ${newRole}`);
            mutateAccounts();
        } else {
            toast.error(response.message);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('name', editAccount.name);
            formData.append('phone', editAccount.phone);
            formData.append('role', editAccount.role);
            formData.append('isLock', editAccount.isLock);
            if (newPassword) formData.append('password', newPassword);
            if (editFile) formData.append('image', editFile);

            const response = await editAccountByEmail(editAccount.email, formData);

            if (response.success) {
                toast.success('Cập nhật tài khoản thành công!');
                mutateAccounts();
                setIsPopupEdit(false);
                setNewPassword('');
                setEditFile(null);
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error('Đã xảy ra lỗi khi cập nhật!');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedEmail) return;
        setIsProcessing(true);
        try {
            const response = await deleteAccountByEmail(selectedEmail);
            if (response.success) {
                toast.success(`Đã xóa tài khoản ${selectedEmail}`);
                mutateAccounts();
                setIsPopupDelete(false);
                setSelectedEmail(null);
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error('Đã xảy ra lỗi khi xóa tài khoản!');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) return <LoadingFullPage />;
    if (isError) return <div>Lỗi khi tải dữ liệu tài khoản.</div>;

    return (
        <div className={styles.container}>
            {isProcessing && <LoadingFullPage />}

            {/* Popup Chỉnh sửa */}
            {isPopupEdit && (
                <Popup big handleClose={() => setIsPopupEdit(false)}>
                    {/* ... Form Edit tương tự như lần trước ... */}
                </Popup>
            )}

            {/* Popup Xác nhận Xóa */}
            {isPopupDelete && (
                <Popup handleClose={() => setIsPopupDelete(false)}>
                    <div className={styles.formPopup}>
                        <p className={styles.title}>Xác nhận xóa</p>
                        <p>
                            Bạn có chắc muốn xóa tài khoản <strong>{selectedEmail}</strong>? Hành động này không thể
                            hoàn tác.
                        </p>
                        <div className={styles.row}>
                            <Button outline onClick={() => setIsPopupDelete(false)}>
                                Hủy
                            </Button>
                            <Button red onClick={handleDelete}>
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </Popup>
            )}

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.search}>
                    <Input
                        rounded_10
                        outLine
                        placeholder="Tìm kiếm theo tên, SĐT, email..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handlePerformSearch()}
                    />
                    <Button w_fit rounded_10 blue icon={<AiOutlineSearch />} onClick={handlePerformSearch}>
                        Tìm kiếm
                    </Button>
                </div>
            </div>

            {/* Bảng dữ liệu */}
            <div className={styles.content}>
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
                                        blueIcon
                                        icon={<AiOutlineEdit />}
                                        onClick={() => handleGetAccount(item.email)}
                                    />
                                </div>
                            </Tippy>
                            <Tippy content={item.status === 'Đã khóa' ? 'Mở khóa' : 'Khóa'} placement="bottom">
                                <div>
                                    <Button
                                        redIcon
                                        icon={item.status === 'Đã khóa' ? <AiOutlineUnlock /> : <AiOutlineLock />}
                                        onClick={() => handleToggleLock(item.email)}
                                    />
                                </div>
                            </Tippy>
                            <Tippy content="Thay đổi quyền" placement="bottom">
                                <div>
                                    <Button
                                        greenIcon
                                        icon={<AiOutlineInteraction />}
                                        onClick={() => handleChangeRole(item.email, item.role)}
                                    />
                                </div>
                            </Tippy>
                        </>
                    )}
                />
                <Pagination
                    className={styles.pagination}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    limit={limit}
                    onPageChange={setCurrentPage}
                    onLimitChange={(newLimit) => {
                        setLimit(newLimit);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </div>
    );
};

export default AccountManage;
