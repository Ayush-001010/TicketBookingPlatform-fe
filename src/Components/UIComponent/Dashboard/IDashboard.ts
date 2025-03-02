import { IFilter } from "../../../Service/Interface/CommonInterface";

export default interface IDashboard {
  columns: Array<any>;
  title: string;
  data: Array<any>;
  changeHandler : any;
  searchFunc? : any;
  filterFields? : Array<IFilter>;
  filterFunc? : any;
  cardValues? : any;
}
