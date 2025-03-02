import React from "react";
import { DatePicker  } from "antd";
import styles from "./Date.module.css";
import IDateUI from "./IDateUI";

const DateUI: React.FunctionComponent<IDateUI> = ({
  displayName,
  backendName,
  placeHolder,
  formik,
  className
}) => {
  const changeHandler = (newValue: string | string[]) => {
    formik.setFieldValue(backendName, newValue);
  };
  const isTouched = () => {
    formik.setFieldTouched(backendName,true);
  };
  const errorMessage = formik.errors[backendName];
  const isError = formik.touched[backendName] && typeof errorMessage === 'string';
  return (
    <div className={styles[`${className || "css1"}`]}>
      <label>{displayName}</label>
      <DatePicker
        onChange={(date:any , dateString:string | string[])=>changeHandler(dateString)}
        onBlur={isTouched}
        showTime={{ format: 'HH:mm' }}
      />
      {(isError && (formik.errors[backendName] as string)?.length > 0) && (
        <p>{formik.errors[backendName] as string}</p>
      )}
    </div>
  );
};

export default DateUI;
