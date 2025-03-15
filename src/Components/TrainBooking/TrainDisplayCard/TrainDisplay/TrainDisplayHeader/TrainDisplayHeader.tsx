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
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  console.log("Header Value   ", data);
  const dateObj = new Date(data.travelDate);
  return (
    <div className={styles.css1}>
      <p>
        <span className={styles.css2}>Result Details: </span>
        <span className={styles.css3}>{`${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${weekdays[dateObj.getDay()]}. ${data.departureStation}-${data.destinationStation}`}</span>
      </p>
    </div>
  );
};

export default TrainDisplayHeader;
