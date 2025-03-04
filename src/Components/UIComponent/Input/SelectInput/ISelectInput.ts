import { FormikProps } from "formik";

export default interface ISelect {
  displayName: string;
  placeHolder?: string;
  backendName: string;
  formik: FormikProps<Record<string, any>>;
  className?: string;
  option?: any;
  isMultiple?:boolean;
  dependableField? : string;
}
