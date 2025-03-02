import { useEffect, useState } from "react";
import formConfig, { IFormFields, IFormTypes } from "../Service/Form/formConfig";
import * as Yup from "yup";

const useFormikHook = (formType: keyof IFormTypes) => {
  const [initialValue, setIntialValue] = useState<Record<string, any>>({});
  const [validation, setValidation] = useState<Record<string, any>>({});
  const [formFields, setFormFields] = useState<IFormFields[]>([]);
  const fetchFormDetails = (type: keyof IFormTypes) => {
    const config = formConfig[type];
    let initialValueSchema: Record<string, any> = {};
    let validationValueSchema: Record<string, any> = {};
    for (const currItem of config) {
      initialValueSchema[currItem.backendName] = null;
      validationValueSchema[currItem.backendName] = currItem.validation;
    }
    setIntialValue(initialValueSchema);
    setValidation(Yup.object().shape(validationValueSchema));
    setFormFields(config);
  };
  useEffect(() => {
    fetchFormDetails(formType);
  }, [formType]);
  return {initialValue , validation , formFields};
};

export default useFormikHook;
