import React from "react";
import { Select } from "antd";
import styles from "./SelectInput.module.css";
import ISelect from "./ISelectInput";

const SelectUI: React.FunctionComponent<ISelect> = ({
  displayName,
  backendName,
  placeHolder,
  formik,
  className,
  option,
  isMultiple
}) => {
  const changeHandler = (newValue:any) => {
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
      <Select
        value={formik.values[backendName]}
        onChange={(newValue:any)=>changeHandler(newValue)}
        mode={ isMultiple ?  "multiple" : undefined}
        placeholder={placeHolder}
        onBlur={isTouched}
        options={option}
        showSearch={true}
      />
      {(isError && (formik.errors[backendName] as string)?.length > 0) && (
        <p>{formik.errors[backendName] as string}</p>
      )}
    </div>
  );
};

export default SelectUI;
