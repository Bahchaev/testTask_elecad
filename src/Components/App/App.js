import React, {useEffect, useState} from "react";
import {doGetRequest} from "../../requests";

function App() {

    //состояния приложения
    const [data, setData] = useState(null); //данные, полученные с сервера
    const [isLoaded, setIsLoaded] = useState(false); // статус загрузки данных с сервера
    const [error, setError] = useState(null); // ошибки при загрузке данных с сервера
    //const [categories, setCategories] = useState([]);


    const getCategories = (data) => {
        let categories = [];
        data.map((item) => {
            if (!categories.includes(item.category)) {
                categories.push(item.category)
            }
        });
        return categories
    };

    useEffect(() => {
        doGetRequest("http://contest.elecard.ru/frontend_data/catalog.json")
            .then((fetchedData) => {
                    setData(fetchedData);
                    setIsLoaded(true);
                }
            )
            .catch((error) => {
                setError(error);
            });
    }, []);


    if (error) {
        return <div>{error.message}</div>
    } else if (!isLoaded) {
        return <div>Загрузка...</div>
    } else {
        const categories = getCategories(data);
        return (
            <div className="App">
                {categories.map((category) => (<div>{category}</div>))}
            </div>
        );
    }
}

export default App;
