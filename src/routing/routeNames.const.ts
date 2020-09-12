import { RouteNamesProps } from './Routing.model'

const PROFILE = 'profile'
const STATISTIC = 'statistic'
const CATEGORIES = 'categories'
const SUBCATEGORIES = 'subcategories'
const QUESTIONS = 'questions'

export const ROUTE_NAMES: RouteNamesProps = {
    /** Главная страница */
    MAIN: '/',
    /** Личный кабинет */
    PROFILE: `/${PROFILE}`,
    /** Статистика */
    STATISTIC: `/${STATISTIC}`,
    /** Таблица категорий */
    CATEGORIES: `/${CATEGORIES}`,
    /** Таблица подкатегорий */
    SUBCATEGORIES: `/${SUBCATEGORIES}`,
    /** Таблица вопросов */
    QUESTIONS: `/${QUESTIONS}`
}