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
            {/*вариант 1: все картинки прогружаются в DOM*/}
            <ul className={isShown ? styles.list : styles.hidden}>
                {
                    images.map((image, index) => {
                        return (
                            <CategoryTreeBranchNode
                                imageSrc={image}
                                key={`${categoryTitle}-image=${index}`}
                            />
                        )
                    })

                }
            </ul>

            {/*вариант 2: в DOM подгружаются только раскрытые картинки*/}
            {/*{*/}
            {/*    isShown ?*/}
            {/*        <ul className={styles.list}>*/}
            {/*            {*/}
            {/*                images.map((image) => {*/}
            {/*                    return (*/}
            {/*                        <CategoryTreeBranchNode imageSrc={image}/>*/}
            {/*                    )*/}
            {/*                })*/}

            {/*            }*/}
            {/*        </ul> :*/}
            {/*        <div/>*/}
            {/*}*/}
        </div>
    )

}