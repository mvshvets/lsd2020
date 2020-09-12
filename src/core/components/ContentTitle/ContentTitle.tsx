import './ContentTitle.scss'

import React from 'react'

import { ContentTitleProps } from './ContentTitle.model'

export const ContentTitle: React.FC<ContentTitleProps> = React.memo(
    ({ children, className, title }) => (
        <div className={`content-title${className ? ' ' + className : ''}`}>
            <h1>{title}</h1>
            {children}
        </div>
    )
)
