import React from "react";
import IReviewPage from "./IReviewPage";
import { useAppSelector } from "../../../Redux/Hooks";
import UpperCard from "../UpperCard/UpperCard";
import ReviewContent from "./ReviewContent/ReviewContent";

const ReviewPage : React.FunctionComponent<IReviewPage> = () => {
    const data = useAppSelector(state => state.BookTrainTicket.data);
    console.log("Data   ",data);
    return (
        <div>
            <UpperCard currentItem={2}/>
            <ReviewContent/>
        </div>
    )
};

export default ReviewPage;