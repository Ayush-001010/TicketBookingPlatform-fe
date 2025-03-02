import React from "react";
import ISignInPage from "./ISignInPage";
import Form from "../../Form/Form";
import CenterCard from "../../UIComponent/Cards/CenterCard";
import WelcomeCard from "../../UIComponent/WelcomeCard/WelcomeCard";
import styles from "./SignInPage.module.css";

const SignInPage: React.FunctionComponent<ISignInPage> = () => {
  return (
    <CenterCard>
      <div className={styles.css1}>
        <WelcomeCard />
        <Form formType="SignIn" formtitle="Sign In" >
          <Form.Title />
        </Form>
      </div>
    </CenterCard>
  );
};

export default SignInPage;
