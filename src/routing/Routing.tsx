import './Routing.scss'

import React, { FC, useContext, useMemo } from 'react'
import { NotFoundPage, Services } from 'pages'
import { LoaderContext } from 'core/context'

import { ROUTE_NAMES } from './routeNames.const'
import { Route, Switch, Redirect } from 'react-router-dom'

export const Routing: FC = React.memo(() => {
    const { loaderState } = useContext(LoaderContext)

    const contentStyles = useMemo(() => {
        if (!loaderState) {
            return 'content scroll'
        }

        return 'content scroll with-loader'
    }, [loaderState])

    return (
        <div className={contentStyles}>

            <Switch>
                {/* Главная страница */}
                <Route path={ROUTE_NAMES.MAIN} exact>
                    <Redirect to={ROUTE_NAMES.SERVICES}/>
                </Route>

                {/* Главная страница */}
                <Route path={ROUTE_NAMES.SERVICES}>
                    <Services/>
                </Route>

                {/* Ловушка неизвестных роутов */}
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    )
})
