import React, { useCallback, useContext } from 'react'
import { Button, Modal } from 'antd'
import { LoaderContext, ModalsContext } from 'core/context'

import { PopupAdapterProps } from './PopupAdapter.model'

export const PopupAdapter: React.FC<PopupAdapterProps> = React.memo(
    ({
        component: Component,
        buttonText = 'Добавить',
        formId,
        modalOptions,
        formOptions,
        buttonOption,
        havePopup = true,
        haveButton = true,
        recordCopy,
        onRequestFinish,
        deleteFormAction,
        rowSelectionType,
    }) => {
        const { loaderState } = useContext(LoaderContext)
        const { modalsOptions, setModalsOptions } = useContext(ModalsContext)

        const closeModal = useCallback(
            () =>
                setModalsOptions({
                    ...modalsOptions,
                    [formId]: {
                        visible: false,
                    },
                }),
            [formId, modalsOptions, setModalsOptions]
        )

        const showModal = useCallback(
            () =>
                setModalsOptions({
                    ...modalsOptions,
                    [formId]: {
                        visible: true,
                        recordCopy,
                        formOptions: {
                            initialValues: formOptions?.initialValues,
                        },
                        modalOptions: {
                            title: modalOptions?.title,
                            okText: modalOptions?.okText,
                        },
                    },
                }),
            [
                formId,
                formOptions,
                modalOptions,
                modalsOptions,
                recordCopy,
                setModalsOptions,
            ]
        )

        /**
         * Хук, вызывается в случае успешной отправки формы
         */
        const handleRequestFinish = useCallback(() => {
            if (onRequestFinish) return onRequestFinish(closeModal)
        }, [closeModal, onRequestFinish])

        const handleCancel = useCallback(() => {
            closeModal()
        }, [closeModal])

        /**
         * Берет из контекста начальные значения для формы, если они есть
         */
        const getInitialValues = useCallback(() => {
            if (modalsOptions[formId]?.formOptions?.initialValues)
                return modalsOptions[formId].formOptions?.initialValues
        }, [formId, modalsOptions])

        return (
            <>
                {haveButton && (
                    <Button {...buttonOption} onClick={showModal}>
                        {buttonText}
                    </Button>
                )}

                {havePopup && Component && (
                    <Modal
                        okButtonProps={{
                            htmlType: 'submit',
                            form: formId,
                            disabled: loaderState,
                        }}
                        onCancel={handleCancel}
                        destroyOnClose
                        {...modalOptions}
                        {...modalsOptions[formId]}
                    >
                        <Component
                            onRequestFinish={handleRequestFinish()}
                            deleteFormAction={deleteFormAction}
                            id={formId}
                            {...formOptions}
                            recordCopy={modalsOptions[formId]?.recordCopy}
                            initialValues={getInitialValues()}
                            rowSelectionType={rowSelectionType}
                        />
                    </Modal>
                )}
            </>
        )
    }
)
