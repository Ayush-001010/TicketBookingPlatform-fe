import React from "react";
import IJourneyTickets from "./IJourneyTickets";
import { Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import useJourneyHook from "../../../../../hooks/useJourneyHook";

const JourneyTickets: React.FunctionComponent<IJourneyTickets> = ({ open, closeFunc, trainCode, JourneyDate }) => {
    const { getTicket } = useJourneyHook();

    const { data } = useQuery({
        queryFn: () => getTicket(trainCode, JourneyDate),
        queryKey: [trainCode, JourneyDate]
    });

    console.log("Data   ",data);
    return (
        <Modal open={open} footer={null} onCancel={closeFunc}>
            <h1>Tickets</h1>
            
        </Modal>
    )
};

export default JourneyTickets;