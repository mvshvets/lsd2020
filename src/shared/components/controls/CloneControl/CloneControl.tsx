import './CloneControl.scss'

import React, { useCallback } from 'react'
import { Button, Form } from 'antd'
import { IconsAdapter } from 'shared/components'

import {
    CloneControlProps,
    ComponentProps,
    RenderFieldsType,
} from './CloneControl.model'

/**
 * Компонент для клонирования других компонентов контролов
 */
export const CloneControl = <T extends ComponentProps>({
    name,
    component: Component,
    fieldOptions,
    formItemOptions,
}: CloneControlProps<T>) => {
    /**
     * Обработчик добавления полня
     */
    const handleAddField = useCallback(
        (onAdd) => () => {
            onAdd()
        },
        []
    )

    /**
     * Обработчик удаления полня
     */
    const handleDeleteField = useCallback(
        (field, onDelete) => () => {
            onDelete(field)
        },
        []
    )

    /**
     * Рендер полей
     * @param fields - массив полей
     * @param operation - методы для работы с полями, добавление, удаление и т.д.
     */
    const renderFields: RenderFieldsType = useCallback(
        (fields, { add, remove }) => {
            return (
                <>
                    {fields.map((field, index) => (
                        <Form.Item
                            {...formItemOptions}
                            key={field.key}
                            className="clone-control__row"
                        >
                            <Form.Item {...field}>
                                <Component {...fieldOptions} />
                            </Form.Item>

                            <IconsAdapter
                                iconType="CloseOutlined"
                                onClick={handleDeleteField(field.name, remove)}
                            />
                        </Form.Item>
                    ))}

                    <Button
                        type="link"
                        icon={<IconsAdapter iconType="PlusCircleOutlined" />}
                        className="clone-control__add"
                        onClick={handleAddField(add)}
                    >
                        Добавить
                    </Button>
                </>
            )
        },
        [fieldOptions, formItemOptions, handleAddField, handleDeleteField]
    )

    return (
        <div className="form-control clone-control">
            <Form.List name={name}>{renderFields}</Form.List>
        </div>
    )
}
