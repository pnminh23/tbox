import clsx from 'clsx';
import styles from './input.module.scss';
import { useStyleClass } from '@/hooks/useStyleClass';

const Input = ({ type = 'text', placeholder, value, onChange, icon, className, disabled, ...props }) => {
    const styleClass = useStyleClass(props, styles);

    return (
        <div className={clsx(styles.container, className, { [styles.disabled]: disabled })}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <input
                type={type}
                className={clsx(styleClass, styles.input)}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...props}
            />
        </div>
    );
};

export default Input;
