import React from "react";
import IReviewContent from "./IReviewContent";
import Header from "./Header/Header";
import JournaryDetails from "./JournaryDetails/JournaryDetails";
import PassengerDetails from "./PassengerDetails/PassengerDetails";
import Notes from "./Notes/Notes";
import PaymentButtons from "./PaymentButtons/PaymentButtons";
import styles from "./ReviewContent.module.css";

const ReviewContent : React.FunctionComponent<IReviewContent> = () => {
    return (
        <div className={styles.reviewContentDiv}>
            <Header/>
            <JournaryDetails/>
            <PassengerDetails />
            <Notes/>
            <PaymentButtons/>
        </div>
    )
};

export default ReviewContent;