import { createRoom, useRoomByBranchAndType } from '@/services/room';
import styles from './RoomList.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import loadingAnimation from '/public/animations/loadingItem.json';
import Lottie from 'lottie-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Popup from '../../../common/Popup/Popup';
import UploadFileImage from '../../../common/UploadFileImage/UploadFileImage';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
import { toast } from 'react-toastify';

const RoomList = ({ branchId, typeRoomId }) => {
    const { RoomsByBranchAndType, isLoadingAllRooms, isErrorAllRooms } = useRoomByBranchAndType(branchId, typeRoomId);
    const [isPopupCreate, setIsPopupCreate] = useState(false);
    const [isPopupEdit, setIsPopupEdit] = useState(false);
    const [nameRoom, setNameRoom] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editFile, setEditFile] = useState(null);

    // if (!branchId || !typeRoomId) return <p>Chưa có chi nhánh hoặc loại phòng</p>;
    // if (isErrorAllRooms) return <p>Lỗi khi tải danh sách phòng.</p>;

    const handelDetail = (image, name) => {
        setIsPopupEdit(true);
        setNameRoom(name);
        setImageUrl(image);
    };

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            // KHÔNG cần append email vào formData nữa (vì truyền qua params)
            // formData.append('email', editAccount.email); ❌ bỏ dòng này
            if (branchId) formData.append('branch', branchId);
            if (typeRoomId) formData.append('type', typeRoomId);
            if (nameRoom) formData.append('name', nameRoom);
            if (editFile) formData.append('image', editFile); // nếu có file mới
            const response = await createRoom(formData);

            if (response.success) {
                toast.success('Thêm phòng mới thành công!');
                setIsPopupCreate(false); // đóng popup
                setNameRoom('');
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('Đã xảy ra lỗi khi thêm mới!');
        }
    };

    const renderRoomFormContent = (isEdit = false) => (
        <div className={styles.formPopup}>
            <p className={styles.title}>{isEdit ? 'Chi tiết phòng' : 'Thêm phòng mới'}</p>
            <div className={styles.groupItem}>
                <UploadFileImage
                    filmImage
                    defaultImage={imageUrl}
                    onFileSelected={(file) => {
                        setEditFile(file);
                        // Xử lý thêm nếu cần
                    }}
                />
            </div>
            <div className={styles.groupItem}>
                <label>Tên phòng</label>
                <Input rounded_10 outLine value={nameRoom} onChange={(e) => setNameRoom(e.target.value)} />
            </div>

            <Button rounded_10 blue w_fit className={styles.btnAdd} onClick={handleCreate}>
                {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
        </div>
    );

    return (
        <div className={styles.roomsContainer}>
            {isLoadingAllRooms && (
                <Lottie animationData={loadingAnimation} loop={true} autoplay={true} className={styles.loading} />
            )}
            {RoomsByBranchAndType?.map((room) => (
                <div key={room._id} className={styles.room}>
                    <Image
                        src={room.image || ''}
                        alt={room.name}
                        width={100}
                        height={120}
                        onClick={() => handelDetail(room.image, room.name)}
                    />
                    <p className={styles.roomName}>{`P - ${room.name}`}</p>
                </div>
            ))}
            <Tippy content="Thêm phòng mới" placement="right">
                <div className={styles.addRoom} tabIndex={0} onClick={() => setIsPopupCreate(true)}>
                    <AiOutlinePlusCircle size={25} />
                </div>
            </Tippy>

            {isPopupCreate && <Popup handleClose={() => setIsPopupCreate(false)}>{renderRoomFormContent(false)}</Popup>}
            {isPopupEdit && (
                <Popup
                    handleClose={() => {
                        setIsPopupEdit(false);
                        setImageUrl('');
                        setNameRoom('');
                    }}
                >
                    {renderRoomFormContent(true)}
                </Popup>
            )}
        </div>
    );
};

export default RoomList;
