import * as Yup from "yup";

//Interface representing the structure of the form fields
export interface IFormFields {
  displayName: string;
  backendName: string;
  validation: any;
  fieldType: string;
  className?: string;
  isMultiple?: boolean;
  dependableField?: string;
}

// Interface Represent the types of form.
export interface IFormTypes {
  SignIn: Array<IFormFields>;
  AddTrain: Array<IFormFields>;
}

//Validation message
const requiredErrorMessage: string = "This field is required.";
const invalidCharacterErrorMessage: string =
  "Invalid characters, only letters and spaces are allowed.";

//regex
const regaxForAtoZCharacterOnlyWhichIncludeSpace = /^[A-Z a-z ( ) , \s]+$/;

//Configuration for form fields
const formConfig: IFormTypes = {
  SignIn: [
    {
      displayName: "User Id",
      backendName: "UserID",
      validation: Yup.string()
        .required(requiredErrorMessage)
        .matches(
          regaxForAtoZCharacterOnlyWhichIncludeSpace,
          invalidCharacterErrorMessage
        ),
      fieldType: "text",
    },
    {
      displayName: "Password",
      backendName: "Password",
      validation: Yup.string()
        .required(requiredErrorMessage)
        .matches(
          regaxForAtoZCharacterOnlyWhichIncludeSpace,
          invalidCharacterErrorMessage
        ),
      fieldType: "text-password",
    },
  ],
  AddTrain: [
    {
      displayName: "Train Name",
      backendName: "TrainName",
      fieldType: "text",
      validation: Yup.string()
        .matches(
          regaxForAtoZCharacterOnlyWhichIncludeSpace,
          invalidCharacterErrorMessage
        )
        .required(requiredErrorMessage),
      className: "fullWidthCss",
    },
    {
      displayName: "Type of Train",
      backendName: "TypeOfTrain",
      fieldType: "dropdown",
      validation: Yup.string().required(requiredErrorMessage),
      className: "halfWidthCss",
    },
    {
      displayName: "Type of Coach",
      backendName: "TypeOfCoach",
      fieldType: "dropdown",
      validation: Yup.array().required(requiredErrorMessage),
      className: "halfWidthCss",
      isMultiple: true,
    },
    {
      displayName: "Departure Station",
      backendName: "DepartureStation",
      fieldType: "dropdown",
      validation: Yup.string().required(requiredErrorMessage),
      className: "halfWidthCss",
    },
    {
      displayName: "Destination Station",
      backendName: "DestinationStation",
      fieldType: "dropdown",
      validation: Yup.string().required(requiredErrorMessage),
      className: "halfWidthCss",
    },
    {
      displayName: "Running Schedule",
      backendName: "RunningSchedule",
      fieldType: "dropdown",
      validation: Yup.string().required(requiredErrorMessage),
      className: "halfWidthCss",
    },
    {
      displayName: "Running Day",
      backendName: "RunningDay",
      fieldType: "dropdown",
      validation: Yup.array().required(requiredErrorMessage),
      className: "halfWidthCss",
      dependableField : "RunningSchedule",
      isMultiple:true

    },
    {
      displayName: "Train Code",
      backendName: "TrainCode",
      fieldType: "text",
      validation: Yup.string().required(requiredErrorMessage),
      className: "fullWidthCss",
    },
  ],
};

export default formConfig;
