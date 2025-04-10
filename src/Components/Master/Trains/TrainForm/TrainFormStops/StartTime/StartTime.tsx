import React, { useState } from "react";
import IStartTime from "./IStartTime";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import Input from "antd/es/input/Input";
import styles from "./StartTime.module.css";

interface IStartValue {
  time: string | null;
  avgSpeed: number | null;
}
interface IStartValueError {
  time: boolean;
  avgSpeed: boolean;
}

const StartTime: React.FunctionComponent<IStartTime> = ({
  passingValueToParent,
}) => {
  const [value, setValue] = useState<IStartValue>({
    time: null,
    avgSpeed: null,
  });
  const [isError, setisError] = useState<IStartValueError>({
    time: false,
    avgSpeed: false,
  });
  const changeHandlerForDate = (time: any, timeString: any) => {
    setValue((prevState: IStartValue) => {
      return { ...prevState, time: timeString };
    });
    setisError((prevState: IStartValueError) => {
      return { ...prevState, time: false };
    });
  };
  const changeHandlerForNumberInput = (event: any) => {
    setValue((prevState: IStartValue) => {
      return { ...prevState, avgSpeed: Number(event.target.value) };
    });
    setisError((prevState: IStartValueError) => {
      return { ...prevState, avgSpeed: false };
    });
  };
  const submitHandler = () => {
    if (value.time === null || value.avgSpeed === null) {
      setisError(() => {
        return {
          time: value.time === null,
          avgSpeed: value.avgSpeed === null
        };
      });
      return;
    }
    if (value) {
      const val: any = { ...value };
      passingValueToParent(val);
    }
  };
  return (
    <div className={styles.css1}>
      <div className={styles.css2}>
        <label>Starting Time</label>
        <TimePicker
          format={"HH:mm"}
          onChange={changeHandlerForDate}
          defaultOpenValue={dayjs("00:00", "HH:mm")}
          placeholder="Ex- 9:00"
          className={`${ isError.time ? styles.error : "" }`}
          />
      </div>
      <div className={styles.css2}>
        <label>Average Speed</label>
        <Input
          type="number"
          onChange={changeHandlerForNumberInput}
          placeholder="Ex - 45km/h"
          className={`${ isError.avgSpeed ? styles.error : "" }`}
        />
      </div>
      <div className={styles.css3}>
        <button onClick={submitHandler}>
          <i className="bi bi-gear" />
        </button>
      </div>
    </div>
  );
};

export default StartTime;
