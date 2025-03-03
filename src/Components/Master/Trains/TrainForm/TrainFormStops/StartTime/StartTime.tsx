import React, { useState } from "react";
import IStartTime from "./IStartTime";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import Input from "antd/es/input/Input";
import styles from "./StartTime.module.css";

interface IStartValue {
  time: string;
  avgSpeed: number;
}

const StartTime: React.FunctionComponent<IStartTime> = ({
  passingValueToParent,
}) => {
  const [value, setValue] = useState<IStartValue>({ time: "", avgSpeed: 0 });
  const changeHandlerForDate = (time: any, timeString: any) => {
    setValue((prevState: IStartValue) => {
      return { ...prevState, time: timeString };
    });
  };
  const changeHandlerForNumberInput = (event: any) => {
    setValue((prevState: IStartValue) => {
      return { ...prevState, avgSpeed: Number(event.target.value) };
    });
  };
  const submitHandler = () => {
    passingValueToParent(value);
  };
  return (
    <div className={styles.css1}>
      <div className={styles.css2}>
        <TimePicker
          format={"HH:mm"}
          onChange={changeHandlerForDate}
          defaultOpenValue={dayjs("00:00", "HH:mm")}
          placeholder="Starting Time"
        />
      </div>
      <div className={styles.css2}>
        <Input
          type="number"
          onChange={changeHandlerForNumberInput}
          placeholder="Average Speed"
        />
      </div>
      <div className={styles.css3}>
        <button onClick={submitHandler}><i className="bi bi-gear"/></button>
      </div>
    </div>
  );
};

export default StartTime;
