import { ReactNode } from "react";

export default interface IHeaderCard{
    children?: ReactNode;
    title?: string;
    progressBarInfo?: Array<{ displayName : string , value : number }>;
    fotter? : Array<{displayName : string , type : "button" , navLink?: string}>;
    subPoints? : Array<{Title : string , Response : string}>;
    passingDataToParent? : (value : any) => void;
    indexNumber? : number;
}