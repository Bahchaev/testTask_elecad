import React from "react";
import styles from './styles.module.css'

export default function Pagination({page, setPage}) {

    const nextPage = () => {
        setPage(++page)
    };

    const prevPage = () => {
        (page) > 1 ? setPage(--page) : setPage(1)
    };

    return (
        <div>
            <button>{`<<`}</button>
            <button onClick={prevPage}>{`<`}</button>

            <span className={styles.currentPage}>{page}</span>

            <button onClick={nextPage}>{`>`}</button>
            <button>{`>>`}</button>
        </div>
    )
}