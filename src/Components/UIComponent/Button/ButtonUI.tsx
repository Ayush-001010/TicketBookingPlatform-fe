import React, { PropsWithChildren } from 'react'
import IButtonUI from './IButtonUI'


const ButtonUI : React.FunctionComponent<IButtonUI & PropsWithChildren> = ({children , type }) => {
  return (
    <div>
        <button type={type}>
            {children}
        </button>
    </div>
  )
}


export default ButtonUI; 