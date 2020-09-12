import './RadioControl.scss'

import React from 'react'
import { Radio } from 'antd'

import { RadioControlProps } from './RadioControl.model'

/**
 * Декоратор для `RadioGroup` от `antd`, принимает все теже `props`
 */
export const RadioControl: React.FC<RadioControlProps> = React.memo((props) => {
    const { values = [], ...restProps } = props

    return (
        <div className="form-control radio-control">
            <Radio.Group {...restProps}>
                {values.map((el) => (
                    <Radio key={String(el.key)} value={el.value}>
                        {el.label}
                    </Radio>
                ))}
            </Radio.Group>
        </div>
    )
})
