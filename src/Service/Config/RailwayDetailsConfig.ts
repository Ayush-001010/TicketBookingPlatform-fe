import { IOptions } from "../Interface/CommonInterface";

export default class RailwayDetailsConfig {
    static stateFooterConfig : Array<{ displayName : string , type:"button" , navLink?:string}> = [{displayName : "View Stations" , type:"button" , navLink : "/RailwayDetails/"} , {displayName : "View Trains" , type : "button"} ];
    static stationFooterConfig : Array<{ displayName : string , type:"button" , navLink?:string}> = [{ displayName : "Edit" , type : "button"}];
    static option :  { TypeOfStation : Array<IOptions> } = {
        TypeOfStation : [
            {value : "Terminal" , label : "Terminal"},
            {value : "Junction" , label : "Junction"},
            { value : "Central" , label : "Central"},
        ]
    }
}