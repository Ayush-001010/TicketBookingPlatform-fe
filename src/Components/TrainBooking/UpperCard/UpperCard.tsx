import React from "react";
import IUpperCard from "./IUpperCard";
import { Steps } from "antd";
import styles from "./UpperCard.module.css"

const UpperCard: React.FunctionComponent<IUpperCard> = ({ currentItem }) => {
  return (
    <div className={styles.css1}>
      <div className={`${styles.css2} ${styles[`${currentItem === 0 ? "active" : ""}`]}`}>
        <p><i className="bi bi-train-front" /> Select Train</p>
      </div>
      <div className={styles.css4}>
        <p className={styles.css3}></p>
      </div>
      <div className={`${styles.css2} ${styles[`${currentItem === 1 ? "active" : ""}`]}`}>
        <p><i className="bi bi-person-lines-fill" /> Passenger Details</p>
      </div>
      <div className={styles.css4}>
        <p className={styles.css3}></p>
      </div>
      <div className={`${styles.css2} ${styles[`${currentItem === 2 ? "active" : ""}`]}`}>
        <p><i className="bi bi-ticket" /> Ticket's Payment</p>
      </div>
    </div>
  );
};

export default UpperCard;
