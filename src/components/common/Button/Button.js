import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.scss";
import { useStyleClass } from "@/hooks/useStyleClass";

const Button = ({
    children,
    onClick,
    icon,
    href,
    className,
    target,
    ...props
}) => {
    const styleClass = useStyleClass(props, styles);

    let Wrapper = "button";
    if (href) Wrapper = Link;

    const handleClick = (e) => {
        if (props.disable) {
            e.preventDefault();
            return;
        }
        if (onClick) onClick(e);
    };

    return (
        <Wrapper
            className={clsx(styles.container, {
                [styles.maxContent]: props.maxContent,
                [styles.maxHeight]: props.maxHeight,
            })}
            {...(Wrapper === Link ? { href } : {})}
            onClick={handleClick}
        >
            <div className={clsx(styleClass, styles.btn, className)}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <div className={styles.text}>{children}</div>
            </div>
        </Wrapper>
    );
};

export default Button;
