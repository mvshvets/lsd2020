import './Header.sass'

import React, { FC, useCallback, useContext, useState } from 'react'
import { LoaderContext } from 'core/context'
import { useHistory } from 'react-router-dom'
import { MainMenu } from './components'
import { Button } from 'antd'
import { ROUTE_NAMES } from 'routing'
import { Link } from 'react-router-dom'
import { PopupAdapter, AuthModal } from 'shared/popups'
import { Store } from 'rc-field-form/lib/interface'

export const Header: FC = React.memo(() => {
    const [ userData, setUserData ] = useState(false)
    const { setLoaderState } = useContext(LoaderContext)
    const history = useHistory()

    const handleRequestFinish = useCallback((popupHandler: () => void) => (values: Store) => {
        try {
            setLoaderState(true)
            if (values.login === 'admin' && values.password === 'admin') {
                popupHandler()
                            setUserData(true)
                            history.push(ROUTE_NAMES.PROFILE)
            }
        } finally {
            setLoaderState(false)
        }
    }, [setUserData, history, setLoaderState])

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        localStorage.removeItem('userData')
        setUserData(false)
    }

    return (
        <header className="header">
            <Link to={ROUTE_NAMES.MAIN}>
                <h1><i>СВсП</i></h1>
            </Link>
            <div className="header__menu-wrapper">
                <MainMenu/>
                {userData ? <Button onClick={handleLogout}>ВЫХОД</Button> : <PopupAdapter
                    component={AuthModal}
                    formId="authForm"
                    buttonText="ВХОД"
                    onRequestFinish={handleRequestFinish}
                    modalOptions={{footer: null }}
                />}
            </div>
        </header>
    )
})
