import React from "react";
import { useAppSelector } from "../../../../../Redux/Hooks";
import { ITrainTicketBookingInterface } from "../../../../../Service/Interface/TrainBookingInterface";
import styles from "../ReviewContent.module.css";

const PassengerDetails: React.FunctionComponent<{}> = () => {
    const data = useAppSelector(state => state.BookTrainTicket.data);

    return (
        <div className={styles.passengerDetailsDivCss}>
            <p className={styles.passengerDeatilsTitleCss}>Passenger Details</p>
            <div>
                <div className={styles.passengerDetailsHeadersCss}>
                    <p>Name</p>
                    <p>Age</p>
                    <p>Gender</p>
                    <p>Category</p>
                    <p>Phone Number</p>
                    <p>Coach Type</p>
                    <p>Price</p>
                </div>
                {data.map((item: ITrainTicketBookingInterface) => (
                    <div className={styles.passengerDetailsItemCss}>
                        <p>{item.passengerName}</p>
                        <p>{item.passengerAge}</p>
                        <p>{item.passengerGender}</p>
                        <p>{item.passengerCategory}</p>
                        <p>{item.passengerPhone}</p>
                        <p>{item.passengerCoachType}</p>
                        <p>{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default PassengerDetails;