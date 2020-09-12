import './Programs.sass'

import React, { FC, useEffect, useState } from 'react'

import { Button, Col, Row } from 'antd'
import { IconsAdapter } from 'shared/components'
import { API } from 'api'
import { Link } from 'react-router-dom'

export const Programs: FC = React.memo(() => {
    const [programsData, setProgramsData] = useState<any>()

    const handleVisible = (id: number) => (e: any) => {
        setProgramsData(programsData.map((el: any) => {
            if (el.id === id) return { ...el, isVisible: !el.isVisible }
            return el
        }))
    }

    useEffect(() => {
        API.getEduPrograms()
            .then(res => {
                console.log(res.data)
                setProgramsData(res.data.map((el: any) => ({ ...el, isVisible: false })))
            })
    }, [])

    return <div>
        <Row style={{ marginBottom: 10, fontSize: 16 }}>
            <IconsAdapter iconType={'BankOutlined'} style={{ margin: '4px 5px 0' }}/>
            <div>Самарский государственный социально-педагогический университет</div>
        </Row>
        <ol>
            {programsData && programsData.map((el: any) => {
                return <React.Fragment key={el.id}>
                    <li>
                        <Button type={'link'} onClick={handleVisible(el.id)}>{el.name}</Button>
                    </li>
                    {el.isVisible && <Row gutter={40}>
                        <Col xl={11}>
                            <div>{el.description}</div>
                        </Col>
                        <Col xl={5}>
                            <Button type={'primary'}>
                                <Link to={`/statistic/${el.id}`}>Анализ программы</Link>
                            </Button>
                        </Col>
                    </Row>}
                </React.Fragment>
            })}
        </ol>

    </div>
})
