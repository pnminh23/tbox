import Button from '@/components/common/Button';
import styles from './DiscountManage.module.scss';
import Table from '@/components/common/Table';
import { AiOutlinePlus } from 'react-icons/ai';

const DiscountManage = () => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Mã khuyến mãi</p>
            <div className={styles.discount}>
                <Button rounded_10 w_fit blue icon={<AiOutlinePlus />} className={styles.btnAdd}>
                    Thêm mới cơ sở
                </Button>
            </div>
            <div className={styles.newsDiscount}>
                <Table
                    data={[]}
                    columns={[
                        { key: 'index', label: 'STT' },
                        { key: 'name', label: 'Tên cơ sở' },
                        { key: 'address', label: 'Địa chỉ' },
                        { key: 'roomNumber', label: 'Số phòng' },
                    ]}
                />
            </div>
        </div>
    );
};

export default DiscountManage;
