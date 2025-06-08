import { IOptions } from "../Interface/CommonInterface";

export default class TicketBookingConfig {
    static options: Record<string, Array<IOptions>> = {
        passengerGender: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }],
        passengerCategory: [
            { label: "General", value: "General" },
            { label: "Senior Citizen", value: "Senior Citizen" },
            { label: "Child", value: "Child" },
            { label: "Disabled", value: "Disabled" }
        ],
    }
    static TrainTimingFilter: Array<string> = ["Morning Trains (4AM-11AM)", "Afternoon Trains (11AM-4PM)", "Evening Trains (4PM-7PM)", "Night Trains (7PM-4AM)"]
    static TrainTimingConfig: Record<string, { to: number, from: number }> = {
        "Morning Trains (4AM-11AM)": {
            to: 11,
            from: 4
        },
        "Afternoon Trains (11AM-4PM)": {
            from: 11,
            to: 16
        },
        "Evening Trains (4PM-7PM)": {
            from: 16,
            to: 19
        },
        "Night Trains (7PM-4AM)": {
            from: 19,
            to: 24
        }
    }
}