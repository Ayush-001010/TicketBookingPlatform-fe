import React from "react";
import ICards from "./ICards";
import styles from "./Cards.module.css";
import { Button } from "antd";

const Cards: React.FunctionComponent<ICards> = ({ data }) => {
    const { DepartureStation, DepartureTime, DestinationStation, DestinationTime, TrainName, TrainCode } = data.upcomingJourneyDetails[0]
    return (
        <div>
            <div className={styles.cardDivCss}>
                <p className={styles.cardDetailsCss}>Details</p>
                <div className={styles.upperCardContentCss}>
                    <p>Total Journey: <span className={styles.cardvalueCss}>{data.totalUpcomingJourney}</span></p>
                    <p>Upcoming Journey: <span className={styles.cardvalueCss}>{data.yearlyCount}</span></p>
                </div>
                <div className={styles.upperCardContentCss}>
                    <p>This Month Journeys: <span className={styles.cardvalueCss}>{data.monthlyCount}</span></p>
                    <p>Most Booked Train: <span className={styles.cardvalueCss}>{data.MostTravelTrain}</span></p>
                </div>
            </div>
            <div className={styles.cardDivCss}>
                <p className={styles.cardDetailsCss}>Next Journey</p>
                <div className={styles.cardJourneyDetailsCss}>
                    <div className={styles.cardJourneyHeaderCss}>
                        <h1>{DepartureStation}</h1>
                        <h2>{DepartureTime}</h2>
                    </div>
                    <div className={styles.logoDivCss}>
                        <p className={styles.line}></p>
                        <p className={styles.logo}>To</p>
                        <p className={styles.line}></p>
                    </div>
                    <div className={styles.cardJourneyHeaderCss}>
                        <h1>{DestinationStation}</h1>
                        <h2>{DestinationTime}</h2>
                    </div>
                </div>
                <div>
                    <div className={styles.cardJourneyBelowDetailsCSS}>
                        <p >Train Name : <span className={styles.cardJourneyBelowDetailsValueCSS}>{TrainName}</span></p>
                        <p>Train Code : <span className={styles.cardJourneyBelowDetailsValueCSS}>{TrainCode}</span></p>
                    </div>
                    <div className={styles.cardJourneyBelowDetailsCSS}>
                        <p>Total Ticket : <span className={styles.cardJourneyBelowDetailsValueCSS}>{data.upcomingJourneyDetails.length}</span></p>
                        <p>Status : <span className={styles.confirmCss}>Confirm</span></p>
                    </div>
                </div>
                <div className={styles.viewButton}>
                    <Button>
                        Details
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Cards