import React from "react";
import IJourneyTickets from "./IJourneyTickets";
import { Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import useJourneyHook from "../../../../../hooks/useJourneyHook";
import styles from "./JourneyTickets.module.css";

const JourneyTickets: React.FunctionComponent<IJourneyTickets> = ({ open, closeFunc, trainCode, JourneyDate }) => {
    const { getTicket } = useJourneyHook();

    const { data } = useQuery({
        queryFn: () => getTicket(trainCode, JourneyDate),
        queryKey: [trainCode, JourneyDate]
    });

    console.log("Data   ", data);
    return (
        <Modal open={open} footer={null} onCancel={closeFunc}>
            <div className={styles.journeyTicketsHeaderDivCss}>
                <h1>Tickets</h1>
            </div>
            <div className={styles.journeyTicketsDetailsCss}>
                <div className={styles.journeyTicketsDetailsHeaderCss}>
                    <p>Name</p>
                    <p>Seat Number</p>
                    <p>Coach Number</p>
                    <p>Status</p>
                </div>
                {data && data.map((item: any) => (
                    <div className={styles.journeyTicketsDetailsValueDivCss}>
                        <p>{item.PassengerName}</p>
                        <p>{item.SeatNumber}</p>
                        <p>{item.CoachNumber}</p>
                        <p>Confirm</p>
                    </div>
                ))}
            </div>
        </Modal>
    )
};

export default JourneyTickets;