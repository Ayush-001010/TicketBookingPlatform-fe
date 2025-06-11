import { ITableUIColumn } from "../../../Service/Interface/TableUIInterface";

export default interface ITableUI{
    columns : Array<ITableUIColumn>;
    data : Array<any>
}