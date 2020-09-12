import { ColumnsType } from 'antd/lib/table'
import { ServicesModel } from '../Services.model'
import { renderServicesActions } from './Services.utils'

export const SERVICES_TABLE_COLUMNS: ColumnsType<ServicesModel> = [
    {
        title: 'Название',
        dataIndex: 'full_name',
        key: 'full_name',
    },
    {
        title: '',
        width: 100,
        render: renderServicesActions,
        align: 'right',
    }
]