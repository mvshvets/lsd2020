import { ColumnsType } from 'antd/lib/table'
import { renderCategoriesActions } from './Subcategories.utils'
import { SubcategoriesModel } from './Subcategories.model'

export const SUBCATEGORIES_TABLE_COLUMNS: ColumnsType<SubcategoriesModel> = [
    {
        title: 'Подкатегория',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Популярный',
        dataIndex: 'popular',
        key: 'popular',
        align: 'center',
        render: (isPopular) => isPopular ? 'Да' : ''
    },
    {
        title: '',
        width: 100,
        render: renderCategoriesActions,
        align: 'right',
    }
]