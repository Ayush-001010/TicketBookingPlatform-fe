import React, { useState } from "react";
import IAuthentication from "./IAuthentication";
import AuthenticationCard from "./Card/AuthenticationCard";
import AuthenticationForm from "./AuthenticationForm/AuthenticationForm";
import styles from "./Authentication.module.css";

const Authentication: React.FunctionComponent<IAuthentication> = () => {
  return (
    <div className={styles.DivCss}>
      <AuthenticationForm />
      <AuthenticationCard />
    </div>
  );
};

export default Authentication;
