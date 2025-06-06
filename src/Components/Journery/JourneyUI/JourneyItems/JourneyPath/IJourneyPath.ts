export default interface IJourneyPath {
    open: boolean;
    closeFunc: () => void;
    TrainCode: string;
    DepartureStation: string;
    DestinationStation: string;
}