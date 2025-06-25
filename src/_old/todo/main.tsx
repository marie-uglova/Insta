import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store';
import './assets/styles/main.scss';
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*Это нужно, чтобы не импортировать store напрямую в компоненты*/}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
