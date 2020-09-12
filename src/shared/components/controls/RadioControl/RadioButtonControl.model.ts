import { ColProps } from 'antd/lib/col'
import { FormInstance } from 'antd/lib/form'
import { LabeledValue } from 'antd/lib/select'
import { RadioGroupProps } from 'antd/lib/radio'
import { ReactText } from 'react'
import { RowProps } from 'antd/lib/row'

export interface RadioButtonControlProps
    extends Omit<RadioGroupProps, 'onChange'> {
    values: LabeledValue[]
    labelCol?: ColProps
    valueCol?: ColProps
    rowOptions?: RowProps
    label?: string
    onChange?: (value?: ReactText) => void
    dependencies?: string[]
    form?: FormInstance
}
