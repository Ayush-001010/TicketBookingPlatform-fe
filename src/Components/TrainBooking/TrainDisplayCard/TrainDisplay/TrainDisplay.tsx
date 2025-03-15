import React from "react";
import ITrainDisplay from "./ITrainDisplay";
import { useAppSelector } from "../../../../Redux/Hooks";
import TrainItem from "./TrainItem/TrainItem";
import styles from "./TrainDisplay.module.css";

const TrainDisplay : React.FunctionComponent<ITrainDisplay> = () => {
    const trainData = useAppSelector((state) => state.TrainDetailsSlice.data);
    return (
        <div className={styles.css1}>
            {trainData.map((currItem) => <TrainItem data={currItem} />)}
        </div>
    )
};

export default TrainDisplay;