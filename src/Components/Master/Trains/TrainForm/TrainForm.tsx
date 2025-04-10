import React, { useContext, useState } from "react";
import ITrainForm from "./ITrainForm";
import Form from "../../../Form/Form";
import DashboardCard from "../../../UIComponent/Cards/Dashboard/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import useAddTrainFunc from "../../../../hooks/useAddTrainFunc";
import { message } from "antd";
import TrainFormStops from "./TrainFormStops/TrainFormStops";
import TrainFormPrices from "./TrainFormPrices/TrainFormPrices";
import {
  ITrainDetails,
  ITrainStops,
} from "../../../../Service/Interface/AddTrainInterface";
import { AddTrainContext } from "../AddTrains";
import TrainDetails from "./TrainDetails/TrainDetails";
import { useAppDispatch } from "../../../../Redux/Hooks";
import { setAddTrainDataFunc } from "../../../../Redux/Slices/AddTrainData";

const TrainForm: React.FunctionComponent<ITrainForm> = ({
  changeFormType,
  submitHanlder,
}) => {
  const [messageAPI, contextHandler] = message.useMessage();
  const { getTrainDetailsOptions } = useAddTrainFunc(messageAPI);
  const [formValues, setFormValues] = useState<ITrainDetails>();
  const { formType } = useContext(AddTrainContext);
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryFn: () => getTrainDetailsOptions(),
    queryKey: ["TrainOptions"],
    retry: 3,
  });
  const backHandlerFunc = () => {
    changeFormType(formType - 1);
  };
  const gettingPrice = (value: any, type?: string) => {
    if (type === "Coach") {
      setFormValues((prevState: ITrainDetails | undefined) => {
        if (!prevState) return;
  
        // Make a shallow copy of prevState
        const newState = { ...prevState };
  
        // Clone coaches array or create a new one
        const updatedCoaches = [...(newState.coaches ?? []), value];
        newState.coaches = updatedCoaches;
  
        return newState;
      });
    } else {
      setFormValues((prevState: any) => {
        return { ...prevState, stops: value };
      });
      changeFormType(4);
    }
  };
  
  const gettingStops = (value: Array<ITrainStops>) => {
    setFormValues((prevState: any) => {
      // Clone stops to avoid mutating original objects
      const updatedStops = value.map((stop) => {
        const price: Record<string, string> = {};
        if (prevState?.TypeOfCoach) {
          for (const coach of prevState.TypeOfCoach) {
            price[coach] = "";
          }
        }
        return {
          ...stop,
          price: { ...price },
        };
      });
  
      const updatedForm = { ...prevState, stops: updatedStops };
      dispatch(setAddTrainDataFunc(updatedForm));
      return updatedForm;
    });
    changeFormType(3);
  };
  
  const gettingValue = (value: any) => {
    setFormValues(value);
    changeFormType(2);
    dispatch(setAddTrainDataFunc(value));
  };
  const submitHanlderFunc = () => {
    if (!formValues) return;
    submitHanlder(formValues);
  };
  return (
    <div style={{ marginTop: "21px" }}>
      {contextHandler}
      <DashboardCard>
        {formType === 1 && (
          <Form
            formType="AddTrain"
            button1Text="Next"
            classNameButton="separted"
            option={data}
            passingeValueToParent={gettingValue}
            information={"Basic Details"}
            intialValue={formValues}
          >
            <Form.Information />
          </Form>
        )}
        {formType === 2 && (
          <TrainFormStops
            placesOptions={data?.DepartureStation}
            DepartureStation={formValues?.DepartureStation || ""}
            DestinationStation={formValues?.DestinationStation || ""}
            passingValueToParentFunc={gettingStops}
            backHandler={backHandlerFunc}
            data={formValues}
          />
        )}
        {formType === 3 && (
          <TrainFormPrices
            passingDataToParentFunc={gettingPrice}
            coachTypes={formValues?.TypeOfCoach || []}
            stops={formValues?.stops ? [...formValues?.stops] : []}
            backHandlerFunc={backHandlerFunc}
          />
        )}
        {formType === 4 && formValues && (
          <TrainDetails
            submitHanlderFunc={submitHanlderFunc}
            details={formValues}
          />
        )}
      </DashboardCard>
    </div>
  );
};

export default TrainForm;
