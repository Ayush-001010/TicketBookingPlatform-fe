import React, { useEffect, useState } from "react";
import IBookingCard from "./IBookingCard";
import UpperCard from "../TrainDisplayCard/UpperCard/UpperCard";
import { useAppSelector } from "../../../Redux/Hooks";
import BookingDetails from "./BookingDetails/BookingDetails";
import { ITrainTicketBookingInterface } from "../../../Service/Interface/TrainBookingInterface";
import useTrainBooking from "../../../hooks/useTrainBooking";
import { IOptions } from "../../../Service/Interface/CommonInterface";

const BookingCard: React.FunctionComponent<IBookingCard> = () => {
  const details:any= useAppSelector((state) => state.BookTrainTicket.data);
  const [data , setData] = useState<Array<ITrainTicketBookingInterface>>([]);
  const [options , setOptions] = useState<Record<string,Array<IOptions>> | null>(null);
  const { ticketBookingOptions , getPriceForEachSeat } = useTrainBooking();
  const [seatPrice , setSeatPrice] = useState<Record<string,number> | null>(null);
  console.log("BookingCard data:", data);
  const addNewPassengerHandler = () => {
    setData((prevState : Array<ITrainTicketBookingInterface>) => {
      const newPassenger : ITrainTicketBookingInterface = {
        departureStation : prevState[0].departureStation,
        destinationStation : prevState[0].destinationStation,
        trainCode : prevState[0].trainCode,
        passengerName : "",
        passengerAge : "",
        passengerGender : "",
        passengerCategory : data[0].passengerCategory,
        passengerCoachType: data[0].passengerCoachType,
        passengerPhone : "",
        journeyEndDate : prevState[0].journeyEndDate,
        journeyStartDate : prevState[0].journeyStartDate,
        departureTime : prevState[0].departureTime,
        destinationTime : prevState[0].destinationTime,
        trainName : prevState[0].trainName,
      }
      return [...prevState, newPassenger];
    });
  }
  useEffect(() => {
    ticketBookingOptions(details[0].trainCode).then((response)=>{
      setOptions(response);
    });
    getPriceForEachSeat(details[0].trainCode , details[0].departureStation, details[0].destinationStation).then((response) => {
      console.log("Price for each seat: ", response);
      setSeatPrice(response);
    });
  },[]);
  useEffect(() => {
    if (details && details.length > 0) {
      setData(details);
    }
  }
  , [details]);
  return (
    <div>
      <UpperCard currentItem={1} />
      <button onClick={addNewPassengerHandler}>Add New Passenger</button>
      {data.map((item : ITrainTicketBookingInterface) => <BookingDetails data={item} options={options} seatPrices={seatPrice} />)}
      <button>Next</button>
    </div>
  );
};

export default BookingCard;
