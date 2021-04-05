import React, {useRef, useState} from "react";
import styles from './styles.module.css'
import PaginationControlled from "../Pagination";
import Card from "../Card";
import SortBar from "../SortBar";

export default function Cards({initData}) {

    const [page, setPage] = useState(1);
    //количество отображаемых карточек высчитывается на 2 ряда.
    //const cardsInViewCount = Math.trunc((window.innerWidth-36) / 310)*2;
    const [cardsInViewCount, setCardsInViewCount] = useState(Math.trunc((window.innerWidth-36) / 310)*2)
    let pagesCount = Math.trunc(initData / cardsInViewCount) + 1;
    const [closedCard, setClosedCard] = useState([]);
    const [sortedBy, setSortedBy] = useState('initial');
    const ref = useRef(null)
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
        const sortedFilteredCards = cards
            .sort((a, b) => a[sortedBy] - b[sortedBy]) //сортировка по выбранному пункту
            .filter(card => !card.isClosed); // фильтрация списка от закрытых позиций

        // рассчитаем макимальное число страниц
        pagesCount = Math.trunc(sortedFilteredCards.length / cardsInViewCount);

        // формируем массив отображаемых изображений и вернём его как результат функции
        const arr = [];
        for (
            let i = ((page - 1) * cardsInViewCount);
            arr.length < cardsInViewCount && i < sortedFilteredCards.length;
            i++
        ) {
            arr.push(sortedFilteredCards[i])
        }
        return arr
    };

    //отслеживаем размер страницы и корректируем количество отображаемых карточек, чтобы они всегда занимали две строки
    window.addEventListener('resize', () => setCardsInViewCount(Math.trunc((window.innerWidth-36) / 310)*2));

    const cardsForView = getCardsForView();
    return (
        <div className={styles.container}>
            <SortBar setSortedBy={setSortedBy}/>
            <div className={styles.cards} ref={ref}>
                {cardsForView.map((card) => {
                    return (
                        <Card
                            card={card}
                            closeCard={() => closeCard(card.id)}
                            key={card.timestamp}
                        />
                    )
                })}
            </div>
            <div className={styles.footer}>
                <div className={styles.pagination}>
                    <PaginationControlled
                        page={page}
                        setPage={setPage}
                        pagesCount={pagesCount}
                    />
                </div>
                <div className={styles.closeBtnWrapper}>
                    <button onClick={resetClosedCards} className={styles.resetBtn}>Return closed</button>
                </div>
            </div>
        </div>
    )
}