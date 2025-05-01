import React from 'react';
import styles from './Table.module.scss';
import clsx from 'clsx';

const Table = ({ columns, data, renderActions }) => {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={`${item.id}-${index}`}>
                            {columns.map((column) => {
                                <td key={column.key}>
                                    {column.key === 'role' ? (
                                        <span className={styles.role}>{item[column.key]}</span>
                                    ) : column.key === 'status' ? (
                                        <span className={styles.status}>{item[column.key]}</span>
                                    ) : (
                                        item[column.key]
                                    )}
                                </td>;
                            })}
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
