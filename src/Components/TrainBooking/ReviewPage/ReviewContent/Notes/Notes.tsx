import React from "react";
import styles from "../ReviewContent.module.css";

const Notes: React.FunctionComponent<{}> = () => {
    return (
        <div className={styles.notesDivCss}>
            <p>Notes</p>
            <ul className={styles.notesCss}>
                <li>
                    Double-check the train number, date, departure time, and station names to avoid booking errors.
                </li>
                <li>
                    Enter accurate names, ages, and identification details, as corrections may not be possible post-booking.
                </li>
                <li>
                    Make sure the required identification (Aadhaar, passport, etc.) is handy for verification during travel.
                </li>
                <li>
                    If eligible, verify senior citizen discounts, Child fares, or promotional offers before booking.
                </li>
                <li>
                    If booking online, use a stable internet connection to prevent payment failures.
                </li>
            </ul>
        </div>
    )
};

export default Notes;