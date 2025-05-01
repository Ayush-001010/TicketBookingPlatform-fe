import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import IForm from "./IForm";
import { Formik } from "formik";
import styles from "./Form.module.css";
import useFormikHook from "../../hooks/useFormikHook";
import FormItems from "./Items/FormItems";
import { FormTitle } from "./FormTitle/FormTitle";
import FormButtons from "./FormButtons/FormButtons";
import FromInformation from "./FromInformation/FromInformation";

export interface IFormContext {
  title?: string;
  options?: any;
  information?: any;
  headerCssClassName?: string;
}

const FormContext = createContext<IFormContext | undefined>(undefined);

export const useGetFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useGetFormContext must be used within a FormProvider");
  }
  return context;
};

const Form = ({
  formType,
  formtitle,
  children,
  button1Text,
  button2Text,
  classNameButton,
  option,
  passingeValueToParent,
  information,
  intialValue: val,
  headerCssClassName,
  formCSSClassName
}: IForm & PropsWithChildren) => {
  const { initialValue, validation, formFields } = useFormikHook(formType, val);
  const [iniValue, setIniValue] = useState<Record<string, any> | null>(null);

  const handleSubmit = (values: Record<string, any>) => {
    if (passingeValueToParent) passingeValueToParent(values);
  };
  useEffect(()=>{
    setIniValue(initialValue)
  },[initialValue])
  return (
    <FormContext.Provider
      value={{ title: formtitle, options: option, information: information , headerCssClassName }}
    >
      <div className={styles[formCSSClassName || "css1"]}>
        {iniValue && (
          <Formik
            initialValues={initialValue || {}}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <div>
                {children}
                <form onSubmit={formik.handleSubmit}>
                  <FormItems fields={formFields} formik={formik} />
                  <FormButtons
                    btn1={button1Text || ""}
                    btn2={button2Text || ""}
                    className={classNameButton}
                  />
                </form>
              </div>
            )}
          </Formik>
        )}
      </div>
    </FormContext.Provider>
  );
};

Form.Title = FormTitle;
Form.Buttons = FormButtons;
Form.Information = FromInformation;
export default Form;
