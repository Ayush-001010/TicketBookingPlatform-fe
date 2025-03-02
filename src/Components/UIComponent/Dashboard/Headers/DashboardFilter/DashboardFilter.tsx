import React from "react";
import IDashboardFilter from "./IDashboardFilter";
import { useGetDashboardContext } from "../../Dashboard";
import styles from "./DashboardFilter.module.css";

const DashboardFilter: React.FunctionComponent<IDashboardFilter> = () => {
  const value = useGetDashboardContext();
  const showFilter = () => {
    value.showFilterFunc();
  }
  return (
    <>
      <div className={styles.css1}>
        <button onClick={showFilter}>Filter</button>
      </div>
    </>
  );
};

export default DashboardFilter;
