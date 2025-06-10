import React from "react";
import ITrainDisplayHeader from "./ITrainDisplayHeader";
import { useAppSelector } from "../../../../../Redux/Hooks";
import styles from "./TrainDisplayHeader.module.css";
import { Button, Tooltip } from "antd";

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
  const currentDate = new Date();
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  const takalPoints = <div className={styles.tatkalPointsCss}>
    <ul>
      <li>If you book a ticket for the day after the current date, it is considered a tatkal booking.</li>
      <li>Tatkal bookings open at 12 AM on the day before the current date.</li>
      <li>For a tatkal ticket, you must pay 20% extra.</li>
    </ul>
  </div>


  return (
    <div className={styles.css1}>
      <p>
        <span className={styles.css3}>Train Schedule for  {`${months[dateObj.getMonth()]} ${dateObj.getDate()} (${weekdays[dateObj.getDay()]})`}: </span>
        <span className={styles.css2}>{`Departure from  ${data.departureStation} to ${data.destinationStation}`}</span>
      </p>
      {(nextDate.getDate() === dateObj.getDate() && nextDate.getMonth() == dateObj.getMonth() && nextDate.getFullYear() === dateObj.getFullYear()) &&
        <div className={styles.tatkalButtonDivCss}>
          <Tooltip placement="top" title={takalPoints}>
            <Button>Tatkal</Button>
          </Tooltip>
        </div>
      }
    </div>
  );
};

export default TrainDisplayHeader;
