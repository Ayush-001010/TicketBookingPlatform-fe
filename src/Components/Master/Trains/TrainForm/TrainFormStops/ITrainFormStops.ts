import { IOptions } from "../../../../../Service/Interface/CommonInterface";

export default interface ITrainFormStops {
    placesOptions : Array<IOptions>;
    DepartureStation : string;
    DestinationStation : string;
    passingValueToParentFunc : any;
}