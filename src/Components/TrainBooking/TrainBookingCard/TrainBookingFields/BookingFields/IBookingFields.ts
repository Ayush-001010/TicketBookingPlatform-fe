import { IFormFields } from "../../../../../Service/Form/formConfig";
import { IOptions } from "../../../../../Service/Interface/CommonInterface";

export default interface IBookingFields {
    fields : Array<Array<IFormFields>>;
    options:Record<string,Array<IOptions>>;
    changeHandler : (newValue : string , backendName : string) => void;
}