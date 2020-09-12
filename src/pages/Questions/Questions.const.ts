import { ColumnsType } from 'antd/lib/table'
import { renderQuestionsActions } from './Questions.utils'
import { QuestionsModel } from './Questions.model'

export const QUESTIONS_TABLE_COLUMNS: ColumnsType<QuestionsModel> = [
    {
        title: 'Вопрос',
        dataIndex: 'question',
        key: 'question',
    },
    {
        title: 'Популярный',
        dataIndex: 'popular',
        key: 'popular',
        render: (isPopular) => isPopular ? 'Да' : '',
        align: 'center',
        width: 200
    },
    {
        title: '',
        width: 100,
        render: renderQuestionsActions,
        align: 'right',
    }
]