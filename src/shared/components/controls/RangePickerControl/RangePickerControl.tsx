import './RangePickerControl.scss'

import React from 'react'
import { DatePicker } from 'antd'

import { RangePickerControlProps } from './RangePickerControlProps.model'
import { dateFormatList } from './consts'

const { RangePicker } = DatePicker

/**
 * Декоратор для `RangePicker` от `antd`, принимает все теже `props`
 */
export const RangePickerControl: React.FC<RangePickerControlProps> = React.memo(
    (props) => {
        return (
            <div className="form-control range-picker-control">
                <RangePicker
                    format={dateFormatList}
                    placeholder={['с', 'по']}
                    {...props}
                />
            </div>
        )
    }
)
