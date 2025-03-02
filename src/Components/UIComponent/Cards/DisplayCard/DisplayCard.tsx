import React from "react";
import IDisplayCard from "./IDisplayCard";
import styles from "./DisplayCard.module.css";

const DisplayCard: React.FunctionComponent<IDisplayCard> = ({value}) => {
  const key = Object.keys(value) || [];
  return (
    <div className={styles.css1}>
      {key.map((card: string) => {
        return (
          <div>
            <h2>{value[card]}</h2>
            <p>{card}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayCard;
