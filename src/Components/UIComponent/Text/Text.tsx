import React, { PropsWithChildren } from "react";
import IText from "./IText";
import styles from "./Text.module.css";

const Text: React.FunctionComponent<IText & PropsWithChildren> = ({ children , className }) => {
  return <p className={styles[className || ""]}>{children}</p>;
};


export default Text;
