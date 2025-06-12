import { IDashboardFilter } from "../Interface/DashboardInterface";

export default class RailwayStationConfig {
    static filterFields : Array<IDashboardFilter> = [
        {
            displayName : "Active/In-Active",
            backendName : "IsActive",
            filterOpions : [{ label : "Active" , value : true} , { label : "In-Active" , value : false}],
            filterType : "dropdown",
        },
        {
            displayName : "Type Of Station",
            backendName : "TypeOfStation",
            filterOpions: [{ label : "Terminal Station" , value : "Terminal" } , { label : "Junction Station" , value : "Junction" } , { label : "Central Station" , value : "Central"} , { label : "Normal Station" , value : "Normal" }],
            filterType : "dropdown"
        },
        {
            displayName : "No. of Platform",
            backendName : "NoOfPlatform",
            filterOpions : [{ label : "0-3" , value : "{ min : 0 , max : 3}"} , { label : "4-6" , value :"{min : 4 , max : 6}"} , { label : "7-10" , value : "{min : 7 , max : 10}" } , { label : "More than 10" , value : "{min : 11 , max : 9999}"}],
            filterType : "dropdown",
        },
        {
            displayName : "Capacity",
            backendName : "Capacity",
            filterOpions : [{label : "0-1000" , value : "{ min : 0 , max : 1000}"} , { label : "1001-2000" , value : "{ min : 1001 , max : 2000 }"} , { label : "2001-3000" , value : "{ min : 2001 , max : 3000 }"} , { label : "More than 3000" , value : "{ min : 3001 , max : 9999999}"}],
            filterType : "dropdown",
        }
    ];
}