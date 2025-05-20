import { IDashboardFilter } from "../Service/Interface/DashboardInterface";

const useDashboardFilterActions = () => {
    const genrateInitialValues = (filterArr : Array<IDashboardFilter>) => {
        let val : Record<string, null> = {};
        filterArr.forEach((item) => {
            const { backendName } = item;
            val[backendName] = null;
        });
        return val;
    }
    return { genrateInitialValues}
}

export default useDashboardFilterActions;