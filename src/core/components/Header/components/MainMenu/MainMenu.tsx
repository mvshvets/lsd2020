import './MainMenu.sass'
import React, { FC, useContext, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { MAIN_MENU_ITEMS } from './MainMenu.consts'
import { ROUTE_NAMES } from 'routing'
import { UserContext } from 'core/context'

/** Главная страница */
export const MainMenu: FC = React.memo(() => {
    const { userData } = useContext(UserContext)

    const menuRender = useMemo(
        () =>
            <>
                {MAIN_MENU_ITEMS.map((menuItem) => (
                    <NavLink to={menuItem.link} key={menuItem.title}>
                        {menuItem.title}
                    </NavLink>
                ))}
                {userData && <NavLink to={ROUTE_NAMES.PROFILE} key={ROUTE_NAMES.PROFILE}>
                    {userData.name}
                </NavLink>}
            </>,
        [userData]
    )

    return <nav className="nav">{menuRender}</nav>
})
