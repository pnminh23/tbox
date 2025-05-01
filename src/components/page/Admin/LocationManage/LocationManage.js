import Selection from '@/components/common/Selection';
import styles from './LocationManage.module.scss';
import Button from '@/components/common/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import Table from '@/components/common/Table';

const LocationManage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button rounded_10 w_fit blue icon={<AiOutlinePlus />} className={styles.btnAdd}>
                    Thêm mới cơ sở
                </Button>
            </div>
            <div className={styles.content}>
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

export default LocationManage;
