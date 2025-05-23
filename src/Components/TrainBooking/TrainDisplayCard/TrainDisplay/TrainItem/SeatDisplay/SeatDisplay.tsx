import React, { useEffect, useState } from "react";
import ISeatDisplay from "./ISeatDisplay";
import { socket } from "../../../../../../socket";
import { useAppDispatch, useAppSelector } from "../../../../../../Redux/Hooks";
import styles from "./SeatDisplay.module.css";
import useTrainBooking from "../../../../../../hooks/useTrainBooking";
import { setBookTrainTicket } from "../../../../../../Redux/Slices/BookTrainTicket";

const SeatDisplay: React.FunctionComponent<ISeatDisplay> = ({ data }) => {
  const [active, setActive] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { getPrice } = useTrainBooking();
  const bookingDetails = useAppSelector(
    (state) => state.TrainBookingDetailsSlice
  );
  const [value, setValue] = useState([]);

  const startBooking = () => {
    const obj = { Name : "" , From  : bookingDetails.departureStation , To : bookingDetails.destinationStation , TrainName : data.TrainName, TrainCode : data.TrainCode ,CoachType : active ,CoachNumber : "-" , Age : "" , Type : "" , PhoneNumber : "" , DestinationTime : data.destinationTime , DepartureTime : data.leavingTime , SeatNo:"-"};
    const arr = [];
    for(let i=0;i<Number(bookingDetails.Adults);i++){
      obj.Type = "Adults";
      arr.push(obj);
    }
    for(let i=0;i<Number(bookingDetails.Kids);i++){
      obj.Type = "Kids";
      arr.push(obj);
    }
    for(let i=0;i<Number(bookingDetails.seniorCitizen);i++){
      obj.Type = "Senior Citizen";
      arr.push(obj);
    }
    dispatch(setBookTrainTicket({isStart : true , data : arr}))
  }
  const selectHandler = (val: string) => {
    setActive(val);
    setIsSubmit(false);
  };
  const getPriceHandler = async () => {
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
          setValue(trainDetailsValue.response);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <div className={styles.css1}>
        {value.map((curr: any) => (
          <div
            className={`${
              active === curr.CoachType ? styles.css5 : styles.css2
            }`}
            onClick={() => selectHandler(curr.CoachType)}
          >
            <p className={styles.css3}>{curr.CoachType}</p>
            <p className={styles.css4}>{curr.Seats}</p>
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
              <span className={styles.css9}>{price}</span> {" "}
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
