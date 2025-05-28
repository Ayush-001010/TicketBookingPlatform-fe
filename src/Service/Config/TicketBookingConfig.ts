import { IOptions } from "../Interface/CommonInterface";

export default class TicketBookingConfig {
    static options : Record<string,Array<IOptions>> = {
        passengerGender : [{label  : "Male" , value : "Male"} , {label : "Female" , value: "Female"}],
        passengerCategory : [
            {label: "General", value: "General"},
            {label: "Senior Citizen", value: "Senior Citizen"},
            {label: "Child", value: "Child"},
            {label: "Disabled", value: "Disabled"}
        ],
    }
}