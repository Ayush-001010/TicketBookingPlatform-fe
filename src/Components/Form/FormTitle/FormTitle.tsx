import React from "react";
import Text from "../../UIComponent/Text/Text";
import { useGetFormContext } from "../Form";

export const FormTitle: React.FunctionComponent<{}> = () => {
  const {title , headerCssClassName} = useGetFormContext();
  console.log("ClassName", headerCssClassName);
  return (
      <Text className={  headerCssClassName || "css1"}>{title}</Text>
  );
};
