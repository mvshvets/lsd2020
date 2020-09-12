import './SwitchControl.scss'

import React from 'react'
import { Switch } from 'antd'

import { SwitchControlProps } from './SwitchControl.model'

/**
 * Декоратор для `Switch` от `antd`, принимает все теже `props`
 */
export const SwitchControl: React.FC<SwitchControlProps> = React.memo(
    (props) => {
        return (
            <div className="form-control switch-control">
                <Switch {...props} />
            </div>
        )
    }
)
