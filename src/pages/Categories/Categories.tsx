import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { Table, Button } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { CATEGORIES_TABLE_COLUMNS } from './Categories.const'
import { PopupAdapter } from 'shared/popups'
import { LoaderContext } from 'core/context'
import { ConfirmDeleteForm } from 'shared/forms'
import { CATEGORIES_MOCK } from 'mocks'
import { CategoriesModel } from './Categories.model'
import { useFilter } from 'shared/hooks'
import { IconsAdapter, ButtonsToolbar } from 'shared/components'
import { CategoriesForm, CategoriesFilters } from './components'

/** Страница категорий */
export const Categories: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState<CategoriesModel[]>([])

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
                <Button
                    onClick={triggerFilterVisibility}
                    icon={<IconsAdapter iconType="FilterOutlined" />}
                >
                    Фильтры
                </Button>
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

            {visibleFilter && (
                <CategoriesFilters/>
            )}

            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                columns={CATEGORIES_TABLE_COLUMNS}
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