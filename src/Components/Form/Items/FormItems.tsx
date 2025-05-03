import React from "react";
import IFormItems from "./IFormItems";
import { IFormFields } from "../../../Service/Form/formConfig";
import InputUI from "../../UIComponent/Input/Input";
import style from "./FormItem.module.css";
import SelectUI from "../../UIComponent/Input/SelectInput/SelectInput";
import DateUI from "../../UIComponent/Input/DateInput/DateUI";
import { useGetFormContext } from "../Form";
import CheckboxInput from "../../UIComponent/Input/CheckboxInput/CheckboxInput";

const FormItems: React.FunctionComponent<IFormItems> = ({ fields , formik }) => {
    const contextValue = useGetFormContext();
  return <div className={style.css1}>
    { fields.map((currItem : IFormFields) => {
        const { displayName , backendName  , fieldType , className , isMultiple , dependableField} = currItem;
        if(fieldType.includes("text")) {
            return (
                <InputUI className={className} displayName={displayName} backendName={backendName}  type={fieldType.split('-')[1]}  formik={formik} />
            )
        } else if(fieldType.includes("dropdown")){
            return (
                <SelectUI dependableField={dependableField} isMultiple={isMultiple} className={className} displayName={displayName} backendName={backendName} formik={formik} placeHolder="Select" option={contextValue?.options ? contextValue.options[backendName] || [] : []} />
            )
        } else if(fieldType.includes("DateTime")){
            return (
                <DateUI className={className} displayName={displayName} backendName={backendName} formik={formik} placeHolder="Select" />
            )
        } else if(fieldType.includes("checkbox")){
            return (
                <CheckboxInput displayName={displayName} backendName={backendName} formik={formik} className={className} />
            )
        } else {
            return (
                null
            )
        }
    })}
  </div>;
};

export default FormItems;