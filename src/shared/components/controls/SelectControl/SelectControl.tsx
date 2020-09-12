import './SelectControl.scss'

import React, { useCallback, useState } from 'react'
import { LabeledValue } from 'antd/lib/select'
import { SELECT_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { Select } from 'antd'
import { calculateClass } from 'shared/utils'

import { SelectControlProps } from './SelectControlProps.model'

/**
 * Декоратор для `Select` от `antd`
 */
export const SelectControl: React.FC<SelectControlProps<
    number | LabeledValue
>> = React.memo((props) => {
    const {
        values = [],
        dropdownClassName,
        dependencies,
        value,
        onChange,
        form,
        ...restProps
    } = props
    const dropdownClasses = calculateClass([
        'select-control__dropdown',
        dropdownClassName ? dropdownClassName : '',
    ])

    const [valueState, setValueState] = useState<number>()

    /**
     * Обновить значение в стейте и внешней форме
     */
    const triggerChanges = useCallback(
        (value: number) => {
            setValueState(value)
            if (onChange) onChange(value)
        },
        [onChange]
    )

    /**
     * Обработчик изменения значения Select
     */
    const handleSelectChange = useCallback(
        (number) => {

            const startTrigger = () => {
                triggerChanges(number)
            }

            startTrigger()
        },
        [triggerChanges]
    )

    return (
        <div className="form-control select-control">
            <Select
                value={value || valueState}
                onChange={handleSelectChange}
                placeholder={SELECT_PLACEHOLDER_DEFAULT}
                {...restProps}
                dropdownClassName={dropdownClasses}
                options={values}
            />
        </div>
    )
})
