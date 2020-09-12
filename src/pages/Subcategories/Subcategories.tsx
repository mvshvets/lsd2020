import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { Table, Button } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { SUBCATEGORIES_TABLE_COLUMNS } from './Subcategories.const'
import { PopupAdapter } from 'shared/popups'
import { LoaderContext } from 'core/context'
import { ConfirmDeleteForm } from 'shared/forms'
import { CATEGORIES_MOCK } from 'mocks'
import { SubcategoriesModel } from './Subcategories.model'
import { useFilter } from 'shared/hooks'
import { IconsAdapter, ButtonsToolbar } from 'shared/components'
import { SubcategoriesFilters, SubcategoriesForm } from './components'

/** Страница подкатегорий */
export const Subcategories: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState<SubcategoriesModel[]>([])

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
                <Button
                    onClick={triggerFilterVisibility}
                    icon={<IconsAdapter iconType="FilterOutlined" />}
                >
                    Фильтры
                </Button>
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

            {visibleFilter && (
                <SubcategoriesFilters/>
            )}

            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                columns={SUBCATEGORIES_TABLE_COLUMNS}
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