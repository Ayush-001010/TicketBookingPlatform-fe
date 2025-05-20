import { IOptions } from "./CommonInterface";

export interface IDashboardFilter {
    placeHolder? : string;
    backendName  : string;
    filterType : "dropdown";
    filterOpions : Array<IOptions>;
    displayName : string;
}