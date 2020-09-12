import React, { FC, useCallback, useContext } from 'react'
import { Button, Form } from 'antd'
import {
    ButtonsToolbar,
    InputControl, MultiSelectControl, TextAreaControl
} from 'shared/components'
import { LABEL_COL_FULL } from 'shared/consts'
import { LoaderContext } from 'core/context'
import { PopupAdapterFormProps } from 'shared/popups/PopupAdapter.model'
import { TagsType } from '../../../../shared/components/controls/MultiSelectControl/MultiSelectControlProps.model'
import { renderQuestionnairesDropdown } from '../../../../shared/utils'
import { ROUTE_NAMES } from '../../../../routing'

/** Форма добавления/редактирования подкатегорий */
export const QuestionsForm: FC<PopupAdapterFormProps> = React.memo(
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

        return (
            <Form
                onFinish={handleFinish}
                {...props}
                initialValues={initialValues}
            >
                <Form.Item
                    name="name"
                    label="Вопрос"
                    labelCol={LABEL_COL_FULL}
                    labelAlign="left"
                >
                    <InputControl/>
                </Form.Item>

                <Form.Item
                    name="shortAnswer"
                    label="Краткий ответ"
                    labelCol={LABEL_COL_FULL}
                    labelAlign="left"
                >
                    <TextAreaControl autoSize={{minRows: 4, maxRows: 4}}/>
                </Form.Item>

                <Form.Item
                    name="fullAnswer"
                    label="Развернутый ответ"
                    labelCol={LABEL_COL_FULL}
                    labelAlign="left"
                >
                    <TextAreaControl autoSize={{minRows: 4, maxRows: 4}}/>
                </Form.Item>

                <Form.Item
                    name="childSubcategories"
                    label="Входит в подкатегории"
                    labelCol={LABEL_COL_FULL}
                    labelAlign="left"
                >
                    <MultiSelectControl
                        treeData={[]}
                        showSearch
                        allowClear
                        tagsType={TagsType.ListView}
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
                        Создать
                    </Button>
                    <Button onClick={onCancelSubmit}>Отмена</Button>
                </ButtonsToolbar>
            </Form>
        )
    }
)
