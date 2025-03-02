import React, { PropsWithChildren } from 'react'
import styles from "./DashboardCard.module.css";

const DashboardCard : React.FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.css1}>
        {children}
    </div>
  )
}


export default DashboardCard;