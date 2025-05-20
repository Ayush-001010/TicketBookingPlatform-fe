import { IDashboardFilter } from "../../../Service/Interface/DashboardInterface";

export default interface IDashboard {
    openFilter? : boolean;
    filterArray? : Array<IDashboardFilter>;
    filterApplied ? : (value : Record<string , any>) => void;
    clearFilter ? : () => void;
}