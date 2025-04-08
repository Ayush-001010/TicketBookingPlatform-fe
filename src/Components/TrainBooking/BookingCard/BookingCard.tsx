import React from "react";
import IBookingCard from "./IBookingCard";
import UpperCard from "../TrainDisplayCard/UpperCard/UpperCard";
import { useAppSelector } from "../../../Redux/Hooks";
import styles from "./BookingCard.module.css";
import TrainTicket from "./TrainTicket/TrainTicket";

const BookingCard: React.FunctionComponent<IBookingCard> = () => {
  const data = useAppSelector((state) => state.BookTrainTicket.data);
  return (
    <div>
      <UpperCard currentItem={1} />
      <div className={styles.css1}>
        {data.map((item: any) => (
          <TrainTicket data={item} />
        ))}
      </div>
    </div>
  );
};

export default BookingCard;
