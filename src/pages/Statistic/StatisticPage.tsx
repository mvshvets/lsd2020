import './StatisticPage.sass'

import React, { FC, useEffect, useState } from 'react'
import { IconsAdapter } from 'shared/components'
import { Col, Divider, Row } from 'antd'
import { API } from 'api'
import { StatisticPageProps } from './StatisticPage.model'
import { useParams } from 'react-router-dom'
import { PageContent } from 'core/components'
import Image from './image.png'
import Image1 from './image1.png'
//import Image2 from './image2.png'

export const StatisticPage: FC<StatisticPageProps> = React.memo(() => {
    const [programData, setProgramData] = useState<any>()
    const params: { id: string } = useParams()

    useEffect(() => {
        API.getEduProgram(params.id)
            .then(res => {
                console.log(res.data)
                setProgramData(res.data)
            })
    }, [params])

    return <PageContent className={'statistic'}>
        {programData && <div className="statistic__content">
            <div className={'statistic__header'}>
                <h1>АНАЛИЗ</h1>
                <Row style={{ marginBottom: 10, fontSize: 16 }}>
                    <IconsAdapter iconType={'BankOutlined'} style={{ margin: '3px 5px 0', color: '#45abfd', fontSize: 18 }}/>
                    <div>{programData.name}</div>
                </Row>
            </div>

            <Row className={'statistic__table-stat'}>
                <img src={Image} alt={'Картинка'}/>
                <Divider type={'vertical'} style={{ margin: '10px 0', width: 2, height: 120 }}/>
                <div className={'statistic__table-stat_back'}>
                    <div className={'position'}>Индекс Хирша</div>
                    <div className={'description'}>Доля преподавателей с индексом Хирша не менее 2 от общего числа преподавателей ОП</div>
                    <Row className={'data'}>
                        <Col className={'magic'}>
                            <div className={'data__number'}>{programData.averageHirshIndex}</div>
                        </Col>
                        <Col className={'magic'}>
                            <div className={'data__number'}><IconsAdapter iconType={(programData.averageHirshIndex.toFixed(1) < 10) ? 'DislikeOutlined' : 'LikeOutlined'} style={{
                                fontSize: 20,
                                color: programData.averageHirshIndex.toFixed(1) < 10 ? '#f54d4d' : '#5A6774'
                            }}/></div>
                        </Col>
                    </Row>
                </div>
                <Divider type={'vertical'} style={{ margin: '10px 0', width: 2, height: 120 }}/>
                <div className={'statistic__table-stat_back'}>
                    <div className={'position'}>Вакансии</div>
                    <div className={'description'}>Количество вакансий по данному направлению подготовки (по данным hh)</div>
                    <Row className={'data'}>
                        <Col className={'magic'}>
                            <div className={'data__number'}>{programData.vacanciesCountInCity}</div>
                            <div className={'data__city'}>Ростов</div>
                        </Col>
                        <Divider type={'vertical'}/>
                        <Col className={'magic'}>
                            <div className={'data__number'}>{programData.vacanciesCountInCountry}</div>
                            <div className={'data__city'}>Россия</div>
                        </Col>
                    </Row>
                </div>
                <Divider type={'vertical'} style={{ margin: '10px 0', width: 2, height: 120 }}/>
                <div className={'statistic__table-stat_back'}>
                    <div className={'position'}>Заработная плата</div>
                    <div className={'description'}>Отношение заработной платы выпускников к средней по региону</div>
                    <Row className={'data'}>
                        <Col className={'magic'}>
                            <div className={'data__number'}>{programData.wageRatio.toFixed(1)}</div>
                        </Col>
                        <Col className={'magic'}>
                            <div className={'data__number'}><IconsAdapter iconType={(programData.wageRatio.toFixed(1) < 2) ? 'DislikeOutlined' : 'LikeOutlined'} style={{
                                fontSize: 20,
                                color: (programData.wageRatio.toFixed(1) < 2) ? '#f54d4d' : '#5A6774'
                            }}/></div>
                        </Col>
                    </Row>
                </div>
                {/*<img src={Image2} alt={'Картинка2'}/>*/}
            </Row>

            <div className={'statistic__table-stat1'}>
                <img src={Image1} alt={'Картинка1'}/>
            </div>
        </div>
        }
    </PageContent>
})
