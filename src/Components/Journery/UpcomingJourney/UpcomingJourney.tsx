import React from "react";
import IUpcomingJournery from "./IUpcomingJournery";
import { useQuery } from "@tanstack/react-query";
import useJourneyHook from "../../../hooks/useJourneyHook";
import Cards from "../JourneyUI/Cards/Cards";
import JourneyCalendar from "../JourneyUI/Calendar/JourneyCalendar";
import JourneyItems from "../JourneyUI/JourneyItems/JourneyItems";
import { IJourneyDetails } from "../../../Service/Interface/JourneyInterface";
import styles from "./UpcomingJourney.module.css";

const UpcomingJournery: React.FunctionComponent<IUpcomingJournery> = () => {
    const { getCardData, getDayByDayJourneyDetails } = useJourneyHook();
    const { data: cardData } = useQuery({
        queryFn: getCardData,
        queryKey: ["card"]
    });
    const { data: dayByDayJourneyDetails } = useQuery({
        queryFn: getDayByDayJourneyDetails,
        queryKey: ["Calender"]
    });

    console.log("dayByDayJourneyDetails ", dayByDayJourneyDetails);
    console.log("Data   ", cardData);

    return (
        <div>
            <div>
                <div className={styles.cardsDiv}>
                    {dayByDayJourneyDetails && <JourneyCalendar data={dayByDayJourneyDetails} />}
                    {cardData && <Cards data={cardData} />}
                </div>
                {dayByDayJourneyDetails && dayByDayJourneyDetails.map((item: IJourneyDetails) => <JourneyItems item={item} />)}
            </div>
        </div>
    )
};

export default UpcomingJournery;