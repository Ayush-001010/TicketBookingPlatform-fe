import { FormikProps } from "formik";

export default interface ICheckboxInput {
  displayName: string;
  backendName: string;
  formik: FormikProps<Record<string, any>>;
  className?: string;
}