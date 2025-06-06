export default interface IJourneyTickets {
    trainCode: string;
    JourneyDate: Date;
    open : boolean;
    closeFunc : () => void;
}