import React from "react";
import ICard from "./ICard";
import styles from "./Card.module.css";
import { ICardInterface } from "../../../../Service/Interface/CardInterface";
import ProgressBarCard from "./CardType/ProgressBarCard";
import CircularBarCard from "./CardType/CircularBarCard";

const Cards : React.FunctionComponent<ICard> = ({ cardData }) => {
    const cardType = (item : ICardInterface) => {
        switch(item.type){
            case "Progress" : return <ProgressBarCard item={item} />
            case "Cirular" : return <CircularBarCard item={item} />
        }
    }
    return (
        <div className={styles.css1}>
            {cardData?.map((cardItem : ICardInterface ) => {
                return <div className={styles.css2}>{cardType(cardItem)}</div>
            })}
        </div>
    )
};

export default Cards;