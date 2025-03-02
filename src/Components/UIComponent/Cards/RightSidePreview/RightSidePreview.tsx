import React, { PropsWithChildren } from 'react';
import IRightSidePreview from './IRightSidePreview';
import styles from './RightSidePreview.module.css';

const RightSidePreview : React.FunctionComponent<IRightSidePreview & PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.css1}>
        {children}
    </div>
  )
}

export default RightSidePreview;