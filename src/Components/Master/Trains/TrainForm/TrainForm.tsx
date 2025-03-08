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

const TrainForm: React.FunctionComponent<ITrainForm> = ({ changeFormType , submitHanlder }) => {
  const [messageAPI, contextHandler] = message.useMessage();
  const { getTrainDetailsOptions } = useAddTrainFunc(messageAPI);
  const [formValues, setFormValues] = useState<ITrainDetails>();
  const { formType } = useContext(AddTrainContext);

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
        if (!prevState.coaches) {
          prevState.coaches = [];
        }
        prevState.coaches = [...prevState.coaches, value];
        return { ...prevState };
      });
    } else {
      setFormValues((prevState: any) => {
        return { ...prevState, stops: value };
      });
      changeFormType(4);
    }
  };
  const gettingStops = (value: Array<ITrainStops>) => {
    console.log("Value  ", value);
    setFormValues((prevState: any) => {
      let price: Record<string, string> = {};
      for (const curr1 of value) {
        for (const curr of prevState.TypeOfCoach) {
          price = { ...price, [curr]: "" };
        }
        curr1.price = price;
      }
      return { ...prevState, stops: value };
    });
    changeFormType(3);
  };
  const gettingValue = (value: any) => {
    console.log(value);
    setFormValues(value);
    changeFormType(2);
  };
  const submitHanlderFunc = () => {
    if(!formValues)return;
    submitHanlder(formValues);
  }
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
        {formType === 4 && formValues && <TrainDetails submitHanlderFunc={submitHanlderFunc} details={formValues} />}
      </DashboardCard>
    </div>
  );
};

export default TrainForm;
