import React, {useEffect, useState} from "react";
import {doGetRequest} from "../../requests";
import CategoryTree from "../CategoryTree";
import Cards from "../Cards";

function App() {

    //состояния приложения
    const [data, setData] = useState(null); //данные, полученные с сервера
    const [isLoaded, setIsLoaded] = useState(false); // статус загрузки данных с сервера
    const [error, setError] = useState(null); // ошибки при загрузке данных с сервера
    // const sortList = {
    //     category: 'по категории',
    //     data: 'по дате',
    //     name: 'по названию',
    //     fileSize: 'по размеру файла'
    // };

    const getTreeData = (data) => {
        let categories = {};
        data.map((item) => {
            if (!categories[item.category]) {categories[item.category] = []}
            categories[item.category].push(item.image);
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
        const treeData = getTreeData(data);
        return (
            <div className="App">
                {/*<CategoryTree treeData={treeData}/>*/}
                <Cards initData={data}/>
            </div>
        );
    }
}

export default App;
