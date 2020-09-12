import './CheckboxControl.scss'

import React from 'react'
import { Checkbox } from 'antd'

import { CheckboxGroupControlProps } from './CheckboxControlProps.model'

/**
 * Декоратор для `Checkbox.Group` от `antd`, принимает все теже `props`
 */
export const CheckboxGroupControl: React.FC<CheckboxGroupControlProps> = React.memo(
    (props) => {
        return (
            <div className="checkbox-group-control">
                <Checkbox.Group {...props} />
            </div>
        )
    }
)
