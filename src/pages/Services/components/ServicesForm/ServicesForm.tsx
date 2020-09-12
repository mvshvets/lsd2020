import './ServicesForm.sass'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { Button, Col, Form, Row } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { LoaderContext } from 'core/context'
import { SERVICES_MOCK } from 'mocks'
import { ServicesModel, ServicesUrlParamsModel } from '../Services.model'
import { InputControl, ButtonsToolbar, TextAreaControl, CloneControl } from 'shared/components'
import { COL_RESPONSIVE_FULL, COL_RESPONSIVE_HALF, LABEL_COL_FULL, ROW_GUTTER } from 'shared/consts'
import { ROUTE_NAMES } from 'routing'

export const ServicesForm: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [form] = Form.useForm()
    const urlParams = useParams<ServicesUrlParamsModel>()

    /** Начальные значения для формы создания мероприятия в режиме редактирования */
    const [initialValuesForEdit, setInitialValuesForEdit] = useState<ServicesModel>()

    /**
     * Отправка формы на сервер
     * @param values значения формы
     */
    const handleFinish = useCallback(
        async (values) => {
            try {
                setLoaderState(true)

                console.log(values)

                if (!initialValuesForEdit) {
                    form.resetFields()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoaderState(false)
            }
        },
        [form, initialValuesForEdit, setLoaderState]
    )

    /**
     * Запрос справочника
     */
    const fetchServiceForEdit = useCallback(async () => {
        try {
            setLoaderState(true)

            console.log('Запрос за услугами')

            setInitialValuesForEdit(SERVICES_MOCK.find(el => el.id === Number(urlParams.id)))

        } catch (err) {
            console.error(err)
        } finally {
            setLoaderState(false)
        }
    }, [urlParams.id, setLoaderState])

    useEffect(() => {
        if (urlParams.id) fetchServiceForEdit()
    }, [urlParams.id, fetchServiceForEdit])

    useEffect(() => {
        if (initialValuesForEdit) form.resetFields()
    }, [initialValuesForEdit, form])

    return (
        <PageContent className="services-form">
            <ContentTitle
                title={
                    urlParams.id
                        ? 'Редактирование услуги'
                        : 'Создание услуги'
                }
                className="services-form__header"
            >
                <ButtonsToolbar>
                    <Button
                        htmlType="submit"
                        type="primary"
                        form="servicesFrom"

                    >
                        {urlParams.id ? 'Изменить' : 'Создать'}
                    </Button>
                    <Link
                        to={ROUTE_NAMES.SERVICES}
                        className="like-button"
                    >
                        <Button>Отмена</Button>
                    </Link>
                </ButtonsToolbar>
            </ContentTitle>

            <Form
                id="servicesFrom"
                form={form}
                onFinish={handleFinish}
                initialValues={initialValuesForEdit}
            >
                <Row gutter={ROW_GUTTER}>
                    <Col xs={COL_RESPONSIVE_FULL} lg={COL_RESPONSIVE_HALF}>
                        <Form.Item
                            name="full_name"
                            label="Название услуги"
                            labelCol={LABEL_COL_FULL}
                            labelAlign="left"
                        >
                            <InputControl/>
                        </Form.Item>

                        <Form.Item
                            name="print_docs"
                            label="Перечень документов"
                            labelCol={LABEL_COL_FULL}
                            labelAlign="left"
                        >
                            <CloneControl name='print_docs' component={InputControl}/>
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="Фразы для поиска"
                            labelCol={LABEL_COL_FULL}
                            labelAlign="left"
                        >
                            <CloneControl name='name' component={InputControl}/>
                        </Form.Item>

                        <Form.Item
                            name="voice_docs"
                            label="Фразы Алисы"
                            labelCol={LABEL_COL_FULL}
                            labelAlign="left"
                        >
                            <CloneControl name='voice_docs' component={InputControl}/>
                        </Form.Item>
                    </Col>

                    <Col xs={COL_RESPONSIVE_FULL} lg={COL_RESPONSIVE_HALF}>
                        <Form.Item
                            name="to"
                            label="Место подачи документов"
                            labelCol={LABEL_COL_FULL}
                            labelAlign="left"
                        >
                            <InputControl/>
                        </Form.Item>

                        <Form.Item
                            name="comment"
                            label="Комментарии"
                            labelCol={LABEL_COL_FULL}
                            labelAlign="left"
                        >
                            <TextAreaControl autoSize={{ minRows: 7, maxRows: 15 }}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </PageContent>
    )
})