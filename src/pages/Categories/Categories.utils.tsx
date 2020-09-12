import React from 'react'
import { IconsAdapter, ButtonsToolbar } from 'shared/components'
import { PopupAdapter } from 'shared/popups'
import { CategoriesModel } from './Categories.model'

/**
 * Рендер кнопок управления для записи таблицы категорий
 * @param tableRow одна запись таблицы
 */
export const renderCategoriesActions = (tableRow: CategoriesModel) => {
    return (
            <ButtonsToolbar>
                <PopupAdapter
                    formId="ConfirmEditForm"
                    buttonText=""
                    havePopup={false}
                    buttonOption={{
                        type: 'link',
                        icon: <IconsAdapter iconType="EditOutlined" />,
                    }}
                    formOptions={{
                        initialValues: tableRow,
                    }}
                    modalOptions={{
                        title: 'Изменить категорию',
                        footer: null,
                    }}
                />
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