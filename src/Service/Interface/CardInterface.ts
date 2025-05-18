export interface ICardInterface {
    displayName: string;
    type : "Progress" | "Cirular";
    sideIcon? : "view";
    value : number;
}