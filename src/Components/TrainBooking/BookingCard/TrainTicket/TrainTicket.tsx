import React from "react";
import ITrainTicket from "./ITrainTicket";
import styles from "./TrainTicket.module.css";

const TrainTicket: React.FunctionComponent<ITrainTicket> = ({ data }) => {
  return (
    <div className={styles.css2}>
      <div className={styles.css3}>
        <h1 className={styles.css4}>Passenger Details</h1>
        <div>
          <div className={styles.css7}>
            <label>Name</label>
            <input type="text" />
          </div>
          <div className={styles.css7}>
            <label>From</label>
            <input type="text" disabled={true} value={data.From} />
          </div>
          <div className={styles.css7}>
            <label>To</label>
            <input type="text" disabled={true} value={data.To}/>
          </div>
          <div className={styles.css7}>
            <label>Age</label>
            <input type="text" />
          </div>
          <div className={styles.css7}>
            <label>Phone Number</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className={styles.css5}>
        <h1 className={styles.css6}>Train Ticket</h1>
        <div>
          <div className={styles.css12}>
            <div className={styles.css8}>
              <label>Train Name</label>
              <p>{data.TrainName}</p>
            </div>
            <div className={styles.css8}>
              <label>Train Code</label>
              <p>{data.TrainCode}</p>
            </div>
          </div>
          <div className={styles.css12}>
            <div className={styles.css8}>
              <label>Train Departure Time</label>
              <p>{data.DepartureTime}</p>
            </div>
            <div className={styles.css8}>
              <label>Train Destination Time</label>
              <p>{data.DestinationTime}</p>
            </div>
          </div>
          <div className={styles.css12}>
            <div className={styles.css8}>
              <label>Train Coach Type</label>
              <p>{data.CoachType}</p>
            </div>
            <div className={styles.css8}>
              <label>Train Coach Number</label>
              <p>{data.CoachNumber}</p>
            </div>
            <div className={styles.css8}>
              <label>Train Seat Number</label>
              <p>{data.SeatNo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainTicket;
