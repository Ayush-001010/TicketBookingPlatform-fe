import React from "react";
import IReviewPage from "./IReviewPage";
import { useAppSelector } from "../../../Redux/Hooks";
import {loadStripe} from '@stripe/stripe-js';
import APIService from "../../../Service/APIServices/APIService";

const ReviewPage : React.FunctionComponent<IReviewPage> = () => {
    const data = useAppSelector(state => state.BookTrainTicket.data);
    console.log("Data   ",data);
    const makePay = async () => {
        const strip = await loadStripe("pk_test_51RUfZhR0UyWsYtBqGmHP59KMjUOs3hdy472hFeSNHGHWHSps0UrWYLo5oltAags77OvZzDtDPgkRpkV706psb2ol00bc4eeswJ")
        const response = await APIService.getData("/train/makePayment" , data)
    }
    return (
        <div>
            <button onClick={makePay}> Pay </button>
        </div>
    )
};

export default ReviewPage;