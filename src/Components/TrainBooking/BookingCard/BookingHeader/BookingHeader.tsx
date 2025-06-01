import React from "react";
import IBookingHeader from "./IBookingHeader";
import styles from "./BookingHeader.module.css";

const BookingHeader: React.FunctionComponent<IBookingHeader> = ({ trainName, departureStation, destinationStation, departureTime, destinationTime }) => {
    return (
        <div className={styles.centerCard}>
            <div className={styles.centerContent}>
                <div className={`${styles.centerCard} ${styles.header}`}>
                    <h1 className={""}>{trainName}</h1>
                </div>
                <div className={styles.sideBySide}>
                    <div>
                        <h2 className={styles.subHeader}><span>Departure Station: </span> <span>{departureStation}</span></h2>
                        <h2 className={`${styles.subHeader} ${styles.bottom}`}><span>Departure Time:</span> <span>{departureTime}</span></h2>
                    </div>
                    <div>
                        <h2 className={styles.subHeader}><span>Destination Station:</span> <span>{destinationStation}</span></h2>
                        <h2 className={`${styles.subHeader} ${styles.bottom}`}><span>Destination Time:</span> <span>{destinationTime}</span></h2>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookingHeader;