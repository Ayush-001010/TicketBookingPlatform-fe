import React, { useEffect, useState } from "react";
import ITrainFormStops from "./ITrainFormStops";
import StartTime from "./StartTime/StartTime";
import useAddTrainFunc from "../../../../../hooks/useAddTrainFunc";
import { ITrainStops } from "../../../../../Service/Interface/AddTrainInterface";
import Stops from "./Stops/Stops";
import { Button, message } from "antd";
import styles from "./TrainFormStops.module.css";

const TrainFormStops: React.FunctionComponent<ITrainFormStops> = ({
  placesOptions,
  DepartureStation,DestinationStation,
  passingValueToParentFunc
}) => {
  const [messageAPI, contextHandler] = message.useMessage();
  const { genratedStopsConfig, modifyConfig } = useAddTrainFunc(messageAPI);
  const [data, setData] = useState<Array<ITrainStops>>([]);

  const passingValueToParent = () => {
    passingValueToParentFunc(data);
  }
  const genrateStops = (
    oldValue: Array<ITrainStops>,
    value: ITrainStops,
    startIndex: number,
    endIndex: number
  ) => {
    return genratedStopsConfig(oldValue, value, startIndex, endIndex);
  };
  const gettingInitialTime = async (value: {
    time: string;
    avgSpeed: number;
  }) => {
    const val = await modifyConfig(data, value);
    setData([...val]);
  };
  const addStops = (index: number) => {
    const val = genrateStops(
      data,
      { placeName: "", time: "", distance: "" , TrainStoppageTime : "" },
      index + 1,
      index + 1
    );
    setData(val);
  };
  const deleteStop = (index: number) => {
    setData([...data.slice(0, index), ...data.slice(index + 1, data.length)]);
  };
  const changeConfigValue = (
    newValue: string,
    backendName: string,
    index: string
  ) => {
    console.log("Value  ", newValue);
    setData((prevState: any) => {
      prevState[index][backendName] = newValue;
      return [...prevState];
    });
  };
  useEffect(() => {
    if(!DepartureStation || !DestinationStation) return;
    const val = genrateStops(
      [],
      { placeName: DepartureStation, time: "", distance: "" , TrainStoppageTime : "" },
      0,
      0
    );
    const newValue = genrateStops(
      val,
      { placeName: DestinationStation, time: "", distance: "" , TrainStoppageTime : "" },
      1,
      1
    );
    setData(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DepartureStation , DestinationStation]);
  console.log("Data ", data);
  return (
    <div>
      {contextHandler}
      <StartTime passingValueToParent={gettingInitialTime} />
      {data.map((currValue: ITrainStops, index: number) => {
        return (
          <>
            <Stops
              value={currValue}
              options={placesOptions}
              disabled={index === 0 || index === data.length - 1}
              passingValueToParent={changeConfigValue}
              index={index}
              deleteStop={deleteStop}
            />
            {index !== data.length - 1 && (
              <div className={styles.css1}>
                <div className={styles.css2}>
                  <p></p>
                </div>
                <div className={styles.css3}>
                  <button onClick={() => addStops(index)}>
                    <i className="bi bi-patch-plus" />
                  </button>
                </div>
                <div className={styles.css2}>
                  <p></p>
                </div>
              </div>
            )}
          </>
        );
      })}
      <div className={styles.css4}>
        <Button onClick={passingValueToParent}>Next</Button>
      </div>
    </div>
  );
};

export default TrainFormStops;
