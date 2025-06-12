import { Button } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../ReviewContent.module.css";
import { useAppSelector } from "../../../../../Redux/Hooks";
import { ITrainTicketBookingInterface } from "../../../../../Service/Interface/TrainBookingInterface";
import { loadStripe } from '@stripe/stripe-js';
import APIService from "../../../../../Service/APIServices/APIService";

const PaymentButtons: React.FunctionComponent<{}> = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [isTatkalBooking, setIsTatkalBooking] = useState<boolean>(false);
    const [tatkalAmountVal, setTatkalAmountVal] = useState<number>(0);
    const data: any = useAppSelector(state => state.BookTrainTicket.data);
    const userEmail = useAppSelector( state => state.AuthenticationSlice.userEmail);
    console.log("Data   ", data);

    const paymentHandler = async () => {
        // tatkalBooking
        let response: any;
        if (!isTatkalBooking) {
            console.log(userEmail);
            response = await APIService.getData("/train/bookTrainSeat", { data: data  , userEmail } );
        } else {
            response = await APIService.getData("/train/tatkalBooking", { data , userEmail });
        }
        console.log("Response   ", response);
        if (response.success) {
            const makePaymentRequest = await APIService.getData("/train/makePayment", data);
            console.log("Payment Request    ", makePaymentRequest);
            if (makePaymentRequest.success) {
                const url = makePaymentRequest.data.url;
                window.location.href = url;
            }
        }
    }
    useEffect(() => {
        const dateObj = new Date(data[0]?.journeyStartDate || "");
        const currentDate = new Date();
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);

        const tatkalAmount = (nextDate.getDate() === dateObj.getDate() && nextDate.getMonth() === dateObj.getMonth() && nextDate.getFullYear() === dateObj.getFullYear()) ? (totalAmount * 20 / 100) : 0;

        setTatkalAmountVal(tatkalAmount);

        if ((nextDate.getDate() === dateObj.getDate() && nextDate.getMonth() === dateObj.getMonth() && nextDate.getFullYear() === dateObj.getFullYear()))
            setIsTatkalBooking(true);
        else
            setIsTatkalBooking(false);
    }, [])
    useEffect(() => {
        let amt = 0;
        data.forEach((item: ITrainTicketBookingInterface) => {
            amt += (item.price || 0);
        })
        setTotalAmount(amt);
    }, [])
    return (
        <div className={styles.paymentButtonsCss}>
            <Button onClick={paymentHandler}>Pay {(totalAmount + tatkalAmountVal).toFixed(2)} </Button>
        </div>
    )
};

export default PaymentButtons;