import { IOptions } from "./CommonInterface";

export interface IBookingOptions {
  name: string;
  where: "backend" | "config" | "logic";
  backendUrl?: string;
  options?: Array<IOptions>;
  logic?: string;
}

export interface ITrainItemDetails {
  ID: number;
  TrainName: string;
  TrainCode: string;
  DepartureStation: string;
  DestinationStation: string;
  TypeOfTrain: string;
  TypeOfCoachs: string;
  RunningSchedule: string;
  RunningDay: string;
  createdAt: string;
  updatedAt: string;
  leavingTime: string;
  destinationTime: string;
}

export interface ISideFilterDetails {
  labelName: string;
  fieldType: "checkbox" | "radio";
  radioID?: string;
}
export interface ISideFilter {
  header: string;
  fields:Array<ISideFilterDetails>
}
export interface ITrainTicketBookingInterface {
  trainCode: string;
  trainName : string;
  departureStation: string;
  destinationStation: string;
  departureTime: string;
  destinationTime: string;
  passengerName: string;
  passengerAge: string;
  passengerGender: "Male" | "Female" | "";
  passengerPhone: string;
  passengerCoachType: string;
  passengerCategory: "Adult" | "Senior Citizen" | "Child" | "Disabled" | "";
  journeyStartDate: string;
  journeyEndDate: string;
  price?: number;
}1
