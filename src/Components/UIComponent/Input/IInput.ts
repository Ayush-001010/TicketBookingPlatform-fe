import { FormikProps } from "formik";

export default interface IInput {
  displayName: string;
  placeHolder?: string;
  backendName: string;
  type: string;
  formik: FormikProps<Record<string, any>>;
  className?: string;
}
