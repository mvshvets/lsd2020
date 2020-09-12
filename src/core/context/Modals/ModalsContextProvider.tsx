import React, { FC, useState } from 'react'

import { ModalsContext } from './ModalsContext'
import { ModalsOptionsProps } from '.'

export const ModalsContextProvider: FC = React.memo(({ children }) => {
    const [modalsOptions, setModalsOptions] = useState<ModalsOptionsProps>({})

    return (
        <ModalsContext.Provider value={{ modalsOptions, setModalsOptions }}>
            {children}
        </ModalsContext.Provider>
    )
})
