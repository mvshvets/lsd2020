import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { Table } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { CATEGORIES_TABLE_COLUMNS } from './Categories.const'
import { PopupAdapter } from 'shared/popups'
import { LoaderContext } from 'core/context'
import { ConfirmDeleteForm } from 'shared/forms'
import { CATEGORIES_MOCK } from 'mocks'
import { CategoriesModel } from './Categories.model'
import { ButtonsToolbar } from 'shared/components'
import { CategoriesForm } from './components'

/** Страница категорий */
export const Categories: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState<CategoriesModel[]>([])

    /**
     * Запрос справочника
     */
    const dictionaryFetch = useCallback(async () => {
        try {
            setLoaderState(true)

            console.log('Запрос за таблицей категорий')
            setDictionary(CATEGORIES_MOCK.root_categories)
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
            <ContentTitle title="Категории" />

            <ButtonsToolbar>
                <PopupAdapter
                    component={CategoriesForm}
                    formId="CategoriesForm"
                    buttonText="Создать категорию"
                    onRequestFinish={handleRequestFinish}
                    modalOptions={{
                        title: 'Новая категория',
                        footer: null,
                    }}
                />
            </ButtonsToolbar>

            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                columns={CATEGORIES_TABLE_COLUMNS}
                dataSource={dictionary}
            />
            <PopupAdapter
                component={CategoriesForm}
                formId="ConfirmEditForm"
                onRequestFinish={handleRequestFinish}
                haveButton={false}
                modalOptions={{
                    title: 'Изменить категорию',
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