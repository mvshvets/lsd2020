import './CheckboxControl.scss'

import React from 'react'
import { Checkbox } from 'antd'

import { CheckboxControlProps } from './CheckboxControlProps.model'

/**
 * Декоратор для `Checkbox` от `antd`, принимает все теже `props`
 */
export const CheckboxControl: React.FC<CheckboxControlProps> = React.memo(
    (props) => {
        return (
            <div className="form-control checkbox-control">
                <Checkbox {...props}>{props.children}</Checkbox>
            </div>
        )
    }
)
