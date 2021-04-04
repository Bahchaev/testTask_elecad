import React, {useState} from "react";
import styles from './styles.module.css'
import Pagination from "../Pagination";
import Card from "../Card";
import SortBar from "../SortBar";

export default function Cards({initData}) {

    const [page, setPage] = useState(1);
    const cardsInViewCount = 6;
    const [closedCard, setClosedCard] = useState([]);
    const [sortedBy, setSortedBy] = useState('initial');
    const cards = initData.map((card, index) => {
        card.id = index;
        return card
    });

    //закрыть карточку
    const closeCard = (id) => {
        cards[id].isClosed = true;
        setClosedCard(cards[id])
    };

    //восстановить все хакрытые карточки
    const resetClosedCards = () => {
        cards.forEach((card) => {
            card.isClosed = false;
        });
        setClosedCard([])
    };

    //получить массив карточек, отображаемых на экране
    const getCardsForView = () => {
        const nonClosedCards = cards
            .sort((a,b) => a[sortedBy]-b[sortedBy]) //сортировка по выбранному пункту
            .filter(card => !card.isClosed); // фильтрация списка от закрытых позиций
        const arr = [];
        for (let i = ((page - 1) * cardsInViewCount); arr.length < cardsInViewCount; i++) {
            arr.push(nonClosedCards[i])
        }
        return arr
    };

    const cardsForView = getCardsForView();
    return (
        <div>
            <SortBar setSortedBy={setSortedBy}/>
            <div className={styles.cards}>
                {cardsForView.map((card) => {
                    return (
                        <Card
                            card={card}
                            closeCard={() => closeCard(card.id)}
                        />
                    )
                })}
            </div>
            <Pagination
                page={page}
                setPage={setPage}
            />
            <button onClick={resetClosedCards}>RESET</button>
        </div>
    )
}