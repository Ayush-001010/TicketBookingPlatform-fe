import React from "react";
import ICardType from "./ICardType";
import { Progress } from "antd";
import styles from "../Card.module.css";

const CircularBarCard: React.FunctionComponent<ICardType> = ({ item }) => {

    const sideIconFunc = (icon?: string) => {
        if (!icon) return;
        switch (icon) {
            case "view": return <i className="bi bi-eye"></i>
        }
    }
    return (
        <div className={styles.cardContainer}>
            <h1 className={styles.cardHeader}>{item.displayName}</h1>
            <p className={styles.cardIcon}>
                {sideIconFunc(item.sideIcon)}
            </p>
            <Progress type="circle" percent={item.value} className={styles.progressCircle} />
        </div>
    )
};

export default CircularBarCard;