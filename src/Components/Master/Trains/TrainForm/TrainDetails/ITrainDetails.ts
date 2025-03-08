import { ITrainDetails } from "../../../../../Service/Interface/AddTrainInterface";

export default interface ITrainPreview {
    details : ITrainDetails;
    submitHanlderFunc : () => void;
}