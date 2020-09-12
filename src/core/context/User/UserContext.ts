import React from 'react'
import { NotImplementedError } from 'core/errors'

import { UserContextProps } from './UserContextProps'

export const UserContext = React.createContext<UserContextProps>({
    userData: null,
    setUserData: (userData) => {
        throw new NotImplementedError()
    },
})
