import * as Yup from "yup";
import APIService from "../APIServices/APIService";

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
  AddStation: Array<IFormFields>;
}

//Validation message
const requiredErrorMessage: string = "This field is required.";
const invalidCharacterErrorMessage: string = "Invalid characters, only letters and spaces are allowed.";
const invalidCharacterErrorMessage2 : string = "Only numbers are allowed.";

//regex
const regaxForAtoZCharacterOnlyWhichIncludeSpace = /^[A-Z a-z ( ) , \s]+$/;
const regaxForNumberOnly = /^[0-9 .]+$/;

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
      validation: Yup.string()
        .required(requiredErrorMessage)
        .test(
          "MustNotBeSame1",
          "Departure and Destination station must be different",
          function (this: Yup.TestContext, value) {
            const parent = this?.parent as Record<string, any>;
            if (!value || !parent?.DestinationStation) return true;
            return parent.DestinationStation !== value;
          }
        ),
      className: "halfWidthCss",
    },
    {
      displayName: "Destination Station",
      backendName: "DestinationStation",
      fieldType: "dropdown",
      validation: Yup.string()
        .required(requiredErrorMessage)
        .test(
          "MustNotBeSame",
          "Departure and Destination station must be different",
          function (this: Yup.TestContext, value) {
            const parent = this?.parent as Record<string, any>;
            if (!value || !parent?.DepartureStation)
              return true;
            return parent.DepartureStation !== value;
          }
        ),
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
      dependableField: "RunningSchedule",
      isMultiple: true,
    },
    {
      displayName: "Train Code",
      backendName: "TrainCode",
      fieldType: "text",
      validation: Yup.string()
        .required(requiredErrorMessage)
        .matches(
          regaxForNumberOnly,
          "Invalid characters, only numbers are allowed."
        )
        .test(
          "DuplicateTrainCode",
          "Train code already exists",
          async (value) => {
            const response = await APIService.getData(
              "/train/checkTrainCodeExistOrNot",
              { trainCode: value }
            );
            if (response.success) {
              return response.data;
            } else {
              return false;
            }
          }
        ),
      className: "fullWidthCss",
    },
  ],
  AddStation : [
    {
      displayName: "Station Name",
      backendName: "PlaceName",
      validation: Yup.string()
        .required(requiredErrorMessage)
        .matches(
          regaxForAtoZCharacterOnlyWhichIncludeSpace,
          invalidCharacterErrorMessage
        ),
      fieldType: "text",
      className:"fullWidthCSS2"
    },
    {
      displayName : "Longitude",
      backendName:"Longitude",
      validation : Yup.string().required(requiredErrorMessage).matches(regaxForNumberOnly , invalidCharacterErrorMessage2),
      fieldType : "text",
      className:"halfWidthCss"
    },
    {
      displayName : "Latitude",
      backendName:"Latitude",
      validation : Yup.string().required(requiredErrorMessage).matches(regaxForNumberOnly , invalidCharacterErrorMessage2),
      fieldType : "text",
      className:"halfWidthCss"
    },
    {
      displayName : "City",
      backendName:"City",
      validation : Yup.string().required(requiredErrorMessage).matches(regaxForAtoZCharacterOnlyWhichIncludeSpace , invalidCharacterErrorMessage),
      fieldType : "text",
      className:"halfWidthCss"
    },
    {
      displayName : "State",
      backendName : "State" ,
      validation : Yup.string().required(requiredErrorMessage).matches(regaxForAtoZCharacterOnlyWhichIncludeSpace , invalidCharacterErrorMessage),
      fieldType : "text",
      className:"halfWidthCss"
    },
    {
      displayName : "Number Of Platforms",
      backendName : "NumberOfPlatforms",
      validation : Yup.string().required(requiredErrorMessage).matches(regaxForNumberOnly , invalidCharacterErrorMessage2),
      fieldType : "text",
      className:"halfWidthCss"
    },
    {
      displayName : "Type of Station",
      backendName : "TypeOfStation",
      validation : Yup.string().required(requiredErrorMessage).matches(regaxForAtoZCharacterOnlyWhichIncludeSpace , invalidCharacterErrorMessage),
      fieldType : "dropdown",
      className:"halfWidthCss2"
    },
    {
      displayName : "Capacity",
      backendName : "Capacity",
      validation : Yup.string().required(requiredErrorMessage).matches(regaxForNumberOnly , invalidCharacterErrorMessage2),
      fieldType : "text",
      className:"halfWidthCss"
    },
    {
      displayName:"Is Active",
      backendName : "IsActive",
      validation : null,
      fieldType : "checkbox",
      className:"halfWidthCss"
    }
  ]
};

export default formConfig;
