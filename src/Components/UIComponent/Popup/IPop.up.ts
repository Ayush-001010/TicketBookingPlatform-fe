export default interface IPopup {
    decisionFunc : (value?: string) => void;
    open : boolean;
    message?:string;
    popupType? : "Success" | "Error";
}