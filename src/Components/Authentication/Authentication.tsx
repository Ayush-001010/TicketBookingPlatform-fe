import React, { useState } from "react";
import IAuthentication from "./IAuthentication";
import styles from "./Authentication.module.css";
import AuthenticationCard from "./AuthenticationCard/AuthenticationCard";
import WelcomeCard from "./WelcomeCard/WelcomeCard";
import AuthenticationFields from "./AuthenticationFields/AuthenticationFields";
import useAuthentication from "../../hooks/useAuthentication";
import { message } from "antd";
import { useAppDispatch } from "../../Redux/Hooks";
import { isSignIn   } from "../../Redux/Slices/Authentication";

const Authentication: React.FunctionComponent<IAuthentication> = () => {
  const [isSignInVal, setIsSignIn] = useState<boolean>(true);
  const [messageAPI, contextHandler] = message.useMessage();
  const { authenticateUser, signIn } = useAuthentication(messageAPI);
  const dispatch = useAppDispatch();

  const gettingValue = async (value: any) => {
    if (!isSignInVal) {
      const response = await authenticateUser(value);
      if (response) {
        setIsSignIn(true);
      }
    } else {
      const response = await signIn(value);
      if (response) {
        console.log("response", response);
        dispatch(isSignIn({ ...response.data , isLogin : true}));
        window.location.hash = "#/";
      }
    }
  };
  const changeForm = (value: string) => {
    if (value === "signUp") {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  };
  return (
    <AuthenticationCard>
      {contextHandler}
      <div className={styles.css1}>
        <WelcomeCard isSignIn={isSignInVal} changeForm={changeForm} />
      </div>
      <div className={styles.css2}>
        <AuthenticationFields isSignIn={isSignInVal} passingValue={gettingValue} />
      </div>
    </AuthenticationCard>
  );
};

export default Authentication;
