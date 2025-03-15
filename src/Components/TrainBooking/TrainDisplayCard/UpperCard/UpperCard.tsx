import React from "react";
import IUpperCard from "./IUpperCard";
import { Steps } from "antd";
import styles from "./UpperCard.module.css"

const UpperCard: React.FunctionComponent<IUpperCard> = () => {
  return (
    <div className={styles.css1}>
      <Steps
        current={0}
        items={[
          {
            description: "Select Train",
            className: styles.css2,
            icon: <i className="bi bi-train-front" />,
          },
          {
            description :  "Passenger Details",
            className: styles.css2,
            icon  : <i className="bi bi-person-lines-fill"/>
          },
          {
            description :  "Ticket's Payment",
            className: styles.css2,
            icon  : <i className="bi bi-ticket"/>
          },
        ]}
      />
    </div>
  );
};

export default UpperCard;
