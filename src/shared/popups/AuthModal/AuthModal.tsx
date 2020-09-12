import React, { useCallback } from 'react'
import { Button, Form, Row } from 'antd'
import { CheckboxControl, IconsAdapter, InputControl, InputPasswordControl } from 'shared/components'
import './AuthModal.sass'
import { PopupAdapterFormProps } from '../PopupAdapter.model'

export const AuthModal: React.FC<PopupAdapterFormProps> = React.memo((props) => {
       const { onRequestFinish } = props

    const handleFinish = useCallback(
        (values) => {
            onRequestFinish!(values)

        },
        [onRequestFinish])

        return (
            <div className={'auth-modal'}>
                <h3 className={'auth-modal__title'}>ВХОД В АККАУНТ</h3>

                <Form
                    id={'auth'}
                    initialValues={{ login: 'admin', password: 'admin' }}
                    size={'large'}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        name={'login'}>
                        <InputControl placeholder={'Логин'} prefix={<IconsAdapter iconType={'UserOutlined'}/>}/>
                    </Form.Item>
                    <Form.Item name={'password'}>
                        <InputPasswordControl placeholder={'Логин'} prefix={<IconsAdapter iconType={'LockOutlined'}/>}/>
                    </Form.Item>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Form.Item name={'rememberMe'}
                        valuePropName={"checked"}>
                            <CheckboxControl>Запомнить меня</CheckboxControl>
                        </Form.Item>
                        <Button type={'link'}>Забыл пароль</Button>
                    </Row>

                    <Button type={'primary'} htmlType={'submit'} className={'submit-btn'}>ВОЙТИ</Button>
                </Form>

            </div>
        )
    }
)
