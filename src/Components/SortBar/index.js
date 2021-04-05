import React from "react";
import styles from './styles.module.css'

export default function SortBar({setSortedBy}) {

    const sortList = {
        category: 'по категории',
        timestamp: 'по дате',
        filesize: 'по размеру файла'
    };

    return (
        <div className={styles.sortBar}>
            <div>Сортировка:</div>
            {
                Object.keys(sortList).map((el) => {
                    return (
                        <div key={el} className={styles.radioBtnWrapper}>
                            <input
                                type="radio"
                                name={'sortBy'}
                                value={el}
                                id={el}
                                onChange={() => setSortedBy(el)}
                                defaultChecked={el === 'category'}
                            />
                            <label htmlFor={el}>{sortList[el]}</label>
                        </div>

                    )
                })
            }
        </div>
    )
}