import './NotFoundPage.scss'

import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { PageContent } from 'core/components'

export const NotFoundPage: FC = React.memo(() => {
    return (
        <PageContent className="not-found">
            <h1>По Вашему запросу ничего не найдено</h1>
            <h3>
                Вы можете перейти на <Link to="/">Главную</Link>
            </h3>
        </PageContent>
    )
})
