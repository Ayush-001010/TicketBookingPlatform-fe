import React from "react";
import IPopup from "../IPop.up";
import { Modal } from "antd";
import styles from "../Popup.module.css";

const TrainNotFoundPopup: React.FunctionComponent<IPopup> = ({open , decisionFunc}) => {
    return (
        <Modal open={open} footer={[]} onCancel={()=>decisionFunc()} centered>
            <div className={styles.css1}>
                <h1 className={styles.css4}>No Train Found</h1>
            </div>
            <div className={styles.css1}>
                <p className={styles.css5}>Sorry, we couldn't find any trains matching your search criteria. Please try again with different dates or routes.</p>
            </div>
            <div className={styles.css1}>
                <button className={styles.css6} onClick={()=>decisionFunc()}>Close</button>
            </div>
        </Modal>
    )
}


export default TrainNotFoundPopup;