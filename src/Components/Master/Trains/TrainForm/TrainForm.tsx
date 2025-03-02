import React from "react";
import ITrainForm from "./ITrainForm";
import Form from "../../../Form/Form";
import DashboardCard from "../../../UIComponent/Cards/Dashboard/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import useAddTrainFunc from "../../../../hooks/useAddTrainFunc";
import { message } from "antd";

const TrainForm: React.FunctionComponent<ITrainForm> = () => {
  const [messageAPI, contextHandler] = message.useMessage();
  const { getTrainDetailsOptions } = useAddTrainFunc(messageAPI);

  const { data } = useQuery({
    queryFn: () => getTrainDetailsOptions(),
    queryKey: ["TrainOptions"],
    retry: 3,
  });
  const gettingValue = (value : any) => {
    console.log(value);
  }
  return (
    <div style={{ marginTop: "21px" }}>
      {contextHandler}
      <DashboardCard>
        <Form
          formType="AddTrain"
          button1Text="Next"
          classNameButton="separted"
          option={data}
          passingeValueToParent={gettingValue}
          information={"Basic Details"}
        >
          <Form.Information/>
          </Form>
      </DashboardCard>
    </div>
  );
};

export default TrainForm;
