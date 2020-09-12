import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { Table } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { SUBCATEGORIES_TABLE_COLUMNS } from './Subcategories.const'
import { PopupAdapter } from 'shared/popups'
import { LoaderContext } from 'core/context'
import { ConfirmDeleteForm } from 'shared/forms'
import { CATEGORIES_MOCK } from 'mocks'
import { SubcategoriesModel } from './Subcategories.model'
import { ButtonsToolbar } from 'shared/components'
import { SubcategoriesForm } from './components'

/** Страница подкатегорий */
export const Subcategories: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState<SubcategoriesModel[]>([])

    /**
     * Запрос справочника
     */
    const dictionaryFetch = useCallback(async () => {
        try {
            setLoaderState(true)

            console.log('Запрос за таблицей подкатегорий')
            setDictionary(CATEGORIES_MOCK.categories)
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

            <ContentTitle title="Подкатегории" />

            <ButtonsToolbar>
                <PopupAdapter
                    component={SubcategoriesForm}
                    formId="SubcategoriesForm"
                    buttonText="Создать подкатегорию"
                    onRequestFinish={handleRequestFinish}
                    modalOptions={{
                        title: 'Новая подкатегория',
                        footer: null,
                    }}
                />
            </ButtonsToolbar>

            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                columns={SUBCATEGORIES_TABLE_COLUMNS}
                dataSource={dictionary}
            />
            <PopupAdapter
                component={SubcategoriesForm}
                formId="ConfirmEditForm"
                onRequestFinish={handleRequestFinish}
                haveButton={false}
                modalOptions={{
                    title: 'Изменить подкатегорию',
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