import React, { useCallback, useContext, useState } from 'react'
import { PageContent } from 'core/components'
import { Table } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { CATEGORIES_TABLE_COLUMNS } from './Categories.const'
import { PopupAdapter } from 'shared/popups'
import { LoaderContext } from 'core/context'
import { ConfirmDeleteForm } from '../../shared/forms/ConfirmDeleteForm'

export const Categories: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState([])

    const dictionaryFetch = useCallback(async () => {
        try {
            setLoaderState(true)

            console.log('Запрос за таблицей категорий')
            setDictionary([])
        } catch (e) {
            console.log(e)
        } finally {
            setLoaderState(false)
        }
    }, [])

    /**
     * Обработчик удаления записи
     * @param id
     */
    const handleDelete = useCallback((id: number) => {
        return () => console.log('Запись удалена! ID: ' + id)
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

    return (
        <PageContent>
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