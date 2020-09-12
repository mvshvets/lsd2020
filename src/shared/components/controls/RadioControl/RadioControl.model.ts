import { ColProps } from 'antd/lib/col'
import { LabeledValue } from 'antd/lib/select'
import { RadioGroupProps } from 'antd/lib/radio'
import { RowProps } from 'antd/lib/row'

export interface RadioControlProps extends RadioGroupProps {
    values: LabeledValue[]
    label?: string
    labelCol?: ColProps
    valueCol?: ColProps
    rowOptions?: RowProps
    dependencies?: string[]
}
