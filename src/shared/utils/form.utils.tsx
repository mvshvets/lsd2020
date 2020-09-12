import moment, { Moment } from 'moment'
import { DataNode } from 'rc-tree-select/lib/interface'

interface NormalizeDataForTreeSelectProps {
    [key: string]: any
}

/**
 * Форматирование даты для отправки на бэк
 * @param date дата в формате Moment
 */
export const formatDate = (date?: Moment | string | null) => {
    if (date) return moment(date).format('L')

    return undefined
}

/**
 * Нормализация данных, для вывода в TreeSelectControl
 * @param el - очередная запись итерации
 */
export const normalizeDataForTreeSelect = (
    el: NormalizeDataForTreeSelectProps
): DataNode => {
    if (el.units?.length) {
        return {
            value: el.id,
            title: el.name,
            children: el.units.map(normalizeDataForTreeSelect),
            key: el.id,
        }
    }

    return {
        value: el.id,
        title: el.name,
        key: el.id,
    }
}