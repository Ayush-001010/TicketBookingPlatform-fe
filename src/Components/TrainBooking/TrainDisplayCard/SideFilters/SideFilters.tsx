import React, { useEffect, useState } from "react";
import ISideFilters from "./ISideFilters";
import useTrainBooking from "../../../../hooks/useTrainBooking";
import {
  ISideFilter,
  ISideFilterDetails,
} from "../../../../Service/Interface/TrainBookingInterface";
import { Checkbox, Radio } from "antd";
import styles from "./SideFilters.module.css";

const SideFilters: React.FunctionComponent<ISideFilters> = () => {
  const { genrateSideFilters } = useTrainBooking();
  const [fields, setFields] = useState<Array<ISideFilter>>([]);
  const [value, setValue] = useState<Record<string, boolean>>({});
  const { applyFilter , resetFilter } = useTrainBooking();

  const initialValues = (fields : any) => {
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
    applyFilter(value);
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
