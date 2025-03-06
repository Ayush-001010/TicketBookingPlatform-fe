import React from "react";
import ITrainPreview from "./ITrainDetails";
import styles from "./TrainDetails.module.css";
import useAddTrainFunc from "../../../../../hooks/useAddTrainFunc";
import { ITrainStops } from "../../../../../Service/Interface/AddTrainInterface";
import Stops from "../TrainFormStops/Stops/Stops";
import { Button } from "antd";

const TrainDetails: React.FunctionComponent<ITrainPreview> = ({ details }) => {
  const { totalJourneyTimeValue } = useAddTrainFunc(undefined, details);
  return (
    <div>
      <div>
        <h1 className={styles.css1}>
          {details.TrainName} <span>({details.TrainCode})</span>{" "}
        </h1>
      </div>
      <hr />
      <div className={styles.css2}>
        <div className={styles.css3}>
          <p>
            Running Day :
            {details.RunningSchedule === "Daily" ? (
              <span>{details.RunningSchedule}</span>
            ) : (
              details.RunningDay.map((currDay: string) => (
                <span>{currDay}</span>
              ))
            )}
          </p>
        </div>
        <div className={styles.css3}>
          <p>
            Type Of Coach :{" "}
            {details.TypeOfCoach.map((curr: string) => (
              <span>{curr}</span>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.css2}>
        <div className={styles.css3}>
          <p>
            Departure Station : <span>{details.DepartureStation}</span>
          </p>
        </div>
        <div className={styles.css3}>
          <p>
            Destination Station : <span>{details.DestinationStation}</span>
          </p>
        </div>
      </div>
      <div className={styles.css2}>
        <div className={styles.css3}>
          <p>
            Train Departure Time : <span>{details.stops[0].time}</span>
          </p>
        </div>
        <div className={styles.css3}>
          <p>
            Total Journey Time : <span>{totalJourneyTimeValue}</span>
          </p>
        </div>
      </div>
      <div>
        {details.stops.map((curr: ITrainStops, index: number) => {
          return (
            <>
              <Stops
                value={curr}
                options={[]}
                disabled={true}
                passingValueToParent={() => {}}
                index={0}
                deleteStop={undefined}
                type="Preview"
              />
              {index !== details.stops.length - 1 && (
                <div className={styles.css5}>
                  <div className={styles.css6}>
                    <p></p>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className={styles.css4}>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default TrainDetails;
