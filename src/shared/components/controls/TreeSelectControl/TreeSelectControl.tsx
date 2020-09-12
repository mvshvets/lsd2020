import './TreeSelectControl.scss'

import React from 'react'
import { SELECT_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { TreeSelect } from 'antd'

import { TreeSelectControlProps } from './TreeSelectControlProps.model'

/**
 * Декоратор для `TreeSelect` от `antd`, принимает все теже `props`
 */
export const TreeSelectControl: React.FC<TreeSelectControlProps<
    number[]
>> = React.memo((props) => {
    return (
        <div className="form-control tree-select-control">
            <TreeSelect
                placeholder={SELECT_PLACEHOLDER_DEFAULT}
                dropdownClassName="tree-select-control__dropdown"
                treeNodeFilterProp="title"
                {...props}
            />
        </div>
    )
})
