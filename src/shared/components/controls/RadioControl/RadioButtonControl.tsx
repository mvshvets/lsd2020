import './RadioButtonControl.scss'

import React, { ReactText, useCallback, useState } from 'react'
import { Radio } from 'antd'

import { RadioButtonControlProps } from './RadioButtonControl.model'

/**
 * Декоратор для `RadioGroup` от `antd`
 */
export const RadioButtonControl: React.FC<RadioButtonControlProps> = React.memo(
    (props) => {
        const {
            values = [],
            dependencies,
            value,
            onChange,
            form,
            ...restProps
        } = props

        const [valueState, setValueState] = useState<ReactText>()

        /**
         * Обновить значение в стейте и внешней форме
         */
        const triggerChanges = useCallback(
            (value: ReactText) => {
                setValueState(value)
                if (onChange) onChange(value)
            },
            [onChange]
        )

        /**
         * Обработчик изменения значения RadioGroup
         */
        const handleRadioGroupChange = useCallback(
            (event) => {

                const startTrigger = () => {
                    if (event?.target?.value) {
                        triggerChanges(event.target.value)
                    }
                }

                startTrigger()
            },
            [triggerChanges]
        )

        return (
            <div className="form-control radio-button-control">
                <Radio.Group
                    onChange={handleRadioGroupChange}
                    value={value || valueState}
                    {...restProps}
                >
                    {values.map((el) => (
                        <Radio.Button key={String(el.key)} value={el.value}>
                            {el.label}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </div>
        )
    }
)
