import React from "react";
import IHome from "./IHome";
import TrainBookingCard from "./TrainBookingCard/TrainBookingCard";
import { useAppSelector } from "../../Redux/Hooks";
import TrainDisplayCard from "./TrainDisplayCard/TrainDisplayCard";
import BookingCard from "./BookingCard/BookingCard";

const Home: React.FunctionComponent<IHome> = () => {
  const trainData = useAppSelector((state) => state.TrainDetailsSlice.data);
  const isStartBooking = useAppSelector(
    (state) => state.BookTrainTicket.isStart
  );
  return (
    <div>
      {trainData.length === 0 && !isStartBooking && <TrainBookingCard />}
      {trainData.length > 0 && !isStartBooking && <TrainDisplayCard />}
      {isStartBooking && <BookingCard />}
    </div>
  );
};

export default Home;
