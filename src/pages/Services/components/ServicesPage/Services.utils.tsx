import { ServicesModel } from '../Services.model'
import { PopupAdapter } from 'shared/popups'
import { IconsAdapter, ButtonsToolbar } from 'shared/components'
import React from 'react'
import { ROUTE_NAMES } from 'routing'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

/**
 * Рендер кнопок управления для записи таблицы категорий
 * @param tableRow одна запись таблицы
 */
export const renderServicesActions = (tableRow: ServicesModel) => {
    return (
        <ButtonsToolbar>
            <Link
                to={`${ROUTE_NAMES.SERVICES_EDIT}/${tableRow.id}`}
                className="like-button"
            >
                <Button
                    type="link"
                    icon={<IconsAdapter iconType="EditOutlined" />}
                />
            </Link>
            <PopupAdapter
                formId="ConfirmDeleteForm"
                buttonText=""
                havePopup={false}
                buttonOption={{
                    type: 'link',
                    icon: <IconsAdapter iconType="DeleteOutlined"/>
                }}
                formOptions={{
                    initialValues: tableRow
                }}
                modalOptions={{
                    title: 'Подтвердите действие',
                    okText: 'Да'
                }}
            />
        </ButtonsToolbar>
    )
}