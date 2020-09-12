import './PageContent.sass'

import React from 'react'

import { PageContentProps } from './PageContent.model'

export const PageContent: React.FC<PageContentProps> = React.memo(
    ({ children, className }) => (
        <section className={`page-content${className ? ' ' + className : ''}`}>
            {children}
        </section>
    )
)
