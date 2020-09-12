import { CheckboxControlProps } from 'shared/components/controls/CheckboxControl/CheckboxControlProps.model'
import { DatePickerControlProps } from 'shared/components/controls/DatePickerControl/DatePickerControlProps.model'
import { FormItemProps } from 'antd/lib/form'
import { InputControlProps } from 'shared/components/controls/InputControl/InputControlProps.model'
import { LabeledValue } from 'antd/lib/select'
import { MultiSelectControlProps } from 'shared/components/controls/MultiSelectControl/MultiSelectControlProps.model'
import { RadioControlProps } from 'shared/components/controls/RadioControl/RadioControl.model'
import { SelectControlProps } from 'shared/components/controls/SelectControl/SelectControlProps.model'
import { StoreValue } from 'rc-field-form/lib/interface'
import { SwitchControlProps } from 'shared/components/controls/SwitchControl/SwitchControl.model'
import { TextAreaControlProps } from 'shared/components/controls/TextAreaControl/TextAreaControlProps.model'
import { TreeSelectControlProps } from 'shared/components/controls/TreeSelectControl/TreeSelectControlProps.model'

export type ComponentProps =
    | InputControlProps
    | SelectControlProps<LabeledValue>
    | CheckboxControlProps
    | DatePickerControlProps
    | MultiSelectControlProps<number[]>
    | RadioControlProps
    | SwitchControlProps
    | TextAreaControlProps
    | TreeSelectControlProps<number[]>

export type CloneControlValuesProps = string | number | undefined

/**
 * @param name = имя для поля
 * @param component = компонент, который необходимо размножить
 * @param fieldOptions = пропсы для компонента
 * @param formItemOptions = пропсы для "Form.Item" от andt
 */
export interface CloneControlProps<T extends ComponentProps> {
    name: string
    component: React.FC<any>
    fieldOptions?: T
    formItemOptions?: Omit<FormItemProps, 'children'>
}

interface Operation {
    add: (defaultValue?: StoreValue) => void
    remove: (index: number) => void
    move: (from: number, to: number) => void
}

interface FieldData {
    name: number
    key: number
    fieldKey: number
}

export type RenderFieldsType = (
    fields: FieldData[],
    operation: Operation
) => React.ReactNode
