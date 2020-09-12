import { BaseButtonProps } from 'antd/lib/button/button'
import { FormProps } from 'antd/lib/form'
import { ModalProps } from 'antd/lib/modal'
import { RowSelectionType } from 'antd/es/table/interface'

/**
 * @param component - компонент формы
 * @param formId - идентификатор формы, необходим для связи с контекстом
 * @param buttonText - текст для кнопки вызова модального окна
 * @param modalOptions - пропсы компонента модального окна andt
 * @param formOptions - пропсы компонента формы andt
 * @param buttonOption - пропсы компонента кнопки окна andt
 * @param havePopup - если false, то в компоненте выводится только кнопка
 * @param haveButton - если false, то в компоненте выводится только модальное окно
 * @param recordCopy - если "true" и "formOptions" имеет "initialValues", используется метод post (create) с предзаполненным полями
 * @param onRequestFinish - callback функция, вызывается в случае успешного request
 * @param deleteFormAction - callback функция обертка над методом удаления api
 * @param rowSelectionType - опция для TableAdapter, отвечает за тип выбора записей таблицы
 */
export interface PopupAdapterProps {
    formId: string
    component?: React.FC<PopupAdapterFormProps>
    buttonText?: string
    modalOptions?: ModalProps
    formOptions?: FormProps
    buttonOption?: BaseButtonProps
    havePopup?: boolean
    haveButton?: boolean
    recordCopy?: boolean
    onRequestFinish?: (
        popupHandler: () => void
    ) => (err?: any, result?: any) => void
    deleteFormAction?: (id: number) => void
    rowSelectionType?: RowSelectionType
}

export interface PopupAdapterFormProps extends FormProps {
    recordCopy?: boolean
    onRequestFinish?: (err?: any, result?: any) => void
    deleteFormAction?: (id: number) => void
    rowSelectionType?: RowSelectionType
    onCancelSubmit?: () => void
}

