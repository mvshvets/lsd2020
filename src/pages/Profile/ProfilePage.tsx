import './ProfilePage.sass'

import React, { FC, useContext, useEffect } from 'react'

import { ProfileProps } from './ProfilePage.model'
import { PageContent } from 'core/components'
import { UserContext } from 'core/context'
import { useHistory } from 'react-router-dom'
import { ROUTE_NAMES } from 'routing'

export const ProfilePage: FC<ProfileProps> = React.memo(() => {
    const { userData } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if (!userData) history.push(ROUTE_NAMES.MAIN)
    }, [userData, history])

    return (
        <PageContent className={'profile'}>
            Личный кабинет
        </PageContent>
    )
})
