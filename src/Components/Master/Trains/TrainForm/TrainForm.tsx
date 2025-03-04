import React, { useState } from "react";
import ITrainForm from "./ITrainForm";
import Form from "../../../Form/Form";
import DashboardCard from "../../../UIComponent/Cards/Dashboard/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import useAddTrainFunc from "../../../../hooks/useAddTrainFunc";
import { message } from "antd";
import TrainFormStops from "./TrainFormStops/TrainFormStops";
import TrainFormPrices from "./TrainFormPrices/TrainFormPrices";

const TrainForm: React.FunctionComponent<ITrainForm> = () => {
  const [messageAPI, contextHandler] = message.useMessage();
  const { getTrainDetailsOptions } = useAddTrainFunc(messageAPI);
  const [formType, setFormType] = useState<number>(1);
  const [formValues , setFormValues]  = useState<any>({})

  const { data } = useQuery({
    queryFn: () => getTrainDetailsOptions(),
    queryKey: ["TrainOptions"],
    retry: 3,
  });
  const gettingValue = (value: any) => {
    console.log(value);
    setFormValues(value);
    setFormType(2);
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
        { formType === 3 && (
          <TrainFormPrices coachTypes={["Slepper" , "3 AC" , "2 AC" , "1 AC"]} stops={[{distance  : "200" , time : "" , placeName : "Jamshedpur"} , {distance  : "200" , time : "" , placeName : "Kolkata"} ]} />
        )}
      </DashboardCard>
    </div>
  );
};

export default TrainForm;
