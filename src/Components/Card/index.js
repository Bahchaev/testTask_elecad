import React, {useRef} from "react";
import styles from './styles.module.css'

export default function Card({card, closeCard}) {

    const ref = useRef(null);

    const handleClick = () => {
        ref.current.style.transform = 'scale(0.01, 0.01)';
        setTimeout(() => closeCard(), 250) //задерка перед закрытием для отображения анимации
    };

    return (
        <div className={styles.card}>
            <button className={styles.closeBtn} onClick={handleClick}>X</button>
            <img
                src={`http://contest.elecard.ru/frontend_data/${card.image}`}
                alt=""
                className={styles.image}
                ref={ref}
            />
        </div>
    )
}