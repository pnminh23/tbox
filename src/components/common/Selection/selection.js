import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import style from './selection.module.scss';
import { useStyleClass } from '@/hooks/useStyleClass';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Selection = ({
    options = [],
    defaultValue = '--Tùy chọn--',
    onChange,
    className,
    multiple = false,
    ...props
}) => {
    const initialSelected = multiple ? (Array.isArray(defaultValue) ? defaultValue : []) : defaultValue;

    const [selected, setSelected] = useState(initialSelected);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const styleClass = useStyleClass(props, style);

    useEffect(() => {
        const updatedSelected = multiple ? (Array.isArray(defaultValue) ? defaultValue : []) : defaultValue;

        setSelected(updatedSelected);
    }, [options, defaultValue, multiple]);

    const handleSelect = (option) => {
        if (multiple) {
            setSelected((prevSelected) => {
                const isSelected = prevSelected.includes(option);
                const newSelected = isSelected
                    ? prevSelected.filter((item) => item !== option)
                    : [...prevSelected, option];
                onChange?.(newSelected);
                return newSelected;
            });
        } else {
            setSelected(option);
            setIsOpen(false);
            onChange?.(option);
        }
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

    const isSelected = (option) => (multiple ? selected.includes(option) : selected === option);

    const displaySelected = multiple ? (selected.length > 0 ? selected.join(', ') : '--Tùy chọn--') : selected;

    return (
        <div ref={dropdownRef} className={clsx(styleClass, style.container, className)}>
            <div className={clsx(styleClass, style.select)} onClick={() => setIsOpen(!isOpen)}>
                {displaySelected}
            </div>
            {isOpen && (
                <ul className={clsx(styleClass, style.dropdown)}>
                    {options.length > 0 ? (
                        options.map((option) => (
                            <li
                                key={option}
                                className={clsx(styleClass, style.option, isSelected(option) && style.selectedOption)}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                                {isSelected(option) && multiple && <AiOutlineCheckCircle color="#3772ff" />}
                            </li>
                        ))
                    ) : (
                        <li className={clsx(styleClass, style.option, style.emptyOption)}>&nbsp;</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Selection;
