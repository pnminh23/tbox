import styles from './ConfirmModal.module.scss';

const ConfirmModal = ({ isOpen, onClose, onConfirm, question, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✖
                </button>
                <div className={styles.icon}>❓</div>
                <p className={styles.question}>{question}</p>
                {children}
            </div>
        </div>
    );
};

export default ConfirmModal;
