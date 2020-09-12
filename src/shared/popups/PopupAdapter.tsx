import React, { useCallback, useContext } from 'react'
import { Button, Modal } from 'antd'
import { LoaderContext, ModalsContext, ModalsOptionsProps } from 'core/context'

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
        const { popupAdapterOptions, setPopupAdapterOptions } = useContext(
            ModalsContext
        )

        const getRestPopupAdapterOptions = useCallback(
            (prevState: ModalsOptionsProps) => ({
                recordCopy,
                formOptions: {
                    ...prevState[formId]?.formOptions,
                    initialValues: formOptions?.initialValues,
                },
                modalOptions: {
                    ...prevState[formId]?.modalOptions,
                    ...modalOptions,
                    title: modalOptions?.title || 'Добавить запись',
                    okText: modalOptions?.okText || 'Отправить',
                },
            }),
            [formId, formOptions, modalOptions, recordCopy]
        )

        const closeModal = useCallback(
            () =>
                setPopupAdapterOptions((prevState) => ({
                    ...prevState,
                    [formId]: {
                        ...prevState[formId],
                        visible: false,
                    },
                })),
            [formId, setPopupAdapterOptions]
        )

        const showModal = useCallback(
            () =>
                setPopupAdapterOptions((prevState: ModalsOptionsProps) => ({
                    ...prevState,
                    [formId]: {
                        ...prevState[formId],
                        visible: true,
                        ...getRestPopupAdapterOptions(prevState),
                    },
                })),
            [formId, getRestPopupAdapterOptions, setPopupAdapterOptions]
        )

        /**
         * Обработчик успешной отправки формы
         */
        const handleRequestFinish = useCallback(() => {
            if (onRequestFinish) return onRequestFinish(closeModal)
        }, [closeModal, onRequestFinish])

        const handleCancel = useCallback(() => {
            closeModal()
        }, [closeModal])

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
                        visible={popupAdapterOptions[formId]?.visible}
                        {...popupAdapterOptions[formId]?.modalOptions}
                    >
                        <Component
                            onRequestFinish={handleRequestFinish()}
                            deleteFormAction={deleteFormAction}
                            id={formId}
                            {...formOptions}
                            recordCopy={popupAdapterOptions[formId]?.recordCopy}
                            initialValues={
                                popupAdapterOptions[formId]?.formOptions
                                    ?.initialValues
                            }
                            rowSelectionType={rowSelectionType}
                            onCancelSubmit={handleCancel}
                        />
                    </Modal>
                )}
            </>
        )
    }
)
