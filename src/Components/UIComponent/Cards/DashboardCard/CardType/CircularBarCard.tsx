import React from "react";
import ICardType from "./ICardType";
import { Progress } from "antd";
import styles from "../Card.module.css";

const CircularBarCard: React.FunctionComponent<ICardType> = ({ item }) => {

    return (
        <div className={styles.cardContainer}>
            <h1 className={styles.cardHeader}>{item.displayName}</h1>
            <Progress type="circle" percent={item.value} className={styles.progressCircle} />
        </div>
    )
};

export default CircularBarCard;