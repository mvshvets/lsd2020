import './MultiSelectControl.scss'

import React, { useCallback, useMemo } from 'react'
import { Button, TreeSelect } from 'antd'
import { DataNode } from 'rc-tree-select/lib/interface.d'
import { IconsAdapter } from 'shared/components'
import { SELECT_SEARCH_PLACEHOLDER_DEFAULT } from 'shared/consts'

import { MultiSelectControlProps } from './MultiSelectControlProps.model'

/**
 * Декоратор для `TreeSelect` от `antd`, принимает все теже `props`.
 * Использовать в случае, если нужен множественный выбор.
 */
export const MultiSelectControl: React.FC<MultiSelectControlProps<
    number[]
>> = React.memo((props) => {
    const {
        onChange,
        value,
        treeData,
        tagsType,
        placeholder,
        ...additionalProps
    } = props

    /**
     * Функция возвращает label
     * @param value - значение по которому необходимо найти label
     */
    const getTagLabel = useCallback(
        (value: number) => {
            const searchLabel = (el: DataNode): unknown =>
                el.value === value || el.children?.find(searchLabel)

            return treeData?.find(searchLabel)?.title
        },
        [treeData]
    )

    const handleDeselectOption = useCallback(
        (id: number) => {
            if (onChange && value) onChange(value.filter((el) => el !== id))
        },
        [value, onChange]
    )

    const tagsCloud = useMemo(() => {
        return value?.map((el: number) => (
            <span
                className="multi-select-tags__item"
                key={el}
                onClick={() => handleDeselectOption(el)}
            >
                <span>{getTagLabel(el)}</span>
                <i />
            </span>
        ))
    }, [getTagLabel, handleDeselectOption, value])

    const tagsList = useMemo(
        () =>
            value?.map((el) => {
                return (
                    <div key={el} className="multi-select-list__item">
                        <div>{getTagLabel(el)}</div>
                        <Button
                            type="link"
                            icon={
                                <IconsAdapter
                                    iconType="CloseOutlined"
                                    className="multi-select-list__btn-deselect"
                                />
                            }
                            onClick={() => handleDeselectOption(el)}
                        />
                    </div>
                )
            }),
        [value, handleDeselectOption, getTagLabel]
    )

    return (
        <div
            className={`form-control multi-select-control${
                tagsType ? ' multi-select-control_has-tags-cloud' : ''
            }`}
        >
            <TreeSelect
                defaultValue={value}
                dropdownClassName="multi-select-control__dropdown"
                treeNodeFilterProp="title"
                treeData={treeData}
                onChange={onChange}
                value={value}
                placeholder={
                    tagsType
                        ? ''
                        : placeholder || SELECT_SEARCH_PLACEHOLDER_DEFAULT
                }
                treeCheckable={true}
                showCheckedStrategy="SHOW_PARENT"
                {...additionalProps}
            />
            {tagsCloud && tagsType === 'cloud' && (
                <div className="multi-select-tags">{tagsCloud}</div>
            )}
            {tagsList && tagsType === 'list' && (
                <div className="multi-select-list">{tagsList}</div>
            )}
        </div>
    )
})
