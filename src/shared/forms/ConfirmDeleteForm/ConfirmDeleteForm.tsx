import React, { FC, useCallback, useContext } from 'react'
import { Form } from 'antd'
import { InputControl } from 'shared/components'
import { LoaderContext } from 'core/context'
import { PopupAdapterFormProps } from 'shared/popups/PopupAdapter.model'

/** Универсальная форма для удаления записи */
export const ConfirmDeleteForm: FC<PopupAdapterFormProps> = React.memo(
    ({
        onRequestFinish = () => {},
        deleteFormAction = () => {},
        initialValues,
        rowSelectionType,
        recordCopy,
        ...props
    }) => {
        const { setLoaderState } = useContext(LoaderContext)

        const handleFinish = useCallback(
            async (values: { id?: number }) => {
                try {
                    setLoaderState(true)

                    await deleteFormAction(values.id as number)

                    onRequestFinish()
                } catch (err) {
                    onRequestFinish(err)
                } finally {
                    setLoaderState(false)
                }
            },
            [deleteFormAction, onRequestFinish, setLoaderState]
        )

        return (
            <Form
                onFinish={handleFinish}
                {...props}
                initialValues={initialValues}
            >
                Уверены, что хотите удалить?
                <Form.Item name="id">
                    <InputControl hidden />
                </Form.Item>
            </Form>
        )
    }
)
