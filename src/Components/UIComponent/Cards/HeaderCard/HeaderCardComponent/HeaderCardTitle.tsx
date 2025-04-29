import React from 'react';
import { useHeaderCardContextValue } from '../HeaderCard';

const HeaderCardTitle : React.FunctionComponent<{}> = () => {
    const { title } = useHeaderCardContextValue();
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
};

export default HeaderCardTitle;