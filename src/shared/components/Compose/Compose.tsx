import React from 'react'

import { ComposeProps } from './ComposeProps'

export const Compose = React.memo((props: ComposeProps) => {
    const { components = [], children } = props

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
})
