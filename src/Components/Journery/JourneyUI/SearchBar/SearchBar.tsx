import React from "react";
import styles from "./SearchBar.module.css";
import { Button, Input } from "antd";
import ISearchBar from "./ISearchBar";

const SearchBar: React.FunctionComponent<ISearchBar> = ({ value, changeHandler }) => {

    const changeHandlerFunc = ({ target }: any) => {
        changeHandler(target.value);
    }
    return (
        <div className={styles.searchBarDivCss}>
            <Input onChange={changeHandlerFunc} value={value} />
            <Button>Train</Button>
        </div>
    )
};

export default SearchBar;