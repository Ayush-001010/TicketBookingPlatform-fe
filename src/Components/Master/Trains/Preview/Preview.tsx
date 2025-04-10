import React, { useContext, useEffect, useState } from "react";
import IPreview from "./IPreview";
import { StepProps, Steps } from "antd";
import useAddTrainFunc from "../../../../hooks/useAddTrainFunc";
import styles from "./Preview.module.css";
import { AddTrainContext } from "../AddTrains";
import { useAppSelector } from "../../../../Redux/Hooks";
import { Tooltip } from "antd";

const Preview: React.FunctionComponent<IPreview> = () => {
  const { genratingPreview } = useAddTrainFunc();
  const [previewItems, setPreviewItems] = useState<Array<StepProps>>([]);
  const { formType } = useContext(AddTrainContext);
  const data: any = useAppSelector((state) => state.AddTrainData.data);

  const genrateTooltipContent = (index: number) => {
    if (index === 0) {
      return (
        <div>
          <div className={styles.css3}>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Train Name:</h1>
              <p className={styles.css2}>{data?.TrainName}</p>
            </div>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Train Code:</h1>
              <p className={styles.css2}>{data?.TrainCode}</p>
            </div>
          </div>
          <div className={styles.css3}>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Departure Station:</h1>
              <p className={styles.css2}>{data?.DepartureStation}</p>
            </div>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Destination Station:</h1>
              <p className={styles.css2}>{data?.DestinationStation}</p>
            </div>
          </div>
          <div className={styles.css3}>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Type Of Train:</h1>
              <p className={styles.css2}>{data?.TypeOfTrain}</p>
            </div>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Type Of Coach:</h1>
              <p className={styles.css2}>
                {data?.TypeOfCoach.map(
                  (item: string, index: number) =>
                    `${item}${index === data.TypeOfCoach.length - 1 ? "" : ","}`
                )}
              </p>
            </div>
          </div>
          <div className={styles.css3}>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Running Schedule:</h1>
              <p className={styles.css2}>{data?.RunningSchedule}</p>
            </div>
            <div className={styles.css4}>
              <h1 className={styles.css2}>Running Day:</h1>
              <p className={styles.css2}>
                {data?.RunningDay.map(
                  (item: string, index: number) =>
                    `${item}${index === data.RunningDay.length - 1 ? "" : ","}`
                )}
              </p>
            </div>
          </div>
        </div>
      );
    } else if (index === 1 && data.stops && data.stops.length > 0) {
      return (
        <div className={styles.tooltipContent}>
          {data.stops.map((item: any, index: number) => (
            <div className={styles.tooltipBlock} key={index}>
              <div className={styles.tooltipRow}>
                <p className={styles.tooltipLabel}>Place Name:</p>
                <p className={styles.tooltipValue}>{item.placeName}</p>
              </div>
              <div className={styles.tooltipRow}>
                <p className={styles.tooltipLabel}>Distance:</p>
                <p className={styles.tooltipValue}>{item.distance} km</p>
              </div>
              <div className={styles.tooltipRow}>
                <p className={styles.tooltipLabel}>Time:</p>
                <p className={styles.tooltipValue}>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return "";
  };
  useEffect(() => {
    console.log("Data in preview", data);
    const res = genratingPreview();
    if (data === null) {
      res.map((ele: StepProps) => {
        ele.icon = <i className="bi bi-info-circle" />;
        ele.title = <div style={{ width: "0% !important" }} />;
        return ele;
      });
    } else {
      res.map((ele: StepProps, index: number) => {
        ele.icon = (
          <div>
            <Tooltip title={genrateTooltipContent(index)} placement="top" arrow>
              <i className={`bi bi-info-circle`} />
            </Tooltip>
          </div>
        );
        ele.title = <div style={{ width: "0% !important" }} />;
        return ele;
      });
    }
    setPreviewItems(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <Steps
        className={styles.css1}
        direction="vertical"
        current={formType - 1}
        items={previewItems}
      />
    </>
  );
};

export default Preview;
