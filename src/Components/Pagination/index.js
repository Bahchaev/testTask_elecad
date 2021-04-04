import React from 'react';
import styles from './styles.module.css'
import Pagination from '@material-ui/lab/Pagination';


export default function PaginationControlled({page, setPage, pagesCount}) {
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div className={styles.pagination}>
            <Pagination count={pagesCount} page={page} onChange={handleChange} />
        </div>
    );
}