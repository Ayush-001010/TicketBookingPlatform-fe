import React from "react";
import ICard from "./ICard";
import styles from "./Card.module.css";
import { ICardInterface } from "../../../../Service/Interface/CardInterface";
import ProgressBarCard from "./CardType/ProgressBarCard";
import CircularBarCard from "./CardType/CircularBarCard";

const Cards : React.FunctionComponent<ICard> = ({ cardData }) => {
    console.log(cardData);

    const cardType = (item : ICardInterface) => {
        switch(item.type){
            case "Progress" : return <ProgressBarCard item={item} />
            case "Cirular" : return <CircularBarCard item={item} />
        }
    }
    return (
        <div>
            {cardData?.map((cardItem : ICardInterface ) => {
                return cardType(cardItem);
            })}
        </div>
    )
};

export default Cards;