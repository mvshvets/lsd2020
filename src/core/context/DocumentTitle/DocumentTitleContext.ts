import React from 'react'
import { NotImplementedError } from 'core/errors'

import { DocumentTitleContextProps } from './DocumentTitleContextProps'

export const DocumentTitleContext = React.createContext<
    DocumentTitleContextProps
>({
    updateTitle: (newTitle) => {
        throw new NotImplementedError()
    },
})
