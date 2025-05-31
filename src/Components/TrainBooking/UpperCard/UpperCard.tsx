import React from "react";
import IUpperCard from "./IUpperCard";
import { Steps } from "antd";
import styles from "./UpperCard.module.css"

const UpperCard: React.FunctionComponent<IUpperCard> = ({ currentItem }) => {
  return (
    <div className={styles.css1}>
      <div className={`${styles.css2} ${currentItem === 1 ? `${styles.active}` : `${styles.deactive}`}`}>
        <p><i className="bi bi-train-front" /> Select Train</p>
      </div>
      <div>
        <p></p>
      </div>
      <div className={`${styles.css2} ${currentItem === 2 ? styles.active : styles.deactive}`}>
        <p><i className="bi bi-person-lines-fill" /> Passenger Details</p>
      </div>
      <div>
        <p></p>
      </div>
      <div className={`${styles.css2} ${currentItem === 3 ? styles.active : styles.deactive}`}>
        <p><i className="bi bi-ticket" /> Ticket's Payment</p>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default UpperCard;
