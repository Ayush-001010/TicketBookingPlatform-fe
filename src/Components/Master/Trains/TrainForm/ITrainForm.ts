import { ITrainDetails } from "../../../../Service/Interface/AddTrainInterface";

export default interface ITrainForm {
    changeFormType : (newValue : number) => void;
    submitHanlder : (value : ITrainDetails) => void;
}