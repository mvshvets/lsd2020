import './ControlGroup.scss'

import React from 'react'

import { ControlGroupProps } from './ControlGroup.model'

/**
 * Группировка для контролов
 */
export const ControlGroup: React.FC<ControlGroupProps> = React.memo(
    ({ children, type, className, title }) => {
        const classes = [
            'control-group',
            type ? 'control-group_' + type : undefined,
            className,
        ]

        return (
            <div className={classes.join(' ')}>
                {title && <h4>{title}</h4>}
                {children}
            </div>
        )
    }
)
