import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { LoaderContext } from 'core/context'
import { ButtonsToolbar } from 'shared/components'
import { PopupAdapter } from 'shared/popups'
import { Table, Button } from 'antd'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { ConfirmDeleteForm } from 'shared/forms'
import { SERVICES_MOCK } from 'mocks'
import { ServicesModel } from '../Services.model'
import { Link } from 'react-router-dom'
import { ROUTE_NAMES } from 'routing'
import { SERVICES_TABLE_COLUMNS } from './Services.consts'

export const ServicesPage: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [dictionary, setDictionary] = useState<ServicesModel[]>([])

    /**
     * Запрос справочника
     */
    const dictionaryFetch = useCallback(async () => {
        try {
            setLoaderState(true)

            console.log('Запрос за таблицей услуг для Алисы')
            setDictionary(SERVICES_MOCK)
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
            <ContentTitle title="Услуги" />

            <ButtonsToolbar>
                <Link
                    to={ROUTE_NAMES.SERVICES_CREATE}
                    className="like-button"
                >
                    <Button>Создать</Button>
                </Link>
            </ButtonsToolbar>

            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                columns={SERVICES_TABLE_COLUMNS}
                dataSource={dictionary}
                pagination={false}
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