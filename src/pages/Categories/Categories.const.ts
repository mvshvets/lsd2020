import { ColumnsType } from 'antd/lib/table'
import { renderCategoriesActions } from './Categories.utils'
import { CategoriesModel } from './Categories.model'

export const CATEGORIES_TABLE_COLUMNS: ColumnsType<CategoriesModel> = [
    {
        title: 'Категория',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '',
        width: 100,
        render: renderCategoriesActions,
        align: 'right',
    }
]