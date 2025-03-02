import React, { useState } from "react";
import IFilterItems from "./IFilterItems";
import { IFilter } from "../../../../../../Service/Interface/CommonInterface";
import { Button, Select } from "antd";
import styles from "./FilterItems.module.css";
import { useGetDashboardContext } from "../../../Dashboard";

const FilterItems: React.FunctionComponent<IFilterItems> = ({
  filterArray,
}) => {
  const contextValue = useGetDashboardContext();
  const [value, setValue] = useState<Record<string, any>>({});
  const selectHandlerFunc = (newValue: any, backendName: string) => {
    setValue((prevValue) => {
      return {
        ...prevValue,
        [backendName]: newValue,
      };
    });
  };
  const applyFilterHandler = () => {
    contextValue.applyFilterFunc(value);
  }
  const clearFilterHandler = () => {
    setValue({});
  }
  return (
    <div className={styles.css1}>
      {filterArray &&
        filterArray.map((currItem: IFilter) => {
          const { displayName, backendName, options } = currItem;
          return (
            <div className={styles.css2}>
              <label>{displayName}</label>
              <Select
                options={options}
                onChange={(newValue: any) =>
                  selectHandlerFunc(newValue, backendName)
                }
                value={value[backendName] || null}
                showSearch={true}
              />
            </div>
          );
        })}
        <div className={styles.css3}>
          <Button onClick={applyFilterHandler}> Apply</Button>
          <Button onClick={clearFilterHandler}> Clear</Button>
        </div>
    </div>
  );
};

export default FilterItems;
