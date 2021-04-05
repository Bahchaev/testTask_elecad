import React from "react";
import styles from './styles.module.css'

export default function Footer() {
    return (
        <div>
            <div className={styles.footer}>Fixed Footer</div>
            <div className={styles.invisibleBlock}/>
        </div>

    )
}