import React, { useState } from "react";
import ITrainBookingFields from "./ITrainBookingFields";
import styles from "./TrainBookingField.module.css";
import TrainBookingConfig from "../../../../Service/Config/TrainBookingConfig";
import { Button, Select, Tabs } from "antd";
import BookingFields from "./BookingFields/BookingFields";
import useTrainBooking from "../../../../hooks/useTrainBooking";
import { useAppDispatch } from "../../../../Redux/Hooks";
import { setTrainBookingDetailsValues } from "../../../../Redux/Slices/TrainBookingDetails";

const TrainBookingFields: React.FunctionComponent<ITrainBookingFields> = () => {
  const { bookingOption } = useTrainBooking();
  const [value, setValue] = useState<Record<string, string>>({});
  const { gettingTrainDetails } = useTrainBooking();
  const dispatch = useAppDispatch();

  const submitHandler = () => {
    gettingTrainDetails(value);
    dispatch(setTrainBookingDetailsValues(value));
  };
  const changeHandler = (newValue: string, backendName: string) => {
    setValue((prevState: Record<string, string>) => {
      return { ...prevState, [backendName]: newValue };
    });
  };
  console.log("Value  ", value);
  return (
    <div className={styles.css1}>
      <div className={styles.css2}>
        <h1>{TrainBookingConfig.trainImageText}</h1>
      </div>
      <div className={styles.css3}>
        <div className={styles.css4}>
          <label>Departure Station</label>
          <Select
            options={bookingOption["departureStation"]}
            onChange={(newValue) => changeHandler(newValue, "departureStation")}
          />
        </div>
        <div className={styles.css5}>
          <p>
            <i className="bi bi-arrow-left-right" />
          </p>
        </div>
        <div className={styles.css4}>
          <label>Distination Station</label>
          <Select
            options={bookingOption["destinationStation"]}
            onChange={(newValue) =>
              changeHandler(newValue, "destinationStation")
            }
          />
        </div>
      </div>
      <div className={styles.css6}>
        <Tabs
          items={[
            {
              key: "1",
              label: <span className={styles.css7}>One Way</span>,
              children: (
                <BookingFields
                  fields={TrainBookingConfig.OneWayForm}
                  options={bookingOption}
                  changeHandler={changeHandler}
                />
              ),
            },
          ]}
          tabBarStyle={{
            backgroundColor: "#adb5bd",
            borderRadius: "10px 10px 0px 0px",
            padding: "1%",
          }}
          type="card"
          style={{
            backgroundColor: "#adb5bd",
            borderRadius: "0px 0px 10px 10px",
            padding: "1%",
          }}
          className={styles.css8}
        />
      </div>
      <div className={styles.css9}>
        <Button onClick={submitHandler}>Get times & tickets</Button>
      </div>
    </div>
  );
};

export default TrainBookingFields;
