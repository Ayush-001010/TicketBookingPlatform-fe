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
    const val = { ...value };
    setData(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    value.time,
    value.distance,
    value.placeName,
    type,
    value.price,
    value.TrainStoppageTime,
  ]);
  return (
    <>
      {data && (
        <div className={styles.css1}>
          {type !== "Price" && type !== "Preview" && (
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
                disabled={(disabled && type !== "AddStops") || index === 0}
                className={styles.css6}
              />
            </div>
            <div className={styles.css5}>
              <label className={styles.css4}>Distance</label>
              <Input
                value={data.distance}
                onChange={({ target }: any) =>
                  changeHandler(target.value, "distance")
                }
                disabled={(disabled && type !== "AddStops") || index === 0}
                className={styles.css6}
              />
            </div>
            <div className={styles.css5}>
              <label className={styles.css4}>Stoppage Time</label>
              <Input
                value={data.TrainStoppageTime}
                onChange={({ target }: any) =>
                  changeHandler(target.value, "TrainStoppageTime")
                }
                disabled={disabled && type !== "AddStops"}
                className={styles.css6}
              />
            </div>
          </div>
          {(type === "Price" || type === "Preview") && (
            <>
            {/* <hr></hr> */}
              {/* <h1 className={styles.css8}>Price of Seats : </h1> */}
              <div className={styles.css10}>
                {data.price &&
                  Object.keys(data.price).map((currKey: string) => (
                    <div className={styles.css5}>
                      <label className={styles.css7}>Price of {currKey}</label>
                      <Input
                        type="number"
                        value={data.price ? data.price[currKey] : ""}
                        onChange={(event) =>
                          changeHandler(event.target.value, currKey)
                        }
                        className={styles.css11}
                        disabled={type === "Preview"}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Stops;
