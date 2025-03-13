import React from "react";
import ITrainBookingCard from "./ITrainBookingCard";
import TrainImageCard from "../../UIComponent/Cards/TrainImageCard/TrainImageCard";
import styles from "./TrainBookingCard.module.css";
import TrainBookingFields from "./TrainBookingFields/TrainBookingFields";

const TrainBookingCard: React.FunctionComponent<ITrainBookingCard> = () => {
  return (
    <div className={styles.css1}>
      <TrainBookingFields/>
      <TrainImageCard />
    </div>
  );
};

export default TrainBookingCard;
