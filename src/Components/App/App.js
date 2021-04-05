import React, {useEffect, useState} from "react";
import styles from './styles.module.css'
import {doGetRequest} from "../../requests";
import CategoryTree from "../CategoryTree";
import Cards from "../Cards";
import LoadBar from "../LoadBar";

function App() {

    //состояния приложения
    const [data, setData] = useState(null); //данные, полученные с сервера
    const [isLoaded, setIsLoaded] = useState(false); // статус загрузки данных с сервера
    const [error, setError] = useState(null); // ошибки при загрузке данных с сервера
    const [view, setView] = useState('tree');

    const getTreeData = (data) => {
        let categories = {};
        data.map((item) => {
            if (!categories[item.category]) {
                categories[item.category] = []
            }
            categories[item.category].push(item.image);
        });

        return categories
    };

    useEffect(() => {
        doGetRequest("http://contest.elecard.ru/frontend_data/catalog.json")
            .then((fetchedData) => {
                    setData(fetchedData);

                    //имитация задержки сервера для отображения инидкатора загрузки
                    setTimeout(() => setIsLoaded(true), 20);
                }
            )
            .catch((error) => {
                setError(error);
            });
    }, []);


    if (error) {
        return <div>{error.message}</div>
    } else if (!isLoaded) {
        return <LoadBar/>
    } else {
        const treeData = getTreeData(data);
        return (
            <div className={styles.app}>
                <div className={styles.vieSwitch}>
                    <label htmlFor={'treeView'}>Дерево</label>
                    <input type="radio" name={'view'} value={'tree'} id={'treeView'} onChange={() => setView('tree')}
                           defaultChecked/>
                    <input type="radio" name={'view'} value={'cards'} id={'cardView'}
                           onChange={() => setView('cards')}/>
                    <label htmlFor={'cardView'}>Карточки</label>
                </div>

                {
                    view === 'tree' ?
                        <CategoryTree treeData={treeData}/> :
                        <Cards initData={data}/>
                }
            </div>
        );
    }
}

export default App;
