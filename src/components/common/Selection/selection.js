import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import style from './selection.module.scss';

const Selection = ({ options = [], defaultValue = '--Tùy chọn--', onChange, className, ...props }) => {
    const [selected, setSelected] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (options.length > 0) {
            setSelected(defaultValue);
        }
    }, [options, defaultValue]);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        onChange?.(option);
    };

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div ref={dropdownRef} className={clsx(style.container, className)}>
            <div className={clsx(style.select)} onClick={() => setIsOpen(!isOpen)}>
                {selected}
            </div>
            {isOpen && (
                <ul className={style.dropdown}>
                    {options.length > 0 ? (
                        options.map((option) => (
                            <li key={option} className={style.option} onClick={() => handleSelect(option)}>
                                {option}
                            </li>
                        ))
                    ) : (
                        <li className={clsx(style.option, style.emptyOption)}>&nbsp;</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Selection;
