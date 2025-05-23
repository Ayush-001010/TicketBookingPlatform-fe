import dayjs, { Dayjs } from "dayjs";
import { IFormFields } from "../Form/formConfig";
import { IBookingOptions  } from "../Interface/TrainBookingInterface";

export default class TrainBookingConfig {
  static trainImageText: string = "Explore India effortlessly by Indian Railways";
  static requiredBackendFields : Array<string> =  [ "departureStation","destinationStation","travelDate","Adults","Kids","seniorCitizen"]
  static OneWayForm: Array<Array<IFormFields>> = [
    [
      {
        displayName: "Travel Date",
        backendName: "travelDate",
        validation: null,
        fieldType: "date",
        isRequired : true,
        minDate : dayjs().add(1, 'day')
      },
    ],
    [
      {
        displayName: "Leaving Time",
        backendName: "leavingTime",
        validation: null,
        fieldType: "time",
        placeholder : "Ex:10:00"
      },
      {
        displayName: "Reach Time",
        backendName: "ReachTime",
        validation: null,
        fieldType: "time",
        placeholder : "Ex:11:00"
      },
    ],
    [
      {
        displayName: "Adults",
        backendName: "Adults",
        validation: null,
        fieldType: "dropdown",
        isRequired : true,
        placeholder : "Ex:01"
      },
      {
        displayName: "Kids",
        backendName: "Kids",
        validation: null,
        fieldType: "dropdown",
        isRequired : true,
        placeholder : "Ex:02"
      },
      {
        displayName: "Senior Citizen",
        backendName: "seniorCitizen",
        validation: null,
        fieldType: "dropdown",
        isRequired : true,
        placeholder : "Ex:03"
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
      name: "ReachTimeHr",
      where: "logic",
      logic: "timeOnhour",
    },
    {
      name: "ReachTimeMinutes",
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
