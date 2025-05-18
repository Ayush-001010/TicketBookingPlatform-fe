import { IOptions } from "../Interface/CommonInterface";

export default class RailwayDetailsConfig {
    static stateFooterConfig : Array<{ displayName : string , type:"button" , navLink?:string}> = [{displayName : "View Stations" , type:"button" , navLink : "/RailwayDetails/"} , {displayName : "View Trains" , type : "button"} ];
    static stationFooterConfig : Array<{ displayName : string , type:"button" , buttonType? : "delete" , navLink?:string}> = [{ displayName : "Edit" , type : "button"} , { displayName : "Delete" , type : "button" , buttonType : "delete"}];
    static option :  { TypeOfStation : Array<IOptions> } = {
        TypeOfStation : [
            {value : "Terminal" , label : "Terminal"},
            {value : "Junction" , label : "Junction"},
            { value : "Central" , label : "Central"},
            { value : "Normal Station" , label : "Normal"}
        ]
    };
    static StateDashboardHeader : string = "Indian State Dashboard";
    static StationDashboardHeader : string = "Indian Railway Station Dashboard";
    static AddStationFormTitle : string =  "Add Station";
    static EditStationFormTitle : string =  "Edit Station";
}