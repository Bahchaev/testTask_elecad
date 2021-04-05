import React, {useEffect, useState} from "react";
import styles from './styles.module.css'
import {doGetRequest} from "../../requests";
import CategoryTree from "../CategoryTree";
import Cards from "../Cards";
import LoadBar from "../LoadBar";
import ViewSwitcher from "../ViewSwitcher";
import Footer from "../Footer";
import Header from "../Header";

function App() {

    //состояния приложения
    const [data, setData] = useState(null); //данные, полученные с сервера
    const [isLoaded, setIsLoaded] = useState(false); // статус загрузки данных с сервера
    const [error, setError] = useState(null); // ошибки при загрузке данных с сервера
    const [view, setView] = useState('tree');

    useEffect(() => {
        doGetRequest("http://contest.elecard.ru/frontend_data/catalog.json")
            .then((fetchedData) => {
                    setData(fetchedData);

                    //имитация задержки сервера для отображения инидкатора загрузки
                    setTimeout(() => setIsLoaded(true), 2000);
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

        return (
            <div className={styles.app}>
                <Header/>
                <div className={styles.main}>
                    <ViewSwitcher setView={setView}/>
                    {
                        view === 'tree' ?
                            <CategoryTree initialData={data}/> :
                            <Cards initData={data}/>
                    }
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
