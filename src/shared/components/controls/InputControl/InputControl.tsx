import './InputControl.scss'

import React from 'react'
import { INPUT_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { Input } from 'antd'

import { InputControlProps } from './InputControlProps.model'

/**
 * Декоратор для `Input` от `antd`, принимает все теже `props`
 */
export const InputControl: React.FC<InputControlProps> = React.memo((props) => {
    return (
        <div className="form-control input-control">
            <Input placeholder={INPUT_PLACEHOLDER_DEFAULT} {...props} />
        </div>
    )
})
