import { Dispatch, SetStateAction } from 'react'
import { FormProps } from 'antd/lib/form'
import { ModalProps } from 'antd/lib/modal'

export interface ModalsContextProps {
    modalsOptions: ModalsOptionsProps
    setModalsOptions: Dispatch<SetStateAction<ModalsOptionsProps>>
}

export interface ModalsOptionsProps {
    [modalKey: string]: SingleModalProps
}

/**
 * @param visible - состояние модального окна (видимость)
 * @param recordCopy - если "true" и "formOptions" имеет "initialValues", используется метод post (create) с предзаполненным полями
 * @param modalOptions - props модального окна andt
 * @param formOptions - props формы andt
 */
export interface SingleModalProps {
    visible: boolean
    recordCopy?: boolean
    modalOptions?: ModalProps
    formOptions?: FormProps
}
