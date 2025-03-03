import { ITrainStops } from "../../../../../../Service/Interface/AddTrainInterface";
import { IOptions } from "../../../../../../Service/Interface/CommonInterface";

export default interface IStops {
    value :  ITrainStops;
    options : Array<IOptions>;
    disabled : boolean;
    passingValueToParent: any;
    index:number;
    deleteStop:any;
}