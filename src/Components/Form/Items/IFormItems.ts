import { FormikProps } from "formik";
import { IFormFields } from "../../../Service/Form/formConfig";

export default interface IFormItems {
    fields : Array<IFormFields>;
    formik:  FormikProps<Record<string, any>>;
}