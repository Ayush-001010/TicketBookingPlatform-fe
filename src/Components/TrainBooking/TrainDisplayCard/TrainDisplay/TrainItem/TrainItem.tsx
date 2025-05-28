import React, { useState , useEffect, use} from "react";
import ITrainItem from "./ITrainItem";
import styles from "./TrainItem.module.css";
import SeatDisplay from "./SeatDisplay/SeatDisplay";
import CommonConfig from "../../../../../Service/Config/CommonConfig";

const TrainItem: React.FunctionComponent<ITrainItem> = ({ data }) => {
  const [seatDisplay, setSeatDisplay] = useState<boolean>(false);
  const [startDate , setStartDate] = useState<string>("");
  const [endDate , setEndDate] = useState<string>("");

  console.log("TrainItem data", data);
  const seatDisplayFunc = () => {
    setSeatDisplay(true);
  };

  useEffect(() => {
    if(data){
      const startDateTime = new Date(data.StartDate);
      const endDateTime = new Date(data.EndDate);
      setStartDate(`${startDateTime.getDate()} ${CommonConfig.monthNames[startDateTime.getMonth()]}`);
      setEndDate(`${endDateTime.getDate()} ${CommonConfig.monthNames[endDateTime.getMonth()]}`);
    }
  }, [data]);
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
          <div className={styles.css16}>
            <p className={styles.css10}>{data.DepartureTime} <span className={styles.css9}>({startDate})</span></p>
            <p className={styles.css11}>{data.DepartureStation}</p>
          </div>
          <div className={styles.css12}>
            <p className={styles.css13}>Total Journey: <span> {data.TotalJourneyTime}</span> </p>
            <p className={styles.css14}>
              <i className="bi bi-chevron-right"></i>
            </p>
          </div>
          <div className={styles.css16}>
            <p className={styles.css10}>{data.DestinationTime} <span className={styles.css9}>({endDate})</span></p>
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
        <div className={styles.css15}>
          <SeatDisplay data={data} />
        </div>
      )}
    </div>
  );
};

export default TrainItem;
