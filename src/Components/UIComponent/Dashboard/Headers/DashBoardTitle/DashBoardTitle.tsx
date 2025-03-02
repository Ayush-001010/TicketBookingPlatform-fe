import React from "react";
import { useGetDashboardContext } from "../../Dashboard";
import styles from "./DashBoardTitle.module.css";

const DashBoardTitle = () => {
  const value = useGetDashboardContext();
  return (
    <div className={styles.css1}>
      <p>{value.dashboardTitle}</p>
    </div>
  );
};


export default DashBoardTitle;