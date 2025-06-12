import React from "react";
import ICardType from "./ICardType";
import { Progress } from "antd";
import styles from "../Card.module.css";

const ProgressBarCard : React.FunctionComponent<ICardType> = ({ item }) => {
    return (
        <div>
            <h1 className={styles.css3}>{item.displayName}</h1>
            <Progress percent={Number(item.value.toFixed(2)) }/>
        </div>
    )
};

export default ProgressBarCard;