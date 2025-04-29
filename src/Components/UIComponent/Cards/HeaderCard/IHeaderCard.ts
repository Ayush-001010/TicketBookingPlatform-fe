import { ReactNode } from "react";

export default interface IHeaderCard{
    children?: ReactNode;
    title?: string;
    progressBarInfo?: Array<{ displayName : string , value : number }> 
}