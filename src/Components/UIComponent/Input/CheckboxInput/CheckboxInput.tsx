import React from "react";
import { Checkbox, DatePicker  } from "antd";
import styles from "./CheckboxInput.module.css";
import ICheckboxInput from "./ICheckboxInput";

const CheckboxInput: React.FunctionComponent<ICheckboxInput> = ({
  displayName,
  backendName,
  formik,
  className
}) => {
  const changeHandler = (newValue: any) => {
    console.log(newValue)
    formik.setFieldValue(backendName, newValue);
  };
  const isTouched = () => {
    formik.setFieldTouched(backendName,true);
  };
  const errorMessage = formik.errors[backendName];
  const isError = formik.touched[backendName] && typeof errorMessage === 'string';
  return (
    <div className={styles[`${className || "css1"}`]} >
      <label>{displayName}</label>
      <Checkbox onChange={(e)=>changeHandler(e.target.checked)} value={formik.values[backendName]} onBlur={isTouched} />
      {(isError && (formik.errors[backendName] as string)?.length > 0) && (
        <p>{formik.errors[backendName] as string}</p>
      )}
    </div>
  );
};

export default CheckboxInput;
