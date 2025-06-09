import React, { useEffect, useState } from "react";
import IUpcomingJournery from "./IUpcomingJournery";
import { useQuery } from "@tanstack/react-query";
import useJourneyHook from "../../../hooks/useJourneyHook";
import Cards from "../JourneyUI/Cards/Cards";
import JourneyCalendar from "../JourneyUI/Calendar/JourneyCalendar";
import JourneyItems from "../JourneyUI/JourneyItems/JourneyItems";
import { IJourneyDetails } from "../../../Service/Interface/JourneyInterface";
import styles from "./UpcomingJourney.module.css";
import SearchBar from "../JourneyUI/SearchBar/SearchBar";
import { message } from "antd";

const UpcomingJournery: React.FunctionComponent<IUpcomingJournery> = () => {
    const { getCardData, getDayByDayJourneyDetails, searchHandeler } = useJourneyHook();
    const [messageAPI , contextHandler ] = message.useMessage();
    const [searchValue, setSearchValue] = useState<string>("");
    const [data , setData] = useState<Array<any>>([]);
    const { data: cardData } = useQuery({
        queryFn: getCardData,
        queryKey: ["card"]
    });
    const { data: dayByDayJourneyDetails } = useQuery({
        queryFn: getDayByDayJourneyDetails,
        queryKey: ["Calender"]
    });

    const changeHandler = (value: string) => setSearchValue(value);

    useEffect(() => {
        const timeOutObj = setTimeout(() => {
            const searchData = searchHandeler(dayByDayJourneyDetails, searchValue);
            if(searchData.length > 0){
                setData(searchData);
            } else {
                messageAPI.error({content : "No Train Found!!"});
            }
        }, 3000);
        return () => {
            clearTimeout(timeOutObj);
        }
    },[searchValue]);
    useEffect(()=>{
        if(dayByDayJourneyDetails){
            setData(dayByDayJourneyDetails);
        }
    },[dayByDayJourneyDetails])
    console.log("dayByDayJourneyDetails ", dayByDayJourneyDetails);
    console.log("Data   ", cardData);

    return (
        <div>
            {contextHandler}
            <div>
                <div className={styles.cardsDiv}>
                    {dayByDayJourneyDetails && <JourneyCalendar data={dayByDayJourneyDetails} />}
                    {cardData && <Cards data={cardData} />}
                </div>
                <SearchBar value={searchValue} changeHandler={changeHandler} />
                {data && data.map((item: IJourneyDetails) => <JourneyItems item={item} />)}
            </div>
        </div>
    )
};

export default UpcomingJournery;