import React, {useState} from "react"
import styles from "./styles.module.css"

export default function CategoryTreeBranchNode({imageSrc}) {

    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
        setIsShown(!isShown)
    };

    return (
        <div>
            <img
                className={styles.thumb}
                src={`http://contest.elecard.ru/frontend_data/${imageSrc}`}
                alt=""
                onClick={handleClick}
            />
            <img
                className={isShown ? styles.largeImage : styles.hidden}
                src={`http://contest.elecard.ru/frontend_data/${imageSrc}`}
                alt=""
            />
            <div className={isShown ? styles.wrapper : styles.hidden} onClick={handleClick}/>
        </div>

    )
}