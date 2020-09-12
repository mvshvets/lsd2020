import './ButtonsToolbar.scss'

import React from 'react'
import { calculateClass } from 'shared/utils'

import { ButtonsToolbarProps } from './ButtonsToolbar.model'

/**
 * Панель инструментов, группировка для кнопок
 */

export const ButtonsToolbar: React.FC<ButtonsToolbarProps> = React.memo(
    ({ children, align = 'flex-end', className, noMargin }) => {
        const classes = calculateClass([
            'buttons-toolbar',
            className,
            noMargin ? 'buttons-toolbar_no-margin' : undefined,
        ])

        return (
            <div className={classes} style={{ justifyContent: align }}>
                {children}
            </div>
        )
    }
)
