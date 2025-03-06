import { ITrainStops } from "../../../../../Service/Interface/AddTrainInterface";

export default interface ITrainFormPrices {
    coachTypes : Array<string>;
    stops : Array<ITrainStops>;
    passingDataToParentFunc : any;
}