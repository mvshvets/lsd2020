import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { Table, Button } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { QUESTIONS_TABLE_COLUMNS } from './Questions.const'
import { PopupAdapter } from 'shared/popups'
import { LoaderContext } from 'core/context'
import { ConfirmDeleteForm } from 'shared/forms'
import { CATEGORIES_MOCK } from 'mocks'
import { QuestionsModel } from './Questions.model'
import { useFilter } from 'shared/hooks'
import { IconsAdapter, ButtonsToolbar } from 'shared/components'
import { QuestionsFilters, QuestionsForm } from './components'

/** Таблица вопросов */
export const Questions: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState<QuestionsModel[]>([])

    /**
     * Хук для фильтров
     */
    const [visibleFilter, triggerFilterVisibility] = useFilter()

    /**
     * Запрос за справочником
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
                <Button
                    onClick={triggerFilterVisibility}
                    icon={<IconsAdapter iconType="FilterOutlined" />}
                >
                    Фильтры
                </Button>
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

            {visibleFilter && (
                <QuestionsFilters/>
            )}

            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                columns={QUESTIONS_TABLE_COLUMNS}
                dataSource={dictionary}
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