import React from "react";
import IAuthenticationHeader from "./IAuthenticationHeader";
import styles from "./AuthenticationHeader.module.css";

const AuthenticationHeader: React.FunctionComponent<IAuthenticationHeader> = () => {
    return (
        <div>
            <div className={styles.NavCss}>
                <p>
                    <i className="bi bi-train-front-fill" />
                    Ticket Booking
                </p>
            </div>
            <div className={styles.HeaderCss}>
                <div>
                    <h1>Great to see you again! Welcome back to your platform.</h1>
                    <p>Log in to take charge of your mission control.</p>
                </div>
            </div>
        </div>
    )
};

export default AuthenticationHeader