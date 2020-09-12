import React from 'react'

import { LoaderContextProps } from './LoaderContextProps'
import { NotImplementedError } from '../../errors'

export const LoaderContext = React.createContext<LoaderContextProps>({
    loaderState: false,
    setLoaderState: (state) => {
        throw new NotImplementedError()
    },
})
