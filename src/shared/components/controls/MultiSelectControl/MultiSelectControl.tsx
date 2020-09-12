import './MultiSelectControl.sass'

import React, { useCallback, useMemo } from 'react'
import { Button, TreeSelect } from 'antd'
import { DataNode } from 'rc-tree-select/lib/interface.d'
import { IconsAdapter } from 'shared/components'
import { ROUTE_NAMES } from 'routing'
import { SELECT_SEARCH_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { calculateClass } from 'shared/utils'

import {
    MultiSelectControlProps,
    TagsType,
} from './MultiSelectControlProps.model'

/**
 * Декоратор для `TreeSelect` от `antd`
 * Использовать в случае, если нужен множественный выбор.
 */
export const MultiSelectControl: React.FC<MultiSelectControlProps<
    number[]
    >> = React.memo((props) => {
    const {
        onChange,
        value,
        treeData = [],
        tagsType,
        placeholder,
        selectAll,
        addonAfter,
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

    /**
     * Обработчик пункта "Выбрать все/снять выделение" в TreeSelect
     */
    const handleSelectAllChange = useCallback(() => {
        if (onChange) {
            value?.length
                ? onChange([])
                : onChange(
                treeData?.map((el) => Number(el.value)).filter(Boolean)
                )
        }
    }, [value, treeData, onChange])

    /**
     * Обработчик для удаления выбранного пункта меню
     * @param id - id удаляемого пункта меню
     */
    const handleDeselectOption = useCallback(
        (id: number) => {
            if (onChange && value) {
                onChange(value.filter((el) => el !== id))
            }
        },
        [value, onChange]
    )

    /**
     * Рендер списка выбранных пунктов меню для типа "Cloud"
     */
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

    /**
     * Кнопка удаление выбранного пункта из списка
     * @param id - номер пункта
     */
    const renderTagsListDeleteBtn = useCallback(
        (id: number) => (
            <Button
                type="link"
                icon={
                    <IconsAdapter
                        iconType="CloseOutlined"
                        className="multi-select-list__btn-deselect"
                    />
                }
                onClick={() => handleDeselectOption(id)}
            />
        ),
        [handleDeselectOption]
    )

    /**
     * Рендер списка выбранных пунктов меню для типа "List"
     */
    const tagsList = useMemo(
        () =>
            value?.map((el) => {
                return (
                    <div key={el} className="multi-select-list__item">
                        <div>{getTagLabel(el)}</div>
                        {renderTagsListDeleteBtn(el)}
                    </div>
                )
            }),
        [value, getTagLabel, renderTagsListDeleteBtn]
    )

    /**
     * Рендер списка выбранных пунктов меню для типа "ListView"
     */
    const tagsListView = useMemo(
        () =>
            value?.map((el) => {
                return (
                    <div key={el} className="multi-select-list__item">
                        <div>{getTagLabel(el)}</div>
                        <div>
                            {renderTagsListDeleteBtn(el)}
                            <a
                                href={`${ROUTE_NAMES.QUESTIONNAIRE_TEMPLATES_EDIT}/${el}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconsAdapter iconType="EyeOutlined" />
                            </a>
                        </div>
                    </div>
                )
            }),
        [value, getTagLabel, renderTagsListDeleteBtn]
    )

    /**
     * Рендер пункта "Выбрать все/снять выделение"
     */
    const renderMenuItemSelectAll = useMemo(() => {
        return (
            <span className="select-all-option" onClick={handleSelectAllChange}>
                {value?.length ? 'Снять выделение' : 'Выбрать все'}
            </span>
        )
    }, [value, handleSelectAllChange])

    /**
     * Возвращает дерево данных для селекта в зависимости от флага selectAll
     * @param selectAll - определяет наличие пункта "Выбрать все" в дереве данных
     * @return
     */
    const getTreeData = useCallback(
        (selectAll?: boolean) => {
            if (selectAll)
                return [
                    {
                        title: renderMenuItemSelectAll,
                        disableCheckbox: true,
                        disabled: true,
                        key: 'all',
                    },
                    ...treeData,
                ]

            return treeData
        },
        [renderMenuItemSelectAll, treeData]
    )

    const selectClasses = useMemo(
        () =>
            calculateClass([
                'form-control',
                'multi-select-control',
                tagsType ? 'multi-select-control_has-tags-cloud' : '',
            ]),
        [tagsType]
    )

    return (
        <div className={selectClasses}>
            <div className={addonAfter ? 'multi-select-addon-after' : ''}>
                <TreeSelect
                    defaultValue={value}
                    dropdownClassName={calculateClass([
                        'multi-select-control__dropdown',
                        selectAll
                            ? 'multi-select-control__dropdown_select-all'
                            : '',
                    ])}
                    treeNodeFilterProp="title"
                    treeData={getTreeData(selectAll)}
                    showArrow={true}
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
                {addonAfter && (
                    <div className="addon-after-content">{addonAfter}</div>
                )}
            </div>
            {tagsCloud && tagsType === TagsType.Cloud && (
                <div className="multi-select-tags">{tagsCloud}</div>
            )}
            {tagsList && tagsType === TagsType.List && (
                <div className="multi-select-list">{tagsList}</div>
            )}
            {tagsListView && tagsType === TagsType.ListView && (
                <div className="multi-select-list-view">{tagsListView}</div>
            )}
        </div>
    )
})
