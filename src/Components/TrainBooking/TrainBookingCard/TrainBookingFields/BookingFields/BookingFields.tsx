import React from "react";
import IBookingFields from "./IBookingFields";
import { IFormFields } from "../../../../../Service/Form/formConfig";
import { DatePicker, Select } from "antd";
import styles from "./BookingFields.module.css";
import RequredIndicator from "../../../../UIComponent/Text/RequredIndicator/RequredIndicator";

const BookingFields: React.FunctionComponent<IBookingFields> = ({ fields , options , changeHandler  }) => {
  return (
    <div>
      {fields.map((currItem: Array<IFormFields>) => {
        return (
          <div className={styles.css2}>
            {currItem.map((item: IFormFields) => {
              const { fieldType, displayName , backendName , isRequired , minDate , placeholder} = item;
              switch (fieldType) {
                case "date": {
                  return (
                    <div className={styles.css1}>
                      <label>{displayName} {isRequired ? <RequredIndicator /> : ""}</label>
                      <DatePicker minDate={minDate}  onChange={(val , newValue) => changeHandler(newValue as string,backendName)}/>
                    </div>
                  );
                }
                case "time": {
                  return (
                    <div className={styles.css1}>
                      <label>{displayName} {isRequired ? <RequredIndicator /> : ""}</label>
                      <div>
                        <Select  className={styles.css3} options={ options ? options[`${backendName}Hr`]:[]} onChange={(newValue) => changeHandler(newValue,`${backendName}Hr`)} /> <span>:</span> <Select options={ options ? options[`${backendName}Minutes`]:[]} className={styles.css3} onChange={(newValue) => changeHandler(newValue,`${backendName}Minutes`)} />{" "}
                      </div>
                    </div>
                  );
                }
                case "dropdown": {
                  return (
                    <div className={styles.css1}>
                      <label>{displayName} {isRequired ? <RequredIndicator /> : ""}</label>
                      <Select placeholder={placeholder} options={options ? options[backendName] :[]} onChange={(newValue) => changeHandler(newValue,backendName)}/>
                    </div>
                  );
                }
                default:
                  return null;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BookingFields;
