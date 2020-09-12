import { RouteNamesProps } from './Routing.model'

const MAIN = 'lsd2020'
const SERVICES = 'services'
const SERVICES_CREATE = 'services-create'
const SERVICES_EDIT = 'services-edit'

export const ROUTE_NAMES: RouteNamesProps = {
    /** Главная страница */
    MAIN: `/${MAIN}`,

    /** Таблица услуг */
    SERVICES: `/${MAIN}/${SERVICES}`,
    /** Таблица услуг: создание услуги */
    SERVICES_CREATE: `/${MAIN}/${SERVICES}/${SERVICES_CREATE}`,
    /** Таблица услуг: редактирование услуги */
    SERVICES_EDIT: `/${MAIN}/${SERVICES}/${SERVICES_EDIT}`,
}