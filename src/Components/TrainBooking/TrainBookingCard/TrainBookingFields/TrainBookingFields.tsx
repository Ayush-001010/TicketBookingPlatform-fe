import React, { useState } from "react";
import ITrainBookingFields from "./ITrainBookingFields";
import styles from "./TrainBookingField.module.css";
import TrainBookingConfig from "../../../../Service/Config/TrainBookingConfig";
import { Button, Select, Tabs } from "antd";
import BookingFields from "./BookingFields/BookingFields";
import useTrainBooking from "../../../../hooks/useTrainBooking";
import { useAppDispatch } from "../../../../Redux/Hooks";
import { setTrainBookingDetailsValues } from "../../../../Redux/Slices/TrainBookingDetails";
import { message } from "antd";
import RequredIndicator from "../../../UIComponent/Text/RequredIndicator/RequredIndicator";
import TrainNotFoundPopup from "../../../UIComponent/Popup/TrainNotFoundPopup/TrainNotFoundPopup";

const TrainBookingFields: React.FunctionComponent<ITrainBookingFields> = () => {
  const { bookingOption } = useTrainBooking();
  const [value, setValue] = useState<Record<string, string>>({});
  const [openNoTrainFoundPopup, setOpenNoTrainFoundPopup] = useState(false);
  const [messageAPI , contextHandler] = message.useMessage();
  const { gettingTrainDetails } = useTrainBooking();
  const dispatch = useAppDispatch();

  const closeNoTrainFoundPopup = () => setOpenNoTrainFoundPopup(false);
  const swapHandler = () => {
    setValue((prevState: Record<string, string>) => {
      return {
        ...prevState,
        departureStation: prevState["destinationStation"],
        destinationStation: prevState["departureStation"],
      };
    });
  };
  const submitHandler = () => {
    let isErrorAlreadyShow = false;
    TrainBookingConfig.requiredBackendFields.forEach((field) => {
      if(!value[field] && !isErrorAlreadyShow){
        isErrorAlreadyShow = true;
        messageAPI.error("Please fill all the required fields");
        return;
      }
    })
    if(isErrorAlreadyShow) return;
    if(value["departureStation"] === value["destinationStation"]){
      messageAPI.error("Please select different stations");
      return;
    }
    gettingTrainDetails(value).then((res) => {
      if(res.success) {
        if(res.data.length === 0) {
          setOpenNoTrainFoundPopup(true);
        }
      }
    });
    dispatch(setTrainBookingDetailsValues(value));
  };
  const changeHandler = (newValue: string, backendName: string) => {
    setValue((prevState: Record<string, string>) => {
      return { ...prevState, [backendName]: newValue };
    });
  };
  return (
    <div className={styles.css1}>
      {contextHandler}
      <div className={styles.css2}>
        <h1>{TrainBookingConfig.trainImageText}</h1>
      </div>
      <div className={styles.css3}>
        <div className={styles.css4}>
          <label>Departure Station <RequredIndicator/> </label>
          <Select
            placeholder="Select Departure Station"
            options={bookingOption["departureStation"]}
            onChange={(newValue) => changeHandler(newValue, "departureStation")}
            value={value["departureStation"]}
          />
        </div>
        <div className={styles.css5} onClick={swapHandler}>
          <p>
            <i className="bi bi-arrow-left-right" />
          </p>
        </div>
        <div className={styles.css4}>
          <label>Distination Station <RequredIndicator/> </label>
          <Select
            placeholder="Select Distination Station"
            options={bookingOption["destinationStation"]}
            onChange={(newValue) =>
                changeHandler(newValue, "destinationStation")
              }
            value={value["destinationStation"]}
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
      <TrainNotFoundPopup open={openNoTrainFoundPopup} decisionFunc={closeNoTrainFoundPopup} />
    </div>
  );
};

export default TrainBookingFields;
