import { IOptions } from "../../../../../Service/Interface/CommonInterface";

export default interface IFields {
    displayName: string;
    backendName : string;
    options?: Array<IOptions>;
    value : string | [] | null;
    changeHandler : (value: string | [] | null , backendName : string) => void;
}