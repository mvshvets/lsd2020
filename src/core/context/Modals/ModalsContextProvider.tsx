import React, { FC, useState } from 'react'

import { ModalsContext } from './ModalsContext'
import { ModalsOptionsProps } from '.'

export const ModalsContextProvider: FC = React.memo(({ children }) => {
    const [popupAdapterOptions, setPopupAdapterOptions] = useState<
        ModalsOptionsProps
    >({})

    return (
        <ModalsContext.Provider
            value={{ popupAdapterOptions, setPopupAdapterOptions }}
        >
            {children}
        </ModalsContext.Provider>
    )
})
