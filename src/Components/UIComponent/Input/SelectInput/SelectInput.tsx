import React from "react";
import { Select } from "antd";
import styles from "./SelectInput.module.css";
import ISelect from "./ISelectInput";
import AddTrainConfig from "../../../../Service/Config/AddTrainConfig";
import { IOptions } from "../../../../Service/Interface/CommonInterface";

const SelectUI: React.FunctionComponent<ISelect> = ({
  displayName,
  backendName,
  placeHolder,
  formik,
  className,
  option,
  isMultiple,
  dependableField,
}) => {
  const changeHandler = (newValue: any) => {
    formik.setFieldValue(backendName, newValue);
    if (backendName === "RunningSchedule") {
      if (newValue === "Daily") {
        formik.setFieldValue(
          "RunningDay",
          AddTrainConfig.runningDayOpt.map((item: IOptions) => item.label)
        );
      } else {
        formik.setFieldValue("RunningDay", []);
      }
    } else if (backendName === "RunningDay") {
      const val = AddTrainConfig.runningDayOpt.map(
        (item: IOptions) => item.label
      );
      let flag = true;
      for(const curr of val) {
        if(!newValue.includes(curr)){
          flag = false;
        }
      }
      if(flag){
        formik.setFieldValue("RunningSchedule","Daily");
      } else {
        formik.setFieldValue("RunningSchedule","Weekly");
      }
    }
  };
  const isTouched = () => {
    formik.setFieldTouched(backendName, true);
  };
  const errorMessage: string = formik.errors[backendName]
    ? (formik.errors[backendName] as string)
    : "";
  const isError =
    (formik.touched[backendName] && typeof errorMessage === "string") 
  return (
    <div className={styles[`${className || "css1"}`]}>
      <label>{displayName}</label>
      <Select
        value={formik.values[backendName]}
        onChange={(newValue: any) => changeHandler(newValue)}
        mode={isMultiple ? "multiple" : undefined}
        placeholder={placeHolder}
        onBlur={isTouched}
        options={option}
        showSearch={true}
        disabled={dependableField ? !formik.values[dependableField] : false}
      />
      {isError && (formik.errors[backendName] as string)?.length > 0 && (
        <p>{formik.errors[backendName] as string}</p>
      )}
    </div>
  );
};

export default SelectUI;
