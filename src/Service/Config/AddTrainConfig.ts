import { IOptions } from "../Interface/CommonInterface";

export default class AddTrainConfig {
  static title: string = "Launch a New Train Route";
  static previewItems: Array<string> = [
    "Basic Details",
    "Add Stops",
    "Set Prices",
    "Preview",
  ];
  static runningDayOpt : Array<IOptions> = [ {label  : "Monday" , value  : "Monday"}, {label  : "Tuesday" , value  : "Tuesday" },{label  : "Webnesday" , value  : "Webnesday"},{label  : "Thursday" , value  : "Thursday"},{label  : "Friday" , value  : "Friday"},{label  : "Saturday" , value  : "Saturday"},{label  : "Sunday" , value  : "Sunday"}]
}
