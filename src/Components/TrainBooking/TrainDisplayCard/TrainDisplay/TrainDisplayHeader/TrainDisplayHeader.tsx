import React from "react";
import ITrainDisplayHeader from "./ITrainDisplayHeader";
import { useAppSelector } from "../../../../../Redux/Hooks";
import styles from "./TrainDisplayHeader.module.css";

const TrainDisplayHeader: React.FunctionComponent<ITrainDisplayHeader> = () => {
  const data = useAppSelector((state) => state.TrainBookingDetailsSlice);
  if (!data) return <></>;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateObj = new Date(data.travelDate);
  return (
    <div className={styles.css1}>
      <p>
        <span className={styles.css3}>Train Schedule for  {`${months[dateObj.getMonth()]} ${dateObj.getDate()} (${weekdays[dateObj.getDay()]})`}: </span>
        <span className={styles.css2}>{`Departure from  ${data.departureStation} to ${data.destinationStation}`}</span>
      </p>
    </div>
  );
};

export default TrainDisplayHeader;
