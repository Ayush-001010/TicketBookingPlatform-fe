import * as React from "react";
import IFromInformation from "./IFromInformation";
import { useGetFormContext } from "../Form";
import styles from "./FromInformation.module.css";

const FromInformation: React.FunctionComponent<IFromInformation> = () => {
  const contextValue = useGetFormContext();
  return (
    <div>
      <p className={styles.css1}>* {contextValue?.information}</p>
    </div>
  );
};

export default FromInformation;
