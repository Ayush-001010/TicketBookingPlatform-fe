import React, { useEffect, useState } from "react";
import ISideFilters from "./ISideFilters";
import useTrainBooking from "../../../../hooks/useTrainBooking";
import {
  ISideFilter,
  ISideFilterDetails,
} from "../../../../Service/Interface/TrainBookingInterface";
import { Checkbox, message } from "antd";
import styles from "./SideFilters.module.css";
import TicketBookingConfig from "../../../../Service/Config/TicketBookingConfig";

const SideFilters: React.FunctionComponent<ISideFilters> = () => {
  const { genrateSideFilters } = useTrainBooking();
  const [messageAPI , contextHandler] = message.useMessage();
  const [fields, setFields] = useState<Array<ISideFilter>>([]);
  const [value, setValue] = useState<Record<string, boolean>>({});
  const { applyFilter, resetFilter } = useTrainBooking();

  const initialValues = (fields: any) => {
    let obj = {};
    for (const item of fields) {
      for (const subItem of item.fields) {
        obj = { ...obj, [subItem.labelName]: false };
      }
    }
    return obj;
  }
  const changeHandler = ({ checked }: any, backendName: string) => {
    setValue((prevState: any) => {
      return { ...prevState, [backendName]: checked };
    });
  };
  const applyFilterHanler = () => {
    const trainTypeFieldApplied: Array<string> = [];
    const trainTimingFieldApplied: Array<string> = [];
    for (const key in value) {
      if (value[key] && !TicketBookingConfig.TrainTimingFilter.includes(key)) {
        trainTypeFieldApplied.push(key);
      } else if( value[key] && TicketBookingConfig.TrainTimingFilter.includes(key)){
        trainTimingFieldApplied.push(key);
      }
    }
    if(!applyFilter(trainTypeFieldApplied , trainTimingFieldApplied)){
      messageAPI.error({content : "No Train Found!!"});
    }
  }
  const resetFilterHandler = () => {
    resetFilter();
    const initialValue = initialValues(fields);
    setValue(initialValue);
  }

  useEffect(() => {
    genrateSideFilters().then((response: Array<ISideFilter>) => {
      setFields(response);
      const initialValue = initialValues(response);
      setValue(initialValue);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.css1}>
      {contextHandler}
      {fields.map((item: ISideFilter) => (
        <div>
          <h1 className={styles.css2}>{item.header}</h1>
          <div className={styles.css4}>
            {item.fields.map((subItem: ISideFilterDetails) => {
              const { fieldType, labelName, radioID } = subItem;
              switch (fieldType) {
                case "checkbox": {
                  return (
                    <div className={styles.css3}>
                      <Checkbox
                        onChange={(event) =>
                          changeHandler(event.target, labelName)
                        }
                        checked={value[labelName]}
                      />
                      <label>{labelName}</label>
                    </div>
                  );
                }
                default:
                  return null;
              }
            })}
          </div>
        </div>
      ))}
      <div className={styles.css5}>
        <button onClick={applyFilterHanler}>Apply</button>
        <button onClick={resetFilterHandler}>Reset Filter</button>
      </div>
    </div>
  );
};

export default SideFilters;
