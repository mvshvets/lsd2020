import './ProfilePage.sass'

import React, { FC, useContext, useEffect } from 'react'

import { ProfileProps } from './ProfilePage.model'
import { PageContent } from 'core/components'
import { UserContext } from 'core/context'
import { useHistory } from 'react-router-dom'
import { ROUTE_NAMES } from 'routing'
import { Tabs } from 'antd'
import { Subject, Profile, Programs } from './components'

const { TabPane } = Tabs

export const ProfilePage: FC<ProfileProps> = React.memo(({ id, className }) => {
    const { userData } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if (!userData) history.push(ROUTE_NAMES.MAIN)
    }, [userData, history])

    return (
        <PageContent className={'profile'}>
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Профиль" key="1">
                    <Profile/>
                </TabPane>
                <TabPane tab="Дисциплины" key="2">
                    <Subject/>
                </TabPane>
                <TabPane tab="Программы" key="3">
                    <Programs/>
                </TabPane>
            </Tabs>
        </PageContent>
    )
})
