import React, { useEffect } from "react";
import IHome from "./IHome";
import TrainBookingCard from "./TrainBookingCard/TrainBookingCard";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import TrainDisplayCard from "./TrainDisplayCard/TrainDisplayCard";
import BookingCard from "./BookingCard/BookingCard";
import ReviewPage from "./ReviewPage/ReviewPage";
import { setTrainDetailsData } from "../../Redux/Slices/TrainDetails";

const Home: React.FunctionComponent<IHome> = () => {
  const { data : trainData} = useAppSelector((state) => state.TrainDetailsSlice);
  const dispatch = useAppDispatch();
  const {isStart : isStartBooking , isStartReview } = useAppSelector(
    (state) => state.BookTrainTicket
  );
  useEffect(()=>{
    dispatch(setTrainDetailsData({data:[],allData:[]}))
  },[])
  return (
    <div>
      {trainData.length === 0 && !isStartBooking && <TrainBookingCard />}
      {trainData.length > 0 && !isStartBooking && <TrainDisplayCard />}
      {isStartBooking && !isStartReview && <BookingCard />}
      {isStartReview && <ReviewPage/>}
    </div>
  );
};

export default Home;
