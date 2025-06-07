import { Button, Modal } from "antd";
import React from "react";
import IPopup from "../IPop.up";
import styles from "../Popup.module.css";

const AfterSuccessfullyAuthenticated :  React.FunctionComponent<IPopup> = ({open , decisionFunc , isLogIn}) => {
    return (
        <Modal open={open} onCancel={()=>decisionFunc()} footer={null} centered >
            <h1 className={styles.SignUpPopUpHeaderCss}>{ !isLogIn ? "Thanks! your account has been successfully created."  : "You have successfully logged in!" }</h1>
            <p className={styles.SignUpPopUpTextCss}>{!isLogIn ? "Please log in now with your new credentials and continue your journey." : "Please now continue your journey."}</p>
            <Button className={styles.SignUpPopUpButtonCss} onClick={() => decisionFunc()}>OK</Button>
        </Modal> 
    )
};

export default AfterSuccessfullyAuthenticated;