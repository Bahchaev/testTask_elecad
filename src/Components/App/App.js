import React, {useEffect, useState} from "react";
import styles from './styles.module.css'
import {doGetRequest} from "../../requests";
import CategoryTree from "../CategoryTree";
import Cards from "../Cards";
import LoadBar from "../LoadBar";
import ViewSwitcher from "../ViewSwitcher";

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
                <ViewSwitcher setView={setView}/>
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
