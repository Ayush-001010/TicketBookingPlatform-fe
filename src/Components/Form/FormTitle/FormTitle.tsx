import React from "react";
import Text from "../../UIComponent/Text/Text";
import { useGetFormContext } from "../Form";

export const FormTitle: React.FunctionComponent<{}> = () => {
  const {title , headerCssClassName} = useGetFormContext();
  return (
      <Text className={  headerCssClassName || "css1"}>{title}</Text>
  );
};
