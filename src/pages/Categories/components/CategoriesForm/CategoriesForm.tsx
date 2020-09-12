import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'antd'
import {
    ButtonsToolbar,
    InputControl, MultiSelectControl
} from 'shared/components'
import { LABEL_COL_FULL } from 'shared/consts'
import { LoaderContext } from 'core/context'
import { PopupAdapterFormProps } from 'shared/popups/PopupAdapter.model'
import { TagsType } from 'shared/components/controls/MultiSelectControl/MultiSelectControlProps.model'
import { normalizeDataForTreeSelect, renderQuestionnairesDropdown } from 'shared/utils'
import { ROUTE_NAMES } from 'routing'
import { CATEGORIES_MOCK } from 'mocks'
import { DataNode } from 'rc-tree-select/lib/interface'

/** Форма добавления/редактирования категорий */
export const CategoriesForm: FC<PopupAdapterFormProps> = React.memo(
    ({
        onRequestFinish = () => {
        },
        deleteFormAction = () => {
        },
        initialValues,
        recordCopy,
        rowSelectionType,
        onCancelSubmit,
        ...props
    }) => {
        const { setLoaderState } = useContext(LoaderContext)
        const [dictionary, setDictionary] = useState<DataNode[]>([])

        /**
         * Обработчик отправки формы
         */
        const handleFinish = useCallback(
            async (values) => {
                try {
                    setLoaderState(true)
                    console.log(values)

                    const body = {
                        ...values,
                        id: initialValues?.id
                    }

                    console.log(body)

                    onRequestFinish()
                } catch (err) {
                    onRequestFinish(err)
                } finally {
                    setLoaderState(false)
                }
            },
            [initialValues, onRequestFinish, setLoaderState]
        )

        /**
         * Запрос справочника
         */
        const dictionaryFetch = useCallback(async () => {
            try {
                setDictionary(CATEGORIES_MOCK.categories.map(normalizeDataForTreeSelect))
            } catch (e) {
                console.log(e)
            }
        }, [setLoaderState])

        useEffect(() => {
            dictionaryFetch()
        }, [dictionaryFetch])

        return (
            <Form
                onFinish={handleFinish}
                {...props}
                initialValues={initialValues}
            >
                <Form.Item
                    name="title"
                    label="Название категории"
                    labelCol={LABEL_COL_FULL}
                    labelAlign="left"
                >
                    <InputControl/>
                </Form.Item>

                <Form.Item
                    name="child"
                    label="Включает подкатегории"
                    labelCol={LABEL_COL_FULL}
                    labelAlign="left"
                >
                    <MultiSelectControl
                        treeData={dictionary}
                        showSearch
                        allowClear
                        tagsType={TagsType.List}
                        dropdownRender={renderQuestionnairesDropdown(
                            ROUTE_NAMES.SUBCATEGORIES,
                            'Добавить подкатегорию'
                        )}
                        notFoundContent="Нет данных"
                    />
                </Form.Item>

                <ButtonsToolbar>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        {initialValues?.id ? 'Изменить' : 'Создать'}
                    </Button>
                    <Button onClick={onCancelSubmit}>Отмена</Button>
                </ButtonsToolbar>
            </Form>
        )
    }
)
