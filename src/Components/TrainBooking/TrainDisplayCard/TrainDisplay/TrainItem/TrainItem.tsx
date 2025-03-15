import React, { useState } from "react";
import ITrainItem from "./ITrainItem";
import styles from "./TrainItem.module.css";
import SeatDisplay from "./SeatDisplay/SeatDisplay";

const TrainItem: React.FunctionComponent<ITrainItem> = ({ data }) => {
  const [seatDisplay, setSeatDisplay] = useState<boolean>(false);

  const seatDisplayFunc = () => {
    setSeatDisplay(true);
  };
  return (
    <div className={styles.css1}>
      <div className={styles.css2}>
        <div className={styles.css3}>
          <p className={styles.css5}>
            <span className={styles.css4}>
              <i className="bi bi-train-front" />
            </span>
            {data.TrainName}
            <span className={styles.css6}>({data.TrainCode})</span>
          </p>
          <p className={styles.css7}>{data.TypeOfTrain}</p>
        </div>
        <div className={styles.css8}>
          <div>
            <p className={styles.css9}>13 March 2025</p>
            <p className={styles.css10}>{data.leavingTime}</p>
            <p className={styles.css11}>{data.DepartureStation}</p>
          </div>
          <div className={styles.css12}>
            <p className={styles.css13}>Total Journey</p>
            <p className={styles.css14}>
              <i className="bi bi-chevron-right"></i>
            </p>
          </div>
          <div>
            <p className={styles.css9}>13 March 2025</p>
            <p className={styles.css10}>{data.destinationTime}</p>
            <p className={styles.css11}>{data.DestinationStation}</p>
          </div>
        </div>
      </div>
      {!seatDisplay && (
        <div className={styles.css15}>
          <button onClick={seatDisplayFunc}>Check Avaliabilty</button>
        </div>
      )}
      {seatDisplay && (
        <div>
          <SeatDisplay data={data} />
        </div>
      )}
    </div>
  );
};

export default TrainItem;
