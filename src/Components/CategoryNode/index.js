import React, {useState} from "react"
import styles from "./styles.module.css"

export default function CategoryNode({category, images}) {

    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
        setIsShown(!isShown)
    };

    return (
        <div>
            <div>
                <button onClick={handleClick} className={styles.button}>{isShown ? '-' : '+'}</button>
                <span>{category}</span>
            </div>
            <ul className={isShown ? styles.list : styles.hidden}>
                {
                    images.map((image) => {
                        return <li><img src={`http://contest.elecard.ru/frontend_data/${image}`} alt="" height={75}/></li>
                    })
                }
            </ul>
        </div>
    )

}