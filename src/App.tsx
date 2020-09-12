import React  from 'react'
import { ConfigProvider } from 'antd'
import ru_RU from 'antd/es/locale/ru_RU'
import './App.sass'
import { Header, Footer } from 'core/components'
import { Compose } from 'shared/components'
import { Routing } from 'routing'
import { DocumentTitleContextProvider, LoaderContextProvider, UserContextProvider, ModalsContextProvider } from 'core/context'
import { BrowserRouter } from 'react-router-dom'
import { Popups } from 'shared/popups'

export const App: React.FC = () => {
    return <div className="app">
        <ConfigProvider locale={ru_RU}>
            <Compose
                components={[
                    BrowserRouter,
                    LoaderContextProvider,
                    UserContextProvider,
                    DocumentTitleContextProvider,
                    ModalsContextProvider
                ]}
            >
                <Header/>

                <Routing />

                <Footer/>

                <Popups/>
            </Compose>
        </ConfigProvider>
    </div>
}