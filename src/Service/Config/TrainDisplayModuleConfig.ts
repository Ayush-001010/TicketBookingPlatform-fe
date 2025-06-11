import { ITableUIColumn } from "../Interface/TableUIInterface";

export default class TrainDisplayModuleConfig {
    static tableColumns : Array<ITableUIColumn> = [
        {
            dataIndex : "TrainName",
            key : "TrainName",
            title:"Train Name"
        },
        {
            dataIndex : "TrainCode",
            key : "TrainCode",
            title : "Train Code"
        },
        {
            dataIndex : "RunningDay",
            key : "RunningDay",
            title : "Running Day"
        },
        {
            dataIndex : "Time",
            key : "Time",
            title : "Arrval Time"
        },
        {
            dataIndex : "TrainStoppageTime" ,
            key : "TrainStoppageTime",
            title:"Stoppage Time"
        }
    ]
}