import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App3'
import './assets/styles/main.scss';
import {Provider} from "react-redux";
import {store} from "./store2";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*Это нужно, чтобы не импортировать store напрямую в компоненты*/}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
