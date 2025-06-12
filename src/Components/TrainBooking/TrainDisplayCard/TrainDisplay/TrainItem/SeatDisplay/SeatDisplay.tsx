import React, { useEffect, useState } from "react";
import ISeatDisplay from "./ISeatDisplay";
import { socket } from "../../../../../../socket";
import { useAppDispatch, useAppSelector } from "../../../../../../Redux/Hooks";
import styles from "./SeatDisplay.module.css";
import useTrainBooking from "../../../../../../hooks/useTrainBooking";
import { setBookTrainTicket } from "../../../../../../Redux/Slices/BookTrainTicket";
import { ITrainTicketBookingInterface } from "../../../../../../Service/Interface/TrainBookingInterface";
import { message } from "antd";

const SeatDisplay: React.FunctionComponent<ISeatDisplay> = ({ data }) => {
  const [active, setActive] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [messageAPI , contextHandler] = message.useMessage();
  const dispatch = useAppDispatch();

  const { getPrice } = useTrainBooking();
  const bookingDetails = useAppSelector(
    (state) => state.TrainBookingDetailsSlice
  );
  const [value, setValue] = useState([]);

  const startBooking = () => {
    const obj : ITrainTicketBookingInterface = {
      trainName : data.TrainName,
      departureStation: data.DepartureStation,
      destinationStation: data.DestinationStation,
      departureTime: data.DepartureTime,
      destinationTime: data.DestinationTime,
      journeyEndDate : data.EndDate,
      journeyStartDate : data.StartDate,
      passengerName: "",
      passengerAge : "",
      passengerGender : "",
      passengerPhone: "",
      passengerCoachType: active,
      passengerCategory: "",
      trainCode : data.TrainCode,

    };
    const arr = [];
    for(let i=0;i<Number(bookingDetails.Adults);i++){
      obj.passengerCategory = "Adult";
      arr.push({...obj});
    }
    for(let i=0;i<Number(bookingDetails.Kids);i++){
      obj.passengerCategory = "Child";
      arr.push({...obj});
    }
    for(let i=0;i<Number(bookingDetails.seniorCitizen);i++){
      obj.passengerCategory = "Senior Citizen";
      arr.push({...obj});
    }
    dispatch(setBookTrainTicket({isStart : true , data : arr}))
  }
  const selectHandler = (val: string) => {
    setActive(val);
    setIsSubmit(false);
  };
  const getPriceHandler = async () => {
    console.log("Active   ",active);
    if(active.length === 0){
      messageAPI.destroy();
      messageAPI.error("Please select a Coach Type.");
      return;
    }
    const res = await getPrice(active, data.TrainCode);
    setPrice(res);
    setIsSubmit(true);
  };
  useEffect(() => {
    if (data) {
      socket.emit("train-details", {
        trainCode: data.TrainCode,
        journeyDate: new Date(bookingDetails.travelDate),
        DepartureStation: bookingDetails.departureStation,
        DestinationStation: bookingDetails.destinationStation,
      });
      socket.on("train-details-data", (trainDetailsValue) => {
        if (trainDetailsValue.trainCode === data.TrainCode) {
          console.log("Train Details Value  ",trainDetailsValue);
          setValue(trainDetailsValue.response);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      {contextHandler}
      <div className={styles.css1}>
        {value.map((curr: any) => (
          <div
            className={`${
              active === curr.CoachName ? styles.css5 : styles.css2
            }`}
            onClick={() => selectHandler(curr.CoachName)}
          >
            <p className={styles.css3}>{curr.CoachName}</p>
            <p className={styles.css4}>{curr.TotalAvalibleSeats}</p>
          </div>
        ))}
      </div>
      {!isSubmit && (
        <div className={styles.css6}>
          <button onClick={getPriceHandler}>Check Price</button>
        </div>
      )}
      {isSubmit && (
        <div className={styles.css7}>
          <div>
            <p className={styles.css8}>
              Price:{" "} 
              <span className={styles.css9}>{price.toFixed(2)}</span> {" "}
              <span className={styles.css10}>
                ( Adults: {bookingDetails.Adults} , Kids: {bookingDetails.Kids}{" "}
                , Senior Citezen: {bookingDetails.seniorCitizen} )
              </span>
            </p>
          </div>
          <div className={styles.css11}>
            <button onClick={startBooking}>Book</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatDisplay;
