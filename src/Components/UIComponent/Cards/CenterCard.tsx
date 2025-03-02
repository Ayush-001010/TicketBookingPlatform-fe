import React, { PropsWithChildren } from 'react';
import styles from "./CenterCard.module.css";

const CenterCard : React.FunctionComponent<PropsWithChildren> = ( { children} ) => {
  return (
    <div className={styles.css1}>
        <div className={styles.css2}>
        {children}
        </div>
    </div>
  )
}

export default CenterCard;