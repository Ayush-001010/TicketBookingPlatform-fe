import React from "react";
import { useState , useEffect } from "react";
import IDashboard from "../IDashboard";
import { IDashboardFilter } from "../../../../Service/Interface/DashboardInterface";
import DropDown from "./Fields/DropDown";
import useDashboardFilterActions from "../../../../hooks/useDashboardFilterActions";
import styles from "./Filter.module.css";

const Filter : React.FunctionComponent<IDashboard> = ({filterArray , filterApplied , clearFilter}) => {
    const { genrateInitialValues} = useDashboardFilterActions();
    const [values , setValues] = useState<Record<string, any>>({});

    const changeHandlerForDropDown = (newValue : string | [] | null , backendName : string) => {
        setValues((prevState : any) => {
            return { ...prevState , [backendName] : newValue }
        })
    };
    const componentRenderFunc = (item : IDashboardFilter ) => {
        const { filterType , filterOpions , displayName , placeHolder , backendName } = item;
        switch(filterType) {
            case "dropdown" :  return <DropDown  displayName={displayName} backendName={backendName} options={filterOpions} changeHandler={changeHandlerForDropDown} value={values[backendName]} />
        }
    }
    const applyFilerHandler = () => {
        if(filterApplied) {
            filterApplied(values);
        }
    }
    const clearFilterHandler = () => {
        if(clearFilter){
            clearFilter();
        }
    }
    useEffect(() => {
        const initialValues = genrateInitialValues(filterArray || []);
        setValues(initialValues);
    }, [filterArray]);
    return (
        <div className={styles.filterDivCss}>
            {filterArray?.map((item : IDashboardFilter) => componentRenderFunc(item))}
            <div className={styles.filterButtonDivCss}>
                <button onClick={clearFilterHandler}>Clear</button>
                <button onClick={applyFilerHandler}>Apply</button>
            </div>
        </div>
    )
};

export default Filter;