import React, { useMemo, useState, useEffect } from "react";
import IAuthenticationFields from "./IAuthenticationFields";
import AuthenticationConfig from "../../../Service/Config/AuthenticationConfig";
import { IForm } from "../../../Service/Interface/CommonInterface";
import styles from "./AuthenticationFields.module.css";

const AuthenticationFields: React.FunctionComponent<IAuthenticationFields> = ({
  isSignIn,
  passingValue,
}) => {
  const [value, setValue] = useState<any>({});

  const changeHandler = ( value : any  , backendName : string) => {
    setValue((prevValue: any) => ({
      ...prevValue,
      [backendName]: value,
    }));
  }
  const fields: Array<IForm> = useMemo(() => {
    if (isSignIn) {
      return AuthenticationConfig.signInFields;
    } else {
      return AuthenticationConfig.signUpFields;
    }
  }, [isSignIn]);
  const submitHandlerFunc = () => {
    passingValue(value);
  };
  useEffect(() => {
    const formValue = fields.reduce((acc: any, field: IForm) => {
      acc[field.backendName] = value[field.backendName] || ""; // Default to empty string if not set
      return acc;
    }, {});
    setValue(formValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  return (
    <div>
      <div className={styles.css1}>
        <h1>{isSignIn ? "Log In" : "Sign Up"} </h1>
      </div>
      <hr />
      <div className={styles.css3}>
        {fields.map((field) => (
          <div className={styles.css2}>
            <label>{field.displayName}</label>
            <input type={field.type} value={value[field.backendName]} onChange={(event) => changeHandler(event.target.value , field.backendName)} />
          </div>
        ))}
      </div>
      <div className={styles.css4}>
        <button onClick={submitHandlerFunc}>Submit</button>
      </div>
    </div>
  );
};
export default AuthenticationFields;
