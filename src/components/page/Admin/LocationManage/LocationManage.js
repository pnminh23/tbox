import Selection from '@/components/common/Selection';
import styles from './LocationManage.module.scss';
import Button from '@/components/common/Button';
import { AiOutlineDelete, AiOutlineEye, AiOutlinePlus } from 'react-icons/ai';
import Table from '@/components/common/Table';
import { createBranch, deleteBranchById, useAllBranches, useBranch } from '@/services/branch';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import Pagination from '@/components/common/Pagonation';
import { useRoomByBranch, useRoomByBranchAndType, useTypeRoom } from '@/services/room';
import Popup from '@/components/common/Popup/Popup';
import Input from '@/components/common/Input';
import clsx from 'clsx';
import Tabs from '@/components/common/Tabs/Tabs';
import Image from 'next/image';
import RoomList from '@/components/page/Admin/RoomList/RoomList';
import { toast } from 'react-toastify';

const LocationManage = () => {
    const { branches, isLoadingAllBranches, isErrorAllBranches, mutateBranches } = useAllBranches();
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const { typeRooms } = useTypeRoom();

    const { branch: selectedBranch, isLoadingBranch, isErrorBranch, mutateBranch } = useBranch(selectedBranchId);

    const [currentPage, setCurrentPage] = useState(1); // bắt đầu từ 1
    const [limit, setLimit] = useState(5); // mặc định 8 phim/trang
    const totalItems = branches?.length || 0;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedBranches = branches?.slice((currentPage - 1) * limit, currentPage * limit) || [];
    const [isPopupEdit, setIsPopupEdit] = useState(false);
    const [isPopupCreate, setIsPopupCreate] = useState(false);
    const [isPopupDelete, setIsPopupDelete] = useState(false);
    const tableData =
        paginatedBranches?.map((branch, index) => ({
            _id: branch._id, // để làm key cho row
            index: index + 1,
            name: branch.name,
            address: branch.address,
            phone: branch.phone,
            typeRoom: branch.typeRoom,
            createdAt: branch.createdAt,
        })) || [];

    const [editBranch, setEditBranch] = useState({
        name: '',
        address: '',
        phone: '',
    });
    useEffect(() => {
        if (selectedBranch) {
            setEditBranch({
                name: selectedBranch.name || '',
                address: selectedBranch.address || '',
                typeRoom: selectedBranch.typeRoom || [],
                phone: selectedBranch.phone || '',
            });
        }
    }, [selectedBranch]);

    const handleGetBranch = async (_id) => {
        setSelectedBranchId(_id);
        setIsPopupEdit(true);
    };

    const handleCreateBranch = async () => {
        const newBranch = {
            name: editBranch.name,
            address: editBranch.address,
            phone: editBranch.phone,
        };

        const result = await createBranch(newBranch);

        if (result.success) {
            toast.success(result.message);
            setSelectedBranchId(result.data.data._id);
            console.log('newbranchID: ', result.data.data._id);
        } else {
            toast.error(result.message);
        }
    };

    const handleDeleteBranch = async () => {
        const result = await deleteBranchById(selectedBranchId);

        if (result.success) {
            toast.success(result.message);
            setSelectedBranchId(null);
            setIsPopupDelete(false);
            mutateBranches();
        } else {
            toast.error(result.message);
        }
    };

    const renderRoomFormContent = (isEdit = false) => (
        <div className={styles.formPopup}>
            <p className={styles.title}>{isEdit ? 'Chi tiết cơ sở' : 'Thêm cơ sở mới'}</p>

            <div className={styles.row}>
                <div className={styles.groupItem}>
                    <label>Tên cơ sở</label>
                    <Input
                        rounded_10
                        outLine
                        value={editBranch.name}
                        onChange={(e) => setEditBranch((prev) => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className={styles.groupItem}>
                    <label>Số điện thoại của cơ sở:</label>
                    <Input
                        rounded_10
                        outLine
                        value={editBranch.phone}
                        onChange={(e) => setEditBranch((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                </div>
            </div>
            <div className={styles.groupItem}>
                <label>Địa chỉ:</label>
                <Input
                    rounded_10
                    outLine
                    value={editBranch.address}
                    onChange={(e) => setEditBranch((prev) => ({ ...prev, address: e.target.value }))}
                />
            </div>
            {selectedBranchId && (
                <div className={styles.groupItem}>
                    <label>{isEdit ? 'Loại phòng' : 'Thêm phòng cho cơ sở'}</label>
                    <Tabs
                        tabs={typeRooms?.map((item) => ({
                            label: item.name,
                            content: <RoomList branchId={selectedBranchId} typeRoomId={item._id} />,
                        }))}
                    />
                </div>
            )}

            <div className={styles.row}></div>
            {selectedBranchId ? (
                <Button rounded_10 blue w_fit className={styles.btnAdd}>
                    {isEdit ? 'Cập nhật' : 'Thêm mới'}
                </Button>
            ) : (
                <Button rounded_10 blue w_fit className={styles.btnAdd} onClick={handleCreateBranch}>
                    Tiếp tục
                </Button>
            )}
        </div>
    );
    return (
        <div className={styles.container}>
            {isPopupEdit && (
                <Popup
                    key={selectedBranchId || 'create'}
                    handleClose={() => {
                        setIsPopupEdit(false);
                        setEditBranch({
                            name: '',
                            address: '',
                            phone: '',
                        });
                        setSelectedBranchId(null);
                    }}
                >
                    {renderRoomFormContent(true)}
                </Popup>
            )}
            {isPopupCreate && (
                <Popup
                    handleClose={() => {
                        setIsPopupCreate(false);
                        setEditBranch({
                            name: '',
                            address: '',
                            phone: '',
                        });
                        setSelectedBranchId(null);
                    }}
                >
                    {renderRoomFormContent(false)}
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
                            <p>
                                Bạn muốn xóa cơ sở
                                <b style={{ marginLeft: 6 }}>{selectedBranch?.name}</b>
                            </p>
                        </div>
                        <div className={styles.row}>
                            <Button rounded_10 outline light onClick={() => setIsPopupDelete(false)}>
                                Hủy
                            </Button>
                            <Button rounded_10 red onClick={handleDeleteBranch}>
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </Popup>
            )}
            <div className={styles.header}>
                <Button
                    rounded_10
                    w_fit
                    blue
                    icon={<AiOutlinePlus />}
                    className={styles.btnAdd}
                    onClick={() => setIsPopupCreate(true)}
                >
                    Thêm mới cơ sở
                </Button>
            </div>
            <div className={styles.content}>
                <Table
                    data={tableData}
                    columns={[
                        { key: 'index', label: 'STT' },
                        {
                            key: 'name',
                            label: 'Tên cơ sở',
                            render: (item) => (
                                <div className={styles.nameBranchContainer}>
                                    <p>{item.name}</p>
                                </div>
                            ),
                        },
                        { key: 'address', label: 'Địa chỉ' },
                        {
                            key: 'typeRoom',
                            label: 'Loại phòng',
                            render: (item) => (
                                <div className={styles.typeRoomContainer}>
                                    {(Array.isArray(item.typeRoom) ? item.typeRoom : []).map((room) => (
                                        <p key={room._id} className={styles.typeRoomItem}>
                                            {room.name}
                                        </p>
                                    ))}
                                </div>
                            ),
                        },
                    ]}
                    renderActions={(item) => (
                        <>
                            <Tippy content="Chi tiết" placement="bottom">
                                <div>
                                    <Button
                                        w_fit
                                        rounded_10
                                        p_10_14
                                        blueIcon
                                        icon={<AiOutlineEye />}
                                        onClick={() => handleGetBranch(item._id)}
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
                                            setSelectedBranchId(item._id);
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
            </div>
        </div>
    );
};

export default LocationManage;
