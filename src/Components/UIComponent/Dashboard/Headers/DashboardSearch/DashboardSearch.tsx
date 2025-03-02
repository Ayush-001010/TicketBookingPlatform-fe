import React, { useState } from "react";
import styles from "./DashboardSearch.module.css";
import { useGetDashboardContext } from "../../Dashboard";

const DashboardSearch: React.FunctionComponent<{}> = () => {
  const contextValue = useGetDashboardContext();
  const [value, setValue] = useState<string>("");
  const changeHandlerFunc = ({ target }: any) => {
    const { value: str } = target;
    setValue(str);
  };
  const clickHandlerFunc = () => {
    contextValue?.searchFunc(value);
  };
  return (
    <div>
      <input
        className={styles.css1}
        onChange={changeHandlerFunc}
        value={value}
      />
      <button className={styles.css3} onClick={clickHandlerFunc}>
        Search
      </button>
    </div>
  );
};

export default DashboardSearch;
