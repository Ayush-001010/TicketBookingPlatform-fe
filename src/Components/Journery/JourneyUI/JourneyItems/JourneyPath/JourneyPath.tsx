import React from "react";
import IJourneyPath from "./IJourneyPath";
import { Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import useJourneyHook from "../../../../../hooks/useJourneyHook";
import styles from "./JourneyPath.module.css";

const JourneyPath: React.FunctionComponent<IJourneyPath> = ({ open, closeFunc, TrainCode, DepartureStation, DestinationStation }) => {
    const { getTrainJourney } = useJourneyHook();
    const { data } = useQuery({
        queryFn: () => getTrainJourney(TrainCode, DepartureStation, DestinationStation),
        queryKey: [DepartureStation, DestinationStation, TrainCode]
    })
    const calculatingDepartureTime = (arrivalTime: string, stoppageTime: number) => {
        const timeArr = arrivalTime.split(":");
        let newMints = (Number(timeArr[1]) + stoppageTime);
        let newHour = Number(timeArr[0]);
        if (newMints > 60) {
            newMints = newMints % 60;
            newHour += 1;
        }
        return `${newHour}:${newMints}`;
    }
    console.log("Data   ", data);
    return (
        <Modal open={open} onCancel={closeFunc} footer={null}>
            <div className={styles.journeyPathHeader}>
                <h1>Journey Path</h1>
            </div>
            {data && data.map((item: any, index: number) => {
                return (
                    <>
                        <div className={styles.JourneyPathContent}>
                            <div>
                                <h1>{item.PlaceName}</h1>
                            </div>
                            <div className={styles.journeyPathDeatilsDivCss}>
                                <p>Arrival Time : <span>{item.Time}</span></p>
                                <p>Departure Time :<span>{calculatingDepartureTime(item.Time, Number(item.TrainStoppageTime))}</span></p>
                            </div>
                            <div className={styles.journeyPathDeatilsDivCss}>
                                <p>Distance : <span>{(Number(item.Distance)) - (Number(data[0].Distance))}</span></p>
                                <p>Stoppage Time : <span>{item.TrainStoppageTime}</span></p>
                            </div>
                        </div>
                        {index !== data.length - 1 && <div className={styles.journeyPathLine}></div>}
                    </>
                )
            })}
        </Modal>
    )
};

export default JourneyPath;