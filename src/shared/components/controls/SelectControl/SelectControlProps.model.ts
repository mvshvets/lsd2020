import { FormInstance } from 'antd/lib/form'
import { LabeledValue, SelectProps } from 'antd/lib/select'

export interface SelectControlValuesProps extends LabeledValue {
    disabled?: boolean
}

export interface SelectControlProps<T>
    extends Omit<SelectProps<T>, 'onChange'> {
    values: SelectControlValuesProps[]
    onChange?: (value?: number) => void
    dependencies?: string[]
    form?: FormInstance
}
