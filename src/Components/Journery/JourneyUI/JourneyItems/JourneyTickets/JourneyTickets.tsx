import React from "react";
import IJourneyTickets from "./IJourneyTickets";
import { Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import useJourneyHook from "../../../../../hooks/useJourneyHook";
import styles from "./JourneyTickets.module.css";
import { useAppSelector } from "../../../../../Redux/Hooks";

const JourneyTickets: React.FunctionComponent<IJourneyTickets> = ({ open, closeFunc, trainCode, JourneyDate }) => {
    const { getTicket } = useJourneyHook();
    const userEmail = useAppSelector(state => state.AuthenticationSlice.userEmail)

    const { data } = useQuery({
        queryFn: () => getTicket(trainCode, JourneyDate,userEmail),
        queryKey: [trainCode, JourneyDate,userEmail]
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