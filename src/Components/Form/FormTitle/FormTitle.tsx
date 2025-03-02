import React from "react";
import Text from "../../UIComponent/Text/Text";
import { useGetFormContext } from "../Form";

export const FormTitle: React.FunctionComponent<{}> = () => {
  const value = useGetFormContext();
  return (
    <>
      <Text className="css1">{value.title}</Text>
    </>
  );
};
