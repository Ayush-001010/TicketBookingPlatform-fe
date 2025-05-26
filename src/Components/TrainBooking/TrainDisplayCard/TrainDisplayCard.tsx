import React from "react";
import ITrainDisplayCard from "./ITrainDisplayCard";
import SideFilters from "./SideFilters/SideFilters";
import UpperCard from "./UpperCard/UpperCard";
import TrainDisplay from "./TrainDisplay/TrainDisplay";
import styles from "./TrainDisplayCard.module.css";

const TrainDisplayCard: React.FunctionComponent<ITrainDisplayCard> = () => {
  return (
    <div>
      <UpperCard/>
      <div className={styles.css1}>
        <SideFilters/>
        <TrainDisplay/>
      </div>
    </div>
  );
};

export default TrainDisplayCard;
