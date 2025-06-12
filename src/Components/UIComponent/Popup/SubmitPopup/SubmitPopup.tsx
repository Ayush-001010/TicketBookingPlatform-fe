import React from "react";
import IPopup from "../IPop.up";
import { Modal } from "antd";
import styles from "../Popup.module.css";

const SubmitPopup: React.FunctionComponent<IPopup> = ({ open, decisionFunc, message }) => {
    return (
        <Modal open={open} onCancel={() => decisionFunc("cancel")} footer={[]}>
            <div className={styles.logoDivCss}>
                <p className={styles.logo1}>
                    <i className="bi bi-exclamation-circle"></i>
                </p>
            </div>
            <div className={styles.contentDivCss}>
                <h1 className={styles.areYouSureTextCss}>Are You Sure?</h1>
                <p className={styles.areYouSureTextMessageCss}>{message} This action cannot be undone.</p>
            </div>
            <div className={styles.buttonCssOfSumbitPopUp}>
                <button onClick={() => decisionFunc("submit")}>Yes, Submit</button>
                <button onClick={() => decisionFunc("cancel")}>Cancel</button>
            </div>
        </Modal>
    )
};

export default SubmitPopup;