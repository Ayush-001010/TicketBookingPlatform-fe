import React from "react";
import IPopup from "../IPop.up";
import { Modal } from "antd";
import styles from "../Popup.module.css";

const AfterSubmitPopup  : React.FunctionComponent<IPopup> = ({ open , popupType , decisionFunc , message}) => {
    return (
        <Modal open={open} onCancel={() => decisionFunc()} footer={[]}>
            <div>
                <div className={styles.logoDivCss}>
                    {popupType === "Success" ? <p className={styles.successIconCss}><i className="bi bi-check-circle" /></p>: <p><i className="bi bi-emoji-frown"/></p> }
                </div>
                <div>
                    {popupType === "Success" ? <h2 className={styles.successfullyTextCss}>Successfully Action Take!!</h2> : <h2>Something Went Wrong</h2>}
                </div>
                <div>
                    <p>{message}</p>
                </div>
                <div>
                    <button className={styles.buttonAfterSubmitPopupCss} onClick={() => decisionFunc()} >
                        {popupType === "Success" ? "Close" : "Try Again"}
                    </button>
                </div>
            </div>            
        </Modal>
    )
}

export default AfterSubmitPopup;