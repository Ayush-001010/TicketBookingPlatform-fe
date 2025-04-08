import React, { useEffect, useState } from "react";
import IWelcomeCard from "./IWelcomeCard";
import styles from "./WelcomeCard.module.css";

const WelcomeCard: React.FunctionComponent<IWelcomeCard> = ({
  isSignIn,
  changeForm,
}) => {
  const [className, setClassName] = useState<string>("");
  let signInContent = (
    <>
      <div
        className={`${isSignIn ? styles.css3 : styles.hidden} ${
          className === "display-none-signUp" ? "" : styles.none
        }`}
      >
        <h1 className={styles.css2}>Hello, Welcome!!</h1>
        <p className={styles.css4}>Don't have an account?</p>
        <div className={styles.css6}>
          <button
            type="button"
            className={styles.css5}
            onClick={() => changeForm("signUp")}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
  const signUpContent = (
    <div
      className={`${isSignIn ? styles.hidden : styles.css7} ${
        className !== "display-none-signUp" ? "" : styles.none
      }`}
    >
      <h1 className={styles.css2}>Welcome back!!</h1>
      <p className={styles.css4}>Already have an account?</p>
      <div className={styles.css6}>
        <button
          type="button"
          className={styles.css5}
          onClick={() => changeForm("signIn")}
        >
          Login
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const obj = setTimeout(() => {
      if (!isSignIn) {
        setClassName("display-none-signIn");
      } else {
        setClassName("display-none-signUp");
      }
    }, 2000);
    return () => {
      clearTimeout(obj);
    };
  }, [isSignIn]);
  return (
    <div className={styles.css1}>
      {signInContent}
      {signUpContent}
    </div>
  );
};

export default WelcomeCard;
