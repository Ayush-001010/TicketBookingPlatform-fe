import React, { useEffect, useState } from "react";
import IBookingCard from "./IBookingCard";
import UpperCard from "../UpperCard/UpperCard";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks";
import BookingDetails from "./BookingDetails/BookingDetails";
import { ITrainTicketBookingInterface } from "../../../Service/Interface/TrainBookingInterface";
import useTrainBooking from "../../../hooks/useTrainBooking";
import { IOptions } from "../../../Service/Interface/CommonInterface";
import { setBookTrainTicket } from "../../../Redux/Slices/BookTrainTicket";
import BookingHeader from "./BookingHeader/BookingHeader";
import styles from "./BookingCard.module.css";
import { Button } from "antd";
import { setTrainDetailsData } from "../../../Redux/Slices/TrainDetails";

const BookingCard: React.FunctionComponent<IBookingCard> = () => {
  const details: any = useAppSelector((state) => state.BookTrainTicket.data);
  const [data, setData] = useState<Array<ITrainTicketBookingInterface>>([]);
  const [finalValue, setFinalValue] = useState<Array<ITrainTicketBookingInterface>>([]);
  const [options, setOptions] = useState<Record<string, Array<IOptions>> | null>(null);
  const { ticketBookingOptions, getPriceForEachSeat, addNewPassenger } = useTrainBooking();
  const [seatPrice, setSeatPrice] = useState<Record<string, number> | null>(null);
  const dispatch = useAppDispatch();
  const [startTakingData, setStartTakingData] = useState<boolean>(false);

  const goBackHandler = () => {
    dispatch(setTrainDetailsData({isStart : false }));
  }
  const completedHandler = () => {
    setStartTakingData(true);
  }
  const takingDataFromChild = (isError: boolean, value?: ITrainTicketBookingInterface | null) => {
    console.log("isError  ",isError);
    if (isError) {
      setStartTakingData(false);
    }
    setFinalValue((prevState: any) => {
      return [...prevState, value]
    })
  }
  const addNewPassengerHandler = () => {
    setData((prevState: Array<ITrainTicketBookingInterface>) => {
      const newPassenger: ITrainTicketBookingInterface = addNewPassenger(prevState[0]);
      return [...prevState, newPassenger];
    });
  }
  useEffect(() => {
    ticketBookingOptions(details[0].trainCode).then((response) => {
      setOptions(response);
    });
    getPriceForEachSeat(details[0].trainCode, details[0].departureStation, details[0].destinationStation).then((response) => {
      setSeatPrice(response);
    });
  }, []);
  useEffect(() => {
    if (details && details.length > 0) {
      setData(details);
    }
  }, [details]);
  useEffect(() => {
    const timeObj = setTimeout(() => {
      if (startTakingData) {
        console.log(finalValue);
        dispatch(setBookTrainTicket({ isStart: true, data: finalValue, isStartReview: true }));
      }
    }, 3000);
    return () => {
      clearTimeout(timeObj);
    }
  }, [finalValue])
  return (
    <div>
      <UpperCard currentItem={1} />
      <BookingHeader trainName={data[0]?.trainName || ""} departureStation={data[0]?.departureStation || ""} departureTime={data[0]?.departureTime || ""} destinationStation={data[0]?.destinationStation || ""} destinationTime={data[0]?.destinationTime || ""} />
      <div className={styles.placeContentToEnd}>
        <Button className={styles.addPassengerButton} onClick={addNewPassengerHandler}>Add New Passenger</Button>
      </div>
      <div className={styles.passengerDetailsCards}>
        {data.map((item: ITrainTicketBookingInterface, index: number) => <BookingDetails passingDataToParentFunc={takingDataFromChild} startCompletingProcess={startTakingData} passengerNumber={index + 1} data={item} options={options} seatPrices={seatPrice} />)}
      </div>
      <div className={styles.bottomButtons}>
        <Button className={styles.goBackButtonCSS} onClick={goBackHandler}>Go Back</Button>
        <Button className={styles.completedButtonCSS} onClick={completedHandler}>Completed</Button>
      </div>
    </div>
  );
};

export default BookingCard;
