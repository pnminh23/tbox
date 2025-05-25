import Table from '@/components/common/Table';
import styles from './FilmManage.module.scss';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { categoryFilms, createFilm, deleteFilmById, editFilmById, useAllFilms, useFilm } from '@/services/films';
import Popup from '@/components/common/Popup/Popup';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import UploadFileImage from '@/components/common/UploadFileImage/UploadFileImage';
import Calendar from '@/components/common/Calender';
import Selection from '@/components/common/Selection';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Pagination from '@/components/common/Pagonation';

const FilmManage = () => {
    const { films, isLoadingFilms, isErrorFilms, mutateFilms } = useAllFilms();
    const [currentPage, setCurrentPage] = useState(1); // bắt đầu từ 1
    const [limit, setLimit] = useState(5); // mặc định 8 phim/trang
    const totalItems = films?.length || 0;
    const totalPages = Math.ceil(totalItems / limit);

    // Lấy danh sách phim hiện tại để hiển thị
    const paginatedFilms = films?.slice((currentPage - 1) * limit, currentPage * limit) || [];
    const [selectedFilmId, setSelectedFilmId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const { film: selectedFilm, mutateFilm } = useFilm(selectedFilmId);
    const [editFile, setEditFile] = useState(null);
    const [isPopupEdit, setIsPopupEdit] = useState(false);
    const [isPopupCreate, setIsPopupCreate] = useState(false);
    const [isPopupDelete, setIsPopupDelete] = useState(false);
    const tableData =
        paginatedFilms?.map((film, index) => ({
            _id: film._id, // để làm key cho row
            index: index + 1,
            name: film.name,
            duration: film.duration,
            country: film.country,
            image: film.image,
            release_date: film.release_date,
            createdAt: film.createdAt,
        })) || [];

    useEffect(() => {
        if (selectedFilm) {
            setEditFilm({
                name: selectedFilm.name || '',
                nameEnglish: selectedFilm.nameEnglish || '',
                category: selectedFilm.category || [],
                duration: selectedFilm.duration || '',
                image: selectedFilm.image || '',
                country: selectedFilm.country || '',
                createdAt: selectedFilm.createdAt || '',
                release_date: selectedFilm.release_date || '',
            });
        }
    }, [selectedFilm]);

    const [editFilm, setEditFilm] = useState({
        name: '',
        nameEnglish: '',
        category: [],
        duration: '',
        image: '',
        country: '',
        createdAt: '',
    });

    const handleGetFilm = async (_id) => {
        setSelectedFilmId(_id);
        setIsPopupEdit(true);
    };

    const handelDeleteFilm = async () => {
        try {
            const response = await deleteFilmById(selectedFilmId);
            if (response.success) {
                toast.success('Xóa phim thành công!');
                setIsPopupDelete(false);
                setEditFilm({
                    name: '',
                    nameEnglish: '',
                    category: [],
                    duration: '',
                    image: '',
                    country: '',
                    createdAt: '',
                });
                mutateFilms(); // reload data
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('Đã xảy ra lỗi khi xóa!');
        }
    };

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            // KHÔNG cần append email vào formData nữa (vì truyền qua params)
            // formData.append('email', editAccount.email); ❌ bỏ dòng này
            console.log('nameEnglish:', editFilm.nameEnglish);
            if (editFilm.name) formData.append('name', editFilm.name);
            if (editFilm.nameEnglish) formData.append('nameEnglish', editFilm.nameEnglish);
            if (editFilm.duration) formData.append('duration', editFilm.duration);
            if (editFilm.release_date) formData.append('release_date', editFilm.release_date);
            if (editFilm.country) formData.append('country', editFilm.country);
            if (selectedCategory && Array.isArray(selectedCategory)) {
                selectedCategory.forEach((category) => {
                    formData.append('category', category);
                    console.log('category:', category); // hoặc chỉ 'categories' nếu backend không yêu cầu dấu []
                });
            }

            if (editFile) formData.append('image', editFile); // nếu có file mới
            console.log('formData:', formData);
            const response = await createFilm(formData);

            if (response.success) {
                toast.success('Thêm phim mới thành công!');
                setIsPopupCreate(false); // đóng popup
                setSelectedCategory([]);
                setEditFilm({
                    name: '',
                    nameEnglish: '',
                    category: [],
                    duration: '',
                    image: '',
                    country: '',
                    createdAt: '',
                });
                mutateFilms(); // reload data
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('Đã xảy ra lỗi khi thêm mới!');
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            // KHÔNG cần append email vào formData nữa (vì truyền qua params)
            // formData.append('email', editAccount.email); ❌ bỏ dòng này

            if (editFilm.name) formData.append('name', editFilm.name);
            if (editFilm.nameEnglish) formData.append('nameEnglish', editFilm.nameEnglish);
            if (editFilm.duration) formData.append('duration', editFilm.duration);
            if (editFilm.release_date) formData.append('release_date', editFilm.release_date);
            if (editFilm.country) formData.append('country', editFilm.country);
            if (selectedCategory && Array.isArray(selectedCategory)) {
                selectedCategory.forEach((category) => {
                    formData.append('category', category);
                    console.log('category:', category); // hoặc chỉ 'categories' nếu backend không yêu cầu dấu []
                });
            }

            if (editFile) formData.append('image', editFile); // nếu có file mới

            // gọi API: TRUYỀN EMAIL qua param + formData
            const response = await editFilmById(selectedFilmId, formData);

            if (response.success) {
                toast.success('Cập nhật phim thành công!');
                setIsPopupEdit(false); // đóng popup
                setSelectedCategory([]);
                setEditFilm({
                    name: '',
                    nameEnglish: '',
                    category: [],
                    duration: '',
                    image: '',
                    country: '',
                    createdAt: '',
                });
                mutateFilms(); // reload data
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('Đã xảy ra lỗi khi cập nhật!');
        }
    };

    return (
        <div className={styles.container}>
            {isPopupEdit && (
                <Popup
                    handleClose={() => {
                        setIsPopupEdit(false);

                        setEditFile(null);
                        setSelectedFilmId(null);
                    }}
                >
                    <div className={styles.formPopup}>
                        <p className={styles.title}>Chi tiết phim</p>
                        <div className={styles.groupItem}>
                            <label>Ảnh:</label>
                            <UploadFileImage
                                filmImage
                                defaultImage={editFilm.image}
                                onFileSelected={(file) => {
                                    setEditFile(file);
                                    // Xử lý thêm nếu cần
                                }}
                            />
                        </div>
                        <div className={styles.groupItem}>
                            <label>Tên phim</label>
                            <Input
                                rounded_10
                                outLine
                                value={editFilm.name}
                                onChange={(e) => setEditFilm((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className={styles.groupItem}>
                            <label>Tên tiếng anh:</label>
                            <Input
                                rounded_10
                                outLine
                                value={editFilm.nameEnglish}
                                onChange={(e) => setEditFilm((prev) => ({ ...prev, nameEnglish: e.target.value }))}
                            />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.groupItem}>
                                <label>Thời lượng:</label>
                                <Input
                                    rounded_10
                                    outLine
                                    value={editFilm.duration}
                                    onChange={(e) => setEditFilm((prev) => ({ ...prev, duration: e.target.value }))}
                                />
                            </div>
                            <div className={styles.groupItem}>
                                <label>Năm phát hành:</label>
                                <Input
                                    rounded_10
                                    outLine
                                    value={editFilm.release_date}
                                    onChange={(e) => setEditFilm((prev) => ({ ...prev, release_date: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className={clsx(styles.groupItem)}>
                            <label>Thể loại:</label>
                            <Selection
                                options={categoryFilms}
                                defaultValue={editFilm.category}
                                rounded_10
                                multiple
                                onChange={(selected) => {
                                    setSelectedCategory(selected);
                                    console.log('selected:', selected);
                                }}
                            ></Selection>
                        </div>
                        <div className={styles.row}>
                            <div className={clsx(styles.groupItem, styles.date)}>
                                <label>Ngày tạo:</label>
                                <Calendar selectedDate={new Date(editFilm.createdAt)} disabled={true} rounded_10 />
                            </div>
                            <div className={clsx(styles.groupItem, styles.country)}>
                                <label>Quốc gia:</label>
                                <Input
                                    rounded_10
                                    outLine
                                    value={editFilm.country}
                                    onChange={(e) => setEditFilm((prev) => ({ ...prev, country: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className={styles.row}></div>
                        <Button rounded_10 blue w_fit className={styles.btnAdd} onClick={handleEdit}>
                            Cập nhật
                        </Button>
                    </div>
                </Popup>
            )}
            {isPopupCreate && (
                <Popup handleClose={() => setIsPopupCreate(false)}>
                    <div className={styles.formPopup}>
                        <p className={styles.title}>Thêm phim mới</p>
                        <div className={styles.groupItem}>
                            <label>Ảnh:</label>
                            <UploadFileImage
                                filmImage
                                defaultImage={''}
                                onFileSelected={(file) => {
                                    setEditFile(file);
                                    // Xử lý thêm nếu cần
                                }}
                            />
                        </div>
                        <div className={styles.groupItem}>
                            <label>Tên phim</label>
                            <Input
                                rounded_10
                                outLine
                                onChange={(e) => setEditFilm((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className={styles.groupItem}>
                            <label>Tên tiếng anh:</label>
                            <Input
                                rounded_10
                                outLine
                                onChange={(e) => setEditFilm((prev) => ({ ...prev, nameEnglish: e.target.value }))}
                            />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.groupItem}>
                                <label>Thời lượng:</label>
                                <Input
                                    rounded_10
                                    outLine
                                    onChange={(e) => setEditFilm((prev) => ({ ...prev, duration: e.target.value }))}
                                />
                            </div>
                            <div className={styles.groupItem}>
                                <label>Năm phát hành:</label>
                                <Input
                                    rounded_10
                                    outLine
                                    onChange={(e) => setEditFilm((prev) => ({ ...prev, release_date: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            {/* <div className={clsx(styles.groupItem, styles.date)}>
                                <label>Ngày tạo:</label>
                                <Calendar selectedDate={new Date(editFilm.createdAt)} disabled={true} rounded_10 />
                            </div> */}
                            <div className={clsx(styles.groupItem, styles.category)}>
                                <label>Thể loại:</label>
                                <Selection
                                    options={categoryFilms}
                                    rounded_10
                                    multiple
                                    onChange={(selected) => {
                                        setSelectedCategory(selected);
                                        console.log('selected:', selected);
                                    }}
                                ></Selection>
                            </div>
                        </div>
                        <div className={styles.groupItem}>
                            <label>Quốc gia:</label>
                            <Input
                                rounded_10
                                outLine
                                onChange={(e) => setEditFilm((prev) => ({ ...prev, country: e.target.value }))}
                            />
                        </div>
                        <Button rounded_10 blue w_fit className={styles.btnAdd} onClick={handleCreate}>
                            Thêm mới
                        </Button>
                    </div>
                </Popup>
            )}
            {isPopupDelete && (
                <Popup
                    handleClose={() => {
                        setIsPopupDelete(false);
                    }}
                >
                    <div className={styles.formPopup}>
                        <p className={styles.title}>Xác nhận xóa</p>
                        <div className={styles.row}>
                            <Image src={selectedFilm?.image} width={50} height={70} alt={selectedFilm?.nameEnglish} />
                            <div className={styles.groupItem}>
                                <label>{selectedFilm?.name}</label>
                                <p>{selectedFilm?.nameEnglish}</p>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <Button rounded_10 outline light onClick={() => setIsPopupDelete(false)}>
                                Hủy
                            </Button>
                            <Button rounded_10 red onClick={handelDeleteFilm}>
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </Popup>
            )}
            <div className={styles.header}>
                <div className={styles.search}>
                    <Input rounded_10 grey placeholder="Nhập từ khóa" />
                    <Button w_fit rounded_10 yellowLinear icon={<AiOutlineSearch />}>
                        Tìm kiếm
                    </Button>
                </div>
                <Button
                    w_fit
                    rounded_10
                    blue
                    icon={<AiOutlinePlus />}
                    onClick={() => {
                        setIsPopupCreate(true);
                    }}
                >
                    Thêm phim mới
                </Button>
            </div>
            <div className={styles.content}>
                {isLoadingFilms ? (
                    <p>Đang tải dữ liệu...</p>
                ) : isErrorFilms ? (
                    <p>Đã xảy ra lỗi khi tải dữ liệu!</p>
                ) : (
                    <>
                        <Table
                            data={tableData}
                            columns={[
                                { key: 'index', label: 'STT' },
                                { key: 'name', label: 'Tên phim' },
                                { key: 'image', label: 'Ảnh' },
                                { key: 'duration', label: 'Thời lượng' },
                                { key: 'release_date', label: 'Năm phát hành' },
                                { key: 'country', label: 'Quốc gia' },
                                { key: 'createdAt', label: 'Ngày đăng' },
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
                                                onClick={() => handleGetFilm(item._id)}
                                            ></Button>
                                        </div>
                                    </Tippy>

                                    <Tippy content="Xóa" placement="bottom">
                                        <div>
                                            <Button
                                                w_fit
                                                rounded_10
                                                p_10_14
                                                redIcon
                                                icon={<AiOutlineDelete />}
                                                onClick={() => {
                                                    setIsPopupDelete(true);
                                                    setSelectedFilmId(item._id);
                                                }}
                                            ></Button>
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
                            onPageChange={(page) => setCurrentPage(page)}
                            onLimitChange={(newLimit) => {
                                setLimit(newLimit);
                                setCurrentPage(1); // reset về trang đầu
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default FilmManage;
