import React, { PropsWithChildren } from "react";
import IAuthenticationCard from "./IAuthenticationCard";
import styles from "./AuthenticationCard.module.css";

const AuthenticationCard: React.FunctionComponent<IAuthenticationCard & PropsWithChildren> = ({children}) => {
  return (
  <div className={styles.css1}>
    {children}
  </div>);
};

export default AuthenticationCard;
