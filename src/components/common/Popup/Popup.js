import { AiOutlineClose } from 'react-icons/ai';
import styles from './Popup.module.scss';

const Popup = ({ children, handleClose }) => {
    return (
        <div className={styles.container}>
            <div className={styles.popupContent}>
                <AiOutlineClose onClick={handleClose} className={styles.iconClose} />
                {children}
            </div>
        </div>
    );
};

export default Popup;
