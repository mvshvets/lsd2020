import React, { FC, useCallback, useContext, useEffect, useState } from 'react'

import { LoaderContext, UserContext } from 'core/context'
import { Store } from 'rc-field-form/lib/interface'
import { ROUTE_NAMES } from 'routing'
import { useHistory } from 'react-router-dom'

export const UserContextProvider: FC = React.memo(({ children }) => {
    const { setLoaderState } = useContext(LoaderContext)
    const [userData, setUserData] = useState<Store | null>(null)
    const history = useHistory()

    const onSetUserData = useCallback(
        (userData: Store | null) => {
            setUserData(userData)
            localStorage.setItem('userData', JSON.stringify(userData))
            history.push(ROUTE_NAMES.PROFILE)
        },
        [setUserData, history]
    )

    const checkAuth = useCallback(() => {
        if (userData) {
            return
        }

        try {
            setLoaderState(true)
            const user = localStorage.getItem('userData')
            setUserData(user ? JSON.parse(user) : null)
        } catch (e) {
            console.log(e)
        } finally {
            setLoaderState(false)
        }
    }, [userData, setLoaderState, setUserData])

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    return (
        <UserContext.Provider value={{ userData, setUserData: onSetUserData }}>
            {children}
        </UserContext.Provider>
    )
})
