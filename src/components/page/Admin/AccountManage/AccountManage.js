import Input from '@/components/common/Input';
import styles from './AccountManage.module.scss';
import Button from '@/components/common/Button';
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai';
import Table from '@/components/common/Table';

const AccountManage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.search}>
                    <Input rounded_10 grey placeholder="Tìm kiếm theo tên hoặc số điện thoại" />
                    <Button w_fit rounded_10 yellowLinear icon={<AiOutlineSearch />}>
                        Tìm kiếm
                    </Button>
                </div>
                <Button w_fit rounded_10 blue icon={<AiOutlineUserAdd />}>
                    Thêm người dùng
                </Button>
            </div>
            <div className={styles.content}>
                <Table
                    data={[]}
                    columns={[
                        { key: 'index', label: 'STT' },
                        { key: 'name', label: 'Họ và tên' },
                        { key: 'phone', label: 'Số điện thoại' },
                        { key: 'email', label: 'Email' },
                        { key: 'role', label: 'Quyền' },
                        { key: 'status', label: 'Trạng thái' },
                    ]}
                />
            </div>
        </div>
    );
};

export default AccountManage;
