import React from 'react'
import { NotFoundPage } from 'pages'
import { Route, Switch } from 'react-router-dom'
import { ROUTE_NAMES } from 'routing'
import { ServicesPage, ServicesForm } from './components'

export const Services: React.FC = React.memo(() => {
    return (
        <Switch>
            {/* Таблица услуг: создание услуги */}
            <Route path={ROUTE_NAMES.SERVICES_CREATE}>
                <ServicesForm />
            </Route>

            {/* Таблица услуг: редактирование услуги */}
            <Route path={`${ROUTE_NAMES.SERVICES_EDIT}/:id`}>
                <ServicesForm />
            </Route>

            {/* Таблица услуг */}
            <Route path={ROUTE_NAMES.SERVICES}>
                <ServicesPage />
            </Route>

            {/* Ловушка неизвестных роутов */}
            <Route component={NotFoundPage} />
        </Switch>
    )
})