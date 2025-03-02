import { IDashboardColumn, IFilter } from "../Interface/CommonInterface";

export default class RailwayStationConfig {
    static dashboardColumns : Array<IDashboardColumn> = [
        {
            title : "Station Name",
            dataIndex: "StationName",
            key: "StationName",
        },
        {
            title : "Place Name",
            dataIndex: "PlaceName",
            key: "PlaceName",
        },
        {
            title : "Place Type",
            dataIndex: "PlaceType",
            key: "PlaceType",
        },
        {
            title : "Is Hill Station",
            dataIndex: "IsHillStation",
            key: "IsHillStation",
        },
        {
            title : "No. of Platform",
            dataIndex: "NoOfPlatform",
            key: "NoOfPlatform",
        },
        {
            title : "Railway Zone",
            dataIndex: "RailwayZone",
            key: "RailwayZone",
        },
    ];
    static dashboardTitle : string = "Stations";
    static filterFields : Array<IFilter> = [
        {
            displayName : "Station Name",
            backendName : "StationName",
            options:  []
        },
        {
            displayName : "Place Name",
            backendName : "PlaceName",
            options:  []
        },
        {
            displayName : "Place Type",
            backendName : "PlaceType",
            options:  []
        },
        {
            displayName : "Is Hill Station",
            backendName : "IsHillStation",
            options:  []
        },
        {
            displayName : "Railway Zone",
            backendName : "RailwayZone",
            options:  []
        },
    ]
}