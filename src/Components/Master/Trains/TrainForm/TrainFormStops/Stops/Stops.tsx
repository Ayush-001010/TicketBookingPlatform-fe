import React, { useEffect, useState } from "react";
import IStops from "./IStops";
import { Select, Input, TimePicker, Tooltip } from "antd";
import { ITrainStops } from "../../../../../../Service/Interface/AddTrainInterface";
import dayjs from "dayjs";
import styles from "./Stops.module.css";

const Stops: React.FunctionComponent<IStops> = ({
  value,
  options,
  disabled,
  index,
  passingValueToParent,
  deleteStop,
  type,
}) => {
  const [data, setData] = useState<ITrainStops | null>(null);
  const changeHandler = (value: string, backendName: string) => {
    passingValueToParent(value, backendName, index);
  };
  useEffect(() => {
    setData(null);
    console.log("Value  ", value);
    const val = { ...value };
    setData(val);
  }, [value.time, value.distance, value, value.placeName]);
  return (
    <>
      {data && (
        <div className={styles.css1}>
          {type !== "Price" && (
            <div className={styles.css2}>
              <Tooltip title="Delete">
                <button disabled={disabled} onClick={() => deleteStop(index)}>
                  <i className="bi bi-trash3-fill" />
                </button>
              </Tooltip>
            </div>
          )}
          <div className={styles.css3}>
            <div className={styles.css5}>
              <label className={styles.css4}>Place Name</label>
              <Select
                value={data?.placeName}
                options={options}
                disabled={disabled}
                onChange={(newValue) => changeHandler(newValue, "placeName")}
                className={styles.css6}
              />
            </div>
            <div className={styles.css5}>
              <label className={styles.css4}>Timing</label>
              <TimePicker
                format={"HH:mm"}
                value={
                  data?.time === ""
                    ? dayjs("00:00", "HH:mm")
                    : dayjs(data.time, "HH:mm")
                }
                onChange={(date, dateString) =>
                  changeHandler(dateString.toString(), "time")
                }
                disabled={disabled}
                className={styles.css6}
              />
            </div>
          </div>
          {type === "Price" && (
            <>
              {data.price &&
                Object.keys(data.price).map((currKey: string) => (
                  <div className={styles.css5}>
                    <label className={styles.css4}>Price of {currKey}</label>
                    <Input
                      type="number"
                      value={data.price ? data.price[currKey] : ""}
                      onChange={(event) =>
                        changeHandler(event.target.value, "distance")
                      }
                      className={styles.css6}
                    />
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Stops;
