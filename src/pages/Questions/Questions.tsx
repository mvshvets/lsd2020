import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { Table } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { QUESTIONS_TABLE_COLUMNS } from './Questions.const'
import { PopupAdapter } from 'shared/popups'
import { LoaderContext } from 'core/context'
import { ConfirmDeleteForm } from 'shared/forms'
import { CATEGORIES_MOCK } from 'mocks'
import { QuestionsModel } from './Questions.model'
import { ButtonsToolbar } from 'shared/components'
import { QuestionsForm } from './components'

/** Таблица вопросов */
export const Questions: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState<QuestionsModel[]>([])

    /**
     * Запрос справочника
     */
    const dictionaryFetch = useCallback(async () => {
        try {
            setLoaderState(true)

            console.log('Запрос за таблицей вопросов')
            setDictionary(CATEGORIES_MOCK.questions)
        } catch (e) {
            console.log(e)
        } finally {
            setLoaderState(false)
        }
    }, [setLoaderState])

    /**
     * Обработчик удаления записи
     * @param id
     */
    const handleDelete = useCallback((id: number) => {
        return console.log('Запись удалена! ID: ' + id)
    }, [])

    const handleRequestFinish = useCallback(
        (popupHandler: () => void) => (err: any) => {
            if (!err) {
                popupHandler()
                dictionaryFetch()
            }
        },
        [dictionaryFetch]
    )

    useEffect(() => {
        dictionaryFetch()
    }, [dictionaryFetch])

    return (
        <PageContent>

            <ContentTitle title="Вопросы" />

            <ButtonsToolbar>
                <PopupAdapter
                    component={QuestionsForm}
                    formId="QuestionsForm"
                    buttonText="Создать вопрос"
                    onRequestFinish={handleRequestFinish}
                    modalOptions={{
                        title: 'Новый вопрос',
                        footer: null,
                    }}
                />
            </ButtonsToolbar>

            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                columns={QUESTIONS_TABLE_COLUMNS}
                dataSource={dictionary}
            />
            <PopupAdapter
                component={QuestionsForm}
                formId="ConfirmEditForm"
                onRequestFinish={handleRequestFinish}
                haveButton={false}
                modalOptions={{
                    title: 'Изменить вопрос',
                    footer: null,
                }}
            />
            <PopupAdapter
                component={ConfirmDeleteForm}
                formId="ConfirmDeleteForm"
                onRequestFinish={handleRequestFinish}
                haveButton={false}
                deleteFormAction={handleDelete}
            />
        </PageContent>
    )
})