import React from 'react'
/**
 * Рендер кнопок управления для записи таблицы категорий
 * @param tableRow одна запись таблицы
 */
import { Link } from 'react-router-dom'
import { ROUTE_NAMES } from 'routing'
import { Button } from 'antd'
import { IconsAdapter, ButtonsToolbar } from 'shared/components'
import { PopupAdapter } from 'shared/popups'
import { QuestionsModel } from './Questions.model'

export const renderCategoriesActions = (tableRow: QuestionsModel) => {
    return (
            <ButtonsToolbar>
                <Link
                    to={`${ROUTE_NAMES.CATALOGUE_EVENTS_EDIT}/${tableRow.id}`}
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
                        icon: <IconsAdapter iconType="DeleteOutlined" />,
                    }}
                    formOptions={{
                        initialValues: tableRow,
                    }}
                    modalOptions={{
                        title: 'Подтвердите действие',
                        okText: 'Да',
                    }}
                />
            </ButtonsToolbar>
    )
}