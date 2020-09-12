import './Profile.sass'

import React, { FC, useContext } from 'react'

import { Col, Form, Row, Button } from 'antd'
import { IconsAdapter, InputControl, SelectControl } from 'shared/components'
import { LABEL_COL, WORK_ITEMS } from './consts'
import { UserContext } from 'core/context'

export const Profile: FC = React.memo(() => {
    const { userData } = useContext(UserContext)
    return <>
        {userData ? <Form id={'subjectData'} colon={false} className={'profile-tab'}>
            <Row gutter={90}>
                <Col xs={12}>
                    <Row style={{ marginBottom: 10, fontSize: 16 }}>
                        <IconsAdapter iconType={'BankOutlined'} style={{ margin: '4px 5px 0' }}/>
                        <div>Самарский государственный социально-педагогический университет</div>
                    </Row>
                    <Form.Item
                        name={'surname'}
                        label={'ФАМИЛИЯ'}
                        labelCol={LABEL_COL}
                        labelAlign={'left'}
                    >
                        <InputControl placeholder={userData.name.split(' ', 1)}/>
                    </Form.Item>
                    <Form.Item
                        name={'name'}
                        label={'ИМЯ'}
                        labelCol={LABEL_COL}
                        labelAlign={'left'}
                    >
                        <InputControl placeholder={userData.name.split(' ', 2)[1]}/>
                    </Form.Item>
                    <Form.Item
                        name={'patronymic'}
                        label={'ОТЧЕСТВО'}
                        labelCol={LABEL_COL}
                        labelAlign={'left'}
                    >
                        <InputControl placeholder={userData.name.split(' ', 3)[2]}/>
                    </Form.Item>
                    <Form.Item
                        name={'academicDegree'}
                        label={'УЧЕНАЯ СТЕПЕНЬ'}
                        labelCol={LABEL_COL}
                        labelAlign={'left'}
                    >
                        <InputControl placeholder={'кандидат педагогических наук'}/>
                    </Form.Item>
                    <Form.Item
                        name={'academicTitle'}
                        label={'УЧЕНОЕ ЗВАНИЕ'}
                        labelCol={LABEL_COL}
                        labelAlign={'left'}
                    >
                        <SelectControl placeholder={'доцент'} values={[
                            { value: 'без звания', label: 'без звания', key: '1' },
                            { value: 'доцент', label: 'доцент', key: '2' },
                            { value: 'профессор', label: 'профессор', key: '3' }]}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'scopus'}
                        label={'SCOPUS'}
                        labelCol={LABEL_COL}
                        labelAlign={'left'}
                    >
                        <InputControl placeholder={userData.scopusLink}/>
                    </Form.Item>
                </Col>

                <Col className={'work-list'} xs={10}>
                    <div className={'work-list__title'}>Работа по профилю вне вуза</div>
                    <ol className={'work-list__items'}>
                        {WORK_ITEMS.map(el => {
                            return <li key={el.key}>
                                <Row style={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
                                    <div>{el.value}</div>
                                    <div>{el.label}</div>
                                </Row>
                            </li>
                        })}
                    </ol>
                    <Button type={'primary'}>Добавить место работы</Button>

                    <ul className={'stat-list__items'}>
                        <li>
                            <Row style={{ justifyContent: 'space-between', display: 'flex', width: '100%', color: 'black' }} className={'stat-row'}>
                                <div>Число публикаций на "elibrary.ru"</div>
                                <div>{15}</div>
                            </Row>
                        </li>
                        <li>
                            <Row style={{ justifyContent: 'space-between', display: 'flex', width: '100%', color: 'black' }} className={'stat-row'}>
                                <div>Число публикаций в "РИНЦ"</div>
                                <div>{8}</div>
                            </Row>
                        </li>
                        <li>
                            <Row style={{ justifyContent: 'space-between', display: 'flex', width: '100%', color: 'black' }} className={'stat-row'}>
                                <div>Индекс Хирша по всем публикациям на "elibrary.ru"</div>
                                <div>{3}</div>
                            </Row>
                        </li>
                        <li>
                            <Row style={{ justifyContent: 'space-between', display: 'flex', width: '100%', color: 'black' }} className={'stat-row'}>
                                <div>Индекс Хирша по публикациям в "РИНЦ"</div>
                                <div>{2}</div>
                            </Row>
                        </li>
                        <li>
                            <Row
                                style={{
                                    justifyContent: 'space-between',
                                    display: 'flex',
                                    width: '100%',
                                    color: (userData.hirshIndex < 2) ? '#f54d4d' : 'black'
                                }}
                                className={'stat-row'}>
                                <div>Индекс Хирша по ядру "РИНЦ"</div>
                                <div>{userData.hirshIndex || 0}</div>
                            </Row>
                        </li>
                    </ul>
                </Col>
            </Row>

        </Form> : <div>Загрузка...</div>
        }
    </>
})
