import React from "react";
import { useAppSelector } from "../../../../../Redux/Hooks";
import styles from "../ReviewContent.module.css";

const JournaryDetails: React.FunctionComponent<{}> = () => {
    const { departureStation, departureTime, destinationStation, destinationTime } = useAppSelector(state => state.BookTrainTicket.data[0])
    return (
        <div className={styles.journaryDetailsCss}>
            <div className={styles.journaryHeaders}>
                <h1>{departureStation}</h1>
                <h2>{departureTime}</h2>
            </div>
            <div className={styles.journaryDirectionDivCss}>
                <p className={styles.journaryDirectionCss}></p>
                <p className={styles.journaryDirectionIconCss}><i className="i bi-train-front" /></p>
                <p className={styles.journaryDirectionCss}></p>
            </div>
            <div className={styles.journaryHeaders}>
                <h1>{destinationStation}</h1>
                <h2>{destinationTime}</h2>
            </div>
        </div>
    )
};

export default JournaryDetails;