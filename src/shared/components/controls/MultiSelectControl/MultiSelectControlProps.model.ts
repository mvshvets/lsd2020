import { TreeSelectProps } from 'antd/lib/tree-select'

export type TagsType = 'cloud' | 'list' | undefined

export interface MultiSelectControlProps<T> extends TreeSelectProps<T> {
    onChange?: (value: T) => void
    tagsType?: TagsType
}
