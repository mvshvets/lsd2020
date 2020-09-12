import './InputNumberControl.scss'

import React, { useMemo } from 'react'
import { INPUT_NUMBER_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { InputNumber } from 'antd'
import { calculateClass } from 'shared/utils'

import { InputNumberControlProps } from './InputControlProps.model'

/**
 * Декоратор для `InputNumber` от `antd`, принимает все теже `props`
 */
export const InputNumberControl: React.FC<InputNumberControlProps> = React.memo(
    (props) => {
        const classes = useMemo(
            () =>
                calculateClass([
                    'form-control',
                    'input-number-control',
                    props.fullWidth ? 'input-number-control_full-width' : '',
                ]),
            [props.fullWidth]
        )

        return (
            <div className={classes}>
                <InputNumber
                    placeholder={INPUT_NUMBER_PLACEHOLDER_DEFAULT}
                    {...props}
                />
            </div>
        )
    }
)
