import './DatePickerControl.scss'

import React, { useCallback, useState } from 'react'
import moment, { Moment } from 'moment'
import { DatePicker } from 'antd'
import { formatDate } from 'shared/utils'

import { DatePickerControlProps } from './DatePickerControlProps.model'
import { dateFormatList } from './consts'

/**
 * Декоратор для `DatePicker` от `antd`
 */
export const DatePickerControl: React.FC<DatePickerControlProps> = React.memo(
    ({ value, onChange }) => {
        const [date, setDate] = useState<Moment | null>()

        const triggerChange = useCallback(
            (value: Moment | null) => {
                const resultDate = formatDate(value)

                if (onChange) onChange(resultDate)
            },
            [onChange]
        )

        const handleDateChange = useCallback(
            (value: Moment | null) => {
                setDate(value)
                triggerChange(value)
            },
            [triggerChange]
        )

        return (
            <div className="form-control date-picker-control">
                <DatePicker
                    format={dateFormatList}
                    onChange={handleDateChange}
                    value={(value && moment(value)) || date}
                />
            </div>
        )
    }
)
