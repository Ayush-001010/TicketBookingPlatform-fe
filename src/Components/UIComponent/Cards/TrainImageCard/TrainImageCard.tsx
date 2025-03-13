import React from "react";
import ITrainImageCard from "./ITrainImageCard";
import Image from "../../../../Images/TrainImg.avif";
import styles from "./TrainImageCard.module.css";

const TrainImageCard: React.FunctionComponent<ITrainImageCard> = () => {
  return (
    <div className={styles.css1}>
      <img src={Image} alt="Something" />
    </div>
  );
};

export default TrainImageCard;
