import React from "react";
import styles from './styles.module.css'

export default function Header() {
    return (
        <div>
            <div className={styles.header}>Fixed Header</div>
            <div className={styles.invisibleBlock}/>
        </div>
    )
}