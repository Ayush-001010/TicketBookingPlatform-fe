import React from "react";
import IInput from "./IInput";
import { Input } from "antd";
import styles from "./Input.module.css";

const InputUI: React.FunctionComponent<IInput> = ({
  displayName,
  backendName,
  placeHolder,
  type,
  formik,
  className
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(backendName, event.target.value);
  };
  const isTouched = () => {
    formik.setFieldTouched(backendName,true);
  };
  const errorMessage  : string = formik.errors[backendName] ? formik.errors[backendName] as string : "";
  const isError = (formik.touched[backendName] && typeof errorMessage === 'string' ) || errorMessage?.includes("required");
  console.log("Formik ",formik.errors);
  return (
    <div className={styles[`${className || "css1"}`]}>
      <label>{displayName}</label>
      <Input
        type={type}
        value={formik.values[backendName]}
        onChange={changeHandler}
        placeholder={placeHolder}
        onBlur={isTouched}
      />
      {(isError && (formik.errors[backendName] as string)?.length > 0) && (
        <p>{formik.errors[backendName] as string}</p>
      )}
    </div>
  );
};

export default InputUI;
