import React from "react";
import styles from './styles.module.css'

export default function Card({card, closeCard}) {

    return (
        <div className={styles.card}>
            <button className={styles.closeBtn} onClick={closeCard}>X</button>
            <img
                src={`http://contest.elecard.ru/frontend_data/${card.image}`}
                alt=""
                className={styles.image}
            />
        </div>
    )
}