import { useEffect, useRef, useState } from 'react';
import styles from './UploadFileImage.module.scss';
import Button from '@/components/common/Button';
import { AiOutlineUpload, AiOutlineClose } from 'react-icons/ai';
import noImage from '@public/static/img/avatar/no_image.jpg';
import Image from 'next/image';
import { useStyleClass } from '@/hooks/useStyleClass';
import clsx from 'clsx';

const UploadFileImage = ({ defaultImage, onFileSelected, ...props }) => {
    const styleClass = useStyleClass(props, styles);
    const [imageUrl, setImageUrl] = useState(defaultImage && defaultImage.trim() ? defaultImage : noImage);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImageUrl(previewUrl);
            onFileSelected?.(file);
        }
    };

    const handleImageClick = () => {
        if (imageUrl !== noImage) {
            setShowPreview(true);
        }
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    return (
        <>
            <div className={clsx(styles.container)}>
                <Image
                    src={imageUrl}
                    alt="Avatar"
                    width={150}
                    height={150}
                    className={clsx(styleClass, styles.img)}
                    unoptimized
                    onClick={handleImageClick}
                    style={{ cursor: imageUrl !== noImage ? 'pointer' : 'default' }}
                />
                <div className={styles.uploadImage}>
                    <p>Hình ảnh tải lên đạt kích thước tối thiểu 300 x 300 pixel</p>
                    <p className={styles.subText}>Định dạng hỗ trợ JPG, JPEG, PNG</p>
                    <input type="file" className={styles.fileInput} ref={fileInputRef} onChange={handleFileChange} />
                    <Button
                        type="button"
                        light
                        w_fit
                        outline
                        rounded_10
                        icon={<AiOutlineUpload />}
                        onClick={handleFileInputClick}
                        className={styles.btn}
                    >
                        Chọn ảnh
                    </Button>
                </div>
            </div>

            {showPreview && (
                <div className={styles.modalOverlay} onClick={handleClosePreview}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={handleClosePreview}>
                            <AiOutlineClose size={20} />
                        </button>
                        <Image
                            src={imageUrl}
                            alt="Preview"
                            layout="intrinsic"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                height: 'auto',
                                width: 'auto',
                                objectFit: 'contain',
                            }}
                            unoptimized
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadFileImage;
