import { FormikProps } from "formik";

export default interface IDateUI {
  displayName: string;
  placeHolder?: string;
  backendName: string;
  formik: FormikProps<Record<string, any>>;
  className?: string;
}