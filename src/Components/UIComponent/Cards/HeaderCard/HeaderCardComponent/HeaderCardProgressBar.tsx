import { Progress } from 'antd';
import React from 'react';

const HeaderCardProgressBar : React.FunctionComponent<{ displayName : string , value : number}> = ({displayName , value}) => {
    return (
        <div>
            <h1>{displayName}</h1>
            <Progress percent={value} />
        </div>
    )
};

export default HeaderCardProgressBar;