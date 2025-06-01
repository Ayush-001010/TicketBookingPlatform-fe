import { IOptions } from "../../../../Service/Interface/CommonInterface";
import { ITrainTicketBookingInterface } from "../../../../Service/Interface/TrainBookingInterface";

export default interface IBookingDetails {
    data: ITrainTicketBookingInterface;
    options: Record<string, Array<IOptions>> | null; 
    seatPrices : Record<string, number> | null;
    passengerNumber : number;
    startCompletingProcess : boolean;
    passingDataToParentFunc : (isError : boolean , value?:ITrainTicketBookingInterface | null) => void;
}