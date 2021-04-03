import React, {useState} from "react";
import styles from './styles.module.css'
import Pagination from "../Pagination";
import Card from "../Card";

export default function Cards({initData}) {

    const [page, setPage] = useState(1);
    const cardsInViewCount = 6;
    const [closedCard, setClosedCard] = useState([]);
    const cards = initData.map((card, index) => {
        card.id = index
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
        const nonClosedCards = cards.filter(card => !card.isClosed);
        const arr = [];
        for (let i = ((page - 1) * cardsInViewCount); arr.length < cardsInViewCount; i++) {
            arr.push(nonClosedCards[i])
        }
        return arr
    };

    const cardsForView = getCardsForView();
    return (
        <div>
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