import { TreeSelectProps } from 'antd/lib/tree-select'
import { ReactNode } from 'react'

export enum TagsType {
    'Cloud' = 'Cloud',
    'List' = 'List',
    'ListView' = 'ListView',
}

/**
 * Интерфейс для MultiSelectControl
 * @param onChange - callback при изменении компонента
 * @param tagsType - тип вывода выбранных пунктов меню
 * @param selectAll - отображение пункта "Выбрать все"
 */
export interface MultiSelectControlProps<T> extends TreeSelectProps<T> {
    onChange?: (value: T) => void
    tagsType?: TagsType
    selectAll?: boolean
    addonAfter?: ReactNode
}
