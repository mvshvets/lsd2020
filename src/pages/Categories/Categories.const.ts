import { ColumnsType } from 'antd/lib/table'
import { renderCategoriesActions } from './Categories.utils'

export const CATEGORIES_TABLE_COLUMNS: ColumnsType<any> = [
    {
        title: 'Категория',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '',
        width: 100,
        render: renderCategoriesActions,
        align: 'right',
    }
]