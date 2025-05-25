import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ data = [], onSelect, heightImage, widthImage }) => {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);

    // Lọc dữ liệu khi người dùng nhập
    useEffect(() => {
        const q = query.trim().toLowerCase();

        if (q === '') {
            setFiltered([]);
            setShowDropdown(false);
        } else {
            const result = data.filter((item) => item.name.toLowerCase().includes(q));
            setFiltered(result);

            // 🔒 CHỈ mở dropdown nếu nó đang mở (user đang tương tác)
            if (!showDropdown) return;
            setShowDropdown(result.length > 0);
        }
    }, [query, data]);

    // Ẩn dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setQuery(item.name);
        setShowDropdown(false);
        onSelect?.(item); // gọi callback nếu có
    };

    return (
        <div ref={wrapperRef} className={styles.searchBarcontainer}>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true); // Mở khi user đang gõ
                }}
                className={clsx(styles.searchInp, showDropdown && styles.searchInpDropdown)}
            />
            <AiOutlineSearch className={styles.iconsearch} />
            {showDropdown && filtered.length > 0 && (
                <ul className={styles.dropdownContainer}>
                    {filtered.map((item) => (
                        <li key={item.id} onClick={() => handleSelect(item)} className={styles.resultItem}>
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    className={styles.img}
                                    width={widthImage}
                                    height={heightImage}
                                />
                            )}
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
