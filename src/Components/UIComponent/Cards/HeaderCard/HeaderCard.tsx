import React, { createContext } from "react";
import HeaderCardTitle from "./HeaderCardComponent/HeaderCardTitle";
import IHeaderCard from "./IHeaderCard";
import HeaderCardProgressBar from "./HeaderCardComponent/HeaderCardProgressBar";

interface IHeaderCardContext {
    title?:string;
}

interface IHeaderCardVal extends React.FC<IHeaderCard> {
    Title: React.FC; 
}

const HeaderCardContext = createContext<undefined | IHeaderCardContext>(undefined);

export const useHeaderCardContextValue = () => {
    const context = React.useContext(HeaderCardContext);
    if (!context) {
        throw new Error("useHeaderCardContextValue must be used within a HeaderCard");
    }
    return context;
}

const HeaderCard: React.FC<IHeaderCard> & IHeaderCardVal = ({ children , title , progressBarInfo}) => {
    return (
        <HeaderCardContext.Provider value={ { title } }>
            {children}
            { progressBarInfo?.map( item  =>  <HeaderCardProgressBar displayName={item.displayName} value={item.value} /> )}
        </HeaderCardContext.Provider>
    );
};

HeaderCard.Title = HeaderCardTitle;

export default HeaderCard;
