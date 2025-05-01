import React from "react";
import ISearchBar from "./ISearchBar";
import styles from "./SearchBar.module.css";

const SearchBar: React.FunctionComponent<ISearchBar> = ({ placeholder }) => {
    return (
        // <div className={styles.css1}>
        <>
            <button className={styles.css2}>
                <i className="bi bi-search" />
            </button>
            <input className={styles.css3} type="text" placeholder={placeholder || ""} />
        </>
        // </div>
    )
};

export default SearchBar;