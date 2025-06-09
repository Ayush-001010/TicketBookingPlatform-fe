export default interface ISearchBar {
    value : string;
    changeHandler : (newValue : string) => void;
}