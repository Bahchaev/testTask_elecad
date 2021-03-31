import React, {useEffect, useState} from "react";
import {doGetRequest} from "../../requests";
import CategoryNode from "../CategoryNode";

function App() {

    //состояния приложения
    const [data, setData] = useState(null); //данные, полученные с сервера
    const [isLoaded, setIsLoaded] = useState(false); // статус загрузки данных с сервера
    const [error, setError] = useState(null); // ошибки при загрузке данных с сервера
    //const [categories, setCategories] = useState([]);


    const getTree = (data) => {
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
        const tree = getTree(data);
        return (
            <div className="App">
                {Object.keys(tree).map((node) => {
                    return (
                        <CategoryNode category={node} images={tree[node]}/>
                    )
                })}
            </div>
        );
    }
}

export default App;
