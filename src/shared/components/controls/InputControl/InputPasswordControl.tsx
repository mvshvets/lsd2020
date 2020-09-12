import './InputControl.scss'

import React from 'react'
import { Input } from 'antd'

import { InputPasswordControlProps } from './InputControlProps.model'

/**
 * Декоратор для `Input.Password` от `antd`, принимает все теже `props`
 */
export const InputPasswordControl: React.FC<InputPasswordControlProps> = React.memo(
    (props) => {
        return (
            <div className="input-password-control">
                <Input.Password {...props} />
            </div>
        )
    }
)
