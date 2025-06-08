import { Button } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../ReviewContent.module.css";
import { useAppSelector } from "../../../../../Redux/Hooks";
import { ITrainTicketBookingInterface } from "../../../../../Service/Interface/TrainBookingInterface";
import {loadStripe} from '@stripe/stripe-js';
import APIService from "../../../../../Service/APIServices/APIService";

const PaymentButtons : React.FunctionComponent<{}> = () => {
    const [totalAmount , setTotalAmount] = useState<number>(0);
    const data = useAppSelector(state => state.BookTrainTicket.data);

    const paymentHandler = async () => {
        const response = await APIService.getData("/train/bookTrainSeat" , {data : data});
        console.log("Response   ",response);
        if(response.success) {
            const makePaymentRequest = await APIService.getData("/train/makePayment",data);
            console.log("Payment Request    ",makePaymentRequest);
            if(makePaymentRequest.success){
                const url = makePaymentRequest.data.url;
                window.location.href = url;
            }
        }
    }
    useEffect(()=>{
        let amt = 0;
        data.forEach((item : ITrainTicketBookingInterface) => {
            amt += ( item.price || 0 );
        }) 
        setTotalAmount(amt);
    },[])
    return (
        <div className={styles.paymentButtonsCss}>
            <Button onClick={paymentHandler}>Pay {totalAmount.toFixed(2)} </Button>
        </div>
    )
};

export default PaymentButtons;