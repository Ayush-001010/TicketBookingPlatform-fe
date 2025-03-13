import { IFormFields } from "../Form/formConfig";
import { IBookingOptions } from "../Interface/TrainBookingInterface";

export default class TrainBookingConfig {
  static trainImageText: string =
    "Explore India effortlessly by Indian Railways";
  static OneWayForm: Array<Array<IFormFields>> = [
    [
      {
        displayName: "Travel Date",
        backendName: "travelDate",
        validation: null,
        fieldType: "date",
      },
    ],
    [
      {
        displayName: "Leaving Time",
        backendName: "leavingTime",
        validation: null,
        fieldType: "time",
      },
      {
        displayName: "Reach Time",
        backendName: "ReactTime",
        validation: null,
        fieldType: "time",
      },
    ],
    [
      {
        displayName: "Adults",
        backendName: "Adults",
        validation: null,
        fieldType: "dropdown",
      },
      {
        displayName: "Kids",
        backendName: "Kids",
        validation: null,
        fieldType: "dropdown",
      },
      {
        displayName: "Senior Citizen",
        backendName: "seniorCitizen",
        validation: null,
        fieldType: "dropdown",
      },
    ],
  ];
  static bookingOptionArray: Array<IBookingOptions> = [
    {
      name: "departureStation",
      where: "backend",
      backendUrl: "/train/getOptions",
    },
    {
      name: "destinationStation",
      where: "backend",
      backendUrl: "/train/getOptions",
    },
    {
      name: "leavingTimeHr",
      where: "logic",
      logic: "timeOnhour",
    },
    {
      name: "leavingTimeMinutes",
      where: "logic",
      logic: "timeOnMinutes",
    },
    {
      name: "ReactTimeHr",
      where: "logic",
      logic: "timeOnhour",
    },
    {
      name: "ReactTimeMinutes",
      where: "logic",
      logic: "timeOnMinutes",
    },
    {
      name: "Adults",
      where: "logic",
      logic: "1to5",
    },
    {
      name: "Kids",
      where: "logic",
      logic: "1to5",
    },
    {
      name: "seniorCitizen",
      where: "logic",
      logic: "1to5",
    },
  ];
}
