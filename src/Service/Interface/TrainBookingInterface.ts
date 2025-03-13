import { IOptions } from "./CommonInterface";

export interface IBookingOptions {
    name : string;
    where :  "backend" | "config" | "logic";
    backendUrl?:string;
    options?:Array<IOptions>;
    logic?:string;
}