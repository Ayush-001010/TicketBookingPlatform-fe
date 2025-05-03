import React from "react";
import IPageTitle from "./IPageTitle";
import styles from "./PageTilte.module.css";

const PageTitle : React.FunctionComponent<IPageTitle> = ({title , className}) => {
    return (
        <div className={`${className ? className : styles.default}`}>
            <h1>{title}</h1>
        </div>
    )
};

export default PageTitle;