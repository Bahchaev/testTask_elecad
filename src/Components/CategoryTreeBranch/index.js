import React, {useState} from "react"
import styles from "./styles.module.css"
import CategoryTreeBranchNode from "../CategoryTreeBranchNode";

export default function CategoryTreeBranch({categoryTitle, images}) {

    const [isShown, setIsShown] = useState(false);

    const expandHandleClick = () => {
        setIsShown(!isShown)
    };

    return (
        <div>
            <div>
                <button onClick={expandHandleClick} className={styles.button}>{isShown ? '-' : '+'}</button>
                <span>{categoryTitle}</span>
            </div>
            <ul className={isShown ? styles.list : styles.hidden}>
                {
                    images.map((image) => {
                        return (
                            <CategoryTreeBranchNode imageSrc={image}/>
                        )
                    })
                }
            </ul>
        </div>
    )

}