import React, { useState } from "react";
import IJourneyItems from "./IJourneyItems";
import styles from "./JourneyItem.module.css";
import { Button } from "antd";
import JourneyPath from "./JourneyPath/JourneyPath";
import JourneyTickets from "./JourneyTickets/JourneyTickets";
import moment from "moment";

const JourneyItems: React.FunctionComponent<IJourneyItems> = ({ item }) => {
    const { DepartureStation, DepartureTime, DestinationStation, DestinationTime, TrainName, TrainCode, journeyDate } = item;
    const [openViewJourney, setOpenViewJourney] = useState<boolean>(false);
    const [openViewTicket, setOpenViewTicket] = useState<boolean>(false);

    console.log("Journey Date   ", journeyDate);

    const viewJourneyClickHandler = () => setOpenViewJourney(true);
    const closeViewJourney = () => setOpenViewJourney(false);
    const viewTicketClickHandler = () => setOpenViewTicket(true);
    const closeViewTicket = () => setOpenViewTicket(false);
    return (
        <div className={styles.cardItemDivCSS}>
            <div className={styles.cardHeaderCss}>
                <h1>{TrainName}<span>({TrainCode})</span></h1>
                <div className={styles.journeyDateCss}>
                    <p>Journey date : <span className={styles.journeyValue}>{moment(journeyDate).format("DD/MM/YYYY")}</span></p>
                </div>
            </div>
            <div className={styles.cardJourneyDetailsCss}>
                <div className={styles.journeyDetailsCss}>
                    <div>
                        <h1>{DepartureStation}</h1>
                        <h2>{DepartureTime}</h2>
                    </div>
                </div>

                <div className={styles.logoDivCss}>
                    <p className={styles.line}></p>
                    <p className={styles.logoCss}>To</p>
                    <p className={styles.line}></p>
                </div>
                <div className={styles.journeyDetailsCss}>
                    <h1>{DestinationStation}</h1>
                    <h2>{DestinationTime}</h2>
                </div>
            </div>
            <div className={styles.journeyButtonCss}>
                <Button onClick={viewJourneyClickHandler}>View Journey</Button>
                <Button onClick={viewTicketClickHandler}>View Ticket</Button>
                {/* <Button>Cancel</Button> */}
            </div>
            {openViewJourney && <JourneyPath open={openViewJourney} closeFunc={closeViewJourney} TrainCode={TrainCode} DepartureStation={DepartureStation} DestinationStation={DestinationStation} />}
            {openViewTicket && <JourneyTickets open={openViewTicket} closeFunc={closeViewTicket} trainCode={TrainCode} JourneyDate={new Date(journeyDate)} />}
        </div>
    )
};

export default JourneyItems;