import React from "react";
import styles from './styles.module.css'

export default function ViewSwitcher({setView}) {
    return (
        <div className={styles.vieSwitcher}>
            <input type="radio" name={'view'} value={'tree'} id={'treeView'} onChange={() => setView('tree')}
                   defaultChecked/>
            <label htmlFor={'treeView'}>Дерево</label>

            <input type="radio" name={'view'} value={'cards'} id={'cardView'}
                   onChange={() => setView('cards')}/>
            <label htmlFor={'cardView'}>Карточки</label>
        </div>
    )
}