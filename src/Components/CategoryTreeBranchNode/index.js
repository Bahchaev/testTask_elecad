import React, {useState} from "react"
import styles from "./styles.module.css"

export default function CategoryTreeBranchNode({imageSrc}) {

    const [isShown, setIsShown] = useState(false);
    const [image, setImage] = useState(null); //данные, полученные с сервера
    const [isLoaded, setIsLoaded] = useState(true); // статус загрузки данных с сервера
    const [error, setError] = useState(null); // ошибки при загрузке данных с сервера

    const handleClick = () => {
        setIsShown(!isShown)
    };

    if (error) {
        return <div>{error.message}</div>
    } else if (!isLoaded) {
        return <div>Загрузка...</div>
    } else {
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
}