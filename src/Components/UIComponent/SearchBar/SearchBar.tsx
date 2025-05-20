import React from "react";
import ISearchBar from "./ISearchBar";
import styles from "./SearchBar.module.css";

const SearchBar: React.FunctionComponent<ISearchBar> = ({ placeholder , changeHandler }) => {
    return (
        <>
            <button className={styles.css2}>
                <i className="bi bi-search" />
            </button>
            <input className={styles.css3} type="text" placeholder={placeholder || ""} onChange={(e) => changeHandler(e.target.value)} />
        </>
    )
};

export default SearchBar;