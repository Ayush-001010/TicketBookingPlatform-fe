import React, { useState } from "react";
import ITrainForm from "./ITrainForm";
import Form from "../../../Form/Form";
import DashboardCard from "../../../UIComponent/Cards/Dashboard/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import useAddTrainFunc from "../../../../hooks/useAddTrainFunc";
import { message } from "antd";
import TrainFormStops from "./TrainFormStops/TrainFormStops";

const TrainForm: React.FunctionComponent<ITrainForm> = () => {
  const [messageAPI, contextHandler] = message.useMessage();
  const { getTrainDetailsOptions } = useAddTrainFunc(messageAPI);
  const [formType, setFormType] = useState<number>(2);
  const [formValues , setFormValues]  = useState<any>({})

  const { data } = useQuery({
    queryFn: () => getTrainDetailsOptions(),
    queryKey: ["TrainOptions"],
    retry: 3,
  });
  const gettingValue = (value: any) => {
    console.log(value);
    setFormType(2);
    setFormValues(value);
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
          >
            <Form.Information />
          </Form>
        )}
        { formType === 2 && (
          <TrainFormStops placesOptions={data?.DepartureStation}/>
        )}
      </DashboardCard>
    </div>
  );
};

export default TrainForm;
