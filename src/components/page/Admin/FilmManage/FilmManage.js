import Table from '@/components/common/Table';
import styles from './FilmManage.module.scss';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

const FilmManage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.search}>
                    <Input rounded_10 grey placeholder="Nhập từ khóa" />
                    <Button w_fit rounded_10 yellowLinear icon={<AiOutlineSearch />}>
                        Tìm kiếm
                    </Button>
                </div>
                <Button w_fit rounded_10 blue icon={<AiOutlinePlus />}>
                    Thêm phim mới
                </Button>
            </div>
            <div className={styles.content}>
                <Table
                    data={[]}
                    columns={[
                        { key: 'index', label: 'STT' },
                        { key: 'name', label: 'Tên phim' },
                        { key: 'duration', label: 'Thời lượng' },
                        { key: 'year', label: 'Năm phát hành' },
                        { key: 'date', label: 'Ngày đăng' },
                    ]}
                />
            </div>
        </div>
    );
};

export default FilmManage;
