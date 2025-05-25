import React from 'react';
import styles from './Table.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

const Table = ({ columns, data, renderActions }) => {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className={styles[`col-${column.key}`]}>
                                {column.label}
                            </th>
                        ))}
                        <th className={styles.colAction}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={`${item._id}-${index}`}>
                            {columns.map((column) => (
                                <td key={column.key} className={styles[`col-${column.key}`]}>
                                    {column.key === 'role' ? (
                                        <span className={styles.role}>{item[column.key]}</span>
                                    ) : column.key === 'status' ? (
                                        <span
                                            className={clsx(
                                                item[column.key] === 'Đã khóa' ? styles.statusLock : styles.status
                                            )}
                                        >
                                            {item[column.key]}
                                        </span>
                                    ) : column.key === 'createdAt' ? (
                                        <span className={clsx(styles.createdAt)}>
                                            {new Date(item[column.key]).toLocaleDateString()}
                                        </span>
                                    ) : column.key === 'image' ? (
                                        <Image
                                            src={item[column.key]}
                                            className={clsx(styles.image)}
                                            alt={'iamge'}
                                            width={40}
                                            height={60}
                                        />
                                    ) : column.render ? (
                                        column.render(item)
                                    ) : (
                                        item[column.key]
                                    )}
                                </td>
                            ))}
                            <td>
                                <div className={styles.actions}>{renderActions(item)}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
