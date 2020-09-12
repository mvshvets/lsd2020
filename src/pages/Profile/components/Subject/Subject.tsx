import './Subject.sass'

import React, { FC, useCallback, useState } from 'react'

import { Button, Col, Form, Row } from 'antd'
import { CheckboxControl, IconsAdapter, InputControl, SelectControl } from 'shared/components'
import { SUBJECT_ITEMS } from './consts'

export const Subject: FC = React.memo(() => {
    const [profileData, setProfileData] = useState(SUBJECT_ITEMS)
    const [lessons, setLessons] = useState([{
        value: 'Программирование (Электронная коммерция - 2018)',
        label: 'Программирование (Электронная коммерция - 2018)',
        key: '4'
    }])

    const [form] = Form.useForm()

    const handleAddCourse = useCallback((value) => {
        setProfileData([...profileData, { value, link: '', key: '1' }])
        setLessons(lessons.filter(el => el.value !== value))
        form.resetFields()
    }, [profileData, lessons, form])

    const handleRemoveCourse = useCallback((value) => () => {
        setProfileData(profileData.filter(el => el.value !== value.value))
        setLessons([...lessons, { value: value.value, label: value.label , key: value.key}])
    }, [profileData, lessons])

    return (
        <>
            <Form form={form} id={'profileData'}>
                <Row gutter={15} className={'title'}>
                    <Col xs={7}>Название дисциплины/Направление подготовки/Год поступления </Col>
                    <Col xs={2}>онлайн курс</Col>
                </Row>
                <ol className={'profile-data__items'}>
                    {profileData.map((el, index) => {
                        return <li key={performance.now()}>
                            <Row gutter={15}>
                                <Col xs={7}>
                                    <div>{el.value}</div>
                                </Col>

                                <Col xs={2}>
                                    <Form.Item
                                        name={`isOnline${index}`}
                                        valuePropName={'checked'}
                                        initialValue={!!(el.link)}
                                    >
                                        <CheckboxControl/>
                                    </Form.Item>
                                </Col>

                                <Col xs={11}>
                                    <Form.Item
                                        name={`link${index}`}
                                        initialValue={el.link}
                                    >
                                        <InputControl prefix={<IconsAdapter iconType={'LinkOutlined'}/>}
                                                      placeholder={'введите электронный адрес курса'}
                                                      autoComplete={'off'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={1}>
                                    <Button shape={'circle'} icon={<IconsAdapter iconType={'CloseCircleOutlined'}/>} onClick={handleRemoveCourse(el)} style={{border: 'none'}}/>
                                </Col>
                            </Row>
                        </li>
                    })}
                </ol>
                <Col xs={7}>
                    <Form.Item
                        name={'newCourse'}
                    >
                        <SelectControl

                            className={'select'}
                            values={lessons}
                            placeholder={'Выберите дисциплину'}
                            style={{ margin: '0 20px' }}
                            onChange={handleAddCourse}
                        />
                    </Form.Item>
                </Col>
            </Form>
        </>
    )
})
