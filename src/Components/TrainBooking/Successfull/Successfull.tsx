import * as React from "react";
import ISuccessfull from "./ISuccessfull";
import styles from "./Successfull.module.css";
import { Link } from "react-router-dom";

const Successfull: React.FunctionComponent<ISuccessfull> = () => {
    return (
        <div className={styles.centerDivCss}>
            <div className={styles.logoDivCss}>
                <p><i className="bi bi-check-circle-fill" /></p>
            </div>
            <div className={styles.textDivCss}>
                <h1>Your ticket has been booked successfully! 🎉</h1>
                <p>
                    <Link to="/UpcomingJourneys">
                        Click here to view your ticket!
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default Successfull;