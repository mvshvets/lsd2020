import './TextAreaControl.scss'

import React from 'react'
import { INPUT_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { Input } from 'antd'

import { TextAreaControlProps } from './TextAreaControlProps.model'

/**
 * Декоратор для `TextArea` от `antd`, принимает все теже `props`
 */
export const TextAreaControl: React.FC<TextAreaControlProps> = React.memo(
    (props) => {
        return (
            <div className="form-control textarea-control">
                <Input.TextArea
                    placeholder={INPUT_PLACEHOLDER_DEFAULT}
                    {...props}
                />
            </div>
        )
    }
)
